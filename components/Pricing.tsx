"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

type PricingTier = 'Essentials' | 'Elite' | 'Full-Stack';
type PricingData = {
  [key in PricingTier]: string;
};

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('Essentials');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  
  // Pricing data for different tiers
  const pricingData: PricingData = {
    'Essentials': '$4,995',
    'Elite': '$9,995',
    'Full-Stack': '$14,995'
  };
  
  // Handle tier selection
  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
  };
  
  // Animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate pricing card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.3,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate info cards with stagger
    const infoCards = infoCardsRef.current?.querySelectorAll('.pricing-info-card');
    if (infoCards && infoCards.length > 0) {
      gsap.fromTo(
        infoCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: infoCardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-7xl text-gradient font-medium text-center mb-10 md:mb-16 leading-none tracking-tight"
        >
          One Membership.<br/> Infinite Possibilities.
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* World Map and Trusted By */}
          <div className="relative rounded-3xl overflow-hidden">
            <Image 
              src="/images/pricing-world.png" 
              alt="World map" 
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
              
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 leading-none">
                Join<br />Dreamflow
              </h3>
              <p className="text-white text-base mb-4">
                Trusted by Top Web3 & AI Startups.
              </p>
              <div>
                <Image 
                  src="/images/avatargroup.png" 
                  alt="Client avatars" 
                  width={160}
                  height={48}
                  className="h-12"
                />
              </div>
            </div>
          </div>
          
          {/* Pricing Card */}
          <div 
            ref={cardRef}
            className="bg-card-gradient rounded-3xl overflow-hidden shadow-card"
          >
            <div className="p-10">
              {/* Card Header */}
              <div className="flex flex-col gap-6 mb-6">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-medium text-white">Members Club</div>
                  <div className="inline-flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-white text-xs">Available now</div>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-medium text-white">{pricingData[selectedTier]}</span>
                  <span className="text-dreamflow-gray-light text-2xl font-medium">/month</span>
                </div>
              </div>
              
              {/* Tier Toggle */}
              <div className="bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] p-1 rounded-full border border-[#393939] mb-9">
                <div className="flex">
                  <button 
                    className={`flex-1 h-11 rounded-full transition-all text-sm ${
                      selectedTier === 'Essentials' 
                        ? 'bg-toggle-gradient shadow-lg border border-[#424242] text-white' 
                        : 'text-[#787878]'
                    }`}
                    onClick={() => handleTierSelect('Essentials')}
                  >
                    Essentials
                  </button>
                  <button 
                    className={`flex-1 h-11 rounded-full transition-all text-sm flex items-center justify-center gap-1 ${
                      selectedTier === 'Elite' 
                        ? 'bg-gold-gradient shadow-lg border-2 border-dreamflow-gold text-black font-medium' 
                        : 'text-[#787878]'
                    }`}
                    onClick={() => handleTierSelect('Elite')}
                  >
                    {selectedTier === 'Elite' && (
                      <Image 
                        src="/images/flame-icon.svg" 
                        alt="Elite" 
                        width={18}
                        height={18}
                        className={`w-4.5 h-4.5 ${selectedTier === 'Elite' ? 'brightness-0' : ''}`}
                      />
                    )}
                    Elite
                  </button>
                  <button 
                    className={`flex-1 h-11 rounded-full transition-all text-sm ${
                      selectedTier === 'Full-Stack' 
                        ? 'bg-toggle-gradient shadow-lg border border-[#424242] text-white' 
                        : 'text-[#787878]'
                    }`}
                    onClick={() => handleTierSelect('Full-Stack')}
                  >
                    Full-Stack
                  </button>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-20 mb-10">
                <div>
                  <div className="space-y-5">
                    <div className="text-white text-lg">Unlimited design requests</div>
                    <div className="text-white text-lg">1 active task</div>
                    <div className="text-white text-lg">Dedicated design concierge</div>
                    <div className="text-white text-lg">Priority to new features</div>
                  </div>
                </div>
                <div>
                  <div className="space-y-5">
                    <div className="text-white text-lg">Unlimited revisions</div>
                    <div className="text-white text-lg">3 day turnaround</div>
                    <div className="text-white text-lg">30-day money back guarantee</div>
                    <div className="text-white text-lg">Pause or Cancel anytime</div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="w-64 h-14 bg-gold-gradient text-black rounded-[60px] font-medium shadow-md border-2 border-dreamflow-gold text-lg">
                Secure your spot
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Info Cards */}
        <div ref={infoCardsRef} className="grid md:grid-cols-2 gap-8">
          <div className="pricing-info-card p-8 rounded-2xl border border-dashed border-[#1B1B1B] bg-[#080808]">
            <h3 className="text-xl font-medium text-white mb-2.5">Pause anytime</h3>
            <p className="text-dreamflow-text-secondary text-sm">Temporarily pause your subscription anytime.</p>
          </div>
          
          <div className="pricing-info-card p-8 rounded-2xl border border-dashed border-[#1B1B1B] bg-[#080808]">
            <h3 className="text-xl font-medium text-white mb-2.5">Try it for a week</h3>
            <p className="text-dreamflow-text-secondary text-sm">Not loving it after a week? Get 75% back, no questions asked.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 