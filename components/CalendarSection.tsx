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
      className="py-20 md:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <div className="text-center ">
          <div 
            ref={badgeRef}
            className="inline-block px-3 sm:px-4 py-1 bg-white/10 rounded-full mb-4 sm:mb-6"
          >
            <span className="text-white/90 text-xs sm:text-sm font-medium">LIMITED SPOTS AVAILABLE</span>
          </div>
          
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
            className="text-[34px] md:text-5xl lg:text-[72px] text-gradient font-medium text-center mb-3 md:mb-[30px] leading-[110%] tracking-[-2%] mx-auto w-[90%] md:w-full  ">
            Get a Free UX & <br /> Growth Teardown
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-[#B2B2B2] text-xl md:text-2xl font-medium w-[100%] max-w-3xl mx-auto mb-3 "
          >
            Actionable design & systems feedback to fix bottlenecks, boost conversions and scale smarter.
          </p>
        </div>
        
        <div 
          ref={calendarRef}
          className="mx-auto"
        >
          {/* Calendly inline widget */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/dreamflowlabs/free-ux-audit-fix-friction-boost-adoption?hide_gdpr_banner=1&background_color=111111&text_color=ffffff&primary_color=e2b969" 
            style={{ minWidth: '320px', height: '700px', maxHeight: '90vh' }}
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