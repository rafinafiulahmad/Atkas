import 'dotenv/config';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { ROUTE_SEO_ENTRIES, resolveRouteSeo } from './src/shared/seoMeta';

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

const VALID_PROGRAMME_SLUGS = new Set([
  // Tier 01 — AI Literacy & Foundation
  'ai-fundamentals-digital-literacy-masterclass',
  'ai-everyday-professional-productivity',
  'intro-ai-powered-digital-creation',
  'ai-safety-ethics-responsible-use',
  // Tier 02 — Applied AI
  'ai-powered-website-development',
  'ai-powered-research-data-analytics',
  'ai-automation-workflow-development',
  'ai-business-digital-transformation',
  // Tier 03 — AI Professional Development
  'advanced-full-stack-ai-application-development',
  'advanced-ai-research-data-intelligence',
  'ai-agents-intelligent-automation-engineering',
  'ai-governance-strategy-institutional-leadership',
  // Specialised Programme
  'womens-safety-in-the-ai-era',
  'sp-wsai',
  // Backward-compatible legacy route slugs
  'ai-literacy-professional-productivity',
  'intro-ai-governance-responsible-ai',
  'ai-powered-web-development',
  'ai-powered-web-development-foundation',
  'ai-powered-web-development-advanced',
  'ai-research-data-analytics',
  'ai-automation-intelligent-systems',
  'ai-governance-responsible-ai',
  'advanced-ai-governance-responsible-ai',
]);

// Simple in-memory IP rate limiter (15-minute sliding window)
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 15, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (rateBuckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    rateBuckets.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateBuckets.set(ip, timestamps);
  return false;
}

