"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Mobile animation utility functions
const animateElement = (
  element: Element | null,
  delay: number,
  xOffset: string,
  duration: number = 0.8
) => {
  if (!element) return;
  
  setTimeout(() => {
    element.setAttribute('style', `
      transform: translateX(${xOffset});
      opacity: 1;
      transition: transform ${duration}s ease-out, opacity ${duration}s ease-out;
      width: auto; /* Preserve original dimensions */
      height: auto; /* Preserve original dimensions */
    `);
  }, delay);
};

const animateTextElement = (
  element: Element | null,
  delay: number,
  duration: number = 0.5
) => {
  if (!element) return;
  
  setTimeout(() => {
    element.setAttribute('style', `
      transform: translateY(0px);
      opacity: 1;
      transition: transform ${duration}s ease-out, opacity ${duration}s ease-out;
    `);
  }, delay);
};

const SpreadingCards = () => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const middleLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  
  // Debug flag - set to false to disable markers in production
  const debugMarkers = true;
  
  const handleLaunchApp = () => {
    window.open('https://app.dreamflow.ai', '_blank');
  };
  
  // Mobile animation using IntersectionObserver
  useEffect(() => {
    if (pathname !== '/' && pathname !== '') return;
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    
    // Get references to the elements we want to animate
    const topRight = cardsContainerRef.current?.querySelector('.row:nth-child(1) .card-right');
    const middleLeft = cardsContainerRef.current?.querySelector('.row:nth-child(2) .card-left');
    // We no longer need bottomRight for mobile animation
    const logo = contentRef.current?.querySelector('.logo');
    const lineTexts = contentRef.current?.querySelectorAll('.line p');
    const subtext = contentRef.current?.querySelector('.subtext');
    const button = contentRef.current?.querySelector('.btn button');
    
    // Hide third card and other cards on mobile
    const allCards = cardsContainerRef.current?.querySelectorAll('.card-left, .card-right');
    allCards?.forEach((card) => {
      if (card !== topRight && card !== middleLeft) {
        card.setAttribute('style', 'display: none;');
      }
    });
    
    // Set initial styles
    if (topRight && middleLeft) {
      // Start cards centered (no offset)
      topRight.setAttribute('style', 'transform: translateX(0px); opacity: 0; width: auto; height: auto;');
      middleLeft.setAttribute('style', 'transform: translateX(0px); opacity: 0; width: auto; height: auto;');
    }
    
    if (logo && lineTexts && subtext && button) {
      // Start text and button invisible
      logo.setAttribute('style', 'opacity: 0; transform: translateY(20px);');
      Array.from(lineTexts).forEach(el => {
        el.setAttribute('style', 'opacity: 0; transform: translateY(20px);');
      });
      subtext.setAttribute('style', 'opacity: 0; transform: translateY(20px);');
      button.setAttribute('style', 'opacity: 0; transform: translateY(20px); pointer-events: none;');
    }
    
    // Set up intersection observer to trigger animations when section is in view
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is now visible, animate cards with a sequence
          if (debugMarkers) {
            console.log('SpreadingCards section visible - starting animations', entry.intersectionRatio);
          }
          
          // Animate only two cards with staggered timing
          if (topRight) animateElement(topRight, 0, '95vw');     // First card moves right 95% of viewport width
          if (middleLeft) animateElement(middleLeft, 450, '-95vw'); // Second card moves left 95% of viewport width
          // Third card is now hidden on mobile
          
          // Animate text elements
          if (logo && lineTexts && subtext && button) {
            animateTextElement(logo, 300);
            
            Array.from(lineTexts).forEach((text, index) => {
              animateTextElement(text, 400 + (index * 100));
            });
            
            animateTextElement(subtext, 700);
            
            // Button animation with pointer-events
            animateTextElement(button, 800);
            setTimeout(() => {
              if (button) {
                button.setAttribute('style', `
                  transform: translateY(0px);
                  opacity: 1;
                  pointer-events: auto;
                  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
                `);
              }
            }, 1000);
          }
          
          // Once animation is triggered, disconnect the observer
          sectionObserver.disconnect();
        }
      });
    }, {
      // Start observing earlier to ensure animation triggers at the right time
      rootMargin: '0px 0px -20% 0px', // Trigger when section is 20% in the viewport
      threshold: [0.1, 0.2, 0.3, 0.4] // Trigger at multiple thresholds for better control
    });
    
    // Start observing the section
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    return () => {
      sectionObserver.disconnect();
    };
  }, [pathname, debugMarkers]);
  
  // Desktop animation using GSAP ScrollTrigger
  useEffect(() => {
    if (pathname !== '/' && pathname !== '') return;
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    
    const ctx: { cleanup?: () => void } = {};
    
    const initSpreadingAnimation = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      // Initial state for center content - start completely invisible
      const logo = contentRef.current?.querySelector('.logo');
      const lineTexts = contentRef.current?.querySelectorAll('.line p');
      const subtext = contentRef.current?.querySelector('.subtext');
      const button = contentRef.current?.querySelector('.btn button');
      
      if (logo && lineTexts && subtext && button) {
        gsap.set([logo, lineTexts, subtext, button], {
          opacity: 0,
          y: 0,
          pointerEvents: 'none'
        });
      }
      
      // Spread values for each row
      const leftXValues = [-800, -700, -500];
      const rightXValues = [800, 700, 500];
      const leftRotationValues = [-30, -20, -30];
      const rightRotationValues = [30, 20, 30];
      const yValues = [100, -150, -400];
      
      // Desktop animation only
      const rows = cardsContainerRef.current?.querySelectorAll('.row');
      
      if (!rows) return;
      
      rows.forEach((row, index) => {
        const cardLeft = row.querySelector('.card-left');
        const cardRight = row.querySelector('.card-right');
        
        if (!cardLeft || !cardRight) return;
        
        // Create scroll-based spreading animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom-=10% center", // Start position as requested
          end: "bottom+=750 top", // End 750px after the section bottom
          scrub: 1,
          markers: debugMarkers,
          id: `row-${index}-desktop`,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Apply spreading transformations
            cardLeft.setAttribute('style', 
              `transform: translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`);
            
            cardRight.setAttribute('style', 
              `transform: translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`);
            
            // Fade in content based on card spread progress
            if (progress > 0.2 && logo && lineTexts && subtext && button) {
              const contentProgress = (progress - 0.2) / 0.3;
              const opacity = Math.min(contentProgress, 1);
              
              gsap.to([logo, lineTexts, subtext], {
                opacity: opacity,
                duration: 0.1,
                overwrite: true
              });
              
              // Animate button with opacity
              gsap.to(button, {
                opacity: opacity,
                duration: 0.1,
                overwrite: true
              });
              
              // Set pointer events if fully visible
              if (opacity === 1) {
                gsap.set(button, {
                  pointerEvents: "auto"
                });
              }
            }
          }
        });
      });
      
      ctx.cleanup = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };
    
    initSpreadingAnimation();
    
    return () => {
      if (ctx.cleanup) {
        ctx.cleanup();
      }
    };
  }, [pathname, debugMarkers]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100vh] md:min-h-[1100px] bg-black overflow-hidden md:overflow-visible py-20 pb-0 md:py-24 md:pb-0"
    >
      {/* Center Content */}
      <div 
        ref={contentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center w-full max-w-[100vw] px-3"
      >
        <div className="copy text-center flex flex-col items-center gap-6 relative pb-[100px] md:pb-[260px] w-full">
          <div className="logo mb-2 md:mb-6">
            <Image 
              src="/icons/dreamflow-small-icon.svg" 
              alt="Dreamflow" 
              width={80}
              height={80}
              className="w-20 h-20" 
            />
          </div>
          
          <div className="text flex flex-col gap-1">
            <div className="line overflow-hidden">
              <p className="text-gradient w-[80%] md:w-[50%] mx-auto text-3xl md:text-4xl lg:text-5xl font-medium leading-[110%] tracking-[-2%]">
                Join The #1 Design Subscription For Startups
              </p>
            </div>
          </div>
          
          <p className="subtext text-[#B2B2B2] text-xl font-medium mb-2 md:mb-8">Let&apos;s bring your vision to life.</p>
          
          <div className="btn">
            <button 
              onClick={handleLaunchApp}
              className="px-24 md:px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-opacity-90 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Cards Container */}
      <div 
        ref={cardsContainerRef}
        className="relative w-full max-w-6xl mx-auto h-[90vh] md:h-[1200px] overflow-hidden md:overflow-visible"
      >
        {/* Row 1 */}
        <div className="row absolute w-full flex justify-center gap-6" style={{ top: '0px' }}>
          <div className="card-left w-1/3 md:w-auto">
            <Image
              src="/images/t-left.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
          <div ref={topRightRef} className="card-right w-1/3 md:w-auto">
            <Image
              src="/images/t-right.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
        </div>
        
        {/* Row 2 */}
        <div className="row absolute w-full flex justify-center gap-6" style={{ top: '420px' }}>
          <div ref={middleLeftRef} className="card-left w-1/3 md:w-auto">
            <Image
              src="/images/m-left.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
          <div className="card-right w-1/3 md:w-auto">
            <Image
              src="/images/m-right.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
        </div>
        
        {/* Row 3 */}
        <div className="row absolute w-full flex justify-center gap-6" style={{ top: '840px' }}>
          <div className="card-left w-1/3 md:w-auto">
            <Image
              src="/images/b-left.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
          <div ref={bottomRightRef} className="card-right w-1/3 md:w-auto">
            <Image
              src="/images/b-right.svg"
              alt="Design card"
              width={500}
              height={360}
              className="w-full rounded-[32px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpreadingCards; 