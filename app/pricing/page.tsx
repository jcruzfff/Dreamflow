'use client';

import React, { useState, useEffect } from 'react';
import { PricingProvider, usePricing } from './context/PricingContext';
import ConfiguratorPanel from './components/ConfiguratorPanel';
import CartPanel from './components/CartPanel';

// Mobile cart icon for floating button
const MobileCartIcon = ({ onClick, itemCount }: { onClick: () => void; itemCount: number }) => (
  <button 
    onClick={onClick} 
    className="fixed bottom-20 right-4 z-20 bg-yellow-500 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center md:hidden"
    aria-label="Open cart"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </button>
);

// Fixed cart footer for mobile
const MobileCartFooter = ({ onClick, total, itemCount }: { onClick: () => void; total: number; itemCount: number }) => {
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-3 z-20 md:hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-400">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span className="font-medium">${total.toFixed(2)}</span>
      </div>
      <button 
        onClick={onClick}
        className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
      >
        Checkout ${total.toFixed(2)}
      </button>
    </div>
  );
};

// Mobile cart slide out
const MobileCart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black  z-30 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Cart Content */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-neutral-900 shadow-xl z-40 transform transition-transform duration-300 md:hidden"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-neutral-800">
            <h2 className="text-xl font-semibold">Your Order</h2>
            <button onClick={onClose} className="p-2" aria-label="Close cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <CartPanel isMobile={true} />
          </div>
        </div>
      </div>
    </>
  );
};

const ResponsivePricingLayout = () => {
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const { cartItems, cartTotal } = usePricing();
  
  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 sm:px-6 pb-20 md:pb-12">
        <div className="max-w-7xl mx-auto pt-12 md:pt-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Build your own package</h1>
          <p className="text-neutral-400 mb-8 w-[60%]">Select as many services as you want. Add them to your cart. Order instantly.</p>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Configurator Panel - now a floating component */}
            <div className="md:w-2/3 bg-neutral-900 rounded-[24px] overflow-hidden border border-neutral-800">
              <ConfiguratorPanel />
            </div>
            
            {/* Cart Panel - now a floating component */}
            <div className="hidden md:block md:w-1/3 bg-neutral-900 rounded-[24px] overflow-hidden border border-neutral-800">
              <CartPanel />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile cart footer */}
      <MobileCartFooter 
        onClick={() => setIsMobileCartOpen(true)} 
        total={cartTotal} 
        itemCount={cartItems.length} 
      />
      
      {/* Mobile cart floating button */}
      <MobileCartIcon 
        onClick={() => setIsMobileCartOpen(true)} 
        itemCount={cartItems.length} 
      />
      
      {/* Mobile cart slide out */}
      <MobileCart 
        isOpen={isMobileCartOpen} 
        onClose={() => setIsMobileCartOpen(false)}
      />
    </>
  );
};

export default function PricingPage() {
  return (
    <PricingProvider>
      <ResponsivePricingLayout />
    </PricingProvider>
  );
}
