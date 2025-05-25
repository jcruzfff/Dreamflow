'use client';

import React, { useState } from 'react';
import { usePricing, Category } from '../context/PricingContext';

const categoryLabels: Record<Category, string> = {
  website: 'Website & App',
  branding: 'Branding',
  marketing: 'Content'
};


export default function CategoryToggles() {
  const { selectedCategory, setSelectedCategory } = usePricing();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop version - horizontal toggles */}
      <div className="hidden sm:flex h-[54px] p-1 items-center gap-2.5 rounded-[32px] border border-[#393939] bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] mb-8">
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
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Mobile version - dropdown */}
      <div className="block sm:hidden mb-8">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex justify-between items-center p-4 bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] border border-[#393939] rounded-[20px] text-white font-['Helvetica_Neue']"
          >
            <span>{categoryLabels[selectedCategory]}</span>
            <svg 
              width="12" 
              height="7" 
              viewBox="0 0 12 7" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] border border-[#393939] rounded-[20px] z-10 overflow-hidden">
              {(Object.keys(categoryLabels) as Category[]).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left p-4 transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#3B3B3B] text-white'
                      : 'text-[#86868B] hover:bg-[#2A2A2A] hover:text-white'
                  } ${category !== 'marketing' ? 'border-b border-[#393939]' : ''}`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 