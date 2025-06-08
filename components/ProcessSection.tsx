"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const desktopStepsRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate desktop steps with stagger
    const desktopSteps = desktopStepsRef.current?.querySelectorAll('.process-step');
    if (desktopSteps && desktopSteps.length > 0) {
      gsap.fromTo(
        desktopSteps,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: desktopStepsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animate stacked images
    const stackedImages = sectionRef.current.querySelector('.stacked-images');
    if (stackedImages) {
      gsap.fromTo(
        stackedImages,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stackedImages,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Mobile process steps animation
    const initMobileProcessSteps = () => {
      if (window.innerWidth > 1024) return;
      
      const cycleSteps = () => {
        setActiveStep(prev => (prev + 1) % 3);
      };
      
      const startAnimation = () => {
        // Clear any existing interval
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        
        // Reset active step
        setActiveStep(0);
        
        // Set up interval for cycling through steps
        animationIntervalRef.current = setInterval(cycleSteps, 4000);
      };
      
      const stopAnimation = () => {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      };
      
      // Create intersection observer to detect when steps are in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Play video if available
            if (videoRef.current) {
              videoRef.current.play().catch(error => {
                console.log("Video autoplay prevented:", error);
                if (!videoRef.current!.muted) {
                  videoRef.current!.muted = true;
                  videoRef.current!.play().catch(mutedError => {
                    console.log("Even muted video playback failed:", mutedError);
                  });
                }
              });
            }
            
            // Start step animation
            startAnimation();
          } else {
            // Stop animation when not in view
            stopAnimation();
          }
        });
      }, { threshold: 0.3 });
      
      // Observe the mobile steps container
      if (mobileStepsRef.current) {
        observer.observe(mobileStepsRef.current);
      }
    };
    
    // Initialize mobile steps animation
    initMobileProcessSteps();
    
    // Re-initialize when window is resized
    const handleResize = () => {
      // Stop any existing animation
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      
      if (window.innerWidth <= 1024) {
        // Reset state for mobile
        initMobileProcessSteps();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlay = () => {
      if (window.innerWidth <= 1024 && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        if (sectionRect.top < window.innerHeight) {
          video.play().catch(error => {
            console.log("Video autoplay prevented on load:", error);
            if (!video.muted) {
              video.muted = true;
              video.play().catch(mutedError => {
                console.log("Even muted video playback failed on load:", mutedError);
              });
            }
          });
        }
      }
    };
    
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="simple" 
      className="pt-2 md:pt-20 lg:pt-10 pb-20 md:pb-24 lg:pb-32 px-4 md:px-8 lg:px-12  w-full mt-15 md:mt-[120px] relative z-10"
    >
      <div className="max-w-[1117px] mx-auto">
        {/* Section title */}
        <h2 
          ref={titleRef}
          id="simple-title"
          style={{
            background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontFamily: "Helvetica Neue",
           
          }}
          className="text-[34px] md:text-5xl lg:text-[72px] font-medium text-center mb-10 md:mb-[30px] leading-[110%] tracking-[-2%] mx-auto w-full md:w-4/5"
        >
          Simple, Scalable Design & Automation
        </h2>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row justify-between items-center gap-10 lg:gap-20 ">
          {/* Left side - Stack images for desktop */}
          <div className="stacked-images relative w-[60%] lg:w-[69%] h-[500px] lg:h-[600px]">
            <Image 
              src="/images/left-stack.svg" 
              alt="Task Management Interface" 
              width={348}
              height={386}
              className="absolute left-0 top-[53%] -translate-y-1/2 z-0 w-[280px] lg:w-[348px] h-auto" 
            />
            
            <div className="right-stack absolute right-[-20px] top-1/2 transform -translate-y-[60%] flex flex-col justify-end items-start w-[300px] lg:w-[363.5px] h-[380px] lg:h-[402px] p-[26px_19.7px_19.7px_19.7px] gap-[22px] rounded-[26.2px] bg-gradient-to-b from-[rgba(31,31,31,0.7)] to-[rgba(17,17,17,0.7)] shadow-[0px_1.18px_2.36px_0px_#525154_inset,0px_23.6px_29.5px_-5.9px_rgba(0,0,0,0.8),0px_11.8px_11.8px_-5.9px_rgba(0,0,0,0.9)] backdrop-filter backdrop-blur-[24.5px] overflow-hidden">
              <div className="right-stack-header absolute left-[19.7px] top-[26px] flex items-center gap-[9px]">
                <div className="w-[7.16px] h-[7.16px] rounded-full bg-[#1adbbb]"></div>
                <div className="text-[#d7d7d7] text-base font-normal leading-[1.2]">prototype - onboarding flow</div>
              </div>
              
              <div className="right-stack-background absolute w-[324.1px] h-[315.2px] left-[19.7px] top-[67.2px] bg-[rgba(18,18,18,0.6)] rounded-[14.3px] border border-[#242424]">
                <div className="content-row absolute w-[279.4px] h-[14.3px] left-[22.4px] top-[26px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[35.8px]"></div>
                <div className="content-row absolute w-[279.4px] h-[14.3px] left-[22.4px] top-[55.5px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[35.8px]"></div>
                <div className="content-row absolute w-[279.4px] h-[14.3px] left-[22.4px] top-[85.1px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[35.8px]"></div>
                <div className="content-row absolute w-[154.9px] h-[14.3px] left-[22.4px] top-[114.6px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(153,153,153,0.1)] rounded-[35.8px]"></div>
                
                <div className="content-box absolute w-[89.5px] h-[89.5px] left-[22.4px] top-[164.7px] bg-[#292929] rounded-[8px]"></div>
                <div className="content-box absolute w-[89.5px] h-[89.5px] left-[117.3px] top-[164.7px] bg-[#292929] rounded-[8px]"></div>
                <div className="content-box absolute w-[89.5px] h-[89.5px] left-[212.2px] top-[164.7px] bg-[#292929] rounded-[8px]"></div>
              </div>
            </div>
          </div>
          
          {/* Right side - Process steps for desktop */}
          <div ref={desktopStepsRef} className="process-steps  w-[40%] lg:w-[35%] flex flex-col gap-10 lg:gap-[60px] items-start">
            <div className="process-step w-full lg:w-[381px] flex flex-col justify-start items-start gap-[9px]">
              <h3 className="w-full text-white  font-medium text-3xl lg:text-[42px] leading-[120%] lg:leading-[50.4px] text-left">Subscribe</h3>
              <p className="w-full lg:w-[344px] text-[#86868B] text-xl lg:text-[22px] font-medium leading-[120%] text-left">Choose your plan. Get Unlimited requests and revisions.</p>
            </div>
            
            <div className="process-step w-full lg:w-[381px] flex flex-col justify-center items-start gap-[9px]">
              <h3 className="w-full text-white font-medium text-3xl lg:text-[42px] leading-[120%] lg:leading-[50.4px] text-left">Request</h3>
              <p className="w-full lg:w-[344px] text-[#86868B] text-xl lg:text-[22px] font-medium leading-[120%] text-left">Submit any task - branding, UI/UX, decks, websites & more.</p>
            </div>
            
            <div className="process-step w-full lg:w-[381px] flex flex-col justify-center items-start gap-[9px]">
              <h3 className="w-full text-white font-medium text-3xl lg:text-[42px] leading-[120%] lg:leading-[50.4px] text-left">Receive</h3>
              <p className="w-full lg:w-[344px] text-[#86868B] text-xl lg:text-[22px] font-medium leading-[120%] text-left">Get your dream design delivered in as little as 48 hours.</p>
            </div>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Mobile video container */}
          <div className="mobile-video-container w-full  rounded-xl overflow-hidden mb-6 md:mb-10">
            <video 
              ref={videoRef}
              id="mobileAnimation" 
              className="mobile-animation w-full block rounded-xl object-cover" 
              playsInline 
              muted 
              loop 
              preload="metadata"
    
            >
              <source src="/videos/betteranimation.mp4" type="video/mp4" />
              <source src="/videos/betteranimation.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Mobile Process steps with animation */}
          <div 
            ref={mobileStepsRef} 
            className="process-steps-mobile w-full max-w-[90%] sm:max-w-[85%] md:max-w-[75%] h-[150px] md:h-[170px] relative"
          >
            {/* Subscribe Step */}
            <div 
              style={{ 
                opacity: activeStep === 0 ? 1 : 0,
                visibility: activeStep === 0 ? 'visible' : 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out'
              }}
              className="process-step-mobile w-full text-left"
            >
              <h3 className="text-white font-medium text-[24px] md:text-[34px] leading-[120%] mb-2 tracking-[-2%]">Subscribe</h3>
              <p className="text-[#86868B] text-lg md:text-xl font-medium">Pick a plan. Get unlimited design, dev & automation support.</p>
            </div>
            
            {/* Request Step */}
            <div 
              style={{ 
                opacity: activeStep === 1 ? 1 : 0,
                visibility: activeStep === 1 ? 'visible' : 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out'
              }}
              className="process-step-mobile w-full text-left"
            >
              <h3 className="text-white font-medium text-[24px] md:text-[34px] leading-[120%] mb-2 tracking-[-2%]">Request</h3>
              <p className="text-[#86868B] text-lg md:text-xl font-medium">Submit any task - branding, UI/UX websites, decks & more.</p>
            </div>
            
            {/* Receive Step */}
            <div 
              style={{ 
                opacity: activeStep === 2 ? 1 : 0,
                visibility: activeStep === 2 ? 'visible' : 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out'
              }}
              className="process-step-mobile w-full text-left"
            >
              <h3 className="text-white font-medium text-[24px] md:text-[34px] leading-[120%] mb-2 tracking-[-2%]">Receive</h3>
              <p className="text-[#86868B] text-lg md:text-xl">Get your deliverables in 2–3 days. Review, iterate, and scale.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 