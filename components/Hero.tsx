"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [maxVideoWidth, setMaxVideoWidth] = useState('1280px');

  useEffect(() => {
    // Set the max width based on screen size
    setMaxVideoWidth(window.innerWidth < 768 ? '100%' : '1280px');
    
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

    // Set video to start at the specified second when loaded
    const video = videoRef.current;
    if (video) {
      const setVideoTime = () => {
        if (video) {
          video.currentTime = 17; // Start at specified seconds
          video.removeEventListener('loadedmetadata', setVideoTime);
        }
      };
      
      // Wait for video metadata to load before setting the time
      if (video.readyState >= 2) {
        video.currentTime = 17;
      } else {
        video.addEventListener('loadedmetadata', setVideoTime);
      }
      
      // Add an additional event listener for when the video is played
      video.addEventListener('play', () => {
        // Ensure the video starts at 17 seconds every time it plays
        if (video && video.currentTime < 17) {
          video.currentTime = 17;
        }
      });
    }

    // Reset modal video to start from the beginning when modal opens
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
    }

    // ----------------------------------------
    // HERO CONTENT ANIMATION
    // ----------------------------------------
    
    // Create a timeline for hero content fade-in
    const heroContentFadeIn = () => {
      // Simple timeline to fade in the top section
      const heroTl = gsap.timeline();
      
      // Fade in hero content but not the video
      heroTl.to([".hero-top-content", ".hero-main-content"], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    };
    
    // Run hero fade-in immediately
    heroContentFadeIn();
    
    // Video width animation on scroll
    const initVideoAnimation = () => {
      const videoContainer = videoContainerRef.current;
      const heroSection = document.querySelector('#home');
      
      if (!videoContainer || !heroSection) return;
      
      // Only apply animation on non-mobile screens
      if (window.innerWidth >= 768) {
        // Create animation for video container to expand to full width
        gsap.to(videoContainer, {
          maxWidth: '90vw',
          width: '90vw',
          padding: 0,
          borderRadius: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom 90%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }
    };
    
    // Initialize video animation
    initVideoAnimation();
    
    /* 
    // Gallery animation code commented out
    // Initialize gallery immediately
    initScrollingGallery();
    
    // Initialize gallery with specific positioning
    function initScrollingGallery() {
        const topRow = document.querySelector('.top-row');
        const bottomRow = document.querySelector('.bottom-row');
        const galleryContainer = document.querySelector('.scrolling-gallery');
        const heroSection = document.querySelector('#home');
        
        if (!topRow || !bottomRow || !galleryContainer || !heroSection) return;
        
        // Calculate dimensions
        const windowWidth = window.innerWidth;
        const topRowWidth = topRow.scrollWidth;
        const bottomRowWidth = bottomRow.scrollWidth;
        const edgeMargin = windowWidth < 770 ? 4 : 18; // Smaller margin on mobile screens
        
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
    */
    
    // Simple resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
      // Reinitialize video animation on resize to handle mobile/desktop transitions
      initVideoAnimation();
    };
    
    window.addEventListener('resize', handleResize);

    // Handle escape key to close modal
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    // Clean up animations on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscapeKey);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isModalOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable hover effects on mobile screens
    if (window.innerWidth < 768) return;
    
    if (!videoContainerRef.current) return;
    
    // Calculate cursor position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Pause the background video when modal opens
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Make sure body doesn't scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
    // Add a brief timeout to allow the modal to close gracefully
    setTimeout(() => {
      // Refresh the page to ensure all content reloads properly
      window.location.reload();
    }, 100);
  };

  return (
    <section className="relative min-h-[90vh] pt-13 md:pt-14 pb-12 md:pb-16 flex flex-col justify-start" id="home">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-10 md:mb-16 pb-0 sm:pb-14 md:pb-20">
        <div className="max-w-[1117px] mx-auto ">
          {/* Header with Logo and Navigation */}
          <div className="flex items-center justify-center md:justify-between mb-12 md:mb-[180px] hero-top-content opacity-0">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Image 
                src="/icons/dreamflow-small-icon.svg" 
                alt="Dreamflow Design logo" 
                width={28}
                height={28}
                className="mr-1.5"
              />
              <p className="text-white text-lg font-medium">Dreamflow</p>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="#allinone" 
                className="text-[#86868B] hover:text-white transition-colors duration-200 text-base font-medium"
              >
                Product Design
              </Link>
              <Link 
                href="#allinone" 
                className="text-[#86868B] hover:text-white transition-colors duration-200 text-base font-medium"
              >
                AI Automations
              </Link>
              <Link 
                href="#pricing" 
                className="text-[#86868B] hover:text-white transition-colors duration-200 text-base font-medium"
              >
                Pricing
              </Link>
              <Link 
                href="#pricing" 
                className="text-[#86868B] hover:text-white transition-colors duration-200 text-base font-medium"
              >
                Apply now
              </Link>
            </nav>
          </div>

          {/* Hero content */}
          <div className="text-center opacity-0 hero-main-content">
            <h1 
              style={{
                background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "Helvetica Neue"
              }}
              className="text-4xl md:text-6xl lg:text-[72px] font-medium leading-[110%] tracking-[-1.4px] mb-3"
            >
              The #1 Creative + AI Automation<br />Subscription For Founders.
            </h1>
            <p 
              className="text-[#B2B2B2] text-xl md:text-2xl font-medium mb-8 md:mb-10 w-[100%] md:w-[90%] max-w-3xl mx-auto"
            >
              Get world-class branding,websites, and AI systems <span className="hidden md:inline"><br/></span>- delivered in as little as 48 hours.
            </p>
            <div className="flex justify-center">
              <Link 
                href="#pricing" 
                className="inline-flex items-center justify-center bg-white text-black px-10 md:px-[51px] py-3 md:py-4 rounded-[46.55px] text-lg md:text-xl font-medium transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg w-full sm:w-[80%] md:w-[70%] lg:w-auto max-w-md group"
              >
                <span className="md:hidden">Free Strategy Call</span>
                <span className="hidden md:inline">Book a Free Strategy Call</span>
                <Image 
                  src="/icons/black-arrow.svg" 
                  alt="Arrow" 
                  width={13}
                  height={13}
                  className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Video with Custom Cursor */}
      <div 
        ref={videoContainerRef}
        style={{ 
          width: '100%',
          maxWidth: maxVideoWidth,
          margin: '0 auto',
          padding: '0',
          cursor: isHovering ? 'none' : 'auto'
        }}
        className="overflow-hidden md:transition-all md:duration-300 relative md:px-4 mx-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Mobile video (square) */}
        <div className="md:hidden block w-full h-full mx-0 px-0">
          <div className="relative w-screen pb-[100%]" onClick={openModal}> {/* Creates a square aspect ratio */}
            <video 
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => {
                if (e.currentTarget) {
                  e.currentTarget.currentTime = 17;
                  // Add a fallback timeout as well
                  setTimeout(() => {
                    if (e.currentTarget && e.currentTarget.currentTime < 17) {
                      e.currentTarget.currentTime = 17;
                    }
                  }, 100);
                }
              }}
              onCanPlay={(e) => {
                if (e.currentTarget && e.currentTarget.currentTime < 17) {
                  e.currentTarget.currentTime = 17;
                }
              }}
              onPlay={(e) => {
                if (e.currentTarget && e.currentTarget.currentTime < 17) {
                  e.currentTarget.currentTime = 17;
                }
              }}
            >
              <source src="/videos/df-promo-compressed.mp4" type="video/mp4" />
              <source src="/videos/df-promo-compressed.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
            
            {/* Simple play button for mobile */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#333333] bg-opacity-70 rounded-full w-14 h-14 flex items-center justify-center z-10 shadow-md"
              onClick={openModal}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="white" 
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop video */}
        <div className="hidden md:block">
          <video 
            ref={videoRef}
            className="w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
            onClick={openModal}
            onLoadedMetadata={(e) => {
              if (e.currentTarget) {
                e.currentTarget.currentTime = 17;
              }
            }}
            onCanPlay={(e) => {
              if (e.currentTarget && e.currentTarget.currentTime < 17) {
                e.currentTarget.currentTime = 17;
              }
            }}
            onPlay={(e) => {
              if (e.currentTarget && e.currentTarget.currentTime < 17) {
                e.currentTarget.currentTime = 17;
              }
            }}
          >
            <source src="/videos/df-promo-compressed.mp4" type="video/mp4" />
            <source src="/videos/df-promo-compressed.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Cursor-following Play Button (desktop only) */}
        {isHovering && (
          <div 
            className="absolute pointer-events-none bg-white text-black py-2 px-4 rounded-full hidden md:flex items-center z-10 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
            style={{ 
              left: `${cursorPosition.x}px`, 
              top: `${cursorPosition.y}px`,
              transition: 'transform 0.05s ease'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="mr-2"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play Showreel
          </div>
        )}

        {/* Invisible click overlay to ensure button works - desktop only */}
        {isHovering && (
          <div 
            className="absolute inset-0 z-20 hidden md:block"
            onClick={openModal}
            style={{ cursor: 'none' }}
          />
        )}
      </div>

      {/* Maximized Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white p-2 z-10 hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Video player with controls - expanded to fit viewport while maintaining aspect ratio */}
            <div className="w-full h-full max-h-[90vh] flex items-center">
              <video
                ref={modalVideoRef}
                className="w-full h-auto max-h-full mx-auto"
                controls
                autoPlay
                playsInline
              >
                <source src="/videos/df-promo-compressed.mp4" type="video/mp4" />
                <source src="/videos/df-promo-compressed.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Scrolling gallery - commented out */}
      {/*
      <div className="w-screen overflow-hidden scrolling-gallery">
        <div className="flex whitespace-nowrap pb-[8px] md:pb-[16px] top-row opacity-0">
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

        <div className="flex whitespace-nowrap pt-[8px] md:pt-[16px] bottom-row opacity-0">
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
      */}
    </section>
  );
};

export default Hero; 