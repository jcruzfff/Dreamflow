'use client';

import React from 'react';
import { usePricing, CartItem } from '../context/PricingContext';

const UpsellBanner = () => (
  <div className="mb-4 p-4 bg-neutral-800 rounded-[20px]">
    <div className="text-lg font-medium mb-1">Save 45% by Signing up for Essentials</div>
    <button className="mt-2 py-2 px-4 bg-white text-black font-medium rounded-full transition-colors w-full">
      Check Plans
    </button>
  </div>
);

const CartItemComponent = ({ item, onRemove }: { item: CartItem; onRemove: () => void }) => (
  <div className="flex items-start p-4 mb-4 bg-neutral-800 rounded-[20px]">
    <div className="flex-1">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-sm text-neutral-400">{item.description}</p>
        </div>
        <div className="text-right">
          <div className="font-medium">${item.price.toFixed(2)}</div>
          <div className="text-sm">Qty: {item.quantity}</div>
        </div>
      </div>
    </div>
    <button 
      onClick={onRemove}
      className="ml-4 p-2 text-neutral-400 hover:text-neutral-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </button>
  </div>
);

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
  const { cartItems, cartTotal, removeFromCart } = usePricing();

  // For mobile view, we don't need the container div with width and background
  if (isMobile) {
    return (
      <>
        <UpsellBanner />
        
        <div className="mt-6">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItemComponent 
                  key={item.id} 
                  item={item} 
                  onRemove={() => removeFromCart(item.id)} 
                />
              ))}
            </>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between py-4 border-t border-neutral-700">
              <div className="font-medium">Total</div>
              <div className="font-medium">${cartTotal.toFixed(2)}</div>
            </div>
            
            <button className="mt-4 w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors">
              Checkout ${cartTotal.toFixed(2)}
            </button>
          </div>
        )}
      </>
    );
  }

  // Desktop view with container
  return (
    <div className="w-full p-6 bg-neutral-900">
      <h2 className="text-xl font-semibold mb-4">Order list</h2>
      
      <div className="mb-4 p-4 rounded-[20px] border border-[#424242] bg-gradient-to-b from-[#1d1d1d] to-[#252525]">
        <div className="text-lg font-medium mb-1">Save 45% with Essentials</div>
        <p className="text-sm text-neutral-400 mb-2"> If you need more than one design each month, our monthly plan might be a better fit.</p>
        <button className="mt-2 py-2 px-4 bg-white text-black font-medium rounded-full transition-colors w-full">
          Compare Plans
        </button>
      </div>
      
      <div className="mt-6">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4 p-4 border border-[#333333] rounded-[20px]">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-neutral-800 rounded-[20px] mr-4 flex-shrink-0"></div>
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
                    <div className="flex items-center text-sm">
                      <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                      <span className="text-neutral-400">{item.description}</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xl font-medium">${item.price.toFixed(2)}</div>
                      <div className="flex items-center">
                        <span className="text-sm text-neutral-400 mr-2">Qty:</span>
                        <span className="bg-neutral-800 px-2 py-1 rounded">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between py-4 border-t border-neutral-700">
            <div className="font-medium">Total</div>
            <div className="text-xl font-bold">${cartTotal.toFixed(2)}</div>
          </div>
          
          <button className="mt-4 w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-colors">
            Checkout ${cartTotal.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
} 