'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type PricingTier = 'Essentials' | 'Elite' | 'Full-Stack';
type PricingData = {
  [key in PricingTier]: {
    title: string;
    price: string;
    features: string[];
    spotsLeft: number;
    indicatorColor: string;
  };
};

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('Essentials');

  // Pricing data for different tiers
  const pricingData: PricingData = {
    'Essentials': {
      title: 'Launch Ready',
      price: '$4,995',
      spotsLeft: 3,
      indicatorColor: 'bg-[#00ff66]',
      features: [
        'Unlimited design requests',
        'Unlimited revisions',
        '1 active task',
        '3 day turnaround',
        'Dedicated design concierge',
        '30-day money back guarantee',
        'Priority to new features',
        'Pause or Cancel anytime'
      ]
    },
    'Elite': {
      title: 'Seed Stage',
      price: '$9,995',
      spotsLeft: 2,
      indicatorColor: 'bg-[#ffee00]',
      features: [
        'Two requests at a time',
        'Avg 48-hour delivery',
        'Motion graphics included',
        'Front-end development',
        'Unlimited brands',
        'DreamGate™ Portal',
        'Unlimited requests',
        'Unlimited revisions',
      ]
    },
    'Full-Stack': {
      title: 'Growth Stage',
      price: '$24,995',
      spotsLeft: 1,
      indicatorColor: 'bg-[#ff3e3e]',
      features: [
        'Everything in Elite',
        'Avg 24–48 hour delivery',
        'Motion graphics',
        'Full-stack development',
        'Videography + photography',
        'Dedicated creative director',
        'Unlimited brands',
        'DreamGate™ Portal',
      ]
    }
  };

  // URLs for each pricing tier
  const tierUrls = {
    'Essentials': 'https://square.link/u/iQZulIHV',
    'Elite': 'https://checkout.square.site/merchant/ML5NF5BNR8C7E/checkout/PDCEFJCGE2SGG4DKYNQYSDKV',
    'Full-Stack': 'https://square.link/u/8cOYVXEs'
  };

  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Modal content */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] rounded-[20px] p-8 border border-[#333]">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col items-start">
              <div className="text-2xl font-medium text-white">{pricingData[selectedTier].title}</div>
              <div className="inline-flex items-center gap-2 mt-3">
                <div className={`w-3 h-3 rounded-full ${pricingData[selectedTier].indicatorColor} animate-pulse border-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.7)]`}></div>
                <div className="text-white text-sm">{pricingData[selectedTier].spotsLeft} spot{pricingData[selectedTier].spotsLeft !== 1 ? 's' : ''} left</div>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-medium text-white">{pricingData[selectedTier].price}</span>
              <span className="text-neutral-400 text-xl font-medium">/month</span>
            </div>
          </div>

          {/* Tier Toggle */}
          <div className="bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] p-1 rounded-full border border-[#393939] mb-8 w-full">
            <div className="flex">
              <button 
                className={`flex-1 h-11 rounded-full transition-all duration-300 ease-in-out text-sm ${
                  selectedTier === 'Essentials' 
                    ? 'bg-gradient-to-b from-[#3B3B3B] via-[#302F32] to-[#1C1C1C] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-white relative after:absolute after:inset-0 after:rounded-full after:border after:border-[#424242] after:pointer-events-none' 
                    : 'text-[#787878] hover:text-white/80'
                }`}
                onClick={() => handleTierSelect('Essentials')}
              >
                Essentials
              </button>
              <button 
                className={`flex-1 h-11 rounded-full transition-all duration-300 ease-in-out text-sm flex items-center justify-center gap-1 group ${
                  selectedTier === 'Elite' 
                    ? 'bg-gradient-to-b from-[#F4CE84] via-[#E2B969] to-[#CEA24C] text-black font-medium relative after:absolute after:inset-0 after:rounded-full after:border after:border-[#D9BB75] after:pointer-events-none' 
                    : 'text-[#787878] hover:text-white/80'
                }`}
                onClick={() => handleTierSelect('Elite')}
              >
                {selectedTier === 'Elite' ? (
                  <Image 
                    src="/icons/flame-icon.svg" 
                    alt="Elite" 
                    width={18}
                    height={18}
                    className="w-4 h-4 brightness-0 transition-all duration-300 z-10"
                  />
                ) : (
                  <Image 
                    src="/icons/flame-icon.svg" 
                    alt="Elite" 
                    width={18}
                    height={18}
                    className="w-4 h-4 opacity-50 transition-all duration-300 group-hover:opacity-80"
                  />
                )}
                Elite
              </button>
              <button 
                className={`flex-1 h-11 rounded-full transition-all duration-300 ease-in-out text-sm ${
                  selectedTier === 'Full-Stack' 
                    ? 'bg-gradient-to-b from-[#3B3B3B] via-[#302F32] to-[#1C1C1C] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-white relative after:absolute after:inset-0 after:rounded-full after:border after:border-[#424242] after:pointer-events-none' 
                    : 'text-[#787878] hover:text-white/80'
                }`}
                onClick={() => handleTierSelect('Full-Stack')}
              >
                Full-Stack
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="space-y-4">
                {pricingData[selectedTier].features.slice(0, Math.ceil(pricingData[selectedTier].features.length / 2)).map((feature, index) => (
                  <div key={`feature-1-${index}`} className="text-white text-base">{feature}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="space-y-4">
                {pricingData[selectedTier].features.slice(Math.ceil(pricingData[selectedTier].features.length / 2)).map((feature, index) => (
                  <div key={`feature-2-${index}`} className="text-white text-base">{feature}</div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            href={tierUrls[selectedTier]} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-14 bg-gradient-to-b from-[#F4CE84] via-[#E2B969] to-[#CEA24C] text-black rounded-full font-medium shadow-md border-2 border-[#D9BB75] flex justify-center items-center transition-all duration-200 hover:scale-105"
          >
            Secure your spot
          </Link>
        </div>
      </div>
    </div>
  );
} 