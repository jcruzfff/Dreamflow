"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create animations when section comes into view
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
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
    
    // Animate steps with stagger
    const steps = stepsRef.current?.querySelectorAll('.process-step');
    if (steps && steps.length > 0) {
      gsap.fromTo(
        steps,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Handle mobile process step animation
    const handleMobileSteps = () => {
      if (window.innerWidth <= 1024) {
        let currentStep = 0;
        const animationInterval = setInterval(() => {
          const mobileSteps = document.querySelectorAll('.process-step');
          mobileSteps.forEach((step, index) => {
            if (index === currentStep) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
          currentStep = (currentStep + 1) % mobileSteps.length;
        }, 4000);

        return () => clearInterval(animationInterval);
      }
    };

    const cleanup = handleMobileSteps();
    
    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="simple" 
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black w-full mt-[200px]"
    >
      <div className="max-w-[1117px] mx-auto">
        {/* Section title */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-[72px] text-gradient font-medium text-center mb-[30px] leading-[100%] tracking-[-1.44px] mx-auto w-4/5"
        >
          Simple, Streamlined, and Startup-speed
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-20">
          {/* Left side - Stack images for desktop */}
          <div className="stacked-images relative w-full md:w-[69%] h-[600px] hidden md:block">
            <Image 
              src="/images/left-stack.svg" 
              alt="Task Management Interface" 
              width={348}
              height={386}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-[348px] h-[386px]" 
            />
            
            <div className="right-stack absolute right-[-20px] top-1/2 transform -translate-y-[60%] flex flex-col justify-end items-start w-[363.5px] h-[402px] p-[26px_19.7px_19.7px_19.7px] gap-[22px] rounded-[26px] bg-gradient-to-b from-[rgba(31,31,31,0.7)] to-[rgba(17,17,17,0.7)] shadow-card bg-blur-card overflow-hidden">
              <div className="right-stack-header absolute left-[19.7px] top-[26px] flex items-center gap-[9px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#1adbbb]"></div>
                <div className="text-[#d7d7d7] text-base font-normal">prototype - onboarding flow</div>
              </div>
              
              <div className="right-stack-background absolute w-[324px] h-[315px] left-[19.7px] top-[67px] bg-[rgba(18,18,18,0.6)] rounded-[14px] border border-[#242424]">
                <div className="content-row absolute w-[279px] h-[14px] left-[22px] top-[26px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[36px]"></div>
                <div className="content-row absolute w-[279px] h-[14px] left-[22px] top-[56px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[36px]"></div>
                <div className="content-row absolute w-[279px] h-[14px] left-[22px] top-[85px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[36px]"></div>
                <div className="content-row absolute w-[155px] h-[14px] left-[22px] top-[115px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[36px]"></div>
                
                <div className="content-box absolute w-[90px] h-[90px] left-[22px] top-[165px] bg-[#292929] rounded-[8px]"></div>
                <div className="content-box absolute w-[90px] h-[90px] left-[117px] top-[165px] bg-[#292929] rounded-[8px]"></div>
                <div className="content-box absolute w-[90px] h-[90px] left-[212px] top-[165px] bg-[#292929] rounded-[8px]"></div>
              </div>
            </div>
          </div>
          
          {/* Mobile video container */}
          <div className="mobile-video-container md:hidden w-full max-w-[600px] rounded-xl overflow-hidden relative min-h-[200px] mb-10">
            <video 
              id="mobileAnimation" 
              className="mobile-animation w-full h-full block rounded-xl object-cover" 
              playsInline 
              muted 
              loop 
              preload="metadata"
              poster="/videos/poster.jpg"
            >
              <source src="/videos/betteranimation.mp4" type="video/mp4" />
              <source src="/videos/betteranimation.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Right side - Process steps */}
          <div ref={stepsRef} className="process-steps w-full md:w-[35%] flex flex-col gap-[60px] items-start">
            <div className="process-step w-full md:w-[381px] flex flex-col justify-center items-start gap-[9px]">
              <h3 className="w-full text-white font-medium text-[42px] leading-[50.4px] text-left">Subscribe</h3>
              <p className="w-[344px] text-dreamflow-gray-light text-[22px] font-medium leading-[120%] text-left">Choose your plan. Get Unlimited requests and revisions.</p>
            </div>
            
            <div className="process-step w-full md:w-[381px] flex flex-col justify-center items-start gap-[9px]">
              <h3 className="w-full text-white font-medium text-[42px] leading-[50.4px] text-left">Request</h3>
              <p className="w-[344px] text-dreamflow-gray-light text-[22px] font-medium leading-[120%] text-left">Submit any task - branding, UI/UX, decks, websites & more.</p>
            </div>
            
            <div className="process-step w-full md:w-[381px] flex flex-col justify-center items-start gap-[9px]">
              <h3 className="w-full text-white font-medium text-[42px] leading-[50.4px] text-left">Receive</h3>
              <p className="w-[344px] text-dreamflow-gray-light text-[22px] font-medium leading-[120%] text-left">Get your dream design delivered in as little as 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 