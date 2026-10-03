import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions governing the use of Let's Think Studio website and client creative engagements.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
        
        <header className="space-y-4 pb-8 border-b border-[#E5E5E0]">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
            // Commercial Terms
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#171819] font-heading leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs font-mono text-[#737373]">
            Effective Date: January 1, 2026 &bull; Let&apos;s Think Studio
          </p>
        </header>

        <div className="bg-white border border-[#E5E5E0] shadow-sm p-8 sm:p-12 space-y-8 text-[#737373] text-base leading-relaxed rounded-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">1. Agreement to Terms</h2>
            <p>
              By accessing and interacting with the website of Let&apos;s Think Studio, you agree to abide by these Terms and Conditions and all applicable statutory regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">2. Intellectual Property Rights</h2>
            <p>
              All visual collateral, brand trademarks, case study narratives, photography, layout designs, and source code displayed on this website are the proprietary intellectual property of Let&apos;s Think Studio or our commissioned client partners. Unauthorized duplication, framing, or commercial scraping is prohibited without express written authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">3. Client Project Engagements</h2>
            <p>
              Creative commissions, timelines, intellectual property transfers, and payment milestones are governed by Master Services Agreements (MSA) and Statements of Work (SOW) executed separately between Let&apos;s Think Studio and the contracting client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">4. Disclaimer of Warranties</h2>
            <p>
              This website and its demonstrative case studies are provided &ldquo;as is&rdquo; without implied warranties. Past client metrics are shared as historically verified case analyses and do not constitute a guarantee of identical commercial performance for dissimilar ventures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">5. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by applicable commercial laws without regard to conflict of law doctrines.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
