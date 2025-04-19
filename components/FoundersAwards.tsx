"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const FoundersAwards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate quote
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate founders
    gsap.fromTo(
      foundersRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: foundersRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate metrics with stagger
    const metricCards = metricsRef.current?.querySelectorAll('.metric-card');
    if (metricCards && metricCards.length > 0) {
      gsap.fromTo(
        metricCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 75%",
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
      className="py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Desktop Layout (2 columns) */}
        <div className="hidden md:flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-16 mb-16 md:mb-20 lg:mb-32">
          {/* Quote Column */}
          <div className="flex-1">
            <p 
              ref={quoteRef}
              className="text-xl md:text-2xl lg:text-3xl text-white font-normal leading-[1.3]"
            >
              "We've spent the last decade building startups and leading creative for Web3 and AI brands. We created Dreamflow for people like us: founders who move fast, value design, and need a team that just gets it."
            </p>
          </div>
          
          {/* Founders Column */}
          <div 
            ref={foundersRef}
            className="flex-shrink-0 flex flex-col items-center justify-center"
          >
            <div className="relative mb-4 flex">
              <Image 
                src="/images/chase.svg" 
                alt="Chase" 
                width={160}
                height={160}
                className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative z-10 -mr-8" 
              />
              <Image 
                src="/images/jonathan.svg" 
                alt="Jonathan" 
                width={160}
                height={160}
                className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative z-0 -ml-8" 
              />
            </div>
            <p className="text-center text-white/80 text-xs md:text-sm uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col items-center mb-16">
          <p 
            ref={quoteRef}
            className="text-lg md:text-xl font-normal leading-[1.3] mb-10"
          >
            "We've spent the last decade building startups and leading creative for Web3 and AI brands. We created Dreamflow for people like us: founders who move fast, value design, and need a team that just gets it."
          </p>
          
          <div 
            ref={foundersRef}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4 flex">
              <Image 
                src="/images/chase.svg" 
                alt="Chase" 
                width={120}
                height={120}
                className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 -mr-6" 
              />
              <Image 
                src="/images/jonathan.svg" 
                alt="Jonathan" 
                width={120}
                height={120}
                className="w-24 h-24 sm:w-28 sm:h-28 relative z-0 -ml-6" 
              />
            </div>
            <p className="text-center text-white/80 text-xs uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>
        
        {/* Metrics Desktop Layout */}
        <div
          ref={metricsRef}
          className="hidden md:block"
        >
          {/* First Row */}
          <div className="flex gap-6 w-full mb-6">
            {/* PROVEN DELIVERY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 overflow-hidden relative w-[38%] lg:w-[453px] h-[200px] lg:h-[240px]">
              <div className="metric-header text-[#E6BE70] uppercase text-sm md:text-base font-normal">PROVEN DELIVERY</div>
              <div className="absolute left-6 md:left-9 top-[80px] md:top-[102px] text-white text-5xl md:text-[78px] font-medium">100+</div>
              <div className="absolute left-[185px] md:left-[234px] top-[92px] md:top-[122px] text-[#86868B] text-sm md:text-base font-bold w-[93px]">projects delivered</div>
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Successful Projects Delivered</div>
            </div>
            
            {/* FUNDING IMPACT */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 overflow-hidden relative w-[62%] lg:w-[635px] h-[200px] lg:h-[240px] ml-auto">
              <div className="metric-header text-[#14A5ED] uppercase text-sm md:text-base font-normal">FUNDING IMPACT</div>
              <div className="absolute left-6 md:left-9 top-[80px] md:top-[102px] text-white text-5xl md:text-[78px] font-medium">$320M+</div>
              <div className="absolute left-[260px] md:left-[346px] top-[80px] md:top-[100px] text-[#86868B] text-sm md:text-base font-bold w-[150px]">Raised by Dreamflow-backed startups</div>
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Fueling visions from concept to capital</div>
            </div>
          </div>
          
          {/* Second Row */}
          <div className="flex gap-6 w-full">
            {/* COST EFFICIENCY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 overflow-hidden relative w-[62%] lg:w-[635px] h-[220px] lg:h-[270px]">
              <div className="metric-header text-[#1ADABA] uppercase text-sm md:text-base font-normal">COST EFFICIENCY</div>
              <div className="absolute left-6 md:left-9 top-[90px] md:top-[120px] text-white text-5xl md:text-[78px] font-medium">$1M+</div>
              <div className="absolute left-[200px] md:left-[259px] top-[100px] md:top-[140px] text-[#86868B] text-sm md:text-base font-bold w-[126px]">saved in hiring & design ops</div>
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Optimized creative spend, maximized returns.</div>
            </div>
            
            {/* SPEED TO LAUNCH */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 overflow-hidden relative w-[38%] lg:w-[453px] h-[220px] lg:h-[270px] ml-auto">
              <div className="metric-header text-[#FF766C] uppercase text-sm md:text-base font-normal">SPEED TO LAUNCH</div>
              <div className="absolute left-6 md:left-9 top-[90px] md:top-[120px] text-white text-5xl md:text-[78px] font-medium">3-5x</div>
              <div className="absolute left-[170px] md:left-[215px] top-[100px] md:top-[140px] text-[#86868B] text-sm md:text-base font-bold w-[170px]">faster time-to-launch vs traditional agencies</div>
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Accelerate your journey from vision to reality</div>
            </div>
          </div>
        </div>
        
        {/* Metrics Mobile Layout */}
        <div
          ref={metricsRef}
          className="md:hidden flex flex-col gap-4"
        >
          {/* PROVEN DELIVERY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#E6BE70] uppercase text-xs font-medium mb-4">PROVEN DELIVERY</div>
            <div className="text-white text-4xl font-medium mb-1">100+</div>
            <div className="text-[#86868B] text-sm font-semibold">projects delivered</div>
            <div className="text-[#DEDEDE] text-[8px] mt-4">Successful Projects Delivered</div>
          </div>
          
          {/* FUNDING IMPACT */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#14A5ED] uppercase text-xs font-medium mb-4">FUNDING IMPACT</div>
            <div className="text-white text-4xl font-medium mb-1">$320M+</div>
            <div className="text-[#86868B] text-sm font-semibold">Raised by Dreamflow-backed startups</div>
            <div className="text-[#DEDEDE] text-[8px] mt-4">Fueling visions from concept to capital</div>
          </div>
          
          {/* COST EFFICIENCY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#1ADABA] uppercase text-xs font-medium mb-4">COST EFFICIENCY</div>
            <div className="text-white text-4xl font-medium mb-1">$1M+</div>
            <div className="text-[#86868B] text-sm font-semibold">saved in hiring & design ops</div>
            <div className="text-[#DEDEDE] text-[8px] mt-4">Optimized creative spend, maximized returns.</div>
          </div>
          
          {/* SPEED TO LAUNCH */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#FF766C] uppercase text-xs font-medium mb-4">SPEED TO LAUNCH</div>
            <div className="text-white text-4xl font-medium mb-1">3-5x</div>
            <div className="text-[#86868B] text-sm font-semibold">faster time-to-launch vs traditional agencies</div>
            <div className="text-[#DEDEDE] text-[8px] mt-4">Accelerate your journey from vision to reality</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersAwards; 