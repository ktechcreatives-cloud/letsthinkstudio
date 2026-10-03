import React from 'react';

export function ClientLogosBanner() {
  return (
    <section className="bg-[#F8F9FA] py-8 border-b border-gray-200/80 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-10 text-xs font-mono uppercase tracking-widest text-gray-500 whitespace-nowrap min-w-max md:min-w-0">
          
          <span className="font-semibold text-gray-400">
            TRUSTED BY BUSINESSES
          </span>

          <span className="text-gray-300">|</span>

          <span className="font-extrabold text-base tracking-wider text-gray-800 hover:text-[#FF4612] transition-colors">
            DAC <span className="text-[10px] tracking-normal font-medium block -mt-1 text-gray-500">DEVELOPERS</span>
          </span>

          <span className="text-gray-300">|</span>

          <span className="font-black text-base tracking-wider text-gray-800 hover:text-[#FF4612] transition-colors">
            MAX <span className="text-[10px] tracking-normal font-medium block -mt-1 text-gray-500">VENTURES</span>
          </span>

          <span className="text-gray-300">|</span>

          <span className="font-black text-lg tracking-widest text-gray-800 hover:text-[#FF4612] transition-colors">
            SURABI
          </span>

          <span className="text-gray-300">|</span>

          <span className="font-black text-lg tracking-widest text-gray-800 hover:text-[#FF4612] transition-colors">
            IWA
          </span>

          <span className="text-gray-300">|</span>

          <span className="text-xs font-medium text-gray-400">
            AND MORE BRANDS
          </span>

        </div>
      </div>
    </section>
  );
}
