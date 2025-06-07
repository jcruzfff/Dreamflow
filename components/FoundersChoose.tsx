"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import Image from 'next/image';

const FoundersChoose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger, Draggable);
    
    // Check screen width and update state
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth < 1163);
      setIsMobileScreen(window.innerWidth < 640);
    };
    
    // Initial check
    checkScreenWidth();
    
    // Update on resize
    window.addEventListener('resize', checkScreenWidth);
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
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
    
    // Animate cards with stagger
    const cards = cardsRef.current?.querySelectorAll('.founder-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Client logos animation
    const initClientLogos = () => {
      const clientsContainer = logosRef.current?.querySelector('.clients-container');
      if (!clientsContainer) return;
      
      // Set initial state of container and images
      const prepareLogos = () => {
        // Ensure the container is wide enough
        gsap.set(clientsContainer, { width: '400%', height: '100%' });
        
        // Update logo positions when window resizes
        const updateLogoPositions = () => {
          const logos = clientsContainer.querySelectorAll('img');
          logos.forEach(logo => {
            // Make sure all logos have consistent styling
            gsap.set(logo, {
              height: '100%',
              position: 'absolute',
              left: 0,
              marginRight: '42px',
              paddingRight: '42px'
            });
          });
          
          // Position the first logo at the left edge initially (partially visible)
          gsap.set("#clientLogos1", { x: "-90%" });
          
          // Position the second logo right after the first one
          gsap.set("#clientLogos2", { x: "10%" });
          
          if (document.querySelector('#clientLogos3')) {
            gsap.set("#clientLogos3", { x: "110%" });
            gsap.set("#clientLogos4", { x: "210%" });
          }
        };
        
        // Initial setup
        updateLogoPositions();
        
        // Update on resize
        window.addEventListener('resize', updateLogoPositions);
      };
      
      prepareLogos();
      
      // Create the continuous animation with improved smoothness
      const logoTimeline = gsap.timeline({ 
        repeat: -1,
        ease: "none" 
      });
      
      logoTimeline
        .to("#clientLogos1", {
          x: "-200%", 
          duration: 30,
          ease: "linear",
          force3D: true
        })
        .to("#clientLogos2", {
          x: "-100%", 
          duration: 30,
          ease: "linear",
          force3D: true
        }, "<"); // Start at the same time
      
      // Add more logo elements for continuous scrolling
      const createAdditionalLogos = () => {
        const logo1 = document.querySelector('#clientLogos1');
        const logo2 = document.querySelector('#clientLogos2');
        
        if (!logo1 || !logo2 || !clientsContainer) return;
        
        const logo3 = logo1.cloneNode(true) as HTMLElement;
        const logo4 = logo2.cloneNode(true) as HTMLElement;
        
        logo3.id = "clientLogos3";
        logo4.id = "clientLogos4";
        
        clientsContainer.appendChild(logo3);
        clientsContainer.appendChild(logo4);
        
        // Position the additional logos
        gsap.set("#clientLogos3", { x: "110%" });
        gsap.set("#clientLogos4", { x: "210%" });
        
        // Add them to the animation with improved smoothness
        logoTimeline
          .to("#clientLogos3", {
            x: "0%", 
            duration: 30,
            ease: "linear",
            force3D: true
          }, "<")
          .to("#clientLogos4", {
            x: "100%", 
            duration: 30,
            ease: "linear",
            force3D: true
          }, "<");
      };
      
      createAdditionalLogos();
    };
    
    // Initialize logo animation
    initClientLogos();
    
    // Clean up animations on unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Scroll animation for medium size screens (between 640px and 1163px)
  useEffect(() => {
    // Only apply scroll animation for medium screens (not mobile and not desktop)
    if (isMobileScreen || !isNarrowScreen || !cardsRef.current || !sectionRef.current) return;
    
    // Make sure GSAP is registered
    gsap.registerPlugin(ScrollTrigger, Draggable);
    
    // Create an ID for this specific animation to reference it later
    const animationId = "cardsHorizontalScroll";
    
    // Get the card container
    const cardContainer = cardsRef.current;
    
    // Calculate scroll distance
    const cards = cardContainer.querySelectorAll('.founder-card');
    const cardWidth = 342;
    const gapWidth = 16; // gap-4
    const totalCardsWidth = (cardWidth * cards.length) + (gapWidth * (cards.length - 1));
    const visibleWidth = window.innerWidth - 24; // Account for 12px padding on each side
    const scrollDistance = totalCardsWidth - visibleWidth;
    
    // Only proceed if we have enough cards to scroll
    if (scrollDistance > 0) {
      // Set the starting position with first card at 12px from left
      gsap.set(cardContainer, { x: 12 });
      
      // Add a delay to ensure the fade-in animation completes first
      // We'll use setTimeout to create a delay between the fade-in and scroll animations
      const setupScrollAnimation = () => {
        // Create the scroll animation with a better trigger point
        const scrollTween = gsap.to(cardContainer, {
          x: -(scrollDistance + 12), // Ensure there's 24px right padding at the end
          ease: "none",
          scrollTrigger: {
            id: animationId,
            trigger: cardContainer, // Use the card container itself as the trigger 
            start: "top 65%", // Start when cards are 35% visible from bottom
            end: "top 10%", // End when cards are 10% from top
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false,
            onEnter: () => {
              console.log("Starting horizontal scroll animation");
            }
          }
        });
        
        return scrollTween;
      };
      
      // Add a delay to ensure initial fade-in completes first
      const animationTimer = setTimeout(setupScrollAnimation, 800); // 800ms delay
      
      // Return cleanup function specific to this animation
      return () => {
        // Clean up the timer if component unmounts before timer completes
        clearTimeout(animationTimer);
        
        // Find and kill only this specific ScrollTrigger
        const trigger = ScrollTrigger.getById(animationId);
        if (trigger) trigger.kill();
        
        // Reset the position
        gsap.set(cardContainer, { clearProps: "x" });
      };
    }
  }, [isNarrowScreen, isMobileScreen]); // Re-run when screen size category changes

  // Add draggable functionality for all screens smaller than desktop
  useEffect(() => {
    if (!cardsRef.current) return;
    
    // Apply draggable to all screens smaller than desktop
    if (isNarrowScreen) {
      gsap.registerPlugin(Draggable);
      
      const cardContainer = cardsRef.current;
      const cards = cardContainer.querySelectorAll('.founder-card');
      const cardWidth = 342;
      const gapWidth = 16;
      const totalCardsWidth = (cardWidth * cards.length) + (gapWidth * (cards.length - 1));
      const visibleWidth = window.innerWidth - 24;
      
      // Add cursor styling to indicate draggability
      gsap.set(cardContainer, { 
        cursor: 'grab' 
      });
      
      // Only make draggable if there's enough content to scroll
      if (totalCardsWidth > visibleWidth) {
        // Calculate bounds - ensure exactly 12px padding on the right edge
        const minX = -(totalCardsWidth - visibleWidth + 12);
        const maxX = 12;
        
        // Create draggable instance with improved bounds handling
        const draggable = Draggable.create(cardContainer, {
          type: "x",
          bounds: {minX: minX, maxX: maxX},
          edgeResistance: 0.65,
          throwProps: true,
          inertia: true,
          dragClickables: true, // Allow clicking on buttons within draggable area
          allowEventDefault: true, // Allow default events like scrolling
          minimumMovement: 2, // Require a bit more movement to start dragging
          
          // Support for touch gestures
          touchStartForce: 0, // Start immediately on touch
          
          // Add wheel support for trackpad gestures
          onWheel: function(e: { preventDefault: () => void; deltaX: number }) {
            // Prevent default scrolling behavior
            e.preventDefault();
            
            // Get current position
            const currentX = this.x;
            
            // Calculate new position based on wheel delta
            // Note: deltaX is used for horizontal scrolling on trackpads
            let newX = currentX - e.deltaX;
            
            // Ensure bounds
            newX = Math.max(minX, Math.min(maxX, newX));
            
            // Set the new position
            gsap.to(cardContainer, {
              x: newX,
              duration: 0.2,
              overwrite: "auto",
              ease: "power1.out"
            });
            
            return false;
          },
          snap: {
            x: function(endValue) {
              // Calculate the card width including gap
              const fullCardWidth = cardWidth + gapWidth;
              
              // Calculate how many cards from the start
              const cardIndex = Math.round(Math.abs(endValue) / fullCardWidth);
              
              // Calculate the exact position where this card should snap to
              // The negative sign is because we're moving left (negative X values)
              let snapX = -(cardIndex * fullCardWidth);
              
              // Calculate the maximum drag for the last card to show
              const maxDrag = -(totalCardsWidth - visibleWidth);
              
              // If we're close to the end, snap to the position with 12px right padding
              if (snapX < maxDrag - (fullCardWidth/2)) {
                snapX = minX;
              }
              
              // Make sure we don't exceed the bounds
              snapX = Math.max(minX, Math.min(maxX, snapX));
              
              return snapX;
            }
          },
          onDragStart: function() {
            // Change cursor during drag
            gsap.set(cardContainer, { cursor: 'grabbing' });
            
            // Disable scroll trigger during drag (only relevant for medium screens)
            if (!isMobileScreen) {
              const trigger = ScrollTrigger.getById("cardsHorizontalScroll");
              if (trigger) trigger.disable();
            }
          },
          onDragEnd: function() {
            // Restore cursor after drag
            gsap.set(cardContainer, { cursor: 'grab' });
            
            // Re-enable scroll trigger after drag (only relevant for medium screens)
            if (!isMobileScreen) {
              const trigger = ScrollTrigger.getById("cardsHorizontalScroll");
              if (trigger) trigger.enable();
            }
            
            // Get the current x position
            const currentX = this.endX;
            
            // Calculate the nearest card position
            const fullCardWidth = cardWidth + gapWidth;
            const cardIndex = Math.round(Math.abs(currentX) / fullCardWidth);
            let snapX = -(cardIndex * fullCardWidth);
            
            // Special handling for the end position
            // Calculate the last allowed position (with 12px right padding)
            const lastPosition = -(totalCardsWidth - visibleWidth + 12);
            
            // If we're near the end, snap to the exact end position with 12px padding
            const maxNormalPosition = -(totalCardsWidth - visibleWidth - (fullCardWidth/2));
            if (snapX < maxNormalPosition) {
              snapX = lastPosition;
            }
            
            // Ensure we stay within bounds
            snapX = Math.max(minX, Math.min(maxX, snapX));
            
            // Animate to the nearest card with a smooth transition
            gsap.to(cardContainer, {
              x: snapX,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        })[0]; // Get the first element of the array returned by create()
        
        return () => {
          // Clean up draggable on unmount
          if (draggable) draggable.kill();
          // Reset cursor
          gsap.set(cardContainer, { clearProps: 'cursor' });
        };
      }
    }
  }, [isNarrowScreen, isMobileScreen]);

  // Note: We've removed the scroll trigger animation for mobile cards
  // and now only using CSS snap scrolling for a swipeable interface

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbars for all browsers */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section 
        ref={sectionRef} 
        className={`
          ${isNarrowScreen ? 'pt-6' : 'pt-20 md:pt-24 lg:pt-32'} 
          pb-20 md:pb-24 lg:pb-32 
          px-4 md:px-8 lg:px-12 
          bg-black/55 
          relative z-10
        `}
      >
        <div className={`container mx-auto max-w-6xl ${isNarrowScreen ? "px-0" : ""}`}>
          {/* Section title */}
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
            className="text-[34px] md:text-5xl lg:text-[72px] text-gradient font-medium text-center mb-14 md:mb-16 lg:mb-24 leading-[110%] tracking-[-2%]"
          >
            Why Top Startups<br/> Trust Dreamflow
          </h2>
          
          {/* Feature cards - conditional layout based on screen width */}
          <div className={isNarrowScreen ? `overflow-x-auto -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 pb-6 ${isMobileScreen ? 'snap-x snap-mandatory' : ''} scrollbar-hide` : ""}>
            <div 
              ref={cardsRef}
              className={`
                ${isNarrowScreen
                  ? 'flex flex-nowrap gap-4 md:gap-2' 
                  : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-4'
                } 
                mb-12 md:mb-20
              `}
            >
              <div className={`
                founder-card p-5 md:p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-left justify-center gap-2 text-left
                ${isNarrowScreen ? 'h-[366px] w-[342px] flex-shrink-0 snap-center relative overflow-hidden' : 'h-[286px]'}
              `}>
                {isNarrowScreen && (
                  <Image
                    src="/icons/creative-icon-image.svg"
                    alt="Creative Team Background"
                    width={200}
                    height={366}
                    className="absolute right-0 top-0 h-full w-auto z-0"
                  />
                )}
                <div className="relative z-10">
                  <Image 
                    src="/icons/creative-icon.svg" 
                    alt="Creative Team Icon" 
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2" 
                  />
                  <h3 className={`text-lg md:text-xl font-medium text-white leading-[120%] ${!isNarrowScreen ? 'max-w-[160px]' : ''}`}>
                    All-in-One Creative Team
                  </h3>
                  <p className="text-[#86868B] text-[18px] font-medium leading-[120%] pt-3">Design, dev, and content - together.</p>
                </div>
              </div>
              
              <div className={`
                founder-card p-5 md:p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-left justify-center gap-2 text-left
                ${isNarrowScreen ? 'h-[366px] w-[342px] flex-shrink-0 snap-center relative overflow-hidden' : 'h-[286px]'}
              `}>
                {isNarrowScreen && (
                 <Image
                    src="/icons/award-icon-image.svg"
                    alt="Award-Winning Designers Background"
                    width={200}
                    height={366}
                    className="absolute right-0 top-0 h-full w-auto z-0"
                  />
                )}
                <div className="relative z-10">
                  <Image 
                    src="/icons/award-icon.svg" 
                    alt="Award Icon" 
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2" 
                  />
                  <h3 className={`text-lg md:text-xl font-medium text-white leading-[120%] ${!isNarrowScreen ? 'max-w-[160px]' : ''}`}>
                    Lightning-Fast Delivery
                  </h3>
                  <p className="text-[#86868B] text-[18px] font-medium leading-[120%] pt-3">Launch-ready assets in 2–3 days.</p>
                </div>
              </div>
              
              <div className={`
                founder-card p-5 md:p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-left justify-center gap-2 text-left
                ${isNarrowScreen ? 'h-[366px] w-[342px] flex-shrink-0 snap-center relative overflow-hidden' : 'h-[286px]'}
              `}>
                {isNarrowScreen && (
                  <Image
                    src="/icons/pricing-icon-image.svg"
                    alt="Predictable Pricing Background"
                    width={200}
                    height={366}
                    className="absolute right-0 top-0 h-full w-auto z-0"
                  />
                )}
                <div className="relative z-10">
                  <Image 
                    src="/icons/pricing-icon.svg" 
                    alt="Pricing Icon" 
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2" 
                  />
                  <h3 className={`text-lg md:text-xl font-medium text-white leading-[120%] ${!isNarrowScreen ? 'max-w-[160px]' : ''}`}>
                    Predictable Pricing
                  </h3>
                  <p className="text-[#86868B] text-[18px] font-medium leading-[120%] pt-3">Fixed monthly rate. No surprises.</p>
                </div>
              </div>
              
             
              
              <div className={`
                founder-card p-5 md:p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-left justify-center gap-2 text-left
                ${isNarrowScreen ? 'h-[366px] w-[342px] flex-shrink-0 snap-center relative overflow-hidden' : 'h-[286px]'}
              `}>
                {isNarrowScreen && (
                  <Image
                    src="/icons/ai-icon-image.svg"
                    alt="Web3 & AI Background"
                    width={200}
                    height={366}
                    className="absolute right-0 top-0 h-full w-auto z-0"
                  />
                )}
                <div className="relative z-10">
                  <Image 
                    src="/icons/ai-icon.svg" 
                    alt="AI Icon" 
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2" 
                  />
                  <h3 className={`text-lg md:text-xl font-medium text-white leading-[120%] ${!isNarrowScreen ? 'max-w-[160px]' : ''}`}>
                    AI-Automation Systems
                  </h3>
                  <p className="text-[#86868B] text-[18px] font-medium leading-[120%] pt-3">Custom workflows for ops and scale.</p>
                </div>
              </div>

              <div className={`
                founder-card p-5 md:p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-left justify-center gap-2 text-left
                ${isNarrowScreen ? 'h-[366px] w-[342px] flex-shrink-0 snap-center relative overflow-hidden' : 'h-[286px]'}
              `}>
                {isNarrowScreen && (
                  <Image
                    src="/icons/dg-icon-image.svg"
                    alt="DreamGate Background"
                    width={200}
                    height={366}
                    className="absolute right-0 top-0 h-full w-auto z-0"
                  />
                )}
                <div className="relative z-10">
                  <Image 
                    src="/icons/dg-icon.svg" 
                    alt="DreamGate Icon" 
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2" 
                  />
                  <h3 className={`text-lg md:text-xl font-medium text-white leading-[120%] ${!isNarrowScreen ? 'max-w-[160px]' : ''}`}>
                    DreamGate™ Portal
                  </h3>
                  <p className="text-[#86868B] text-[18px] font-medium leading-[120%] pt-3">Track tasks, assets, and requests.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Client logos */}
          <div ref={logosRef} className="w-[100%] sm:w-[95%] md:w-[calc(100%+100px)] max-w-[1227px] relative mt-[0px] mb-[30px] overflow-hidden mx-auto left-1/2 -translate-x-1/2">
            <div className="clients overflow-hidden w-full h-[50px] sm:h-[90px] md:h-[120px] lg:h-[150px] xl:h-[180px] relative mb-[30px] md:mb-[42px] flex justify-center items-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-[10%] sm:before:w-[15%] before:h-full before:z-[2] before:pointer-events-none before:bg-gradient-to-r before:from-black before:via-black before:via-40% before:to-transparent before:to-100% after:content-[''] after:absolute after:top-0 after:right-0 after:w-[10%] sm:after:w-[15%] after:h-full after:z-[2] after:pointer-events-none after:bg-gradient-to-l after:from-black after:via-black after:via-40% after:to-transparent after:to-100%">
              <div className="clients-container relative w-full h-full overflow-hidden flex items-center">
                <Image 
                  src="/icons/client_logos.svg" 
                  alt="Client logos" 
                  width={2000}
                  height={180}
                  id="clientLogos1"
                  className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none" 
                  priority
                />
                <Image 
                  src="/icons/client_logos.svg" 
                  alt="Client logos" 
                  width={2000}
                  height={180}
                  id="clientLogos2"
                  className="client-logos h-full absolute will-change-transform left-0 mr-[42px] pr-[42px] max-w-none" 
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoundersChoose; 