'use client';

import React from 'react';
import { usePricing } from '../context/PricingContext';
import WebsiteAppForm from './forms/WebsiteAppForm';
import BrandingForm from './forms/BrandingForm';
import MarketingForm from './forms/MarketingForm';

export default function DynamicForm() {
  const { selectedCategory } = usePricing();

  return (
    <div>
      {selectedCategory === 'website' && <WebsiteAppForm />}
      {selectedCategory === 'branding' && <BrandingForm />}
      {selectedCategory === 'marketing' && <MarketingForm />}
     
    </div>
  );
} 