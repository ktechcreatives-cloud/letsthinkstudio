import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  PenTool, 
  Image as ImageIcon, 
  Monitor, 
  BarChart3, 
  Package, 
  Lightbulb 
} from 'lucide-react';
import { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const serviceCards = [
    {
      title: "Brand Strategy & Identity",
      slug: "brand-identity",
      description: "Naming, positioning, marks, and comprehensive visual guidelines.",
      icon: <PenTool className="w-5 h-5 text-[#FF572D]" />,
    },
    {
      title: "Graphic Design & Creatives",
      slug: "graphic-design",
      description: "Art-directed campaign visuals, sales decks, and marketing assets.",
      icon: <ImageIcon className="w-5 h-5 text-[#171819]" />,
    },
    {
      title: "Website UI/UX & Dev",
      slug: "website-development",
      description: "Next.js flagships engineered for speed, typography, and conversion.",
      icon: <Monitor className="w-5 h-5 text-[#171819]" />,
    },
    {
      title: "Digital Campaign Creatives",
      slug: "digital-marketing",
      description: "High-impact paid social, search creatives, and CRO funnels.",
      icon: <BarChart3 className="w-5 h-5 text-[#171819]" />,
    },
    {
      title: "Packaging & Print Design",
      slug: "packaging-print",
      description: "Tactile boxes, labels, unboxing rituals, and prepress mechanicals.",
      icon: <Package className="w-5 h-5 text-[#171819]" />,
    },
    {
      title: "Creative Strategy",
      slug: "creative-strategy",
      description: "Market white-space positioning, audience blueprints, and roadmaps.",
      icon: <Lightbulb className="w-5 h-5 text-[#171819]" />,
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24 border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#737373] font-semibold block">
              // STUDIO DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171819]">
              Creative Solutions <br className="hidden sm:block" />
              for Growing Brands<span className="text-[#FF572D]">.</span>
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171819] hover:text-[#FF572D] transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {serviceCards.map((card) => (
            <Link
              key={card.slug}
              href={`/services/${card.slug}`}
              className="p-5 sm:p-6 bg-white border border-[#E5E5E0] rounded-xl hover:border-[#171819] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F3] border border-[#E5E5E0] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>

                <h3 className="text-sm font-bold text-[#171819] group-hover:text-[#FF572D] transition-colors leading-snug mb-2">
                  {card.title}
                </h3>

                <p className="text-xs text-[#737373] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] group-hover:text-[#171819] transition-colors">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
