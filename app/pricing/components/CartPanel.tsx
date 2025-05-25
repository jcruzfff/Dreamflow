'use client';

import React, { useState } from 'react';
import { usePricing, CartItem } from '../context/PricingContext';
import PricingModal from './PricingModal';

// Essentials plan pricing
const ESSENTIALS_PLAN_PRICE = 4995;

const UpsellBanner = ({ cartTotal, onCompareClick }: { cartTotal: number; onCompareClick: () => void }) => {
  const savingsAmount = cartTotal - ESSENTIALS_PLAN_PRICE;
  const savingsPercentage = Math.round((savingsAmount / cartTotal) * 100);
  
  return (
    <div className="mb-4 p-4 bg-neutral-800 rounded-[20px]">
      <div className="text-lg font-medium mb-1">Save {savingsPercentage}% by Signing up for Essentials</div>
      <p className="text-sm text-neutral-400 mb-2">Save ${savingsAmount.toFixed(0)} and pay only ${ESSENTIALS_PLAN_PRICE.toLocaleString()} with our monthly plan instead</p>
      <button 
        onClick={onCompareClick}
        className="mt-2 py-2 px-4 bg-white text-black font-medium rounded-full transition-colors w-full"
      >
        Check Plans
      </button>
    </div>
  );
};

const EmptyCart = () => (
  <div className="text-center py-8 text-neutral-400">
    <p>Your cart is empty</p>
    <p className="text-sm mt-2">Configure a design and add it to your order</p>
  </div>
);

interface CartPanelProps {
  isMobile?: boolean;
}

