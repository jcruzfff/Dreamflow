"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Script from 'next/script';

const CalendarSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate badge
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate title and subtitle
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate calendar
    gsap.fromTo(
      calendarRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="calendar" 
      className="py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div 
            ref={badgeRef}
            className="inline-block px-3 sm:px-4 py-1 bg-white/10 rounded-full mb-4 sm:mb-6"
          >
            <span className="text-white/90 text-xs sm:text-sm font-medium">LIMITED SPOTS AVAILABLE</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-[34px] md:text-4xl lg:text-5xl text-white font-medium mb-3 sm:mb-4 tracking-[-2%]"
          >
            Get a Free 30-Min UX Review
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Actionable UX and product design feedback to boost conversions and accelerate growth.
          </p>
        </div>
        
        <div 
          ref={calendarRef}
          className="max-w-4xl mx-auto bg-gray-900/20 rounded-lg md:rounded-xl overflow-hidden"
        >
          {/* Calendly inline widget */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/dreamflowlabs/free-ux-audit-fix-friction-boost-adoption?hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=e2b969" 
            style={{ minWidth: '320px', height: '600px', maxHeight: '90vh' }}
          />
          
          {/* Calendly script */}
          <Script 
            src="https://assets.calendly.com/assets/external/widget.js" 
            strategy="lazyOnload"
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarSection; 