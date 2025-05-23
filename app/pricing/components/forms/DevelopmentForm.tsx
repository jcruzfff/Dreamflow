'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePricing } from '../../context/PricingContext';

export default function DevelopmentForm() {
  const { updateCurrentConfig, addToCart, resetCurrentConfig } = usePricing();
  
  // Local form state
  const [buildType, setBuildType] = useState('webflow');
  const [buildScope, setBuildScope] = useState<string[]>([]);
  const [buildNotes, setBuildNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle outside click for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update context when form changes
  React.useEffect(() => {
    updateCurrentConfig({
      buildType,
      buildScope,
      buildNotes
    });
  }, [buildType, buildScope, buildNotes, updateCurrentConfig]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Calculate price based on selections
    let basePrice = 0;
    
    // Build type labels and prices
    const buildTypeInfo: { [key: string]: { label: string; price: number } } = {
      'webflow': { label: 'Webflow', price: 1200 },
      'custom': { label: 'Custom Front-End', price: 2000 },
      'fullstack': { label: 'Full-Stack dApp', price: 4000 },
      'animation': { label: 'Animation Microsite', price: 1800 },
      'mobile': { label: 'Mobile App', price: 3000 }
    };
    
    // Set base price based on build type
    basePrice = buildTypeInfo[buildType]?.price || 1200;
    
    // Build scope labels and additional costs
    const scopeInfo: { [key: string]: { label: string; price: number } } = {
      'animations': { label: 'Animations/Interactions', price: 800 },
      'cms': { label: 'CMS Integration', price: 600 },
      'api': { label: 'API Integration', price: 1000 },
      'backend': { label: 'Backend Services', price: 1500 },
      'hosting': { label: 'Hosting/Deployment', price: 400 }
    };
    
    // Add cost for the selected build scope option (if any)
    if (buildScope.length > 0) {
      const scope = buildScope[0];
      basePrice += scopeInfo[scope]?.price || 0;
    }
    
    // Format build type for display
    const buildTypeLabel = buildTypeInfo[buildType]?.label || buildType;
    
    // Format build scope for display
    const scopeLabels = buildScope.map(scope => scopeInfo[scope]?.label || scope);
    
    // Create product name based on build type
    const productName = `${buildTypeLabel} Development`;
    
    // Create detailed description
    let description = `${buildTypeLabel} Build`;
    if (scopeLabels.length > 0) {
      description += ` with ${scopeLabels.join(', ')}`;
    } else {
      description += ' with Basic Scope';
    }
    
    // Add notes if provided (truncated for receipt)
    if (buildNotes) {
      description += `. Notes: ${buildNotes.substring(0, 100)}${buildNotes.length > 100 ? '...' : ''}`;
    }
    
    // Add to cart with detailed information for Square
    addToCart({
      category: 'development',
      name: productName,
      description: description,
      price: basePrice,
      options: {
        buildType,
        buildScope,
        buildNotes
      },
      quantity: 1
    });

    // Reset form state after adding to cart
    setBuildType('webflow');
    setBuildScope([]);
    setBuildNotes('');
    setIsDropdownOpen(false);
    resetCurrentConfig();
  };
  
  // Toggle selection in the dropdown
  const toggleSelection = (scope: string) => {
    // If no scope is selected, select this one
    if (buildScope.length === 0) {
      setBuildScope([scope]);
      return;
    }

    // If this scope is already selected, deselect it
    if (buildScope.includes(scope)) {
      setBuildScope([]);
    } else {
      // Otherwise, replace the current selection with this one
      setBuildScope([scope]);
    }
  };
  
  // Format selected options for display
  const formatSelectedOptions = () => {
    if (buildScope.length === 0) return 'Select build scope option';
    return scopeOptions.find(option => option.value === buildScope[0])?.label || '';
  };
  
  // Scope options
  const scopeOptions = [
    { value: 'animations', label: 'Animations / Interactions' },
    { value: 'cms', label: 'CMS Integration' },
    { value: 'api', label: 'API Integration' },
    { value: 'backend', label: 'Backend Services' },
    { value: 'hosting', label: 'Hosting / Deployment' }
  ];
  
  return (
    <div className="space-y-8 font-['Helvetica_Neue']">
      {/* Build Type Section */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">
          Build Type: {
            buildType === 'webflow' ? 'Webflow Build' :
            buildType === 'custom' ? 'Custom Build' :
            buildType === 'fullstack' ? 'Full Stack dApp' :
            buildType === 'animation' ? 'Animation Microsite' :
            buildType === 'mobile' ? 'Mobile App' : 'Select Type'
          }
        </h3>
        <div className="grid grid-cols-5 gap-3">
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              buildType === 'webflow'
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setBuildType('webflow')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 8h.01M9 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Webflow</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              buildType === 'custom'
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setBuildType('custom')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Custom Build</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              buildType === 'fullstack'
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setBuildType('fullstack')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12L21 7.5 12 3 3 7.5 12 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7.5v9L12 21l9-4.5v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Full Stack dApp</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              buildType === 'animation'
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setBuildType('animation')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3v18l14-9L5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Animation</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              buildType === 'mobile'
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => setBuildType('mobile')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Mobile App</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Build Scope Section - Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">
          Build Scope
        </h3>
        
        {/* Dropdown Button */}
        <button 
          className="p-4 w-full bg-transparent border border-[#333333] rounded-[20px] text-white flex items-center justify-between"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={buildScope.length === 0 ? 'text-neutral-500' : ''}>
            {formatSelectedOptions()}
          </span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-[#1a1a1a] border border-[#333333] rounded-[20px] py-2 shadow-xl">
            {scopeOptions.map((option) => (
              <div 
                key={option.value}
                className="px-4 py-3 hover:bg-[#303030] cursor-pointer flex items-center"
                onClick={() => toggleSelection(option.value)}
              >
                <div className={`w-5 h-5 mr-3 flex items-center justify-center rounded-md ${
                  buildScope.includes(option.value) ? 'bg-[#303030] border-[#303030]' : 'border border-neutral-600'
                }`}>
                  {buildScope.includes(option.value) && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Selected Options Pills (optional - can be removed if not needed) */}
        {buildScope.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {buildScope.map((scope) => (
              <div 
                key={scope}
                className="bg-neutral-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <span>{scopeOptions.find(option => option.value === scope)?.label}</span>
                <button 
                  className="ml-2 text-neutral-400 hover:text-white"
                  onClick={() => toggleSelection(scope)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Project Notes */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">Build Notes</h3>
        <textarea
          value={buildNotes}
          onChange={(e) => setBuildNotes(e.target.value)}
          placeholder="Tell us what we need to know to build it right: Link to your Figma, describe user flows, outline dev needs, features, or functionality."
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