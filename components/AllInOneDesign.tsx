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
      
      // First card visible immediately at base scale
      gsap.set(cardOrder[0], { 
        y: 0, 
        opacity: 1,
        scale: 0.88,
        xPercent: 0, 
        left: '50%',
        x: '-50%',
        transformOrigin: 'center center'
      });
      
      // All other cards start below the viewport
      for (let i = 1; i < cardOrder.length; i++) {
        gsap.set(cardOrder[i], {
          y: 1000,
          opacity: 1,
          scale: 0.88 + (i * 0.03), // Progressively larger scales for cards higher in stack
          xPercent: 0,
          left: '50%',
          x: '-50%',
          transformOrigin: 'center center'
        });
      }
      
      // Use different offsets for different screen sizes
      const cardOffset = window.innerWidth <= 768 ? 42 : 64;
      
      // Create a pinned section with ScrollTrigger
      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: window.innerWidth <= 770 ? "top 2%" : "top 3%", // Start at very top for mobile
          end: window.innerWidth <= 770 ? "+=1200" : "+=1500", // Original scroll distance
          scrub: 1.2, // Moderately increased scrub value for smoother animation
          pin: true,
          pinSpacing: true,
          anticipatePin: 1, // Help prevent jerky pin behavior
          id: "cardStackingAnimation",
        }
      });
      
      // Scale factors for each card in the stack (subtle scaling)
      // Bottom card (index 0) starts small, each card on top gets progressively larger
      const scaleFactors = [0.88, 0.91, 0.94, 0.97, 1];
      
      // Animate all cards in sequence with smoother timing
      for (let i = 1; i < cardOrder.length; i++) {
        // Animate each card with position AND scale
        cardTimeline.to(cardOrder[i], {
          y: i * cardOffset,
          scale: scaleFactors[i], // Apply the scale factor for this card
          duration: 1.4, // Increased duration for slower effect
          ease: "power2.inOut", // More natural easing
        }, (i - 1) * 0.75); // Increased spacing between animations
      }
      
      // Add a moderate delay at the end to hold the pin before releasing
      cardTimeline.to({}, { duration: 0.9 });
      
      // Reset any GSAP inline styles that might be interfering with responsive classes
      window.addEventListener('resize', () => {
        const cards = document.querySelectorAll('.stacked-card');
        cards.forEach(card => {
          // Only reset styles that don't affect the animation positioning
          const cardElement = card as HTMLElement;
          if (cardElement.style.fontSize) cardElement.style.fontSize = '';
        });
      });
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
      className="py-12 pb-0 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 bg-black/60 min-h-[80vh] all-in-one-section"
    >
      <div className="container mx-auto max-w-6xl all-in-one-content">
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
          className="text-[34px] md:text-5xl lg:text-[72px] text-gradient font-medium text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-[#AAAAAA] pt-4 md:pt-0 mb-[8px] md:mb-10 leading-[110%] w-[90%] md:w-full mx-auto"
        >
          Your all-in-one design team
        </h2>
        
        <div 
          ref={cardsContainerRef}
          className="relative w-full max-w-[1114px] h-[600px] min-[770px]:h-[700px] md:h-[800px] mx-auto mt-[30px] md:mt-[42px] overflow-visible stacked-cards-container max-[770px]:h-[700px]"
        >
          <div ref={cardsRef} className="relative">
            {cards.map((card) => (
              <div
                key={card.id}
                data-card={card.id}
                className={`stacked-card absolute w-full max-w-[1114px] h-[280px] min-[770px]:h-[320px] md:h-[385px] rounded-[20px] md:rounded-[38.5px] bg-gradient-to-b from-[#1f1f1f] to-[#111111] 
                  shadow-[inset_0px_1.32px_2.64px_0px_rgba(82,81,84,1.00),0px_-40px_32.94px_-6.59px_rgba(0,0,0,0.80),0px_13.18px_13.18px_-6.59px_rgba(0,0,0,0.90)] 
                  p-5 min-[770px]:p-6 md:p-[47px_42px] cursor-pointer transition-all duration-300 will-change-transform overflow-hidden max-[770px]:h-auto max-[770px]:min-h-[320px] max-[900px]:p-[24px]`}
                style={{
                  zIndex: 50 - card.id * 10, // UX/UI (index 0) will have z-index 50, Pitch Decks (index 4) will have z-index 10
                  opacity: 0, // Start with opacity 0, animation will set to 1
                  transform: 'translateY(1000px)', // Start off-screen, animation will position
                  left: '50%',
                  right: 0,
                  margin: '0 auto',
                  top: 0,
                }}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="flex flex-col-reverse md:flex-row justify-between h-full gap-4 md:gap-0 max-[770px]:flex-col-reverse">
                  <div className="flex flex-col justify-between card-content pr-[24px] max-[770px]:pr-0 max-[770px]:mt-1">
                    <h3 className="text-white font-bold font-['Helvetica_Neue'] text-xl min-[770px]:text-2xl max-[770px]:mb-1
                      md:text-[38px] 
                      max-[1024px]:!text-[32px] 
                      max-[900px]:!text-[26px]">{card.title}</h3>
                    <p className="text-[#86868B] font-medium font-['Helvetica_Neue'] tracking-wide
                      text-[16px] min-[770px]:text-xl 
                      md:text-[28px] md:leading-[32px]
                      max-[1024px]:!text-[22px] max-[1024px]:!leading-[28px]
                      max-[900px]:!text-[18px] max-[900px]:!leading-[24px]
                      max-w-full xl:max-w-[516px]">{card.description}</p>
                  </div>
                  
                  <div className="w-full md:w-[412px] h-[120px] min-[770px]:h-[150px] md:h-[301px] rounded-xl md:rounded-[30px] overflow-hidden bg-black card-image-placeholder flex-shrink-0 max-[770px]:w-full max-[770px]:h-[180px] max-[770px]:aspect-[16/9]">
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