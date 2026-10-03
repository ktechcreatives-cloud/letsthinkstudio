import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ADVANTAGES = [
  {
    title: "Strategic Rigor First",
    description: "We don't jump into mockups without questioning assumptions. Every visual decision is backed by market context, audience psychology, and clear commercial intent."
  },
  {
    title: "Unified Online & Offline Execution",
    description: "Most agencies specialize in either web apps or print collateral. We navigate both fluently—ensuring your physical packaging and digital flagships speak the same visual language."
  },
  {
    title: "Senior Craft, Zero Layers",
    description: "You converse directly with the creative directors and technical architects designing and building your systems. No account managers or telephone game."
  },
  {
    title: "Obsession With Typography & Craft",
    description: "From custom kerning and typographic scales to micro-interactions and print finishing specs, we hold our deliverables to uncompromising standards."
  },
  {
    title: "High-Performance Modern Code",
    description: "No bloated WordPress page builders or cookie-cutter templates. We build bespoke Next.js architectures optimized for speed, accessibility, and search engines."
  },
  {
    title: "Transparent & Predictable Delivery",
    description: "Weekly sprint milestones, structured review checkpoints, and clear documentation. No ghosting, unexpected invoice creep, or missed deadlines."
  }
];

export function WhyUsSection() {
  return (
    <section className="bg-white py-20 sm:py-28 px-6 sm:px-8 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500 font-semibold block">
            STUDIO ADVANTAGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171819]">
            Why Ambitious Leaders Choose Let&apos;s Think Studio<span className="text-[#FF572D]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#737373]">
            Craft-led execution grounded in transparency, technical precision, and genuine commercial accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-[#E5E5E0] rounded-xl flex flex-col justify-between space-y-4 hover:border-[#171819] transition-all duration-200 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#FF572D]">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#737373] font-semibold">
                    Principle 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#171819]">
                  {adv.title}
                </h3>

                <p className="text-sm text-[#737373] leading-relaxed font-normal">
                  {adv.description}
                </p>
              </div>

              <div className="h-[2px] w-8 bg-[#FF572D]" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
