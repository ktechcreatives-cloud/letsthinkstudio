'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#111114] text-white pt-20 pb-12 border-t border-[#262630]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[#262630]">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="light" />

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Creative thinking meets strategic execution. We help ambitious brands turn ideas into distinct identities, high-converting digital platforms, and art-directed campaigns that command market authority.
            </p>

            <div className="pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF4612] block mb-2">
                // Studio Tagline
              </span>
              <p className="text-base font-semibold text-white">
                Think Beyond. Create With Purpose.
              </p>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              // Services
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/brand-identity" className="text-gray-400 hover:text-[#FF572D] transition-colors">
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-design" className="text-gray-400 hover:text-[#FF572D] transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="text-gray-400 hover:text-[#FF572D] transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="text-gray-400 hover:text-[#FF572D] transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/packaging-print" className="text-gray-400 hover:text-[#FF572D] transition-colors">
                  Packaging & Print
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              // Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-white transition-colors">Portfolio & Work</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">All Capabilities</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About the Studio</Link>
              </li>
              <li>
                <Link href="/insights" className="text-gray-400 hover:text-white transition-colors">Insights & Articles</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Start a Project</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Inquiries & Direct Desk */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              // Inquiries
            </p>
            <div className="space-y-3 text-sm">
              <span className="text-xs text-gray-400 block">General & Project Inquiries:</span>
              <a 
                href="mailto:hello@letsthinkstudio.com" 
                className="block text-white hover:text-[#FF572D] transition-colors font-medium"
              >
                hello@letsthinkstudio.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FF572D] hover:underline pt-2"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-xs text-[#737373] pt-2 leading-relaxed">
                Direct senior creative review &bull; 24-hour response window
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {currentYear} Let&apos;s Think Studio. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-1 text-gray-400 hover:text-[#FF4612] transition-colors font-mono"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
