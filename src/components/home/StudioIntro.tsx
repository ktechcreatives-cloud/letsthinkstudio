import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function StudioIntro() {
  return (
    <section className="bg-white py-20 sm:py-28 px-6 sm:px-8 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Number & Title */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono text-[#FF572D] uppercase tracking-[0.24em] font-semibold block">
              // STUDIO PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171819] leading-[1.08]">
              We believe design without strategic conviction is merely decoration.
            </h2>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#171819] hover:bg-[#FF572D] text-white rounded-full text-xs font-semibold transition-all group"
              >
                <span>About Our Approach</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: In-depth Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#737373] text-base sm:text-lg leading-relaxed">
            <p>
              <strong className="text-[#171819] font-semibold">Let&apos;s Think Studio</strong> is an independent creative studio that helps businesses build memorable brands and communicate through impactful design and digital experiences.
            </p>
            <p>
              We partner with founders, businesses, and leadership teams who value clarity over clutter, thoughtful typography, and digital flagships built to convert. We strip away superficial noise to uncover what makes your enterprise distinct, transforming that truth into compelling visual systems.
            </p>
            <p>
              Our operating philosophy is simple: <span className="text-[#171819] italic font-medium">&ldquo;Good ideas deserve great design.&rdquo;</span> We do not enter projects with predetermined formulas. Instead, we interrogate the real commercial challenge, establish an unmistakable visual voice, and craft every touchpoint with precision.
            </p>

            {/* Studio Key Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#E5E5E0]">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#FF572D] uppercase tracking-wider block font-bold">
                  01 / Senior Craft Only
                </span>
                <p className="text-sm text-[#737373]">
                  Direct collaboration with experienced creative and technical leads on every phase of your project.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#FF572D] uppercase tracking-wider block font-bold">
                  02 / Measurable Impact
                </span>
                <p className="text-sm text-[#737373]">
                  Every typographic choice, visual element, and code architecture is engineered for trust and commercial resonance.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
