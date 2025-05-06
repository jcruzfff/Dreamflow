'use client';

import React from 'react';
import { usePricing } from '../context/PricingContext';
import WebsiteAppForm from './forms/WebsiteAppForm';
import BrandingForm from './forms/BrandingForm';
import MarketingForm from './forms/MarketingForm';
import DevelopmentForm from './forms/DevelopmentForm';

export default function DynamicForm() {
  const { selectedCategory } = usePricing();

  return (
    <div>
      {selectedCategory === 'website' && <WebsiteAppForm />}
      {selectedCategory === 'branding' && <BrandingForm />}
      {selectedCategory === 'marketing' && <MarketingForm />}
      {selectedCategory === 'development' && <DevelopmentForm />}
    </div>
  );
} 