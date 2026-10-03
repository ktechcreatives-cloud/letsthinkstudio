import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'citron';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: "bg-[#181820] text-[#9494A8] border border-[#262630]",
    accent: "bg-[rgba(255,77,18,0.12)] text-[#FF6633] border border-[rgba(255,77,18,0.3)]",
    citron: "bg-[rgba(212,233,72,0.12)] text-[#D4E948] border border-[rgba(212,233,72,0.3)]",
    outline: "bg-transparent text-[#9494A8] border border-[#383846]",
  };

  return (
    <span className={`inline-flex items-center text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
