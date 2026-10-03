import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  withArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  withArrow = false,
  isLoading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed group";
  
  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 rounded-none tracking-wider uppercase font-semibold",
    md: "text-sm px-5 py-2.5 gap-2 rounded-none tracking-wide",
    lg: "text-base px-7 py-3.5 gap-2.5 rounded-none tracking-wide",
  };

  const variantStyles = {
    primary: "bg-[#FF4D12] text-white hover:bg-[#FF6633] active:translate-y-0.5 shadow-sm",
    secondary: "bg-[#18181F] text-white hover:bg-[#22222B] border border-[#2E2E3A] active:translate-y-0.5",
    outline: "bg-transparent text-white border border-[#383846] hover:border-[#FF4D12] hover:text-[#FF4D12] active:translate-y-0.5",
    ghost: "bg-transparent text-[#9494A8] hover:text-white hover:bg-white/5",
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{children}</span>
      {withArrow && !isLoading && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isLoading || props.disabled} {...props}>
      {content}
    </button>
  );
}
