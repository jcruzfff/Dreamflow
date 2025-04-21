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
  
  // Refs for counter elements
  const projectsCounterRef = useRef<HTMLDivElement>(null);
  const fundingCounterRef = useRef<HTMLDivElement>(null);
  const savingsCounterRef = useRef<HTMLDivElement>(null);
  const speedCounterRef = useRef<HTMLDivElement>(null);
  const projectsCounterMobileRef = useRef<HTMLDivElement>(null);
  const fundingCounterMobileRef = useRef<HTMLDivElement>(null);
  const savingsCounterMobileRef = useRef<HTMLDivElement>(null);
  const speedCounterMobileRef = useRef<HTMLDivElement>(null);
  
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

    // Animate counter values
    const animateCounter = (element: HTMLDivElement, value: number, prefix: string = '', suffix: string = '') => {
      const obj = { count: 0 };
      gsap.to(obj, {
        count: value,
        duration: 2,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: function() {
          element.innerHTML = `${prefix}${Math.floor(obj.count)}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reset"
        }
      });
    };

    // Desktop counters
    if (projectsCounterRef.current) animateCounter(projectsCounterRef.current, 100, '', '+');
    if (fundingCounterRef.current) animateCounter(fundingCounterRef.current, 320, '$', 'M+');
    if (savingsCounterRef.current) animateCounter(savingsCounterRef.current, 1, '$', 'M+');
    if (speedCounterRef.current) animateCounter(speedCounterRef.current, 3, '', '-5x');
    
    // Mobile counters
    if (projectsCounterMobileRef.current) animateCounter(projectsCounterMobileRef.current, 100, '', '+');
    if (fundingCounterMobileRef.current) animateCounter(fundingCounterMobileRef.current, 320, '$', 'M+');
    if (savingsCounterMobileRef.current) animateCounter(savingsCounterMobileRef.current, 1, '$', 'M+');
    if (speedCounterMobileRef.current) animateCounter(speedCounterMobileRef.current, 3, '', '-5x');

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 bg-black/80"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Desktop Layout (2 columns) */}
        <div className="hidden md:flex flex-col md:flex-row gap-6 lg:gap-10 xl:gap-16 mb-16 md:mb-20 lg:mb-32">
          {/* Quote Column */}
          <div className="flex-1">
            <p 
              ref={quoteRef}
              className="text-xl md:text-2xl lg:text-[36px] text-white font-normal leading-[1.3]"
            >
              &quot;We&apos;ve spent the last decade building startups and leading creative for Web3 and AI brands. We created Dreamflow for people like us: founders who move fast, value design, and need a team that just gets it.&quot;
            </p>
          </div>
          
          {/* Founders Column */}
          <div 
            ref={foundersRef}
            className="flex-shrink-0 flex flex-col items-start justify-start"
          >
            <div className="relative mb-4 flex">
              <div className="w-16 h-16 relative z-10 -mr-[14px] rounded-full overflow-hidden">
                <Image 
                  src="/images/chase.png" 
                  alt="Chase" 
                  width={256}
                  height={256}
                  quality={100}
                  priority
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-16 h-16 relative z-0 rounded-full overflow-hidden">
                <Image 
                  src="/images/jonathan.png" 
                  alt="Jonathan" 
                  width={256}
                  height={256}
                  quality={100}
                  priority
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <p className="text-white/80 text-xs md:text-sm uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>

        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col items-start mb-16 px-0">
          <p 
            ref={quoteRef}
            className="text-[32px] font-medium leading-[1.3] mb-10"
          >
            &quot;We&apos;ve spent the last decade building startups and leading creative for Web3 and AI brands. We created Dreamflow for people like us: founders who move fast, value design, and need a team that just gets it.&quot;
          </p>
          
          <div 
            ref={foundersRef}
            className="flex flex-col items-start"
          >
            <div className="relative mb-4 flex">
              <div className="w-16 h-16 relative z-10 -mr-[14px] rounded-full overflow-hidden">
                <Image 
                  src="/images/chase.png" 
                  alt="Chase" 
                  width={256}
                  height={256}
                  quality={100}
                  priority
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="w-16 h-16 relative z-0 rounded-full overflow-hidden">
                <Image 
                  src="/images/jonathan.png" 
                  alt="Jonathan" 
                  width={256}
                  height={256}
                  quality={100}
                  priority
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <p className="text-white/80 text-xs uppercase tracking-widest">
              FOUNDERS OF<br />DREAMFLOW LABS
            </p>
          </div>
        </div>
        
        {/* Metrics Desktop Layout */}
        <div
          ref={metricsRef}
          className="hidden lg:block px-0"
        >
          {/* First Row */}
          <div className="flex gap-6 w-full mb-6">
            {/* PROVEN DELIVERY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 min-[1100px]:p-[32px] overflow-hidden relative w-[38%] lg:w-[calc(38%-12px+40px)] h-[200px] lg:h-[240px]">
              <div className="metric-header text-[#E6BE70] uppercase text-sm md:text-base font-normal">PROVEN DELIVERY</div>
              
              <div className="absolute left-6 md:left-9 top-[80px] md:top-[102px] flex flex-wrap items-start justify-start">
                <div ref={projectsCounterRef} className="text-white text-5xl md:text-[78px] font-medium">0</div>
                <div className="ml-4 md:ml-6 mt-2 text-[#86868B] text-sm md:text-base font-bold max-w-[93px] text-wrap">happy clients</div>
              </div>
              
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Successful Projects Delivered</div>
            </div>
            
            {/* FUNDING IMPACT */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 min-[1100px]:p-[32px] overflow-hidden relative w-[62%] lg:w-[calc(62%-12px-40px)] h-[200px] lg:h-[240px] ml-auto">
              <div className="metric-header text-[#14A5ED] uppercase text-sm md:text-base font-normal">FUNDING IMPACT</div>
              
              <div className="absolute left-6 md:left-9 top-[80px] md:top-[102px] flex flex-wrap items-start justify-start">
                <div ref={fundingCounterRef} className="text-white text-5xl md:text-[78px] font-medium">$0</div>
                <div className="ml-4 md:ml-6 mt-2 text-[#86868B] text-sm md:text-base font-bold max-w-[150px] text-wrap">Raised by Dreamflow-backed startups</div>
              </div>
              
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Fueling visions from concept to capital</div>
            </div>
          </div>
          
          {/* Second Row */}
          <div className="flex gap-6 w-full">
            {/* COST EFFICIENCY */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 min-[1100px]:p-[32px] overflow-hidden relative w-[62%] lg:w-[calc(62%-12px-40px)] h-[220px] lg:h-[270px]">
              <div className="metric-header text-[#1ADABA] uppercase text-sm md:text-base font-normal">COST EFFICIENCY</div>
              
              <div className="absolute left-6 md:left-9 top-[90px] md:top-[120px] flex flex-wrap items-start justify-start">
                <div ref={savingsCounterRef} className="text-white text-5xl md:text-[78px] font-medium">$0</div>
                <div className="ml-4 md:ml-6 mt-2 text-[#86868B] text-sm md:text-base font-bold max-w-[126px] text-wrap">saved vs hiring in-house teams</div>
              </div>
              
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Scaled design output without the overhead</div>
            </div>
            
            {/* SPEED TO LAUNCH */}
            <div className="metric-card bg-card-gradient shadow-card rounded-[20px] md:rounded-[32px] p-6 md:p-9 min-[1100px]:p-[32px] overflow-hidden relative w-[38%] lg:w-[calc(38%-12px+40px)] h-[220px] lg:h-[270px] ml-auto">
              <div className="metric-header text-[#FF766C] uppercase text-sm md:text-base font-normal">SPEED TO LAUNCH</div>
              
              <div className="absolute left-6 md:left-9 top-[90px] md:top-[120px] flex flex-wrap items-start justify-start">
                <div ref={speedCounterRef} className="text-white text-5xl md:text-[78px] font-medium">0</div>
                <div className="ml-4 md:ml-6 mt-2 text-[#86868B] text-sm md:text-base font-bold max-w-[160px] text-wrap">faster time-to-launch vs traditional agencies</div>
              </div>
              
              <div className="absolute left-6 md:left-9 bottom-6 md:bottom-9 text-[#DEDEDE] text-[8px] md:text-[10px] font-normal">Accelerate your journey from vision to reality</div>
            </div>
          </div>
        </div>
        
        {/* Metrics Mobile Layout */}
        <div
          ref={metricsRef}
          className="lg:hidden flex flex-col gap-4"
        >
          {/* PROVEN DELIVERY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#E6BE70] uppercase text-xs font-medium mb-4">PROVEN DELIVERY</div>
            <div className="flex flex-wrap items-center">
              <div ref={projectsCounterMobileRef} className="text-white text-6xl font-medium">0</div>
            </div>
              <div className="text-[#86868B] text-sm font-semibold mt-3">Projects delivered</div>
          
          </div>
          
          {/* FUNDING IMPACT */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#14A5ED] uppercase text-xs font-medium mb-4">FUNDING IMPACT</div>
            <div className="flex flex-wrap items-center">
              <div ref={fundingCounterMobileRef} className="text-white text-6xl font-medium">$0</div>
            
            </div>
            <div className="text-[#86868B] text-sm font-semibold mt-3 text-wrap">Raised by Dreamflow-backed startups</div>
          </div>
          
          {/* COST EFFICIENCY */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#1ADABA] uppercase text-xs font-medium mb-4">COST EFFICIENCY</div>
            <div className="flex flex-wrap items-center">
              <div ref={savingsCounterMobileRef} className="text-white text-6xl font-medium">$0</div>
           
            </div>
               <div className="text-[#86868B] text-sm font-semibold  mt-3 text-wrap">Saved in hiring & design ops</div>
          </div>
          
          {/* SPEED TO LAUNCH */}
          <div className="metric-card bg-card-gradient shadow-card rounded-[20px] p-5 overflow-hidden">
            <div className="text-[#FF766C] uppercase text-xs font-medium mb-4">SPEED TO LAUNCH</div>
            <div className="flex flex-wrap items-center">
              <div ref={speedCounterMobileRef} className="text-white text-6xl font-medium">0</div>
         
            </div>
                 <div className="text-[#86868B] text-sm font-semibold mt-3 text-wrap">Faster time-to-launch vs traditional agencies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersAwards; 