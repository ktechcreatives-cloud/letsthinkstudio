import React from 'react';
import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { getSiteSettings } from '@/lib/db/storage';

export const metadata: Metadata = {
  title: "Contact & Project Inquiry",
  description: "Initiate a project inquiry with Let's Think Studio. Share your brand challenge, timeline, and goals.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#F5F5F3] min-h-screen">
      
      {/* Header */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-16 border-b border-[#E5E5E0]">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E0] text-xs font-mono font-medium text-[#FF572D] uppercase tracking-widest rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Start an Engagement
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171819] font-heading leading-[1.02]">
            Let&apos;s build something meaningful.
          </h1>

          <p className="text-xl sm:text-2xl text-[#737373] leading-relaxed font-normal">
            Every breakthrough project starts with a direct, honest dialogue. Tell us about your ambitions, constraints, and timeline.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct studio contact & assurances */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest block">
                // Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171819] font-heading">
                Direct Studio Dialogue
              </h2>
              <p className="text-sm text-[#737373] leading-relaxed">
                Whether you have an immediate RFP or are seeking counsel on an upcoming rebrand or digital product launch, we review every brief with strategic rigor.
              </p>
            </div>

            <div className="space-y-5 border-y border-[#E5E5E0] py-6 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-white border border-[#E5E5E0] rounded-sm text-[#FF572D]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-xs uppercase text-[#737373]">New Inquiries</span>
                  <a href={`mailto:${settings.contactEmail || 'hello@letsthinkstudio.com'}`} className="text-[#171819] hover:text-[#FF572D] font-medium transition-colors">
                    {settings.contactEmail || 'hello@letsthinkstudio.com'}
                  </a>
                </div>
              </div>

              {settings.contactPhone && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white border border-[#E5E5E0] rounded-sm text-[#FF572D]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#737373]">Studio Desk</span>
                    <span className="text-[#171819] font-medium">{settings.contactPhone}</span>
                  </div>
                </div>
              )}

              {settings.physicalAddress && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white border border-[#E5E5E0] rounded-sm text-[#FF572D]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase text-[#737373]">Location</span>
                    <span className="text-[#737373] leading-relaxed block">{settings.physicalAddress}</span>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Quick Trigger if configured */}
            {settings.whatsappNumber ? (
              <div className="p-6 bg-white border border-[#E5E5E0] space-y-3 shadow-sm rounded-sm">
                <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest block">
                  // Messaging Desk
                </span>
                <h3 className="text-lg font-bold text-[#171819] font-heading">
                  Need a quick preliminary response?
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Message our studio director directly via WhatsApp channel.
                </p>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF572D] hover:underline pt-2 font-bold"
                >
                  <span>Connect via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ) : null}

            {/* Commitments & Confidentiality */}
            <div className="p-6 bg-white border border-[#E5E5E0] space-y-3 shadow-sm rounded-sm">
              <div className="flex items-center gap-2 text-[#171819] font-mono text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#FF572D]" />
                <span>Confidentiality Guaranteed</span>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed">
                All project briefs, proprietary concepts, and business information submitted are treated with strict confidentiality.
              </p>
            </div>

          </div>

          {/* Right Column: Full Interactive Form */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FF572D]">
                // Project Brief Inquiry
              </span>
            </div>
            <EnquiryForm />
          </div>

        </div>
      </section>

    </div>
  );
}
