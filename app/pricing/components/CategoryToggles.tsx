'use client';

import React from 'react';
import { usePricing, Category } from '../context/PricingContext';

const categoryLabels: Record<Category, string> = {
  website: 'Website & App',
  branding: 'Branding',
  marketing: 'Content',
  development: 'Development',
};

// Mobile-friendly short labels
const categoryShortLabels: Record<Category, string> = {
  website: 'Website',
  branding: 'Branding',
  marketing: 'Content',
  development: 'Dev',
};

export default function CategoryToggles() {
  const { selectedCategory, setSelectedCategory } = usePricing();

  return (
    <div className="h-[54px] p-1 flex items-start gap-2.5 rounded-[32px] border border-[#393939] bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] mb-8 overflow-x-auto overflow-y-hidden">
      {(Object.keys(categoryLabels) as Category[]).map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`flex h-[44px] px-4 justify-center items-center rounded-[32px] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap flex-1 border transition-all duration-300 ease-in-out ${
            selectedCategory === category
              ? 'bg-gradient-to-b from-[#3B3B3B] via-[#302F32] to-[#1C1C1C] border-[#424242] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-white'
              : 'text-[#86868B] border-transparent hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] hover:border-[#424242] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:text-white'
          }`}
        >
          {/* Show short label on very small screens */}
          <span className="hidden xs:block sm:hidden">{categoryShortLabels[category]}</span>
          {/* Show full label on larger screens */}
          <span className="block xs:hidden sm:block">{categoryLabels[category]}</span>
        </button>
      ))}
    </div>
  );
} 