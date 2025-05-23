'use client';

import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';

export default function MarketingForm() {
  const { updateCurrentConfig, addToCart, resetCurrentConfig } = usePricing();
  
  // Local form state
  const [deliverables, setDeliverables] = useState<string[]>(['pitch_deck']);
  const [style, setStyle] = useState('minimal');
  const [motions, setMotions] = useState<string[]>(['static']);
  const [format, setFormat] = useState('slide_16_9');
  const [campaignDescription, setCampaignDescription] = useState('');
  
  // Get the current deliverable (we only allow one)
  const currentDeliverable = deliverables[0];

  // Get format options based on selected deliverable
  const getFormatOptions = React.useCallback(() => {
    switch (currentDeliverable) {
      case 'pitch_deck':
        return [
          { value: 'slide_16_9', label: 'Slide Deck (16:9)' },
          { value: 'slide_4_3', label: 'Slide Deck (4:3)' },
          { value: 'custom', label: 'Custom' }
        ];
      case 'social_media':
        return [
          { value: 'instagram', label: 'Instagram/TikTok' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'twitter', label: 'Twitter' },
          { value: 'facebook', label: 'Facebook' }
        ];
      case 'video_bg':
        return [
          { value: '9_16', label: '9:16 (Vertical)' },
          { value: '1_1', label: '1:1 (Square)' },
          { value: '16_9', label: '16:9 (Horizontal)' },
          { value: '4_5', label: '4:5 (Instagram)' },
          { value: 'custom', label: 'Custom Aspect Ratio' }
        ];
      case 'product_mockups':
        return [
          { value: 'mobile', label: 'Mobile' },
          { value: 'computers', label: 'Computers' },
          { value: 'clothing', label: 'Clothing' },
          { value: 'banners', label: 'Banners' },
          { value: 'print', label: 'Print' },
          { value: 'other', label: 'Other (please specify below)' }
        ];
      case '3d_animations':
        return [
          { value: '9_16', label: '9:16 (Vertical)' },
          { value: '1_1', label: '1:1 (Square)' },
          { value: '16_9', label: '16:9 (Horizontal)' },
          { value: 'custom', label: 'Custom' }
        ];
      default:
        return [
          { value: 'instagram', label: 'Instagram/TikTok' },
          { value: 'custom', label: 'Custom' }
        ];
    }
  }, [currentDeliverable]);

  // Get motion options based on selected deliverable
  const getMotionOptions = React.useCallback(() => {
    switch (currentDeliverable) {
      case 'pitch_deck':
        // Pitch decks are typically static presentations
        return [
          { value: 'static', label: 'Static' }
        ];
      case 'social_media':
      case 'video_bg':
      case 'product_mockups':
      case '3d_animations':
        return [
          { value: 'static', label: 'Static' },
          { value: 'animated', label: 'Animated' },
          { value: '3d', label: '3D' }
        ];
      default:
        return [
          { value: 'static', label: 'Static' },
          { value: 'animated', label: 'Animated' }
        ];
    }
  }, [currentDeliverable]);

  // Update format when deliverable changes to ensure valid default
  React.useEffect(() => {
    const formatOptions = getFormatOptions();
    const motionOptions = getMotionOptions();
    
    // Use functional form to check and update format
    setFormat(currentFormat => {
      const currentFormatValid = formatOptions.some(option => option.value === currentFormat);
      if (!currentFormatValid) {
        return formatOptions[0]?.value || 'custom';
      }
      return currentFormat;
    });

    // Use functional form to check and update motions
    setMotions(currentMotions => {
      const validMotions = currentMotions.filter(motion => 
        motionOptions.some(option => option.value === motion)
      );
      
      if (validMotions.length === 0) {
        return [motionOptions[0]?.value || 'static'];
      }
      return validMotions;
    });
  }, [currentDeliverable, getFormatOptions, getMotionOptions]);

  // Check if motion options should be shown
  const shouldShowMotions = () => {
    return currentDeliverable !== 'pitch_deck';
  };
  
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
    // If the deliverable is already selected
    if (deliverables.includes(deliverable)) {
      // If it's the default (pitch_deck), keep it selected (don't allow deselection)
      if (deliverable === 'pitch_deck') {
        return;
      }
      // Otherwise, reset to default
      setDeliverables(['pitch_deck']);
    } else {
      // Otherwise, select only this deliverable (replacing any previously selected)
      setDeliverables([deliverable]);
    }
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
      alert('Please select a deliverable');
      return;
    }
    
    if (motions.length === 0) {
      alert('Please select at least one motion type');
      return;
    }
    
    // Since we now only allow one deliverable, we can simplify the price calculation
    let basePrice = 0;
    const deliverable = deliverables[0]; // There will only be one deliverable
    
    // Base prices for deliverables
    if (deliverable === 'pitch_deck') basePrice = 800;
    else if (deliverable === 'social_media') basePrice = 600;
    else if (deliverable === 'video_bg') basePrice = 350;
    else if (deliverable === 'product_mockups') basePrice = 450;
    else if (deliverable === '3d_animations') basePrice = 1200;
    
    // Additional costs for motion
    if (motions.includes('animated')) basePrice += 300;
    if (motions.includes('3d')) basePrice += 600;
    
    // Deliverable labels for display
    const deliverableLabels: { [key: string]: string } = {
      'pitch_deck': 'Pitch Deck',
      'social_media': 'Social Media Assets',
      'video_bg': 'Video Assets',
      'product_mockups': 'Product Mockups',
      '3d_animations': '3D Animations'
    };
    
    // Motion type labels
    const motionLabels: { [key: string]: string } = {
      'static': 'Static',
      'animated': 'Animated',
      '3d': '3D'
    };
    
    // Format labels for display
    const formatLabels: { [key: string]: string } = {
      // Pitch deck formats
      'slide_16_9': 'Slide Deck (16:9)',
      'slide_4_3': 'Slide Deck (4:3)',
      
      // Social media formats
      'instagram': 'Instagram/TikTok',
      'linkedin': 'LinkedIn',
      'twitter': 'Twitter', 
      'facebook': 'Facebook',
      
      // Video/aspect ratio formats
      '9_16': '9:16 (Vertical)',
      '1_1': '1:1 (Square)',
      '16_9': '16:9 (Horizontal)',
      '4_5': '4:5 (Instagram)',
      
      // Mockup formats
      'mobile': 'Mobile',
      'computers': 'Computers',
      'clothing': 'Clothing',
      'banners': 'Banners',
      'print': 'Print',
      'other': 'Other',
      
      // Generic
      'custom': 'Custom',
      'web_hero': 'Web Hero/Header'
    };
    
    // Format deliverables for display
    const selectedDeliverables = deliverables.map(d => deliverableLabels[d] || d);
    const selectedMotions = motions.map(m => motionLabels[m] || m);
    
    // Create product name based on the selected deliverable
    let productName;
    if (deliverable === 'pitch_deck') {
      productName = 'Pitch Deck Design';
    } else if (deliverable === 'social_media') {
      productName = 'Social Media Package';
    } else if (deliverable === '3d_animations') {
      productName = '3D Animation Package';
    } else if (deliverable === 'video_bg') {
      productName = 'Video Assets';
    } else if (deliverable === 'product_mockups') {
      productName = 'Marketing & Content';
    } else {
      productName = 'Marketing & Content';
    }
    
    // Add motion type to name if relevant
    if (motions.includes('animated') && !productName.includes('Animation')) {
      productName += ' with Animation';
    }
    
    // Add to cart with detailed information for Square
    addToCart({
      category: 'marketing',
      name: productName,
      description: `${selectedDeliverables.join(', ')} in ${capitalize(style)} style. Format: ${formatLabels[format] || format}. Motion: ${selectedMotions.join('/')}${campaignDescription ? '. Notes: ' + campaignDescription.substring(0, 100) + (campaignDescription.length > 100 ? '...' : '') : ''}`,
      price: basePrice,
      options: {
        deliverables,
        style,
        motions,
        format,
        campaignDescription,
        selectedVariant: deliverable === 'pitch_deck' ? '10_page' : 
                        deliverable === 'video_bg' ? '10_15_secs' : 
                        undefined
      },
      quantity: 1
    });
    
    // Reset form state after adding to cart
    setDeliverables(['pitch_deck']);
    setStyle('minimal');
    setMotions(['static']);
    setFormat('slide_16_9'); // Default format for pitch deck
    setCampaignDescription('');
    resetCurrentConfig();
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
              {getFormatOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Motion Section */}
        {shouldShowMotions() && (
          <div className="w-[40%]">
            <h3 className="text-neutral-400 text-sm font-medium mb-4">
              Motion: {motions.length === 0 ? 'Select motion' : motions.map(m => capitalize(m)).join(' & ')}
            </h3>
            <div className="flex gap-2">
              {getMotionOptions().map((option) => (
                <button
                  key={option.value}
                  className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer box-border ${
                    motions.includes(option.value) ? 'border-2 border-[#303030]' : 'border-2 border-transparent'
                  }`}
                  onClick={() => handleMotionToggle(option.value)}
                >
                  <span>{option.label}</span>
                  {motions.includes(option.value) && (
                    <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Campaign Description */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">
          {currentDeliverable === 'pitch_deck' ? 'Describe your pitch deck' :
           currentDeliverable === 'social_media' ? 'What are you promoting?' :
           currentDeliverable === 'video_bg' ? 'Describe your video content' :
           currentDeliverable === 'product_mockups' ? 'Describe your product/mockup needs' :
           'What are you promoting?'}
        </h3>
        <textarea
          value={campaignDescription}
          onChange={(e) => setCampaignDescription(e.target.value)}
          placeholder={
            currentDeliverable === 'pitch_deck' ? 
              "Tell us about your business, funding goals, key messages, and target audience. Include any specific slides or sections you need." :
            currentDeliverable === 'social_media' ? 
              "Tell us about your campaign goals, target audience, and key messages. (You can also upload reference files or drop links here)" :
            currentDeliverable === 'video_bg' ? 
              "Describe the video content, style, messaging, and any specific requirements for your video assets." :
            currentDeliverable === 'product_mockups' ? 
              "Describe your product, desired mockup style, and how you plan to use these mockups. Include any specific requirements." :
            "Tell us about your campaign goals, target audience, and key messages. (You can also upload reference files or drop links here)"
          }
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