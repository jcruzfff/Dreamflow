'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define types for our state
export type Category = 'website' | 'branding' | 'marketing' | 'development';

// Define more specific option types based on the forms
export type FormOptionValue = string | string[] | number | boolean;
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
      const newItem = { ...item, id: generateId() };
      setCartItems(prev => [...prev, newItem]);
    };
  }, []);
  
  // Remove item from cart
  const removeFromCart = useMemo(() => {
    return (id: string) => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    };
  }, []);
  
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
    updateCartItem
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