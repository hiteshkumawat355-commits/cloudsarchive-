import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/cloudsarchive.in';

  return (
    <footer className="bg-[#0B0D10] border-t border-[#F4F5F6]/10 text-[#A4ABB4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="text-lg tracking-wider font-medium text-[#F4F5F6]">
                Clouds<span className="font-light text-[#86BDE8]">Archive</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#A4ABB4]">
              Every Cloud Has a Story. A curated digital archive bringing together people who love looking at, photographing, discovering, and sharing the beauty of the sky.
            </p>
            <p className="text-xs uppercase tracking-widest text-[#86BDE8]/80">
              Collecting moments from the sky.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#F4F5F6] mb-4">
              Archive
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[#F4F5F6] transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-[#F4F5F6] transition-colors">Explore</Link></li>
              <li><Link href="/community" className="hover:text-[#F4F5F6] transition-colors">Community</Link></li>
              <li><Link href="/submit" className="hover:text-[#F4F5F6] transition-colors">Submit a Photo</Link></li>
              <li><Link href="/about" className="hover:text-[#F4F5F6] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#F4F5F6] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Community Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#F4F5F6] mb-4">
              Guidelines & Legal
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/legal/guidelines" className="hover:text-[#F4F5F6] transition-colors">Photo Submission Guidelines</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-[#F4F5F6] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[#F4F5F6] transition-colors">Terms of Use</Link></li>
              <li><Link href="/legal/copyright" className="hover:text-[#F4F5F6] transition-colors">Copyright & Takedown Policy</Link></li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#86BDE8] hover:underline inline-flex items-center gap-1"
                >
                  Instagram @CloudsArchive
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F4F5F6]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A4ABB4]">
          <p>© {currentYear} CloudsArchive (cloudsarchive.in). All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Photographs remain the copyright of their respective creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
