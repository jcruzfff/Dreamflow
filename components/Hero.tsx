"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const Hero = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on page load
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Remove hash if present to avoid auto-scrolling
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------
    // GALLERY ANIMATION ONLY
    // ----------------------------------------
    
    // Create a timeline for hero content fade-in
    const heroContentFadeIn = () => {
      // Simple timeline to fade in the top section
      const heroTl = gsap.timeline();
      
      // Fade in all hero content at once - no staggering, no movement
      heroTl.to([".hero-top-content", ".hero-main-content"], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    };
    
    // Run hero fade-in immediately
    heroContentFadeIn();
    
    // Initialize gallery immediately
    initScrollingGallery();
    
    // Initialize gallery with specific positioning
    function initScrollingGallery() {
        const topRow = topRowRef.current;
        const bottomRow = bottomRowRef.current;
        const galleryContainer = document.querySelector('.scrolling-gallery');
        const heroSection = document.querySelector('#home');
        
        if (!topRow || !bottomRow || !galleryContainer || !heroSection) return;
        
        // Calculate dimensions
        const windowWidth = window.innerWidth;
        const topRowWidth = topRow.scrollWidth;
        const bottomRowWidth = bottomRow.scrollWidth;
        const edgeMargin = 18; // 18px from edges as specified
        
        // 1. Position rows while they're still invisible
        
        // Top row: Start with first card 18px from left edge
        gsap.set(topRow, { 
            x: edgeMargin, 
            opacity: 0 // Ensure it's hidden
        });
        
        // Bottom row: Start with last card 18px from right edge
        const bottomRowInitialX = windowWidth - bottomRowWidth - edgeMargin;
        gsap.set(bottomRow, { 
            x: bottomRowInitialX,
            opacity: 0 // Ensure it's hidden
        });
        
        // 2. Create a timeline for the gallery animation sequence
        const galleryTl = gsap.timeline();
        
        // 3. First fade in both rows at their correct positions
        galleryTl.to([topRow, bottomRow], {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2
        });
        
        // 4. Then create the scroll animations
        
        // Top row: Right to Left
        gsap.to(topRow, { 
            x: -(topRowWidth - windowWidth) + edgeMargin, // End with last card 18px from right edge
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
        
        // Bottom row: Left to Right
        gsap.to(bottomRow, { 
            x: edgeMargin, // End with first card 18px from left edge
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top", 
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    }
    
    // Simple resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up animations on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-10 md:pt-14 pb-12 md:pb-16 flex flex-col justify-start" id="home">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-10 md:mb-16">
        <div className="max-w-[1117px] mx-auto ">
          {/* Logo and brand */}
          <div className="flex items-center justify-center lg:justify-start mb-12 md:mb-[84px] hero-top-content opacity-0">
            <Image 
              src="/icons/dreamflow-small-icon.svg" 
              alt="Dreamflow Design logo" 
              width={28}
              height={28}
              className="mr-1.5"
            />
            <p className="text-white text-lg font-medium">Dreamflow</p>
          </div>

          {/* Hero content */}
          <div className="text-center lg:text-left opacity-0 hero-main-content">
            <h1 
              className="text-gradient text-4xl md:text-6xl lg:text-[72px] font-medium leading-[100%] tracking-[-1.4px] mb-6"
            >
              World-Class Designs.<br />Delivered In 48 Hours.
            </h1>
            <p 
              className="text-[#B2B2B2] text-xl md:text-2xl font-medium mb-8 md:mb-10 w-[90%] sm:w-[70%] md:w-[70%] max-w-3xl mx-auto lg:mx-0"
            >
              The monthly design subscription built for Web3 & AI founders.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center bg-white text-black px-10 md:px-[51px] py-3 md:py-4 rounded-[46.55px] text-lg md:text-xl font-medium transition-all hover:bg-opacity-90 w-full sm:w-[80%] md:w-[70%] lg:w-auto max-w-md"
              >
                Apply Now
                <Image 
                  src="/icons/black-arrow.svg" 
                  alt="Arrow" 
                  width={13}
                  height={13}
                  className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling gallery */}
      <div className="w-screen overflow-hidden scrolling-gallery">
        {/* Top row - initially hidden */}
        <div className="flex whitespace-nowrap pb-[8px] md:pb-[16px] top-row opacity-0" ref={topRowRef}>
          <div className="flex space-x-3 md:space-x-8 px-2 flex-shrink-0">
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/1t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/2t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/3t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/4t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/5t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom row - initially hidden */}
        <div className="flex whitespace-nowrap pt-[8px] md:pt-[16px] bottom-row opacity-0" ref={bottomRowRef}>
          <div className="flex space-x-3 md:space-x-8 px-2 flex-shrink-0">
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/1b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/3b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/2b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/4b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[280px] md:w-[527px] h-[200px] md:h-[327px] flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
              <Image src="/images/5b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 