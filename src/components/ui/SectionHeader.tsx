import React from 'react';

interface SectionHeaderProps {
  number?: string;
  tag?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  theme?: 'light' | 'dark';
}

export function SectionHeader({
  number,
  tag,
  title,
  description,
  align = 'left',
  className = '',
  theme = 'light'
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const isLight = theme === 'light';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'} ${className}`}>
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        {number && (
          <span className="font-mono text-xs font-semibold text-[#FF572D] tracking-widest uppercase">
            // {number}
          </span>
        )}
        {tag && (
          <span className={`font-mono text-xs tracking-widest uppercase ${isLight ? 'text-[#737373]' : 'text-[#9494A8]'}`}>
            {tag}
          </span>
        )}
      </div>

      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading mb-4 ${isLight ? 'text-[#171819]' : 'text-white'}`}>
        {title}
      </h2>

      {description && (
        <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal ${isLight ? 'text-[#737373]' : 'text-[#9494A8]'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
