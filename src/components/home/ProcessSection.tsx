import React from 'react';

const STEPS = [
  {
    number: "01",
    name: "Discover",
    headline: "Unearth the Core Business Distinction",
    description: "We interrogate business objectives, competitive whitespace, target audience psychology, and existing brand touchpoints before drawing a single line."
  },
  {
    number: "02",
    name: "Design",
    headline: "Formulate Identity & Digital Systems",
    description: "Translating strategic intent into high-fidelity reality: typographic systems, visual marks, digital user interfaces, interactive prototypes, and packaging architecture."
  },
  {
    number: "03",
    name: "Develop",
    headline: "Engineer High-Performance Platforms",
    description: "Building production-grade Next.js web applications, responsive component design systems, and technical optimizations engineered for speed and conversion."
  },
  {
    number: "04",
    name: "Deliver",
    headline: "Launch & Production Asset Handover",
    description: "Assembling exhaustive brand guidelines, production-ready vector libraries, and prepress mechanical files ready for immediate multi-channel market deployment."
  }
];

export function ProcessSection() {
  return (
    <section className="bg-[#F5F5F3] py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#737373] font-semibold block">
            // OUR PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171819]">
            A Disciplined Four-Stage Workflow<span className="text-[#FF572D]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#737373]">
            How we shepherd creative engagements from ambitious ideas to production-ready deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-6 bg-white border border-[#E5E5E0] rounded-xl hover:border-[#171819] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-2xl font-black text-[#FF572D] block mb-4">
                  {step.number}
                </span>

                <h3 className="text-lg font-bold text-[#171819] mb-1">
                  {step.name}
                </h3>

                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-4">
                  {step.headline}
                </h4>

                <p className="text-xs text-[#737373] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E5E0] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF572D]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373]">
                  Phase {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
