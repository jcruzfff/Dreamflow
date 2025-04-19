"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

type CardData = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const cards: CardData[] = [
  {
    id: 0,
    title: "UX/UI Design",
    description: "Mobile apps, dApps, demo-ready prototypes",
    image: "/images/ux-design.png"
  },
  {
    id: 1,
    title: "Brand Identity & Positioning",
    description: "Logos, guidelines, and complete brand systems",
    image: "/images/brand-design.png"
  },
  {
    id: 2,
    title: "Web Design & Development",
    description: "Responsive websites and web applications",
    image: "/images/web-design.png"
  },
  {
    id: 3,
    title: "Content & Motion Graphics",
    description: "Social media content and promotional videos",
    image: "/images/video-design.png"
  },
  {
    id: 4,
    title: "Pitch Decks & Presentations",
    description: "Investor-ready presentations and pitch materials",
    image: "/images/pitch-design.png"
  },
];

// Extend Window interface to include our custom property
declare global {
  interface Window {
    resizeTimer?: NodeJS.Timeout;
  }
}

const AllInOneDesign = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle card click
  const handleCardClick = (cardId: number) => {
    // Card click handler for future interactivity
    console.log(`Card ${cardId} clicked`);
  };
  
  // Animation setup
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Card stacking animation
    const initCardAnimation = () => {
      const cardEls = cardsRef.current?.querySelectorAll('.stacked-card');
      if (!cardEls || cardEls.length === 0) return;
      
      // Define the correct order for cards to appear - from bottom to top
      const cardOrder = [
        cardEls[4], // Pitch Decks & Presentations (first to appear, bottom)
        cardEls[3], // Content & Motion Graphics
        cardEls[2], // Web Design & Development
        cardEls[1], // Brand Identity & Positioning
        cardEls[0]  // UX/UI Design (last to appear, top)
      ];
      
      // Kill any existing ScrollTrigger instance
      const existingST = ScrollTrigger.getById("cardStackingAnimation");
      if (existingST) existingST.kill();
      
      // Set initial positions for title and first card
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
      gsap.set(cardOrder[0], { y: 0, opacity: 1 }); // First card visible immediately
      
      // All other cards start below the viewport
      for (let i = 1; i < cardOrder.length; i++) {
        gsap.set(cardOrder[i], {
          y: 1000,
          opacity: 1
        });
      }
      
      // Use different offsets for different screen sizes
      const cardOffset = window.innerWidth <= 768 ? 42 : 64;
      
      // Create a pinned section with ScrollTrigger
      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 5%", // Start a bit further down to make it smoother
          end: "+=1500", // More scroll space to prevent early unpinning
          scrub: 0.8, // Smoother scrub with slight delay
          pin: true,
          pinSpacing: true,
          anticipatePin: 1, // Help prevent jerky pin behavior
          id: "cardStackingAnimation",
        }
      });
      
      // Animate all cards in sequence with smoother timing
      for (let i = 1; i < cardOrder.length; i++) {
        cardTimeline.to(cardOrder[i], {
          y: i * cardOffset,
          duration: 0.7, // Longer duration for smoother effect
          ease: "power2.inOut", // More natural easing
        }, (i - 1) * 0.25); // More spacing between animations
      }
      
      // Add a small delay at the end to hold the pin before releasing
      cardTimeline.to({}, { duration: 0.5 });
    };
    
    // Initialize card animation
    setTimeout(initCardAnimation, 500);
    
    // Handle window resize
    const handleResize = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        initCardAnimation();
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 bg-black min-h-screen all-in-one-section"
    >
      <div className="container mx-auto max-w-6xl all-in-one-content">
        <h2 
          ref={titleRef}
          className="text-[34px] md:text-5xl lg:text-[72px] text-gradient font-medium text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-[#AAAAAA] pt-6 md:pt-0 mb-[18px] md:mb-10"
        >
          Your all-in-one design team
        </h2>
        
        <div 
          ref={cardsContainerRef}
          className="relative w-full max-w-[1114px] h-[600px] sm:h-[700px] md:h-[800px] mx-auto mt-[42px] overflow-visible stacked-cards-container"
        >
          <div ref={cardsRef} className="relative">
            {cards.map((card) => (
              <div
                key={card.id}
                data-card={card.id}
                className={`stacked-card absolute w-full max-w-[1114px] h-[280px] sm:h-[320px] md:h-[385px] rounded-[20px] md:rounded-[38.5px] bg-gradient-to-b from-[#1f1f1f] to-[#111111] 
                  shadow-[inset_0px_1.32px_2.64px_0px_rgba(82,81,84,1.00),0px_-40px_32.94px_-6.59px_rgba(0,0,0,0.80),0px_13.18px_13.18px_-6.59px_rgba(0,0,0,0.90)] 
                  p-6 sm:p-6 md:p-[47px_42px] cursor-pointer transition-all duration-300 will-change-transform overflow-hidden`}
                style={{
                  zIndex: 50 - card.id * 10, // UX/UI (index 0) will have z-index 50, Pitch Decks (index 4) will have z-index 10
                  opacity: 0, // Start with opacity 0, animation will set to 1
                  transform: 'translateY(1000px)', // Start off-screen, animation will position
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  top: 0,
                }}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="flex flex-col-reverse md:flex-row justify-between h-full gap-6 md:gap-0">
                  <div className="flex flex-col justify-between card-content pr-[24px]">
                    <h3 className="text-white text-xl sm:text-2xl md:text-[39.71px] font-bold font-['Helvetica_Neue']">{card.title}</h3>
                    <p className="text-[#86868B] text-[18px] sm:text-xl md:text-[28px] font-normal font-['Helvetica_Neue'] leading-tight md:leading-[33.6px] tracking-wide max-w-full md:max-w-[516px]">{card.description}</p>
                  </div>
                  
                  <div className="w-full md:w-[412px] h-[120px] sm:h-[150px] md:h-[301px] rounded-xl md:rounded-[30px] overflow-hidden bg-black card-image-placeholder flex-shrink-0">
                    <Image 
                      src={card.image} 
                      alt={card.title}
                      width={500}
                      height={301}
                      className="w-full h-full object-cover card-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllInOneDesign; 