export default function CartPanel({ isMobile = false }: CartPanelProps) {
  const { 
    cartItems, 
    cartTotal, 
    removeFromCart, 
    updateCartItem,
    initiateCheckout,
    checkoutStatus,
    checkoutError
  } = usePricing();
  
  const [customerEmail, setCustomerEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  
  // Check if we should show the upsell banner (when cart total >= $4995)
  const shouldShowUpsell = cartTotal >= ESSENTIALS_PLAN_PRICE;

  // Function to handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    // If quantity would be less than 1, remove the item instead
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    // Otherwise update with the new quantity
    updateCartItem(id, { quantity: newQuantity });
  };

  // Function to get dropdown options and pricing for different item types
  const getItemOptions = (item: CartItem) => {
    const itemName = item.name.toLowerCase();
    
    // Social media items should NEVER have dropdown options, regardless of animation
    if (itemName.includes('social media')) {
      return { hasOptions: false, options: [] };
    }
    
    // Mockups should NEVER have dropdown options, regardless of motion
    if (itemName.includes('mockup') || itemName.includes('marketing & content')) {
      return { hasOptions: false, options: [] };
    }
    
    if (itemName.includes('website')) {
      // Get project types from item options to calculate pricing
      const projectTypes = item.options?.projectTypes || ['desktop'];
      const hasBothDesktopAndMobile = Array.isArray(projectTypes) && 
        projectTypes.includes('desktop') && projectTypes.includes('mobile');
      
      return {
        hasOptions: true,
        defaultOption: 'single_page',
        options: [
          { 
            value: 'single_page', 
            label: 'Single page', 
            basePrice: hasBothDesktopAndMobile ? 3000 : 2500 
          },
          { 
            value: 'multi_page_3', 
            label: 'Multi page (3)', 
            basePrice: hasBothDesktopAndMobile ? 4500 : 4000 
          },
          { 
            value: 'multi_page_5', 
            label: 'Multi page (5)', 
            basePrice: hasBothDesktopAndMobile ? 5500 : 5000 
          }
        ]
      };
    }
    
    if (itemName.includes('pitch deck')) {
      return {
        hasOptions: true,
        defaultOption: '10_page',
        options: [
          { value: '10_page', label: '10 page', basePrice: 1200 },
          { value: '20_page', label: '20 page', basePrice: 2000 }
        ]
      };
    }
    
    if (itemName.includes('brand kit')) {
      return {
        hasOptions: true,
        defaultOption: '10_page',
        options: [
          { value: '10_page', label: '10 page', basePrice: 3500 },
          { value: '20_page_with_logo', label: '20 page (includes logo)', basePrice: 5000 }
        ]
      };
    }
    
    if (itemName.includes('video') || itemName.includes('animation')) {
      return {
        hasOptions: true,
        defaultOption: '10_15_secs',
        options: [
          { value: '10_15_secs', label: '10 - 15 secs', basePrice: 2500 },
          { value: '15_30_secs', label: '15 - 30 secs', basePrice: 4000 },
          { value: '30_secs_1min', label: '30 secs - 1min', basePrice: 5000 }
        ]
      };
    }
    
    // All other items should not have dropdown options
    return { hasOptions: false, options: [] };
  };

  // Function to handle option change
  const handleOptionChange = (itemId: string, selectedOption: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;
    
    const itemOptions = getItemOptions(item);
    const option = itemOptions.options?.find(opt => opt.value === selectedOption);
    
    if (option) {
      updateCartItem(itemId, {
        price: option.basePrice,
        options: {
          ...item.options,
          selectedVariant: selectedOption
        }
      });
    }
  };

  // Enhanced cart item component with quantity controls and dropdown options
  const CartItemWithControls = ({ item }: { item: CartItem }) => {
    const itemOptions = getItemOptions(item);
    const currentOption = String(item.options?.selectedVariant || itemOptions.defaultOption || '');
    
    return (
      <div className="mb-4 p-4 border border-[#333333] rounded-[20px]">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{item.name}</h3>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-neutral-400 hover:text-white"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex items-center text-sm mb-3">
              <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
              <span className="text-neutral-400">{item.description}</span>
            </div>
            
            {/* Dropdown for configurable options */}
            {itemOptions.hasOptions && (
              <div className="mb-3">
                <div className="relative">
                  <select 
                    value={currentOption}
                    onChange={(e) => handleOptionChange(item.id, e.target.value)}
                    className="w-full appearance-none p-3 pr-10 bg-neutral-800 border border-[#333333] rounded-lg text-white text-sm focus:outline-none focus:border-[#424242]"
                  >
                    {itemOptions.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-2 flex justify-between items-center">
              <div className="text-xl font-medium">${item.price.toFixed(2)}</div>
              <div className="flex items-center">
                <span className="text-sm text-neutral-400 mr-2">Qty:</span>
                <div className="flex items-center bg-neutral-800 rounded">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-neutral-400 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-8 text-center bg-transparent border-none focus:outline-none"
                    aria-label="Quantity"
                  />
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-neutral-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // For mobile view, we don't need the container div with width and background
  if (isMobile) {
    return (
      <>
        <PricingModal 
          isOpen={showPricingModal} 
          onCloseAction={() => setShowPricingModal(false)} 
        />
        <div className="flex flex-col h-full relative">
          {shouldShowUpsell && <UpsellBanner cartTotal={cartTotal} onCompareClick={() => setShowPricingModal(true)} />}
          
          <div className={`overflow-y-auto mt-6 pb-[120px] ${shouldShowUpsell ? 
            (showEmailInput ? 'h-[360px]' : 'h-[470px]') : 
            (showEmailInput ? 'h-[470px]' : 'h-[588px]')
          }`}>
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="pr-1">
                {cartItems.map((item) => (
                  <CartItemWithControls key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="sticky bottom-0 bg-neutral-900 pt-4 border-t border-neutral-700 z-10">
              <div className="flex justify-between py-4">
                <div className="font-medium">Total</div>
                <div className="text-xl font-bold">${cartTotal.toFixed(2)}</div>
              </div>
              
              {showEmailInput ? (
                <div className="mt-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-3 mb-3 bg-[#1a1a1a] border border-neutral-600 rounded-lg text-white"
                  />
                  <button 
                    onClick={() => initiateCheckout({ email: customerEmail })}
                    disabled={checkoutStatus === 'loading' || !customerEmail}
                    className="w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkoutStatus === 'loading' ? 'Processing...' : `Checkout $${cartTotal.toFixed(2)}`}
                  </button>
                  {checkoutError && <p className="mt-2 text-red-500 text-sm">{checkoutError}</p>}
                </div>
              ) : (
                <button 
                  onClick={() => setShowEmailInput(true)}
                  className="mt-4 w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors"
                >
                  Checkout ${cartTotal.toFixed(2)}
                </button>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  // Desktop view with container
  return (
    <>
      <PricingModal 
        isOpen={showPricingModal} 
        onCloseAction={() => setShowPricingModal(false)} 
      />
      <div className="w-full h-full p-6 bg-neutral-900 flex flex-col relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order list</h2>
          <span className="text-neutral-400">Items: {cartItems.length}</span>
        </div>
        
        {shouldShowUpsell && (() => {
          const savingsAmount = cartTotal - ESSENTIALS_PLAN_PRICE;
          const savingsPercentage = Math.round((savingsAmount / cartTotal) * 100);
          
          return (
            <div className="mb-4 p-4 rounded-[20px] border border-[#424242] bg-gradient-to-b from-[#1d1d1d] to-[#252525]">
              <div className="text-lg font-medium mb-1">Save {savingsPercentage}% with Essentials</div>
              <p className="text-sm text-neutral-400 mb-2">Save ${savingsAmount.toFixed(0)} and pay only ${ESSENTIALS_PLAN_PRICE.toLocaleString()} with our monthly plan instead</p>
              <button 
                onClick={() => setShowPricingModal(true)}
                className="mt-2 py-2 px-4 bg-white text-black font-medium rounded-full transition-colors w-full"
              >
                Compare Plans
              </button>
            </div>
          );
        })()}
        
        <div className={`overflow-y-auto pb-[140px] ${shouldShowUpsell ? 
          (showEmailInput ? 'h-[360px]' : 'h-[470px]') : 
          (showEmailInput ? 'h-[470px]' : 'h-[588px]')
        }`}>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="pr-1">
              {cartItems.map((item) => (
                <CartItemWithControls key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="absolute bottom-6 left-6 right-6 bg-neutral-900 pt-4 border-t border-neutral-700 z-10">
            <div className="flex justify-between py-4">
              <div className="font-medium">Total</div>
              <div className="text-xl font-bold">${cartTotal.toFixed(2)}</div>
            </div>
            
            {showEmailInput ? (
              <div className="mt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-3 mb-3 bg-[#1a1a1a] border border-neutral-600 rounded-lg text-white"
                />
                <button 
                  onClick={() => initiateCheckout({ email: customerEmail })}
                  disabled={checkoutStatus === 'loading' || !customerEmail}
                  className="w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutStatus === 'loading' ? 'Processing...' : `Checkout $${cartTotal.toFixed(2)}`}
                </button>
                {checkoutError && <p className="mt-2 text-red-500 text-sm">{checkoutError}</p>}
              </div>
            ) : (
              <button 
                onClick={() => setShowEmailInput(true)}
                className="mt-4 w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors"
              >
                Checkout ${cartTotal.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
} 