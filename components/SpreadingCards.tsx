"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SpreadingCards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial state - center content invisible
    gsap.set([
      contentRef.current?.querySelector('.logo'),
      contentRef.current?.querySelectorAll('.line p'),
      contentRef.current?.querySelector('.subtext'),
      contentRef.current?.querySelector('.btn button')
    ], {
      opacity: 0,
      y: 0,
      pointerEvents: 'none'
    });
    
    // Create responsive animation
    const mm = gsap.matchMedia();
    
    // Mobile animation (below 768px)
    mm.add("(max-width: 767px)", () => {
      // Get the three cards we want to animate on mobile
      const topRight = cardsContainerRef.current?.querySelector('.row:nth-child(1) .card-right');
      const middleLeft = cardsContainerRef.current?.querySelector('.row:nth-child(2) .card-left');
      const bottomRight = cardsContainerRef.current?.querySelector('.row:nth-child(3) .card-right');
      
      // Hide other cards on mobile
      gsap.utils.toArray('.card-left, .card-right').forEach((card: any) => {
        if (card !== topRight && card !== middleLeft && card !== bottomRight) {
          gsap.set(card, { display: 'none' });
        }
      });
      
      // Set initial positions
      gsap.set([topRight, middleLeft, bottomRight], { 
        x: 0
      });
      
      // Create exit-to-sides animations
      gsap.to(topRight, {
        x: 500,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "center center",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      });
      
      gsap.to(middleLeft, {
        x: -500,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "center center",
          scrub: 1.2,
          toggleActions: "play none none reverse"
        }
      });
      
      gsap.to(bottomRight, {
        x: 500,
        scrollTrigger: {
          trigger: bottomRight,
          start: "top bottom",
          end: "center center",
          scrub: 1.4,
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate text and button
      gsap.to([
        contentRef.current?.querySelector('.logo'),
        contentRef.current?.querySelectorAll('.line p'),
        contentRef.current?.querySelector('.subtext')
      ], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      gsap.to(contentRef.current?.querySelector('.btn button'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onComplete: () => {
            gsap.set(contentRef.current?.querySelector('.btn button'), {
              pointerEvents: 'auto'
            });
          }
        }
      });
    });
    
    // Desktop animation (768px and above)
    mm.add("(min-width: 768px)", () => {
      // Get all rows of cards
      const rows = cardsContainerRef.current?.querySelectorAll('.row');
      
      if (!rows) return;
      
      // Spread values for each row
      const leftXValues = [-800, -700, -500];
      const rightXValues = [800, 700, 500];
      const leftRotationValues = [-30, -20, -30];
      const rightRotationValues = [30, 20, 30];
      const yValues = [100, -150, -400];
      
      rows.forEach((row, index) => {
        const cardLeft = row.querySelector('.card-left');
        const cardRight = row.querySelector('.card-right');
        
        if (!cardLeft || !cardRight) return;
        
        // Create scroll-based animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Apply transformations based on scroll progress
            if (cardLeft) {
              cardLeft.setAttribute('style', 
              `transform: translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`);
            }
            
            if (cardRight) {
              cardRight.setAttribute('style', 
              `transform: translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`);  
            }
            
            // Fade in content based on card spread progress
            if (progress > 0.2) {
              const contentProgress = (progress - 0.2) / 0.3;
              const opacity = Math.min(contentProgress, 1);
              
              gsap.to([
                contentRef.current?.querySelector('.logo'),
                contentRef.current?.querySelectorAll('.line p'),
                contentRef.current?.querySelector('.subtext')
              ], {
                opacity: opacity,
                duration: 0.1,
                overwrite: true
              });
              
              gsap.to(contentRef.current?.querySelector('.btn button'), {
                opacity: opacity,
                duration: 0.1,
                overwrite: true,
                onComplete: function() {
                  if (opacity === 1) {
                    gsap.set(contentRef.current?.querySelector('.btn button'), {
                      pointerEvents: "auto"
                    });
                  }
                }
              });
            }
          }
        });
      });
    });
    
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Cards Container */}
        <div 
          ref={cardsContainerRef}
          className="absolute inset-0 z-0"
        >
          {/* Row 1 */}
          <div className="row flex justify-between mb-16 md:mb-32">
            <div className="card-left w-1/3 md:w-auto">
              <img 
                src="./images/t-left.svg" 
                alt="Top left design" 
                className="w-full max-w-sm" 
              />
            </div>
            <div className="card-right w-1/3 md:w-auto">
              <img 
                src="./images/t-right.svg" 
                alt="Top right design" 
                className="w-full max-w-sm" 
              />
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="row flex justify-between mb-16 md:mb-32">
            <div className="card-left w-1/3 md:w-auto">
              <img 
                src="./images/m-left.svg" 
                alt="Middle left design" 
                className="w-full max-w-sm" 
              />
            </div>
            <div className="card-right w-1/3 md:w-auto">
              <img 
                src="./images/m-right.svg" 
                alt="Middle right design" 
                className="w-full max-w-sm" 
              />
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="row flex justify-between">
            <div className="card-left w-1/3 md:w-auto">
              <img 
                src="./images/b-left.svg" 
                alt="Bottom left design" 
                className="w-full max-w-sm" 
              />
            </div>
            <div className="card-right w-1/3 md:w-auto">
              <img 
                src="./images/b-right.svg" 
                alt="Bottom right design" 
                className="w-full max-w-sm" 
              />
            </div>
          </div>
        </div>
        
        {/* Center Content */}
        <div 
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center"
        >
          <div className="logo mb-6">
            <img 
              src="./images/dreamflow-small-icon.svg" 
              alt="Dreamflow" 
              className="w-16 h-16 md:w-20 md:h-20" 
            />
          </div>
          
          <div className="line">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">Join The #1 Design</p>
          </div>
          <div className="line">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">Subscription For</p>
          </div>
          <div className="line mb-6">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">Startups.</p>
          </div>
          
          <p className="subtext text-xl text-white/80 mb-8">Let's bring your vision to life.</p>
          
          <div className="btn">
            <button className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpreadingCards; 