'use client';

import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';

export default function BrandingForm() {
  const { updateCurrentConfig, addToCart } = usePricing();
  
  // Local form state
  const [services, setServices] = useState<string[]>([]);
  const [industry, setIndustry] = useState('tech');
  const [brandDescription, setBrandDescription] = useState('');
  
  // Toggle selection function for multi-select
  const toggleSelection = (value: string, currentValues: string[], setValues: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentValues.includes(value)) {
      // Remove if already selected
      setValues(currentValues.filter(v => v !== value));
    } else {
      // Add if not selected
      setValues([...currentValues, value]);
    }
  };
  
  // Handle service toggle
  const handleServiceToggle = (service: string) => {
    toggleSelection(service, services, setServices);
  };
  
  // Update context when form changes
  React.useEffect(() => {
    updateCurrentConfig({
      services,
      industry,
      brandDescription
    });
  }, [services, industry, brandDescription, updateCurrentConfig]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Basic validation
    if (services.length === 0) {
      alert('Please select at least one branding service');
      return;
    }
    
    // Calculate price (placeholder logic, will connect to Square later)
    let basePrice = 0;
    
    if (services.includes('logo')) basePrice += 900;
    if (services.includes('3d_logo')) basePrice += 1400;
    if (services.includes('brand_kit')) basePrice += 700;
    if (services.includes('brand_strategy')) basePrice += 1500;
    if (services.includes('visual_direction')) basePrice += 350;
    
    // Add to cart
    addToCart({
      category: 'branding',
      name: 'Brand Design',
      description: `${services.map(s => {
        switch(s) {
          case 'logo': return 'Logo Design';
          case '3d_logo': return '3D Logo';
          case 'brand_kit': return 'Brand Kit';
          case 'brand_strategy': return 'Brand Strategy';
          case 'visual_direction': return 'Visual Direction';
          default: return s;
        }
      }).join(', ')} for ${industry} industry`,
      price: basePrice,
      options: {
        services,
        industry,
        brandDescription
      },
      quantity: 1
    });
  };
  
  return (
    <div className="space-y-8 font-['Helvetica_Neue']">
      {/* Services Needed Section */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">
          Services Needed: {services.length === 0 ? 'Select services' : services.length === 1 ? 
            (services.includes('logo') ? 'Logo Design' : 
            services.includes('3d_logo') ? '3D Logo' : 
            services.includes('brand_kit') ? 'Brand Kit' : 
            services.includes('brand_strategy') ? 'Brand Strategy' : 
            'Visual Direction') : 
            `${services.length} services selected`}
        </h3>
        <div className="grid grid-cols-5 gap-3">
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              services.includes('logo')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleServiceToggle('logo')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10V15L12 19L5 15V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm">Logo Design</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              services.includes('3d_logo')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleServiceToggle('3d_logo')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.5L4.5 13V6.5L12 11L19.5 6.5V13L12 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11L19.5 6.5L12 2L4.5 6.5L12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17.5V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm">3D Logo</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              services.includes('brand_kit')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleServiceToggle('brand_kit')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 9H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Brand Kit</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              services.includes('brand_strategy')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleServiceToggle('brand_strategy')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8L9 12L16 8L22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="16" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-sm">Brand Strategy</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              services.includes('visual_direction')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleServiceToggle('visual_direction')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L8.586 11.414C8.96147 11.0386 9.46752 10.8284 10 10.8284C10.5325 10.8284 11.0385 11.0386 11.414 11.414L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14L15.586 12.414C15.9614 12.0386 16.4675 11.8284 17 11.8284C17.5325 11.8284 18.0385 12.0386 18.414 12.414L20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-sm">Visual Direction</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Industry Section */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">Select Relevant Industry</h3>
        <div className="relative">
          <select 
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full appearance-none p-4 pt-[16px] pb-[15px] pr-12 bg-transparent border border-[#333333] rounded-[20px] text-white focus:outline-none focus:border-[#424242] font-['Helvetica_Neue']"
          >
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="health">Healthcare</option>
            <option value="retail">Retail</option>
            <option value="food">Food & Beverage</option>
            <option value="education">Education</option>
            <option value="web3">Web3 / Crypto</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Brand Description */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">Describe your brand, who it&apos;s for, and what it stands for</h3>
        <textarea
          value={brandDescription}
          onChange={(e) => setBrandDescription(e.target.value)}
          placeholder="Share your brand story..."
          className="w-full p-4 bg-transparent border border-[#333333] rounded-[20px] text-white resize-none focus:outline-none focus:border-[#424242] font-['Helvetica_Neue']"
          rows={4}
        />
      </div>
      
      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-4 bg-white hover:white/80 text-black font-medium rounded-full transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
} 