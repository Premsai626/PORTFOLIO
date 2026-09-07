import React, { ReactNode } from 'react';
import { isValidUrl } from '@/lib/isValidUrl';
import { ArrowUpRight, Lock } from 'lucide-react';

export interface ExternalLinkButtonProps {
  href?: string | null;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'text';
  disabledLabel?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  href,
  children,
  icon,
  className = '',
  variant = 'secondary',
  disabledLabel = 'Coming Soon',
  showIcon = true,
  size = 'md',
}) => {
  const isAvailable = isValidUrl(href);

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-sky-600/20 hover:shadow-sky-600/35 border border-sky-400/30 active:scale-[0.98]',
    secondary: 'bg-white/90 hover:bg-white text-slate-800 hover:text-slate-950 border border-slate-200/90 hover:border-sky-400/60 shadow-sm backdrop-blur-md active:scale-[0.98]',
    glass: 'bg-white/70 hover:bg-white/90 text-slate-800 hover:text-sky-700 border border-slate-200/80 hover:border-sky-400/40 backdrop-blur-xl shadow-md active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent hover:border-slate-200',
    text: 'p-0 text-sky-600 hover:text-sky-700 font-medium underline-offset-4 hover:underline bg-transparent',
  }[variant];

  if (!isAvailable) {
    return (
      <span
        aria-disabled="true"
        title="Link currently not configured — Coming soon!"
        className={`inline-flex items-center select-none cursor-not-allowed opacity-60 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl transition-all duration-200 ${sizeStyles} ${className}`}
      >
        {icon || <Lock className="w-3.5 h-3.5 text-slate-400" />}
        <span>{children}</span>
        <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 border border-slate-300/50">
          {disabledLabel}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href!}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-white ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      )}
    </a>
  );
};
