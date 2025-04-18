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
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Desktop Layout (2 columns) */}
        <div className="hidden md:flex flex-col md:flex-row gap-10 lg:gap-16 mb-20 md:mb-32">
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
                className="w-32 h-32 md:w-40 md:h-40 relative z-10 -mr-8" 
              />
              <Image 
                src="/images/jonathan.svg" 
                alt="Jonathan" 
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 relative z-0 -ml-8" 
              />
            </div>
            <p className="text-center text-white/80 text-sm uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col items-center mb-20">
          <p 
            ref={quoteRef}
            className="text-xl text-white font-normal leading-[1.3] mb-12"
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
                className="w-28 h-28 relative z-10 -mr-6" 
              />
              <Image 
                src="/images/jonathan.svg" 
                alt="Jonathan" 
                width={120}
                height={120}
                className="w-28 h-28 relative z-0 -ml-6" 
              />
            </div>
            <p className="text-center text-white/80 text-sm uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>
        
        {/* Metrics Desktop Layout */}
        <div
          ref={metricsRef}
          className="hidden md:flex flex-wrap gap-6"
        >
          {/* First Row */}
          <div className="flex gap-6 w-full mb-6">
            {/* PROVEN DELIVERY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-9 overflow-hidden relative w-[453px] h-[240px]">
              <div className="metric-header text-[#E6BE70] uppercase text-base font-normal">PROVEN DELIVERY</div>
              <div className="absolute left-9 top-[102px] text-white text-[78px] font-medium">100+</div>
              <div className="absolute left-[234px] top-[122px] text-[#86868B] text-base font-bold w-[93px]">projects delivered</div>
              <div className="absolute left-9 bottom-9 text-[#DEDEDE] text-[10px] font-normal">Successful Projects Delivered</div>
            </div>
            
            {/* FUNDING IMPACT */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-9 overflow-hidden relative w-[635px] h-[240px] ml-auto">
              <div className="metric-header text-[#14A5ED] uppercase text-base font-normal">FUNDING IMPACT</div>
              <div className="absolute left-9 top-[102px] text-white text-[78px] font-medium">$320M+</div>
              <div className="absolute left-[346px] top-[100px] text-[#86868B] text-base font-bold w-[150px]">Raised by Dreamflow-backed startups</div>
              <div className="absolute left-9 bottom-9 text-[#DEDEDE] text-[10px] font-normal">Fueling visions from concept to capital</div>
            </div>
          </div>
          
          {/* Second Row */}
          <div className="flex gap-6 w-full">
            {/* COST EFFICIENCY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-9 overflow-hidden relative w-[635px] h-[270px]">
              <div className="metric-header text-[#1ADABA] uppercase text-base font-normal">COST EFFICIENCY</div>
              <div className="absolute left-9 top-[120px] text-white text-[78px] font-medium">$1M+</div>
              <div className="absolute left-[259px] top-[140px] text-[#86868B] text-base font-bold w-[126px]">saved in hiring & design ops</div>
              <div className="absolute left-9 bottom-9 text-[#DEDEDE] text-[10px] font-normal">Optimized creative spend, maximized returns.</div>
            </div>
            
            {/* SPEED TO LAUNCH */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-9 overflow-hidden relative w-[453px] h-[270px] ml-auto">
              <div className="metric-header text-[#FF766C] uppercase text-base font-normal">SPEED TO LAUNCH</div>
              <div className="absolute left-9 top-[120px] text-white text-[78px] font-medium">3-5x</div>
              <div className="absolute left-[215px] top-[140px] text-[#86868B] text-base font-bold w-[173px]">faster time-to-launch vs traditional agencies</div>
              <div className="absolute left-9 bottom-9 text-[#DEDEDE] text-[10px] font-normal">Accelerate your journey from vision to reality</div>
            </div>
          </div>
        </div>
        
        {/* Metrics Mobile Layout */}
        <div
          ref={metricsRef}
          className="md:hidden flex flex-col gap-6"
        >
          {/* PROVEN DELIVERY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-6 overflow-hidden">
            <div className="text-[#E6BE70] uppercase text-sm font-medium mb-6">PROVEN DELIVERY</div>
            <div className="text-white text-5xl font-medium mb-2">100+</div>
            <div className="text-[#86868B] text-base font-semibold">projects delivered</div>
            <div className="text-[#DEDEDE] text-xs mt-6">Successful Projects Delivered</div>
          </div>
          
          {/* FUNDING IMPACT */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-6 overflow-hidden">
            <div className="text-[#14A5ED] uppercase text-sm font-medium mb-6">FUNDING IMPACT</div>
            <div className="text-white text-5xl font-medium mb-2">$320M+</div>
            <div className="text-[#86868B] text-base font-semibold">Raised by Dreamflow-backed startups</div>
            <div className="text-[#DEDEDE] text-xs mt-6">Fueling visions from concept to capital</div>
          </div>
          
          {/* COST EFFICIENCY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-6 overflow-hidden">
            <div className="text-[#1ADABA] uppercase text-sm font-medium mb-6">COST EFFICIENCY</div>
            <div className="text-white text-5xl font-medium mb-2">$1M+</div>
            <div className="text-[#86868B] text-base font-semibold">saved in hiring & design ops</div>
            <div className="text-[#DEDEDE] text-xs mt-6">Optimized creative spend, maximized returns.</div>
          </div>
          
          {/* SPEED TO LAUNCH */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[32px] p-6 overflow-hidden">
            <div className="text-[#FF766C] uppercase text-sm font-medium mb-6">SPEED TO LAUNCH</div>
            <div className="text-white text-5xl font-medium mb-2">3-5x</div>
            <div className="text-[#86868B] text-base font-semibold">faster time-to-launch vs traditional agencies</div>
            <div className="text-[#DEDEDE] text-xs mt-6">Accelerate your journey from vision to reality</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersAwards; 