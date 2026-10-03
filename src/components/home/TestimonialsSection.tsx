import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const publishedTestimonials = testimonials.filter(t => t.status === 'published');

  if (publishedTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F8F9FA] py-20 sm:py-28 px-6 sm:px-8 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500 font-semibold block">
            ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111114]">
            Words From The Partners Who Entrusted Us<span className="text-[#FF4612]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Direct feedback from the executive leaders, general partners, and founders we have had the privilege to serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 bg-white border border-gray-200 rounded-xl flex flex-col justify-between space-y-8 hover:border-gray-900 transition-all duration-200 shadow-sm"
            >
              <div className="space-y-6">
                <Quote className="w-8 h-8 text-[#FF4612]" />
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.clientAvatar && (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                      <Image
                        src={item.clientAvatar}
                        alt={item.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {item.clientName}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.clientRole}, {item.companyName}
                    </p>
                  </div>
                </div>

                {item.projectSlug && (
                  <Link
                    href={`/work/${item.projectSlug}`}
                    className="p-2 text-gray-400 hover:text-[#FF4612] transition-colors"
                    title="View related case study"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
