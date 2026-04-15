import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CategoryBadgeProps {
  category?: string;
  className?: string;
  size?: 'sm' | 'md';
}

const categoryStyles: Record<string, string> = {
  'Retail': 'text-cat-retail bg-cat-retail/10 border-cat-retail/20',
  'Hostelería': 'text-cat-hosteleria bg-cat-hosteleria/10 border-cat-hosteleria/20',
  'Partners': 'text-cat-partners bg-cat-partners/10 border-cat-partners/20',
  'Ecosistema': 'text-cat-ecosistema bg-cat-ecosistema/10 border-cat-ecosistema/20',
};

export default function CategoryBadge({ category, className, size = 'sm' }: CategoryBadgeProps) {
  if (!category) return null;
  
  const style = categoryStyles[category] || 'text-aura-muted bg-aura-card border-aura-border';
  
  return (
    <span className={cn(
      "inline-flex items-center font-bold uppercase tracking-widest border rounded-full",
      size === 'sm' ? "text-[9px] px-2 py-0.5" : "text-[10px] px-3 py-1",
      style,
      className
    )}>
      {category}
    </span>
  );
}
