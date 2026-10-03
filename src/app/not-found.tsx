import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-6 py-28 text-center bg-[#F5F5F3]">
      <div className="max-w-md space-y-6 animate-fade-in p-8 sm:p-12 bg-white border border-[#E5E5E0] shadow-sm rounded-sm">
        <span className="font-mono text-xs font-semibold text-[#FF572D] uppercase tracking-widest block">
          // Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold text-[#171819] font-heading">
          Page Not Found.
        </h1>

        <p className="text-sm text-[#737373] leading-relaxed">
          The requested coordinate or project archive does not exist or has been relocated to another section of the studio.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Return to Homepage
          </Button>
          <Button href="/work" variant="outline" size="md">
            View All Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
