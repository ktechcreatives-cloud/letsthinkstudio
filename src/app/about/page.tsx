import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Compass, Shield, Target, Zap, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Learn about Let's Think Studio. An independent creative studio helping ambitious businesses build memorable brands and communicate through impactful design and digital experiences.",
};

const VALUES = [
  {
    icon: <Target className="w-5 h-5 text-[#FF572D]" />,
    title: "Strategic Conviction",
    description: "Design is meaningless without commercial intent. We interrogate business objectives, positioning, and market white-space before drawing a single line."
  },
  {
    icon: <Zap className="w-5 h-5 text-[#FF572D]" />,
    title: "Senior Craft, Direct Access",
    description: "We intentionally remain an agile, focused studio. Our clients collaborate directly with seasoned creative thinkers and technical developers—never junior delegates."
  },
  {
    icon: <Compass className="w-5 h-5 text-[#FF572D]" />,
    title: "Physical & Digital Coherence",
    description: "True brand coherence spans tactile packaging, marketing collateral, and responsive web experiences. We treat each medium with equal typographic rigor."
  },
  {
    icon: <Shield className="w-5 h-5 text-[#FF572D]" />,
    title: "Intellectual Honesty",
    description: "We don't manufacture vanity metrics or agree with bad ideas to appease committee thinking. We provide candid, thoughtful counsel that protects long-term brand equity."
  }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Hero Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E0] text-xs font-mono font-medium text-[#FF572D] uppercase tracking-widest rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            About Let&apos;s Think Studio
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171819] font-heading leading-[1.02]">
            Creative thinking meets strategic execution.
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed font-normal">
            We are an independent creative studio dedicated to helping ambitious businesses build memorable brands and communicate through impactful design and digital experiences.
          </p>
        </div>
      </section>

      {/* Studio Philosophy & Approach */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
              // Studio Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171819] font-heading leading-tight">
              Good ideas deserve great design.
            </h2>
            <p className="text-[#737373] text-base leading-relaxed">
              Every meaningful studio begins with a conviction: in a noisy world, clarity wins. We believe that exceptional design is not superficial decoration; it is a foundational business advantage.
            </p>
            <p className="text-[#737373] text-base leading-relaxed">
              When brand strategy, visual craft, and thoughtful technology align, businesses communicate with authority. We work closely with our partners to uncover the essence of what makes their offering unique, translating that insight into identity systems and digital products that endure.
            </p>
            <div className="pt-2 border-l-2 border-[#FF572D] pl-4">
              <p className="text-[#171819] font-medium italic">
                &ldquo;We don&apos;t just build websites or logos. We help businesses think through how they present themselves to the world.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E5E5E0] bg-white shadow-sm rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1542744094-3a31727221eb?q=80&w=1200&auto=format&fit=crop"
                alt="Let's Think Studio design workspace and creative direction"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md border border-[#E5E5E0] text-xs font-mono text-[#737373] shadow-xs">
                LET&apos;S THINK STUDIO &bull; CREATIVE STRATEGY &bull; ART DIRECTION & DIGITAL CRAFT
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Studio Values */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-b border-[#E5E5E0]">
        <SectionHeader
          number="01"
          tag="Studio Principles"
          title="The Convictions That Guide Our Work."
          description="We reject agency bloat and superficial trends in favor of durable, purposeful design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-[#E5E5E0] space-y-4 hover:border-[#FF572D]/50 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5F5F3] border border-[#E5E5E0] rounded-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-[#171819] font-heading">
                  {v.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Partner With */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
              // Client Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171819] font-heading leading-tight">
              Built for businesses that value distinct communication.
            </h2>
            <p className="text-[#737373] text-base leading-relaxed">
              We partner best with decision-makers who recognize that design is an investment in market credibility, customer trust, and commercial distinction.
            </p>
            <ul className="space-y-3.5 pt-2">
              {[
                "Founders and startups seeking category clarity from day one",
                "Growing companies looking to elevate their brand to match their market traction",
                "E-Commerce and product businesses requiring packaging and digital flagships",
                "Established enterprises needing brand modernization and web redesigns",
                "Teams looking for senior creative and technical execution without agency overhead"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#171819] leading-relaxed">
                  <Check className="w-4 h-4 text-[#FF572D] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 bg-white border border-[#E5E5E0] space-y-6 text-center lg:text-left shadow-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
              // Direct Collaboration
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading">
              Ready to elevate how your business communicates?
            </h3>
            <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
              We review every incoming project brief personally. Tell us where your brand is today and where you need it to go next.
            </p>
            <div className="pt-2">
              <Button href="/contact" withArrow variant="primary" size="lg">
                Initiate Project Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
