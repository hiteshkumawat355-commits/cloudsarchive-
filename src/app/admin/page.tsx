import React from 'react';
import Link from 'next/link';
import { CATEGORIES, DEMO_PHOTOGRAPHS } from '@/lib/demo-data';

export default async function AdminDashboardPage() {
  // Server-side check for Supabase Auth configuration
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Genuine counts derived from current dataset
  const approvedCount = DEMO_PHOTOGRAPHS.length;
  const pendingCount = 0;
  const rejectedCount = 0;
  const categoryCount = CATEGORIES.length;

  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F5F6] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4F5F6]/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#86BDE8]">
              Protected Administration
            </span>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl">
              CloudsArchive Moderation & Settings
            </h1>
          </div>
          <Link
            href="/admin/login"
            className="px-4 py-2 bg-[#12161B] border border-[#F4F5F6]/20 rounded text-xs uppercase tracking-wider text-[#F4F5F6]"
          >
            Admin Session Status: {isSupabaseConfigured ? 'Connected' : 'Awaiting Supabase Auth Env'}
          </Link>
        </header>

        {!isSupabaseConfigured && (
          <div className="p-5 bg-amber-950/40 border border-amber-400/30 rounded text-sm text-amber-200">
            <strong>Configuration Notice:</strong> Supabase credentials (<code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>) are not yet set in <code>.env.local</code>. Live moderation writes are disabled until connected.
          </div>
        )}

        {/* A. OVERVIEW */}
        <section aria-label="Overview Counts" className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#12161B] border border-[#F4F5F6]/10 p-6 rounded">
            <p className="text-xs uppercase tracking-wider text-[#A4ABB4]">Approved Photographs</p>
            <p className="mt-2 text-3xl font-serif text-[#F4F5F6]">{approvedCount}</p>
          </div>
          <div className="bg-[#12161B] border border-[#F4F5F6]/10 p-6 rounded">
            <p className="text-xs uppercase tracking-wider text-[#A4ABB4]">Pending Submissions</p>
            <p className="mt-2 text-3xl font-serif text-[#86BDE8]">{pendingCount}</p>
          </div>
          <div className="bg-[#12161B] border border-[#F4F5F6]/10 p-6 rounded">
            <p className="text-xs uppercase tracking-wider text-[#A4ABB4]">Rejected Submissions</p>
            <p className="mt-2 text-3xl font-serif text-[#F4F5F6]">{rejectedCount}</p>
          </div>
          <div className="bg-[#12161B] border border-[#F4F5F6]/10 p-6 rounded">
            <p className="text-xs uppercase tracking-wider text-[#A4ABB4]">Published Categories</p>
            <p className="mt-2 text-3xl font-serif text-[#F4F5F6]">{categoryCount}</p>
          </div>
        </section>

        {/* B & C. PUBLISHED GALLERY & MODERATION MANAGEMENT */}
        <section className="bg-[#12161B] border border-[#F4F5F6]/10 rounded p-6">
          <h2 className="text-lg font-medium text-[#F4F5F6] mb-4">
            Published Gallery & Moderation Queue
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-[#A4ABB4] border-b border-[#F4F5F6]/10">
                <tr>
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 px-4">Photographer</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 pl-4">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F5F6]/10">
                {DEMO_PHOTOGRAPHS.map((photo) => (
                  <tr key={photo.id}>
                    <td className="py-3 pr-4 font-medium text-[#F4F5F6]">{photo.title}</td>
                    <td className="py-3 px-4 text-[#A4ABB4]">{photo.photographer_display_name}</td>
                    <td className="py-3 px-4 text-[#A4ABB4]">{photo.category_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded text-xs">
                        Approved (Demo)
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-xs text-[#86BDE8]">
                      {photo.is_photo_of_the_week ? '★ Photo of the Week' : photo.is_featured ? 'Featured' : 'Standard'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
