'use client';

import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';

export default function MarketingForm() {
  const { updateCurrentConfig, addToCart } = usePricing();
  
  // Local form state
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [style, setStyle] = useState('minimal');
  const [motions, setMotions] = useState<string[]>(['static']);
  const [format, setFormat] = useState('instagram');
  const [campaignDescription, setCampaignDescription] = useState('');
  
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
  
  // Handle deliverable toggle
  const handleDeliverableToggle = (deliverable: string) => {
    toggleSelection(deliverable, deliverables, setDeliverables);
  };
  
  // Handle motion toggle
  const handleMotionToggle = (motion: string) => {
    toggleSelection(motion, motions, setMotions);
  };
  
  // Update context when form changes
  React.useEffect(() => {
    updateCurrentConfig({
      deliverables,
      style,
      motions,
      format,
      campaignDescription
    });
  }, [
    deliverables, style, motions, format, 
    campaignDescription, updateCurrentConfig
  ]);
  
  // Helper to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Basic validation
    if (deliverables.length === 0) {
      alert('Please select at least one deliverable');
      return;
    }
    
    if (motions.length === 0) {
      alert('Please select at least one motion type');
      return;
    }
    
    // Calculate price (placeholder logic, will connect to Square later)
    let basePrice = 0;
    
    // Base prices for deliverables
    if (deliverables.includes('pitch_deck')) basePrice += 800;
    if (deliverables.includes('social_media')) basePrice += 600;
    if (deliverables.includes('video_bg')) basePrice += 350;
    if (deliverables.includes('product_mockups')) basePrice += 450;
    if (deliverables.includes('3d_animations')) basePrice += 1200;
    
    // Additional costs for motion
    if (motions.includes('animated')) basePrice += 300;
    if (motions.includes('3d')) basePrice += 600;
    
    // Add to cart
    addToCart({
      category: 'marketing',
      name: 'Marketing & Content',
      description: `${deliverables.map(d => {
        switch(d) {
          case 'pitch_deck': return 'Pitch Deck';
          case 'social_media': return 'Social Media Assets';
          case 'video_bg': return 'Video Assets';
          case 'product_mockups': return 'Mockups';
          case '3d_animations': return '3D Animations';
          default: return d;
        }
      }).join(', ')} in ${capitalize(style)} style`,
      price: basePrice,
      options: {
        deliverables,
        style,
        motions,
        format,
        campaignDescription
      },
      quantity: 1
    });
  };
  
  return (
    <div className="space-y-8 font-['Helvetica_Neue']">
      {/* Services Needed Section (renamed from Deliverables) */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">
          Services Needed: {deliverables.length === 0 ? 'Select services' : 
            deliverables.length === 1 ? 
            (deliverables.includes('pitch_deck') ? 'Pitch Deck' : 
             deliverables.includes('social_media') ? 'Social Media Assets' : 
             deliverables.includes('video_bg') ? 'Video Assets' : 
             deliverables.includes('product_mockups') ? 'Mockups' : 
             '3D Animations') : 
            `${deliverables.length} services selected`}
        </h3>
        <div className="grid grid-cols-5 gap-3">
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              deliverables.includes('pitch_deck')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleDeliverableToggle('pitch_deck')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 16H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Pitch Deck</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              deliverables.includes('social_media')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleDeliverableToggle('social_media')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8L10.94 13.3161C10.405 13.7263 9.59503 13.7263 9.06 13.3161L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-sm text-center">Social Media</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              deliverables.includes('video_bg')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleDeliverableToggle('video_bg')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 9L15 12L10 15V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Video Assets</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              deliverables.includes('product_mockups')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleDeliverableToggle('product_mockups')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 4L21 9L12 14L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11.5V16.5L12 19.5L17 16.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">Mockups</span>
            </div>
          </button>
          
          <button
            className={`p-4 h-[120px] rounded-[20px] ${
              deliverables.includes('3d_animations')
              ? 'border-2 border-[#303030]'
              : 'hover:bg-[#1a1a1a]'
            } flex items-center justify-center cursor-pointer`}
            onClick={() => handleDeliverableToggle('3d_animations')}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-3 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L4 7V17L12 21L20 17V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 7L12 11L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-center">3D Animations</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Style, Format & Motion Row */}
      <div className="flex items-start gap-4">
        {/* Style Section */}
        <div className="w-[30%]">
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Style: {capitalize(style)}
          </h3>
          <div className="relative">
            <select 
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full appearance-none p-4 pt-[16px] pb-[15px] pr-12 bg-transparent border border-[#333333] rounded-[20px] text-white focus:outline-none focus:border-[#424242] font-['Helvetica_Neue']"
            >
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
              <option value="gradient">Gradient</option>
              <option value="clean">Clean</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Format Section */}
        <div className="w-[30%]">
          <h3 className="text-neutral-400 text-sm font-medium mb-4">Format</h3>
          <div className="relative">
            <select 
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full appearance-none p-4 pt-[16px] pb-[15px] pr-12 bg-transparent border border-[#333333] rounded-[20px] text-white focus:outline-none focus:border-[#424242] font-['Helvetica_Neue']"
            >
              <option value="instagram">Instagram / TikTok</option>
              <option value="slide_16_9">Slide Deck (16:9)</option>
              <option value="slide_4_3">Slide Deck (4:3)</option>
              <option value="web_hero">Web Hero / Header</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Motion Section */}
        <div className="w-[40%]">
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Motion: {motions.length === 0 ? 'Select motion' : motions.map(m => capitalize(m)).join(' & ')}
          </h3>
          <div className="flex gap-2">
            <button
              className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer box-border ${
                motions.includes('static') ? 'border-2 border-[#303030]' : 'border-2 border-transparent'
              }`}
              onClick={() => handleMotionToggle('static')}
            >
              <span>Static</span>
              {motions.includes('static') && (
                <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              )}
            </button>
            
            <button
              className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer box-border ${
                motions.includes('animated') ? 'border-2 border-[#303030]' : 'border-2 border-transparent'
              }`}
              onClick={() => handleMotionToggle('animated')}
            >
              <span>Animated</span>
              {motions.includes('animated') && (
                <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              )}
            </button>
            
            <button
              className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer box-border ${
                motions.includes('3d') ? 'border-2 border-[#303030]' : 'border-2 border-transparent'
              }`}
              onClick={() => handleMotionToggle('3d')}
            >
              <span>3D</span>
              {motions.includes('3d') && (
                <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Campaign Description */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">What are you promoting?</h3>
        <textarea
          value={campaignDescription}
          onChange={(e) => setCampaignDescription(e.target.value)}
          placeholder="Tell us about your campaign goals, target audience, and key messages..."
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