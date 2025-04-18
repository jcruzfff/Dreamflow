"use client";

import { useState, useEffect, useRef } from 'react';
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

const AllInOneDesign = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Handle card click
  const handleCardClick = (cardId: number) => {
    setActiveCard(cardId);
  };
  
  // Animation setup
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
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
    
    // Initial card animation
    const cardEls = cardsRef.current?.querySelectorAll('.stacked-card');
    if (cardEls && cardEls.length > 0) {
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center mb-16 md:mb-24"
        >
          Your all-in-one design team
        </h2>
        
        <div 
          ref={cardsRef}
          className="relative flex flex-col items-center"
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`stacked-card w-full max-w-[1114px] h-[385px] rounded-[38.5px] bg-gradient-to-b from-[#1f1f1f] to-[#111111] 
                shadow-[inset_0px_1.32px_2.64px_0px_rgba(82,81,84,1.00),0px_-40px_32.94px_-6.59px_rgba(0,0,0,0.80),0px_13.18px_13.18px_-6.59px_rgba(0,0,0,0.90)] 
                p-[47px_42px] mb-6 cursor-pointer transition-all duration-300 overflow-hidden ${
                index === activeCard 
                  ? 'z-10' 
                  : index < activeCard 
                    ? `z-${10-Math.abs(index-activeCard)} -translate-y-${Math.abs(index-activeCard) * 6} opacity-${Math.max(40, 100 - Math.abs(index-activeCard) * 15)}`
                    : `z-${10-Math.abs(index-activeCard)} translate-y-${Math.abs(index-activeCard) * 6} opacity-${Math.max(40, 100 - Math.abs(index-activeCard) * 15)}`
              }`}
              style={{
                transform: `translateY(${(index - activeCard) * 24}px)`,
                opacity: Math.max(0.4, 1 - Math.abs(index - activeCard) * 0.15),
                zIndex: 10 - Math.abs(index - activeCard)
              }}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="flex justify-between h-full">
                <div className="flex flex-col justify-between">
                  <h3 className="text-white text-[39.71px] font-bold font-['Helvetica_Neue']">{card.title}</h3>
                  <p className="text-white text-[28px] font-normal font-['Helvetica_Neue'] leading-[33.6px] tracking-wide max-w-[516px]">{card.description}</p>
                </div>
                
                <div className="w-[412px] h-[301px] rounded-[30px] overflow-hidden bg-black">
                  <Image 
                    src={card.image} 
                    alt={card.title}
                    width={500}
                    height={301}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllInOneDesign; 