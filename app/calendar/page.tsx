"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Script from 'next/script';

const CalendarPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple fade-in animations for page load
    gsap.fromTo(
      [badgeRef.current, titleRef.current, subtitleRef.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      }
    );
    
    gsap.fromTo(
      calendarRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-12">
          <div 
            ref={badgeRef}
            className="inline-block px-3 sm:px-4 py-1 bg-white/10 rounded-full mb-4 sm:mb-6"
          >
            <span className="text-white/90 text-xs sm:text-sm font-medium">LIMITED SPOTS AVAILABLE</span>
          </div>
          
          <h1 
            ref={titleRef}
            style={{
              background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              fontFamily: "Helvetica Neue"
            }}
            className="text-[34px] md:text-5xl lg:text-[72px] font-medium text-center mb-3 md:mb-[30px] leading-[110%] tracking-[-2%] mx-auto w-[90%] md:w-full">
            Book Your Dreamflow <br /> Discovery Call
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-[#B2B2B2] text-xl md:text-2xl font-medium w-[100%] max-w-3xl mx-auto mb-6"
          >
            Get a free UX & growth teardown to boost conversions, save time & scale smarter.
          </p>
        </div>
        
        <div 
          ref={calendarRef}
          className="mx-auto w-full"
        >
          {/* Calendly inline widget */}
          <div 
            className="calendly-inline-widget w-full" 
            data-url="https://calendly.com/dreamflowlabs/dream-discovery-call-1?hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=e2b969" 
            style={{ minWidth: '320px', width: '100%', height: '700px', maxHeight: '90vh' }}
          />
          
          {/* Calendly script */}
          <Script 
            src="https://assets.calendly.com/assets/external/widget.js" 
            strategy="lazyOnload"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage; 