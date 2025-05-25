'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import toast from 'react-hot-toast';

// Define types for our state
export type Category = 'website' | 'branding' | 'marketing';

// Define more specific option types based on the forms
export type FormOptionValue = string | string[] | number | boolean | undefined;
export type ConfigOptions = Record<string, FormOptionValue>;

export type CartItem = {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  options: ConfigOptions;
  quantity: number;
};

export type CheckoutStatus = 'idle' | 'loading' | 'success' | 'error';

type PricingContextType = {
  // Selected category for the configurator
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  
  // Current form configuration (before adding to cart)
  currentConfig: ConfigOptions;
  updateCurrentConfig: (updates: ConfigOptions) => void;
  resetCurrentConfig: () => void;
  
  // Cart items
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  
  // Calculated totals
  cartTotal: number;
  
  // Checkout functionality
  checkoutStatus: CheckoutStatus;
  checkoutError: string | null;
  checkoutUrl: string | null;
  initiateCheckout: (customerInfo?: {
    email?: string;
    phone?: string;
    name?: string;
  }) => Promise<void>;
  resetCheckout: () => void;
};

// Default/initial values
const defaultContext: PricingContextType = {
  selectedCategory: 'website',
  setSelectedCategory: () => {},
  currentConfig: {},
  updateCurrentConfig: () => {},
  resetCurrentConfig: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
  cartTotal: 0,
  checkoutStatus: 'idle',
  checkoutError: null,
  checkoutUrl: null,
  initiateCheckout: async () => {},
  resetCheckout: () => {},
};

// Create the context
const PricingContext = createContext<PricingContextType>(defaultContext);

// Create a provider component
export function PricingProvider({ children }: { children: ReactNode }) {
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<Category>('website');
  
  // State for current form configuration
  const [currentConfig, setCurrentConfig] = useState<ConfigOptions>({});
  
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // State for checkout
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('idle');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  
  // Helper to generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  // Update current configuration
  const updateCurrentConfig = useMemo(() => {
    return (updates: ConfigOptions) => {
      setCurrentConfig(prev => ({ ...prev, ...updates }));
    };
  }, []);
  
  // Reset current configuration
  const resetCurrentConfig = useMemo(() => {
    return () => {
      setCurrentConfig({});
    };
  }, []);
  
  // Add item to cart
  const addToCart = useMemo(() => {
    return (item: Omit<CartItem, 'id'>) => {
      // Check if this item already exists in the cart by comparing relevant properties
      const existingItemIndex = cartItems.findIndex(cartItem => 
        cartItem.category === item.category &&
        cartItem.name === item.name &&
        cartItem.description === item.description &&
        JSON.stringify(cartItem.options) === JSON.stringify(item.options)
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity
        setCartItems(prev => 
          prev.map((cartItem, index) => 
            index === existingItemIndex 
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity } 
              : cartItem
          )
        );
        // Show toast for updated item
        toast.success(`${item.name} quantity updated in cart!`);
      } else {
        // New item, add to cart
        const newItem = { ...item, id: generateId() };
        setCartItems(prev => [...prev, newItem]);
        // Show toast for new item
        toast.success(`${item.name} added to cart!`);
      }
    };
  }, [cartItems]);
  
  // Remove item from cart
  const removeFromCart = useMemo(() => {
    return (id: string) => {
      // Get the item name before removing it
      const itemToRemove = cartItems.find(item => item.id === id);
      setCartItems(prev => prev.filter(item => item.id !== id));
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`);
      }
    };
  }, [cartItems]);
  
  // Update cart item
  const updateCartItem = useMemo(() => {
    return (id: string, updates: Partial<CartItem>) => {
      setCartItems(prev => 
        prev.map(item => item.id === id ? { ...item, ...updates } : item)
      );
    };
  }, []);
  
  // Calculate cart total - using useMemo to prevent recalculation on every render
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  }, [cartItems]);
  
  // Initiate checkout with Square
  const initiateCheckout = useMemo(() => {
    return async (customerInfo?: { email?: string; phone?: string; name?: string }) => {
      try {
        setCheckoutStatus('loading');
        setCheckoutError(null);
        
        const response = await fetch('/api/square/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems,
            customerInfo,
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }
        
        if (data.checkoutUrl) {
          setCheckoutUrl(data.checkoutUrl);
          setCheckoutStatus('success');
          
          // Redirect to Square checkout
          window.location.href = data.checkoutUrl;
        } else {
          throw new Error('No checkout URL returned');
        }
      } catch (error) {
        console.error('Error initiating checkout:', error);
        setCheckoutStatus('error');
        setCheckoutError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };
  }, [cartItems]);
  
  // Reset checkout state
  const resetCheckout = useMemo(() => {
    return () => {
      setCheckoutStatus('idle');
      setCheckoutError(null);
      setCheckoutUrl(null);
    };
  }, []);
  
  // Create the context value object - using useMemo to prevent unnecessary rerenders
  const value = useMemo(() => {
    return {
      selectedCategory,
      setSelectedCategory,
      currentConfig,
      updateCurrentConfig,
      resetCurrentConfig,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItem,
      cartTotal,
      checkoutStatus,
      checkoutError,
      checkoutUrl,
      initiateCheckout,
      resetCheckout,
    };
  }, [
    selectedCategory, 
    currentConfig, 
    cartItems, 
    cartTotal,
    updateCurrentConfig,
    resetCurrentConfig,
    addToCart,
    removeFromCart,
    updateCartItem,
    checkoutStatus,
    checkoutError,
    checkoutUrl,
    initiateCheckout,
    resetCheckout
  ]);
  
  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}

// Custom hook for using the context
export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
} 