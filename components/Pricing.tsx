"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('Essentials');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  
  // Pricing data for different tiers
  const pricingData: PricingData = {
    'Essentials': {
      title: 'Early Stage',
      price: '$4,995',
      spotsLeft: 3,
      indicatorColor: 'bg-[#00ff66]',
      features: [
        '1 active task',
        'Unlimited design requests',
        'Unlimited revisions',
        '3-day turnaround',
        'Basic AI automation',
        'DreamGate™ task portal',
        '30-day money-back guarantee',
        'Pause or cancel anytime'
      ]
    },
    'Elite': {
      title: 'Scaling Startups',
      price: '$9,995',
      spotsLeft: 2,
      indicatorColor: 'bg-[#ffee00]',
      features: [
        '2 active tasks',
        'Everything in Essentials',
        'Front-end development',
        '4-day turnaround',
        'Advanced AI automation',
        'Monthly strategy sessions',
        '30-day money-back guarantee',
        'Pause or cancel anytime'
      ]
    },
    'Full-Stack': {
      title: 'High Growth',
      price: '$24,995',
      spotsLeft: 1,
      indicatorColor: 'bg-[#ff3e3e]',
      features: [
        '2 active tasks',
        'Everything in Elite',
        'Full-stack development',
        'Priority turnaround',
        'Custom AI systems',
        'Dedicated product team',
        '30-day money-back guarantee',
        'Pause or cancel anytime'
      ]
    }
  };
  
  // URLs for each pricing tier
  const tierUrls = {
    'Essentials': 'https://square.link/u/gP3dHzCx',
    'Elite': '',
    'Full-Stack': ''
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
        ease: "power3.out",
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
        ease: "power2.out",
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
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoCardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-20 md:py-24 pt-0 md:pt-0 lg:py-36 px-4 md:px-8 lg:px-12 bg-black min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          style={{
            background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontFamily: "Helvetica Neue"
          }}
          className="text-[34px] md:text-5xl lg:text-7xl text-gradient font-medium text-center mb-10 md:mb-16 leading-[110%] tracking-[-2%]"
        >
          One Membership.<br/> Infinite Possibilities.
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 mb-3 lg:mb-8">
          {/* Pricing Card - 7/12 width on large screens, appears first on mobile */}
          <div 
            ref={cardRef}
            className="lg:col-span-7 order-1 lg:order-2 bg-card-gradient rounded-3xl overflow-hidden shadow-card h-auto md:h-[589px]"
          >
            <div className="p-6 sm:p-8 md:p-10 lg:p-[42px] h-full flex flex-col relative">
              {/* Yellow glow effect behind button */}
              <div className="absolute left-[-54px] bottom-[-54px]  w-[150px] h-[150px] bg-[#EEC87C] opacity-30 blur-[44px] rounded-full"></div>
              
              {/* SVG curved border at bottom-left corner */}
              <div className="absolute bottom-0 left-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 0C0 3.18 0.62 6.33 1.83 9.27C3.03 12.22 4.78 14.89 7.03 17.14C9.28 19.39 11.95 21.14 14.9 22.34C17.84 23.55 20.99 24.17 24.17 24.17" stroke="#E7C37B" strokeWidth="4.25"/>
                </svg>
              </div>
              
              {/* L-shaped gradient border highlight */}
              <div className="absolute bottom-0 left-[24px] w-[156px] h-[2px] bg-gradient-to-r from-[#EEC87C] to-transparent"></div>
              <div className="absolute bottom-[24px] left-0 h-[108px] w-[2px] bg-gradient-to-t from-[#EEC87C] to-transparent"></div>
              
              {/* Card Header */}
              <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="flex flex-col items-start">
                  <div className="text-xl md:text-2xl lg:text-[24px] font-medium text-white">{pricingData[selectedTier].title}</div>
                  <div className="inline-flex items-center gap-2 mt-3 md:mt-3">
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 lg:w-[12px] lg:h-[12px] rounded-full ${pricingData[selectedTier].indicatorColor} animate-pulse border-2 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.7)]`}></div>
                    <div className="text-white text-xs lg:text-[12px]">{pricingData[selectedTier].spotsLeft} spot{pricingData[selectedTier].spotsLeft !== 1 ? 's' : ''} left</div>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl lg:text-[52px] font-medium text-white">{pricingData[selectedTier].price}</span>
                  <span className="text-dreamflow-gray-light text-xl md:text-2xl lg:text-[22px] font-medium">/month</span>
                </div>
              </div>
              
              {/* Tier Toggle */}
              <div className="bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] p-1 rounded-full border border-[#393939] mb-6 md:mb-9 w-full lg:w-[453px] cursor-pointer">
                <div className="flex">
                  <button 
                    className={`flex-1 h-9 md:h-11 lg:h-[44px] rounded-full transition-all duration-300 ease-in-out text-xs md:text-sm lg:text-[14px] cursor-pointer ${
                      selectedTier === 'Essentials' 
                        ? 'bg-gradient-to-b from-[#3B3B3B] via-[#302F32] to-[#1C1C1C] md:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-white relative after:absolute after:inset-0 after:rounded-full after:border after:border-[#424242] after:pointer-events-none' 
                        : 'text-[#787878] hover:text-white/80'
                    }`}
                    onClick={() => handleTierSelect('Essentials')}
                  >
                    Essentials
                  </button>
                  <button 
                    className={`flex-1 h-9 md:h-11 lg:h-[44px] rounded-full transition-all duration-300 ease-in-out text-xs md:text-sm lg:text-[14px] flex items-center justify-center cursor-pointer gap-1 group ${
                      selectedTier === 'Elite' 
                        ? 'bg-gold-gradient md:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-black font-medium relative after:absolute after:inset-0 after:rounded-full after:border after:border-dreamflow-gold after:pointer-events-none' 
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
                        className="w-4 h-4 md:w-[18px] md:h-[18px] brightness-0 transition-all duration-300 z-10"
                      />
                    ) : (
                      <Image 
                        src="/icons/flame-icon.svg" 
                        alt="Elite" 
                        width={18}
                        height={18}
                        className="w-4 h-4 md:w-[18px] md:h-[18px] opacity-50 transition-all duration-300 group-hover:opacity-80"
                      />
                    )}
                    Elite
                  </button>
                  <button 
                    className={`flex-1 h-9 md:h-11 lg:h-[44px] rounded-full transition-all duration-300 ease-in-out text-xs md:text-sm cursor-pointer lg:text-[14px] ${
                      selectedTier === 'Full-Stack' 
                        ? 'bg-gradient-to-b from-[#3B3B3B] via-[#302F32] to-[#1C1C1C] md:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-white relative after:absolute after:inset-0 after:rounded-full after:border after:border-[#424242] after:pointer-events-none' 
                        : 'text-[#787878] hover:text-white/80'
                    }`}
                    onClick={() => handleTierSelect('Full-Stack')}
                  >
                    Full-Stack
                  </button>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10 md:gap-20 lg:gap-[30px] mb-8 md:mb-10 flex-grow">
                <div>
                  <div className="space-y-3 md:space-y-5 lg:space-y-[18px]">
                    {pricingData[selectedTier].features.slice(0, 4).map((feature, index) => (
                      <div key={`feature-1-${index}`} className="text-white text-base md:text-lg lg:text-[18px]">{feature}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="space-y-3 md:space-y-5 lg:space-y-[18px]">
                    {pricingData[selectedTier].features.slice(4).map((feature, index) => (
                      <div key={`feature-2-${index}`} className="text-white text-base md:text-lg lg:text-[18px]">{feature}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* CTA Button Container - Updated to include both buttons */}
              <div className="w-full lg:absolute lg:bottom-[42px] lg:left-[42px] lg:w-auto">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
                  <Link 
                    href={tierUrls[selectedTier]} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-[256px] h-[56px] bg-gradient-to-b from-[#F4CE84] via-[#E2B969] to-[#CEA24C] text-black rounded-[60px] font-medium shadow-md border-2 border-[#D9BB75] flex justify-center items-center transition-all duration-200 hover:shadow-lg"
                  >
                    Secure your spot
                  </Link>
                  
                  <Link 
                    href="/pricing?from=home"
                    className="text-white font-medium transition-all duration-200 hover:text-white/80 underline decoration-white/60 underline-offset-4 hover:decoration-white/80 whitespace-nowrap"
                  >
                    Build your own package
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* World Map and Trusted By - 5/12 width on large screens, appears second on mobile */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px] md:h-[589px]">
            <div className="relative w-full h-full">
              <Image 
                src="/images/pricing-world.png" 
                alt="World map" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={100}
                priority
              />
            </div>
              
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-[42px]">
              <h3 className="text-3xl md:text-4xl lg:text-[60px] font-medium text-white mb-3 md:mb-4 lg:mb-[16px] leading-none">
                Join<br />Dreamflow
              </h3>
              <p className="text-white text-sm md:text-base lg:text-[16px] mb-3 md:mb-4 lg:mb-[16px]">
                Trusted by Top Web3 & AI Startups.
              </p>
              <div className="mt-2 md:mt-5">
                <Image 
                  src="/images/avatargroup.png" 
                  alt="Client avatars" 
                  width={320}
                  height={88}
                  quality={100}
                  priority
                  className="h-11 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Info Cards */}
        <div ref={infoCardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8">
          <div className="pricing-info-card p-6 md:p-8 lg:p-[32px] rounded-3xl border border-dashed border-[#1B1B1B] bg-[#080808] h-[120px] md:h-[148px] flex flex-col justify-center">
            <h3 className="text-lg md:text-xl lg:text-[22px] font-medium text-white mb-2 md:mb-2.5 lg:mb-[18px]">Pause anytime</h3>
            <p className="text-dreamflow-text-secondary text-sm md:text-sm lg:text-[14px]">Temporarily pause your subscription anytime.</p>
          </div>
          
          <div className="pricing-info-card p-6 md:p-8 lg:p-[32px] rounded-3xl border border-dashed border-[#1B1B1B] bg-[#080808] h-[120px] md:h-[148px] flex flex-col justify-center">
            <h3 className="text-lg md:text-xl lg:text-[22px] font-medium text-white mb-2 md:mb-2.5 lg:mb-[18px]">Try it for a week</h3>
            <p className="text-dreamflow-text-secondary text-sm md:text-sm lg:text-[14px]">Not loving it after a week? Get 75% back, no questions asked.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 