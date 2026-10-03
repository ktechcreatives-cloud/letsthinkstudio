import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data governance practices for Let's Think Studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
        
        <header className="space-y-4 pb-8 border-b border-[#E5E5E0]">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
            // Legal & Data Governance
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#171819] font-heading leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#737373]">
            Effective Date: January 1, 2026 &bull; Let&apos;s Think Studio
          </p>
        </header>

        <div className="bg-white border border-[#E5E5E0] shadow-sm p-8 sm:p-12 space-y-8 text-[#737373] text-base leading-relaxed rounded-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">1. Introduction</h2>
            <p>
              Let&apos;s Think Studio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides strategic brand identity, digital development, and creative advisory services. This Privacy Policy outlines our transparent practices regarding the collection, safeguarding, and processing of personal information when you navigate our website or transmit an enquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">2. Information We Collect</h2>
            <p>
              We collect information that you knowingly furnish through our project enquiry and contact forms, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#171819]">
              <li>Full name and corporate or brand affiliation</li>
              <li>Business email address and telephone or WhatsApp contact</li>
              <li>Project specifications, deliverables required, and timeline parameters</li>
              <li>Estimated budget parameters for proposed engagements</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">3. How Information Is Utilized</h2>
            <p>
              Your submitted data is deployed exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#171819]">
              <li>Evaluate project viability, prepare creative proposals, and schedule discovery dialogues</li>
              <li>Execute contractual deliverables and communications during active engagements</li>
              <li>Ensure website operational integrity, uptime, and spam prevention</li>
            </ul>
            <p className="text-[#171819] font-medium pt-2">
              We never sell, broker, or rent client contact data to third-party brokers or advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">4. Confidentiality & Non-Disclosure</h2>
            <p>
              We treat all strategic briefs, proprietary business concepts, and financial projections disclosed in connection with prospective or commissioned projects as strictly confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#171819] font-heading">5. Data Retention & Your Rights</h2>
            <p>
              You maintain the right to inspect, rectify, or demand the deletion of any personal identification records retained by our studio. To submit a request, contact our privacy desk at{' '}
              <a href="mailto:hello@letsthinkstudio.com" className="text-[#FF572D] underline font-medium">
                hello@letsthinkstudio.com
              </a>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