function getBaseUrl(req: Request): string {
  if (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL') {
    return process.env.APP_URL.replace(/\/+$/, '');
  }
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

function escapeHtmlAttr(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectRouteSeoHtml(html: string, reqPath: string, baseUrl: string): { html: string; isKnown: boolean } {
  const { entry, isKnown } = resolveRouteSeo(reqPath);
  const targetPath = entry.canonicalPath || entry.path;
  const canonical = `${baseUrl}${targetPath === '/' ? '/' : targetPath}`;
  const safeTitle = escapeHtmlAttr(entry.title);
  const safeDesc = escapeHtmlAttr(entry.description);
  const safeUrl = escapeHtmlAttr(canonical);
  const ogType = entry.ogType || 'website';

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${ogType}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );

  const extraHeadTags = [
    `<link rel="canonical" href="${safeUrl}" />`,
    `<meta property="og:url" content="${safeUrl}" />`,
    entry.jsonLd
      ? `<script type="application/ld+json" data-atlas-jsonld="true">${JSON.stringify(entry.jsonLd)}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  out = out.replace('</head>', `    ${extraHeadTags}\n  </head>`);
  return { html: out, isKnown };
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '64kb' }));

  // Health endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'atlas-ai-education' });
  });

  // Robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain').send(
      `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    );
  });

  // Dynamic Sitemap.xml
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    const urls = ROUTE_SEO_ENTRIES.filter((entry) => !entry.excludeFromSitemap)
      .map((entry) => {
        const loc = `${baseUrl}${entry.path === '/' ? '/' : entry.path}`;
        const priority = entry.path === '/' ? '1.0' : entry.path.startsWith('/programmes/') ? '0.85' : '0.8';
        return `  <url>\n    <loc>${escapeHtmlAttr(loc)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
    res.type('application/xml').send(xml);
  });

  // Programme Application Intake API (validated, spam-protected, non-guarantee prototype)
  app.post('/api/applications', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        error: 'এই network থেকে অনেকবার আবেদন পাঠানো হয়েছে। একটু অপেক্ষা করে আবার চেষ্টা করুন।',
      });
      return;
    }

    const body = req.body || {};

    // Honeypot & timing spam protection
    if (typeof body.website_url === 'string' && body.website_url.trim().length > 0) {
      res.status(400).json({
        error: 'Automated spam validation-এর কারণে আবেদনটি বাতিল করা হয়েছে।',
      });
      return;
    }
    if (typeof body.submittedAfterMs === 'number' && body.submittedAfterMs < 800) {
      res.status(400).json({
        error: 'Submit করার আগে আবেদনের তথ্যগুলো আরেকবার যাচাই করে নিন।',
      });
      return;
    }

    // Explicitly reject payment-card style fields
    if ('cardNumber' in body || 'cvv' in body || 'paymentToken' in body) {
      res.status(400).json({
        error: 'এই application form-এ কখনো payment বা bank card-এর তথ্য দেবেন না।',
      });
      return;
    }

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const country = typeof body.country === 'string' ? body.country.trim() : '';
    const educationalBackground =
      typeof body.educationalBackground === 'string' ? body.educationalBackground.trim() : '';
    const selectedProgramme =
      typeof body.selectedProgramme === 'string' ? body.selectedProgramme.trim() : '';
    const selectedPathway =
      typeof body.selectedPathway === 'string' ? body.selectedPathway.trim() : '';
    const motivation = typeof body.motivation === 'string' ? body.motivation.trim() : '';
    const privacyConsent = body.privacyConsent === true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      fullName.length < 2 ||
      fullName.length > 120 ||
      !emailRegex.test(email) ||
      phone.length < 6 ||
      phone.length > 40 ||
      country.length < 2 ||
      educationalBackground.length < 2 ||
      !VALID_PROGRAMME_SLUGS.has(selectedProgramme) ||
      motivation.length < 10 ||
      motivation.length > 3000 ||
      !privacyConsent
    ) {
      res.status(400).json({
        error:
          'দয়া করে সব প্রয়োজনীয় ঘর সঠিকভাবে পূরণ করুন (শেখার আগ্রহ কমপক্ষে ১০ অক্ষরের হতে হবে) এবং Privacy Policy-তে সম্মতি দিন।',
      });
      return;
    }

    if (
      selectedProgramme === 'ai-powered-web-development' &&
      selectedPathway !== 'foundation' &&
      selectedPathway !== 'advanced'
    ) {
      res.status(400).json({
        error: 'AI-Powered Website Development course-এর জন্য Foundation অথবা Advanced pathway select করুন।',
      });
      return;
    }

    const referenceId = `AAE-${new Date().getUTCFullYear()}-${crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase()}`;

    res.status(201).json({
      status: 'received_for_review',
      referenceId,
      message: 'আপনার আবেদনটি review-এর জন্য সংরক্ষণ করা হয়েছে। পরবর্তী Cohort-এর সময়সূচি চূড়ান্ত হলে আমাদের team থেকে যোগাযোগ করা হবে।',
      disclaimer:
        'Disclosure: এই form-এর মাধ্যমে কোনো payment নেওয়া হয় না এবং আবেদন করলেই সরাসরি ভর্তি নিশ্চিত হয় না।',
    });
  });

  // Institutional Contact Enquiry API
  app.post('/api/contact', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (isRateLimited(clientIp, 10)) {
      res.status(429).json({
        error: 'অনেকবার request পাঠানো হয়েছে। একটু পর আবার চেষ্টা করুন।',
      });
      return;
    }

    const body = req.body || {};
    if (typeof body.website_url === 'string' && body.website_url.trim().length > 0) {
      res.status(400).json({
        error: 'Request বাতিল করা হয়েছে।',
      });
      return;
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      name.length < 2 ||
      !emailRegex.test(email) ||
      subject.length < 3 ||
      message.length < 10
    ) {
      res.status(400).json({
        error:
          'দয়া করে সঠিক নাম, Email Address, Subject এবং Message (কমপক্ষে ১০ অক্ষর) লিখুন।',
      });
      return;
    }

    const referenceId = `MSG-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    res.status(201).json({
      status: 'logged',
      referenceId,
    });
  });

  let vite: ViteDevServer | undefined;
  const distDir = path.resolve(process.cwd(), 'dist');

  if (!IS_PROD) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(distDir, {
        index: false,
      })
    );
  }

  // Catch-all HTML route with per-route SEO metadata & proper 404 status for unknown pages
  app.get('*', async (req: Request, res: Response) => {
    try {
      const reqPath = req.path;
      const baseUrl = getBaseUrl(req);
      const templatePath = IS_PROD
        ? path.resolve(distDir, 'index.html')
        : path.resolve(process.cwd(), 'index.html');

      let rawHtml = fs.readFileSync(templatePath, 'utf-8');
      if (!IS_PROD && vite) {
        rawHtml = await vite.transformIndexHtml(req.originalUrl, rawHtml);
      }

      const { html, isKnown } = injectRouteSeoHtml(rawHtml, reqPath, baseUrl);
      res.status(isKnown ? 200 : 404).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      if (vite) vite.ssrFixStacktrace(err as Error);
      res.status(500).end('Internal Server Error');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atlas AI Education server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
