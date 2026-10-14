'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/demo-data';

export default function SubmitPhotoPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('photograph') as File | null;

    if (!file || file.size === 0) {
      setErrorMessage('Please select a photograph file to upload.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    const maxBytes = 15 * 1024 * 1024; // 15 MB
    if (file.size > maxBytes) {
      setErrorMessage('File size exceeds the 15 MB limit. Please optimize your photograph before uploading.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Submission failed. Please check your inputs.');
      }
      console.log("SUBMISSION API RESPONSE:", result);
setSubmittedSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedSuccess) {
    return (
      <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6] pt-32 pb-24 px-4">
        <div className="max-w-xl mx-auto bg-[#12161B] border border-[#86BDE8]/40 rounded p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#86BDE8]/15 text-[#86BDE8] flex items-center justify-center mx-auto">
            ✓
          </div>
          <h1 className="font-serif text-3xl text-[#F4F5F6]">
            Thank you for sharing your sky!
          </h1>
          <p className="text-sm text-[#A4ABB4] leading-relaxed">
            Your photograph has been submitted for review. It will appear in the public gallery only after approval.
          </p>
          <div className="pt-4">
            <Link
              href="/explore"
              className="inline-block px-6 py-3 bg-[#86BDE8] text-[#0B0D10] text-sm font-medium rounded"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6] pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
            Community Contribution
          </span>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-[#F4F5F6]">
            Share Your Sky
          </h1>
          <p className="mt-4 text-[#A4ABB4] text-base leading-relaxed">
            Every photograph captures a moment that will never happen in exactly the same way again. Share yours with CloudsArchive.
          </p>
        </header>

        {/* Process Explanation */}
        <section className="mb-10 bg-[#12161B] border border-[#F4F5F6]/10 rounded p-6">
          <h2 className="text-xs uppercase tracking-widest text-[#86BDE8] mb-3">
            How Submissions Work
          </h2>
          <ol className="list-decimal list-inside text-sm text-[#A4ABB4] space-y-1.5">
            <li>Upload your original sky photograph (JPEG, PNG, or WebP up to 15 MB).</li>
            <li>Add the required credit and category details.</li>
            <li>Confirm that you own the photograph and grant non-exclusive display permission.</li>
            <li>Wait for editorial moderation before your photograph appears publicly.</li>
          </ol>
        </section>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-950/60 border border-red-400/40 rounded text-sm text-red-200"
          >
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#12161B] border border-[#F4F5F6]/10 rounded p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="submitter_name" className="block text-xs uppercase tracking-wider text-[#F4F5F6] mb-2">
                Photographer&apos;s Display Name *
              </label>
              <input
                id="submitter_name"
                name="submitter_name"
                type="text"
                required
                maxLength={100}
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>

            <div>
              <label htmlFor="submitter_email" className="block text-xs uppercase tracking-wider text-[#F4F5F6] mb-2">
                Email Address (Private — Never Displayed Publicly) *
              </label>
              <input
                id="submitter_email"
                name="submitter_email"
                type="email"
                required
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-xs uppercase tracking-wider text-[#F4F5F6] mb-2">
                Photograph Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                maxLength={140}
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>

            <div>
              <label htmlFor="category_slug" className="block text-xs uppercase tracking-wider text-[#F4F5F6] mb-2">
                Photograph Category *
              </label>
              <select
                id="category_slug"
                name="category_slug"
                required
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="photograph" className="block text-xs uppercase tracking-wider text-[#F4F5F6] mb-2">
              Photograph Upload (JPEG, PNG, WebP — Max 15 MB) *
            </label>
            <input
              id="photograph"
              name="photograph"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="w-full text-sm text-[#A4ABB4] file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#86BDE8] file:text-[#0B0D10]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="instagram_username" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
                Instagram Username (Optional)
              </label>
              <input
                id="instagram_username"
                name="instagram_username"
                type="text"
                placeholder="e.g., skyphotographer"
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>

            <div>
              <label htmlFor="instagram_profile_url" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
                Instagram Profile URL (Optional)
              </label>
              <input
                id="instagram_profile_url"
                name="instagram_profile_url"
                type="url"
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
                Location (Optional)
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., Ladakh, India"
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>

            <div>
              <label htmlFor="capture_date" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
                Capture Date (Optional)
              </label>
              <input
                id="capture_date"
                name="capture_date"
                type="date"
                className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
              Photograph Story / Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              maxLength={1000}
              className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
            />
          </div>

          <div>
            <label htmlFor="accessibility_text" className="block text-xs uppercase tracking-wider text-[#A4ABB4] mb-2">
              Accessibility Description (Visual description for screen readers — Optional)
            </label>
            <input
              id="accessibility_text"
              name="accessibility_text"
              type="text"
              maxLength={250}
              placeholder="e.g., Golden sunset rays breaking through dark monsoon clouds over a lake"
              className="w-full px-4 py-2.5 bg-[#0B0D10] border border-[#F4F5F6]/15 rounded text-sm text-[#F4F5F6]"
            />
          </div>

          {/* Rights & Explicit Permissions (Never Pre-checked) */}
          <fieldset className="pt-4 border-t border-[#F4F5F6]/10 space-y-4">
            <legend className="text-xs uppercase tracking-widest text-[#86BDE8] mb-2">
              Ownership & Licensing Permissions
            </legend>
            <p className="text-xs text-[#A4ABB4] leading-relaxed">
              You retain full copyright and ownership of your photograph. Submitting to CloudsArchive does not transfer copyright or permit unrelated commercial resale. Read our full{' '}
              <Link href="/legal/guidelines" className="text-[#86BDE8] underline">
                Photo Submission Guidelines
              </Link>.
            </p>

            <label className="flex items-start gap-3 text-sm text-[#F4F5F6] cursor-pointer">
              <input
                type="checkbox"
                name="ownership_confirmation"
                required
                className="mt-1 accent-[#86BDE8]"
              />
              <span>
                I confirm that I am the original photographer and copyright holder of this photograph (or have explicit legal authorization to submit it). *
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-[#F4F5F6] cursor-pointer">
              <input
                type="checkbox"
                name="website_display_permission"
                required
                className="mt-1 accent-[#86BDE8]"
              />
              <span>
                I grant CloudsArchive a non-exclusive, revocable license to display this photograph on cloudsarchive.in with my credit line and accept the{' '}
                <Link href="/legal/guidelines" className="text-[#86BDE8] underline">
                  Submission Terms
                </Link>. *
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-[#A4ABB4] cursor-pointer">
              <input
                type="checkbox"
                name="instagram_promotion_permission"
                className="mt-1 accent-[#86BDE8]"
              />
              <span>
                (Optional) I also give explicit permission for CloudsArchive to feature this photograph on the official @CloudsArchive.in Instagram page with full photographer credit.
              </span>
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#86BDE8] text-[#0B0D10] font-semibold text-sm tracking-wide rounded hover:bg-[#9ccbf0] transition-colors disabled:opacity-50"
          >
            {submitting ? 'Uploading & Validating...' : 'Submit Photograph for Review'}
          </button>
        </form>
      </div>
    </main>
  );
}
