import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'dark', className = '', size = 'md' }: LogoProps) {
  const isLight = variant === 'light';
  
  // Heights based on size prop
  const heightClasses = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-11 w-auto',
    lg: 'h-12 sm:h-14 w-auto',
  };

  return (
    <Link 
      href="/" 
      aria-label="Let's Think Studio Home"
      className={`group inline-flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF572D] rounded-sm transition-opacity hover:opacity-90 ${className}`}
    >
      <div className={`relative ${heightClasses[size]} flex items-center`}>
        {/* Render authentic supplied logo variant */}
        <Image
          src={isLight ? '/logo-light.png' : '/logo-dark.png'}
          alt="Let's Think Studio"
          width={180}
          height={82}
          priority
          className="h-full w-auto object-contain max-h-full"
        />
      </div>
    </Link>
  );
}
