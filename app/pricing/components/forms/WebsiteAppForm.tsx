'use client';

import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';
import { HexColorPicker } from 'react-colorful';

export default function WebsiteAppForm() {
  const { updateCurrentConfig, addToCart } = usePricing();
  
  // Update state to use arrays for multi-selection with proper defaults
  const [projectTypes, setProjectTypes] = useState<string[]>(['desktop']);
  const [themeStyles, setThemeStyles] = useState<string[]>(['light']);
  const [accentColor, setAccentColor] = useState('#8065FA'); // Purple
  const [style, setStyle] = useState('flat'); // Flat/Solid style
  const [textStyle, setTextStyle] = useState('sans');
  const [projectMessage, setProjectMessage] = useState('');
  
  // New state for color picker modal
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState('#8065FA');
  
  // Predefined colors for "Choose for me" functionality
  const randomColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ];
  
  // Function to choose random color
  const chooseRandomColor = () => {
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    setTempColor(randomColor);
  };
  
  // Function to open color picker
  const openColorPicker = () => {
    setTempColor(accentColor);
    setShowColorPicker(true);
  };
  
  // Function to confirm color selection
  const confirmColorSelection = () => {
    setAccentColor(tempColor);
    setShowColorPicker(false);
  };
  
  // Function to cancel color selection
  const cancelColorSelection = () => {
    setShowColorPicker(false);
  };
  
  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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
  
  // Handle project type toggle
  const handleProjectTypeToggle = (type: string) => {
    toggleSelection(type, projectTypes, setProjectTypes);
  };
  
  // Handle theme style toggle
  const handleThemeStyleToggle = (style: string) => {
    toggleSelection(style, themeStyles, setThemeStyles);
  };
  
  // Update context when form changes
  React.useEffect(() => {
    updateCurrentConfig({
      projectTypes,
      themeStyles,
      designScope: [], // Pass empty array since we're not using designScope
      style,
      accentColor,
      textStyle,
      projectMessage
    });
  }, [
    projectTypes, themeStyles,
    accentColor, style, textStyle, projectMessage, updateCurrentConfig
  ]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Basic validation
    if (projectTypes.length === 0) {
      alert('Please select at least one project type');
      return;
    }
    
    if (themeStyles.length === 0) {
      alert('Please select at least one theme style');
      return;
    }
    
    // Calculate price based on selections
    let basePrice = 0;
    
    // Base price for project types
    if (projectTypes.includes('desktop')) basePrice += 450;
    if (projectTypes.includes('mobile')) basePrice += 350;
    
    // Additional costs based on theme complexity
    if (themeStyles.includes('glass')) basePrice += 200;
    if (themeStyles.includes('dark') && themeStyles.includes('light')) basePrice += 150;
    
    // Format project types for display
    const typeLabels: { [key: string]: string } = {
      desktop: 'Desktop',
      mobile: 'Mobile'
    };
    
    // Format theme styles for display
    const styleLabels: { [key: string]: string } = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      glass: 'Glass Effect'
    };
    
    // Create detailed product name and description
    const selectedTypes = projectTypes.map(type => typeLabels[type]).join(' & ');
    const selectedStyles = themeStyles.map(style => styleLabels[style]).join(' & ');
    const productName = `Website Design - ${selectedTypes}`;
    
    // Add to cart with detailed information for Square
    addToCart({
      category: 'website',
      name: productName,
      description: `${selectedTypes} website with ${selectedStyles} theme${projectMessage ? '. Notes: ' + projectMessage : ''}`,
      price: basePrice,
      options: {
        projectTypes,
        themeStyles,
        designScope: [],
        style,
        accentColor,
        textStyle,
        projectMessage,
        selectedVariant: projectTypes.includes('desktop') ? 'single_page' : undefined
      },
      quantity: 1
    });
  };
  
  return (
    <div className="space-y-8 font-['Helvetica_Neue']">
      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-[#1a1a1a] rounded-[20px] p-6 w-[400px] max-w-[90vw]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium">Choose Color</h3>
              <button 
                onClick={cancelColorSelection}
                className="text-neutral-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Color preview area with gradient background */}
            <div 
              className="w-full h-16 rounded-[15px] mb-6 border border-[#333]"
              style={{ 
                background: `linear-gradient(135deg, ${tempColor}40 0%, ${tempColor} 100%)`
              }}
            />
            
            {/* Color Picker */}
            <div className="mb-6">
              <HexColorPicker 
                color={tempColor} 
                onChange={setTempColor}
                style={{ width: '100%', height: '200px' }}
              />
            </div>
            
            {/* Opacity/Alpha slider placeholder */}
            <div className="mb-6">
              <div className="w-full h-6 rounded-full bg-gradient-to-r from-transparent to-white opacity-50 border border-[#333]" />
            </div>
            
            {/* RGB Values */}
            <div className="mb-6">
              <div className="flex items-center justify-between bg-[#2a2a2a] rounded-[15px] p-4">
                <span className="text-neutral-400 text-sm">RGB</span>
                <div className="flex gap-2 text-white">
                  {(() => {
                    const rgb = hexToRgb(tempColor);
                    return rgb ? (
                      <>
                        <span className="bg-[#424242] px-2 py-1 rounded text-sm">{rgb.r}</span>
                        <span className="bg-[#424242] px-2 py-1 rounded text-sm">{rgb.g}</span>
                        <span className="bg-[#424242] px-2 py-1 rounded text-sm">{rgb.b}</span>
                        <span className="bg-[#424242] px-2 py-1 rounded text-sm">100%</span>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
            
            {/* Choose for me button */}
            <button
              onClick={chooseRandomColor}
              className="w-full py-3 mb-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Choose for me
            </button>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={cancelColorSelection}
                className="flex-1 py-3 border border-[#333] text-white rounded-full hover:bg-[#2a2a2a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmColorSelection}
                className="flex-1 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Type Section */}
        <div>
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Project Type: {
              projectTypes.length === 1 && projectTypes.includes('desktop') ? 'Desktop' :
              projectTypes.length === 1 && projectTypes.includes('mobile') ? 'Mobile' :
              projectTypes.length === 2 ? 'Desktop & Mobile' : 'Select Type'
            }
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className={`p-4 h-[120px] rounded-[20px] ${
                projectTypes.includes('desktop')
                ? 'border-2 border-[#303030]'
                : 'hover:bg-[#1a1a1a]'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => handleProjectTypeToggle('desktop')}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 mb-3 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 2h6a1 1 0 011 1v5H8V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm">Desktop</span>
              </div>
            </button>
            
            <button
              className={`p-4 h-[120px] rounded-[20px] ${
                projectTypes.includes('mobile')
                ? 'border-2 border-[#303030]'
                : 'hover:bg-[#1a1a1a]'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => handleProjectTypeToggle('mobile')}
            >
              <div className="flex flex-col items-center justify-center pt-3">
                <div className="w-8 h-8 mb-3 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-sm">Mobile</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Theme Style Section */}
        <div>
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Theme Style: {
              themeStyles.length === 1 && themeStyles.includes('light') ? 'Light Mode' :
              themeStyles.length === 1 && themeStyles.includes('dark') ? 'Dark Mode' :
              themeStyles.length === 1 && themeStyles.includes('glass') ? 'Glass Mode' :
              themeStyles.length === 2 && themeStyles.includes('light') && themeStyles.includes('dark') ? 'Light & Dark Mode' :
              themeStyles.length === 2 && themeStyles.includes('light') && themeStyles.includes('glass') ? 'Light & Glass Mode' :
              themeStyles.length === 2 && themeStyles.includes('dark') && themeStyles.includes('glass') ? 'Dark & Glass Mode' :
              themeStyles.length === 3 ? 'Light, Dark & Glass Mode' : 'Select Mode'
            }
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              className={`p-4 h-[120px] rounded-[20px] ${
                themeStyles.includes('light')
                ? 'border-2 border-[#303030]'
                : 'hover:bg-[#1a1a1a]'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => handleThemeStyleToggle('light')}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 mb-2 bg-white rounded-lg border border-neutral-300 overflow-hidden">
                  <div className="h-3" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex flex-col items-center mt-2">
                    <div className="h-1.5 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-1.5 w-6 bg-gray-200 rounded-full mt-1"></div>
                  </div>
                </div>
                <span className={themeStyles.includes('light') ? 'text-white text-sm' : 'text-[#86868B] text-sm'}>Light</span>
              </div>
            </button>
            
            <button
              className={`p-4 h-[120px] rounded-[20px] ${
                themeStyles.includes('dark')
                ? 'border-2 border-[#303030]'
                : 'hover:bg-[#1a1a1a]'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => handleThemeStyleToggle('dark')}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 mb-2 bg-black rounded-lg border border-neutral-700 overflow-hidden">
                  <div className="h-3" style={{ backgroundColor: accentColor }}></div>
                  <div className="flex flex-col items-center mt-2">
                    <div className="h-1.5 w-8 bg-neutral-800 rounded-full"></div>
                    <div className="h-1.5 w-6 bg-neutral-800 rounded-full mt-1"></div>
                  </div>
                </div>
                <span className={themeStyles.includes('dark') ? 'text-white text-sm' : 'text-[#86868B] text-sm'}>Dark</span>
              </div>
            </button>
            
            <button
              className={`p-4 h-[120px] rounded-[20px] ${
                themeStyles.includes('glass')
                ? 'border-2 border-[#303030]'
                : 'hover:bg-[#1a1a1a]'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => handleThemeStyleToggle('glass')}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 mb-2 bg-[#1C1C1E] rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 backdrop-filter backdrop-blur-sm opacity-50"></div>
                  <div className="absolute top-0 left-0 right-0 h-3" style={{ backgroundColor: accentColor, opacity: 0.7 }}></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 h-1.5 w-8 bg-white/50 rounded-full"></div>
                  <div className="absolute top-9 left-1/2 transform -translate-x-1/2 h-1.5 w-6 bg-white/50 rounded-full"></div>
                </div>
                <span className={themeStyles.includes('glass') ? 'text-white text-sm' : 'text-[#86868B] text-sm'}>Glass</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Options Row with Accent Color, Style, and Text Style */}
      <div className="flex flex-wrap items-start justify-between mb-8">
        {/* Accent Color Section */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Primary Color Selected: {
              accentColor === '#8065FA' ? 'Purple' :
              accentColor === '#14A5ED' ? 'Blue' :
              accentColor === '#04DEB5' ? 'Green' :
              accentColor === '#FEA37F' ? 'Orange' :
              accentColor === '#F53A66' ? 'Red' :
              !['#8065FA', '#14A5ED', '#04DEB5', '#FEA37F', '#F53A66'].includes(accentColor) ? 'Custom' :
              accentColor
            }
          </h3>
          <div className="flex items-center gap-4 cursor-pointer">
            {['#8065FA', '#14A5ED', '#04DEB5', '#FEA37F', '#F53A66'].map((color) => (
              <button
                key={color}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={() => setAccentColor(color)}
              >
                <div 
                  className={`w-[42px] h-[42px] rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: color }}
                >
                  {accentColor === color && (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                {accentColor === color && (
                  <div className="h-[3px] w-6 bg-white mt-3"></div>
                )}
              </button>
            ))}
            
            {/* Color wheel */}
            <button
              className="relative flex flex-col items-center cursor-pointer"
              onClick={openColorPicker}
            >
              <div 
                className={`w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center relative`}
              >
                {/* Show custom color if selected, otherwise show gradient wheel */}
                {!['#8065FA', '#14A5ED', '#04DEB5', '#FEA37F', '#F53A66'].includes(accentColor) ? (
                  <div 
                    className="w-full h-full rounded-full border-2 border-gray-600" 
                    style={{ backgroundColor: accentColor }}
                  />
                ) : (
                  <div 
                    className="w-full h-full absolute rounded-full" 
                    style={{ background: 'conic-gradient(from 90deg at 50% 50%, #1ADBBB 0deg, #14A5ED 58.434176445007324deg, #7F64FB 145.57132601737976deg, #FFAF84 226.89932584762573deg, #FF766C 290.7999086380005deg, #F33265 360deg)' }}
                  />
                )}
                {!['#8065FA', '#14A5ED', '#04DEB5', '#FEA37F', '#F53A66'].includes(accentColor) && (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-800 z-10 absolute"></div>
                )}
              </div>
              {!['#8065FA', '#14A5ED', '#04DEB5', '#FEA37F', '#F53A66'].includes(accentColor) && (
                <div className="h-[3px] w-6 bg-white mt-3"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Style Section */}
        <div className="w-full sm:w-auto mb-6 sm:mb-0 sm:ml-auto sm:mr-0">
          <h3 className="text-neutral-400 text-sm font-medium mb-4 whitespace-nowrap">
            <div className="w-[200px] text-left">Style Selected: {style === 'gradient' ? 'Gradient' : 'Solid'}</div>
          </h3>
          <div className="flex gap-4 cursor-pointer">
            {/* Solid/Flat Button (Now First) */}
            <button
              className={`rounded-[8px] overflow-hidden ${
                style === 'flat'
                ? 'border-2 border-[#303030]'
                : ''
              }`}
              onClick={() => setStyle('flat')}
              style={{ width: '62px', height: '54px' }}
            >
              <div className="w-full h-full relative rounded-[6px] overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1/2" style={{ backgroundColor: accentColor }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-transparent"></div>
              </div>
            </button>
            
            {/* Gradient Button (Now Second) */}
            <button
              className={`rounded-[8px] overflow-hidden ${
                style === 'gradient'
                ? 'border-2 border-[#303030]'
                : ''
              }`}
              onClick={() => setStyle('gradient')}
              style={{ width: '62px', height: '54px' }}
            >
              <div className="w-full h-full rounded-[6px] overflow-hidden cursor-pointer" 
                style={{ background: `linear-gradient(180deg, ${accentColor} 0%, rgba(60, 90, 228, 0.00) 54.81%)` }}>
              </div>
            </button>
            
            {/* Indicator for selected style */}
            {style === 'flat' && (
              <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-1 left-[30px]"></div>
            )}
            {style === 'gradient' && (
              <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-1 left-[110px]"></div>
            )}
          </div>
        </div>
        
        {/* Text Style Section */}
        <div className="w-full sm:w-auto">
          <h3 className="text-neutral-400 text-sm font-medium mb-4">
            Text Style: {textStyle === 'sans' ? 'Sans' : 'Serif'}
          </h3>
          <div className="flex gap-4">
            <button
              className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer ${
                textStyle === 'sans' ? 'border-2 border-[#303030]' : ''
              }`}
              style={{ minWidth: '80px' }}
              onClick={() => setTextStyle('sans')}
            >
              <span className="font-['Helvetica_Neue']">Sans</span>
              {textStyle === 'sans' && (
                <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              )}
            </button>
            
            <button
              className={`relative py-2 px-4 rounded-full bg-[#202020] text-white flex items-center justify-center cursor-pointer ${
                textStyle === 'serif' ? 'border-2 border-[#303030]' : ''
              }`}
              style={{ minWidth: '80px' }}
              onClick={() => setTextStyle('serif')}
            >
              <span className="font-serif">Serif</span>
              {textStyle === 'serif' && (
                <div className="h-[3px] w-6 bg-white mt-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Project Message */}
      <div>
        <h3 className="text-neutral-400 text-sm font-medium mb-4">Describe your vision or link a reference.</h3>
        <textarea
          value={projectMessage}
          onChange={(e) => setProjectMessage(e.target.value)}
          placeholder={`Example: "Crypto dashboard in the style of Linear with neon gradients."`}
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