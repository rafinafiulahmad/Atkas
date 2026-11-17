import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Info,
  LogOut,
  Trash2,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { useAuth } from '../context/AuthContext';
import { CategorySlug, COURSE_CATEGORIES, COURSES } from '../data/coursesData';
import { RESOURCES } from '../data/resourcesData';
import { getInitials, IDENTITY_OPTIONS, IdentityRole } from '../services/demoAuth';

function formatMemberSince(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ProfilePage() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    savedProgrammes,
    savedResources,
    freeMasterclassRegistered,
    updateProfile,
    toggleProgrammeBookmark,
    toggleResourceBookmark,
    logout,
    wipeDemoData,
  } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [identity, setIdentity] = useState<IdentityRole | ''>(user?.identity || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setIdentity(user.identity);
      setBio(user.bio);
    }
  }, [user]);

  useEffect(() => {
    if (!confirmClearOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConfirmClearOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [confirmClearOpen]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: '/profile' }} replace />;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(false);

    if (name.trim().length < 2) {
      setEditError('দয়া করে আপনার পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।');
      return;
    }
    if (bio.length > 200) {
      setEditError('Bio সর্বোচ্চ ২০০ অক্ষরের মধ্যে রাখুন।');
      return;
    }

    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      identity,
      bio: bio.slice(0, 200),
    });
    setEditSuccess(true);
  };

  const toggleInterest = (slug: CategorySlug) => {
    const exists = user.interests.includes(slug);
    const next = exists
      ? user.interests.filter((item) => item !== slug)
      : [...user.interests, slug];
    updateProfile({ interests: next });
  };

  const savedCourseItems = COURSES.filter((course) => savedProgrammes.includes(course.code));
  const savedResourceItems = RESOURCES.filter((res) => savedResources.includes(res.id));

  const handleConfirmClear = () => {
    wipeDemoData();
    setConfirmClearOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'My Profile' }]}
        title="My Profile"
        subtitle="আপনার প্রোফাইল তথ্য, আগ্রহের ক্ষেত্র ও save করা আইটেম পরিচালনা করুন।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          {/* Demo Notice */}
          <div className="flex items-start gap-2.5 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4 text-sm font-medium text-[var(--color-heading)]">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span>Demo mode: তথ্য শুধু এই browser-এ আছে।</span>
          </div>

          {/* 1. Profile Header Card */}
          <div className="flex flex-col gap-5 rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-en text-xl font-bold text-white"
              >
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-[var(--color-heading)] sm:text-2xl">
                  {user.name}
                </h2>
                <p className="truncate font-en text-sm text-[var(--color-body)]">{user.email}</p>
                <p className="mt-1 font-en text-xs font-medium text-[var(--color-body)]">
                  Member since: {formatMemberSince(user.memberSince)}
                </p>
              </div>
            </div>

            {user.identity && (
              <span className="inline-flex self-start rounded-full bg-[var(--color-tint)] px-3.5 py-1 text-xs font-semibold text-[var(--color-primary)] sm:self-center">
                {user.identity}
              </span>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Edit Profile & Interests */}
            <div className="space-y-8 lg:col-span-7">
              {/* 2. Edit Profile */}
              <form
                onSubmit={handleSaveProfile}
                noValidate
                className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-[var(--color-heading)]">
                  প্রোফাইল সম্পাদনা (Edit Profile)
                </h2>

                {editError && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-[8px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{editError}</span>
                  </div>
                )}

                {editSuccess && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 flex items-start gap-2 rounded-[8px] border border-green-200 bg-[#EAF7EE] p-3.5 text-sm font-medium text-[#1E8E3E]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>প্রোফাইল আপডেট হয়েছে</span>
                  </div>
                )}

                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="block text-sm font-semibold text-[var(--color-heading)]"
                    >
                      নাম *
                    </label>
                    <input
                      id="profile-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setEditSuccess(false);
                      }}
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="block text-sm font-semibold text-[var(--color-heading)]"
                    >
                      ফোন (ঐচ্ছিক)
                    </label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setEditSuccess(false);
                      }}
                      placeholder="+880 1XXX-XXXXXX"
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-identity"
                      className="block text-sm font-semibold text-[var(--color-heading)]"
                    >
                      পরিচয়
                    </label>
                    <select
                      id="profile-identity"
                      value={identity}
                      onChange={(e) => {
                        setIdentity(e.target.value as IdentityRole | '');
                        setEditSuccess(false);
                      }}
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {IDENTITY_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="profile-bio"
                        className="block text-sm font-semibold text-[var(--color-heading)]"
                      >
                        সংক্ষিপ্ত পরিচয় / Bio (ঐচ্ছিক)
                      </label>
                      <span className="font-en text-xs text-[var(--color-body)]">
                        {bio.length}/200
                      </span>
                    </div>
                    <textarea
                      id="profile-bio"
                      rows={3}
                      maxLength={200}
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value.slice(0, 200));
                        setEditSuccess(false);
                      }}
                      placeholder="আপনার শেখার আগ্রহ বা কাজের ক্ষেত্র সংক্ষেপে লিখুন (সর্বোচ্চ ২০০ অক্ষর)..."
                      className="mt-1.5 w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2.5 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-[8px] bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer"
                >
                  প্রোফাইল সেভ করুন
                </button>
              </form>

              {/* 3. Interests */}
              <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[var(--color-heading)]">
                  শেখার আগ্রহ (Interests)
                </h2>
                <p className="mt-1 text-sm text-[var(--color-body)]">
                  যে category-গুলো সম্পর্কে জানতে চান সেগুলোতে টিক দিন।
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {COURSE_CATEGORIES.map((cat) => {
                    const checked = user.interests.includes(cat.slug);
                    return (
                      <label
                        key={cat.slug}
                        className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[8px] border px-3.5 py-2.5 transition-colors ${
                          checked
                            ? 'border-[var(--color-primary)] bg-[var(--color-tint)]'
                            : 'border-[var(--color-border)] bg-[var(--color-soft-bg)] hover:border-[var(--color-primary)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleInterest(cat.slug)}
                          className="h-4 w-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="font-en text-sm font-medium text-[var(--color-heading)]">
                          {cat.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Saved Items, Free Masterclass, Settings & Demo Data */}
            <div className="space-y-8 lg:col-span-5">
              {/* 4a. Saved Programmes */}
              <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[var(--color-heading)]">
                    Saved Programmes
                  </h2>
                  <Link
                    to="/programmes"
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    সব দেখুন →
                  </Link>
                </div>

                {savedCourseItems.length === 0 ? (
                  <p className="mt-4 rounded-[8px] bg-[var(--color-soft-bg)] p-4 text-sm text-[var(--color-body)]">
                    এখনো কিছু save করা হয়নি
                  </p>
                ) : (
                  <ul className="mt-4 divide-y divide-[var(--color-border)]">
                    {savedCourseItems.map((course) => (
                      <li
                        key={course.code}
                        className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <span className="font-en text-[11px] font-bold text-[var(--color-primary)]">
                            {course.code}
                          </span>
                          <Link
                            to={`/programmes/${course.code}`}
                            className="block truncate font-en text-sm font-semibold text-[var(--color-heading)] hover:text-[var(--color-primary)] hover:underline"
                          >
                            {course.title}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleProgrammeBookmark(course.code)}
                          aria-label={`${course.title} bookmark সরান`}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] text-[var(--color-primary)] hover:bg-[var(--color-tint)] cursor-pointer"
                        >
                          <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 4b. Saved Resources */}
              <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[var(--color-heading)]">
                    Saved Resources
                  </h2>
                  <Link
                    to="/resources"
                    className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    Resources →
                  </Link>
                </div>

                {savedResourceItems.length === 0 ? (
                  <p className="mt-4 rounded-[8px] bg-[var(--color-soft-bg)] p-4 text-sm text-[var(--color-body)]">
                    এখনো কিছু save করা হয়নি
                  </p>
                ) : (
                  <ul className="mt-4 divide-y divide-[var(--color-border)]">
                    {savedResourceItems.map((res) => (
                      <li
                        key={res.id}
                        className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <span className="font-en text-[11px] font-bold text-[var(--color-primary)]">
                            {res.type}
                          </span>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 truncate font-en text-sm font-semibold text-[var(--color-heading)] hover:text-[var(--color-primary)] hover:underline"
                          >
                            <span className="truncate">{res.title}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleResourceBookmark(res.id)}
                          aria-label={`${res.title} bookmark সরান`}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] text-[var(--color-primary)] hover:bg-[var(--color-tint)] cursor-pointer"
                        >
                          <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 5. Free Masterclass Status */}
              <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
                <h2 className="text-lg font-bold text-[var(--color-heading)]">Free Masterclass</h2>
                {freeMasterclassRegistered ? (
                  <div className="mt-3 flex items-center gap-2 rounded-[8px] bg-[#EAF7EE] p-3.5 text-sm font-semibold text-[#1E8E3E]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Registration জমা হয়েছে</span>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="text-sm text-[var(--color-body)]">
                      এই browser থেকে এখনো Free Masterclass-এ registration করা হয়নি।
                    </p>
                    <Link
                      to="/free-masterclass"
                      className="mt-3 inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)]"
                    >
                      Free Session-এ Register করুন →
                    </Link>
                  </div>
                )}
              </div>

              {/* 6 & 7. Settings & Clear Demo Data */}
              <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
                <h2 className="text-lg font-bold text-[var(--color-heading)]">Settings</h2>

                <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2">
                  <input
                    type="checkbox"
                    checked={user.emailUpdates}
                    onChange={(e) => updateProfile({ emailUpdates: e.target.checked })}
                    className="h-4 w-4 shrink-0 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm font-medium text-[var(--color-heading)]">
                    ইমেইল আপডেট নিতে চাই
                  </span>
                </label>

                <div className="mt-5 flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/', { replace: true });
                    }}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[8px] border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    <span>Logout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmClearOpen(true)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[8px] border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    <span>Demo data মুছুন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Confirmation Dialog */}
      {confirmClearOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setConfirmClearOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="clear-dialog-title"
            aria-describedby="clear-dialog-desc"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-xl"
          >
            <h3 id="clear-dialog-title" className="text-lg font-bold text-[var(--color-heading)]">
              সব Demo data মুছে ফেলবেন?
            </h3>
            <p id="clear-dialog-desc" className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
              এতে এই browser-এ সংরক্ষিত আপনার প্রোফাইল, save করা programme/resource ও Free Masterclass registration তথ্য স্থায়ীভাবে মুছে যাবে এবং আপনি logout হয়ে যাবেন।
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-heading)] hover:bg-[var(--color-soft-bg)] cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="inline-flex min-h-[44px] items-center rounded-[8px] bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
