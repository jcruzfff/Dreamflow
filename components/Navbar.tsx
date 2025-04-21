"use client";

import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar visibility on scroll
  useEffect(() => {
    // Debug mode - set to true to see console logs during development
    const debug = true;
    
    const handleScroll = () => {
      // Get the process section element
      const processSection = document.querySelector('#simple-title');
      
      // Try different selectors for the animated card to ensure we find it
      // Looking at the AllInOneDesign.tsx file, we know the cards have data-card attributes
      let animatedCard = document.querySelector('.stacked-card[data-card="3"]'); // First try data-card="3"
      
      // Find the FoundersAwards section - using a simpler selector
      const foundersAwardsSection = document.querySelector('.metric-card')?.closest('section');
      
      // Find the Calendar section
      const calendarSection = document.querySelector('#calendar');
      
      // Find the Footer bottom element
      const footerBottom = document.querySelector('.footer-bottom');
      
      if (!animatedCard) {
        // Fallback to other possible selectors
        animatedCard = document.querySelector('.all-in-one-section .stacked-card');
        
        if (debug && !animatedCard) {
          console.log('Could not find animated card with any selector');
        }
      }
      
      if (debug) {
        if (processSection) {
          const rect = processSection.getBoundingClientRect();
          console.log(`Simple title position: top=${rect.top}, bottom=${rect.bottom}`);
        }
        
        if (animatedCard) {
          const rect = animatedCard.getBoundingClientRect();
          console.log(`Animated card position: top=${rect.top}, bottom=${rect.bottom}, visible=${rect.top < window.innerHeight}`);
        }
        
        if (foundersAwardsSection) {
          const rect = foundersAwardsSection.getBoundingClientRect();
          console.log(`FoundersAwards section position: top=${rect.top}, bottom=${rect.bottom}`);
        }
        
        if (calendarSection) {
          const rect = calendarSection.getBoundingClientRect();
          console.log(`Calendar section position: top=${rect.top}, bottom=${rect.bottom}`);
        }
        
        if (footerBottom) {
          const rect = footerBottom.getBoundingClientRect();
          console.log(`Footer bottom position: top=${rect.top}, bottom=${rect.bottom}`);
        }
      }
      
      // Determine visibility state
      let shouldShowNavbar = false;
      
      // First condition: Show when simple title is 20% from top
      if (processSection) {
        const sectionRect = processSection.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.2;
        
        if (sectionRect.top <= triggerPoint) {
          shouldShowNavbar = true;
          if (debug) console.log('Condition 1: Simple title is in view - should show navbar');
        }
      }
      
      // Second condition: Hide when animated card is 10% visible
      if (animatedCard) {
        const cardRect = animatedCard.getBoundingClientRect();
        const cardVisibilityThreshold = window.innerHeight * 0.9; // 10% from top means card is 90% still below
        
        if (cardRect.top < cardVisibilityThreshold) {
          shouldShowNavbar = false;
          if (debug) console.log('Condition 2: Animated card is visible - should hide navbar');
        }
      }
      
      // Third condition: Show when FoundersAwards section is 10% from the top
      if (foundersAwardsSection) {
        const sectionRect = foundersAwardsSection.getBoundingClientRect();
        const sectionTriggerPoint = window.innerHeight * 0.1; // 10% from the top
        
        if (sectionRect.top <= sectionTriggerPoint) {
          shouldShowNavbar = true;
          if (debug) console.log('Condition 3: FoundersAwards section is 10% from top - should show navbar');
        }
      }
      
      // Fourth condition: Hide when Calendar section is 10% from the top
      if (calendarSection) {
        const sectionRect = calendarSection.getBoundingClientRect();
        const sectionTriggerPoint = window.innerHeight * 0.1; // 10% from the top
        
        if (sectionRect.top <= sectionTriggerPoint) {
          shouldShowNavbar = false;
          if (debug) console.log('Condition 4: Calendar section is 10% from top - should hide navbar');
        }
      }
      
      // Fifth condition: Show when Footer bottom element is visible
      if (footerBottom) {
        const footerRect = footerBottom.getBoundingClientRect();
        // Footer bottom is visible when its top enters the viewport
        if (footerRect.top < window.innerHeight) {
          shouldShowNavbar = true;
          if (debug) console.log('Condition 5: Footer bottom is visible - should show navbar');
        }
      }
      
      // Apply visibility state
      setIsVisible(shouldShowNavbar);
      
      if (debug) console.log(`Navbar visibility: ${shouldShowNavbar}`);
    };

    // Initial check
    handleScroll();

    // Add scroll event listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  // Handle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  // Handle smooth scrolling to sections with title at 10% from top
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Get the target section
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Element to position at 10% from top
      let targetElement;
      
      // Special case for Calendar section
      if (targetId === '#calendar') {
        // Try to find elements that might contain the "LIMITED SPOTS AVAILABLE" text
        const elements = targetSection.querySelectorAll('h3, h4, p, .uppercase, .text-xs, .text-sm');
        
        for (const el of elements) {
          if (el.textContent?.includes('LIMITED SPOTS AVAILABLE')) {
            targetElement = el;
            break;
          }
        }
      }
      
      // For other sections, find the title element
      if (!targetElement) {
        targetElement = 
          targetSection.querySelector('h1, h2, h3, .section-title, .pricing-main-title, .text-gradient') || 
          targetSection;
      }
      
      // Get target element position
      const elementRect = targetElement.getBoundingClientRect();
      
      // Calculate current scroll position
      const currentScrollPos = window.scrollY;
      
      // Calculate offset (10% of viewport height)
      const offset = window.innerHeight * 0.1;
      
      // Calculate target scroll position (current position + element's top position - offset)
      const targetScrollPos = currentScrollPos + elementRect.top - offset;
      
      // Scroll smoothly to target position
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav 
        className={`fixed bottom-[10%] left-1/2 -translate-x-1/2 h-[52px] p-1 flex items-start gap-2.5 
          rounded-[32px] border border-[#393939] bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] 
          z-40 transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
          lg:flex hidden`}
      >
        <div className="flex items-center h-full">
          <a 
            href="#simple" 
            className="flex w-[147px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              border border-transparent
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:border-[#424242] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:text-white
              transition-all duration-300 ease-in-out"
            onClick={(e) => handleNavClick(e, '#simple')}
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="flex w-[147px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              border border-transparent
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:border-[#424242] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:text-white
              transition-all duration-300 ease-in-out"
            onClick={(e) => handleNavClick(e, '#pricing')}
          >
            Pricing
          </a>
          <a 
            href="#calendar" 
            className="flex w-[147px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              border border-transparent
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:border-[#424242] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:text-white
              transition-all duration-300 ease-in-out"
            onClick={(e) => handleNavClick(e, '#calendar')}
          >
            Book a call
          </a>
          <a 
            href="#pricing" 
            className="flex w-[147px] h-[44px] px-[15px] justify-center items-center rounded-[32px] 
              text-[#86868B] text-[14px] font-['Helvetica_Neue'] leading-[14px] tracking-[-0.5px] whitespace-nowrap 
              border border-transparent
              hover:bg-gradient-to-b hover:from-[#3B3B3B] hover:via-[#302F32] hover:to-[#1C1C1C] 
              hover:border-[#424242] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] hover:text-white
              transition-all duration-300 ease-in-out"
            onClick={(e) => handleNavClick(e, '#pricing')}
          >
            Apply now
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button 
          className="absolute top-6 right-6 w-10 h-10" 
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <span className="block absolute w-6 h-0.5 bg-white rotate-45 translate-y-0"></span>
          <span className="block absolute w-6 h-0.5 bg-white -rotate-45 translate-y-0"></span>
        </button>
        
        <div className="flex flex-col items-center space-y-8">
          <a 
            href="#simple" 
            className="text-white text-2xl"
            onClick={(e) => {
              handleNavClick(e, '#simple');
              toggleMobileMenu();
            }}
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="text-white text-2xl"
            onClick={(e) => {
              handleNavClick(e, '#pricing');
              toggleMobileMenu();
            }}
          >
            Pricing
          </a>
          <a 
            href="#calendar" 
            className="text-white text-2xl"
            onClick={(e) => {
              handleNavClick(e, '#calendar');
              toggleMobileMenu();
            }}
          >
            Book a call
          </a>
          <a 
            href="#pricing" 
            className="text-white text-xl mt-8 border border-white px-8 py-3 rounded-full"
            onClick={(e) => {
              handleNavClick(e, '#pricing');
              toggleMobileMenu();
            }}
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Mobile Menu Hamburger Button */}
      <button 
        className={`fixed top-6 right-6 w-7 h-5 flex flex-col justify-between z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <span className="block w-full h-0.5 bg-white/80"></span>
        <span className="block w-full h-0.5 bg-white/80"></span>
        <span className="block w-full h-0.5 bg-white/80"></span>
      </button>
    </>
  );
};

export default Navbar; 