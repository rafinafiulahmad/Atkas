import { useEffect } from 'react';
import { resolveRouteSeo } from '../shared/seoMeta';

interface SeoHeadProps {
  pathname: string;
  customTitle?: string;
  customDescription?: string;
  customJsonLd?: Record<string, unknown>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({ pathname, customTitle, customDescription, customJsonLd }: SeoHeadProps) {
  useEffect(() => {
    const { entry } = resolveRouteSeo(pathname);
    const title = customTitle || entry.title;
    const description = customDescription || entry.description;
    const targetPath = entry.canonicalPath || entry.path;
    const canonicalUrl = `${window.location.origin}${targetPath === '/' ? '/' : targetPath}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', entry.ogType || 'website');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let canonicalEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    const ldData = customJsonLd || entry.jsonLd;
    const existingLd = document.head.querySelector('script[data-atlas-jsonld="true"]');
    if (ldData) {
      const script = existingLd || document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-atlas-jsonld', 'true');
      script.textContent = JSON.stringify(ldData);
      if (!existingLd) {
        document.head.appendChild(script);
      }
    } else if (existingLd) {
      existingLd.remove();
    }
  }, [pathname, customTitle, customDescription, customJsonLd]);

  return null;
}
