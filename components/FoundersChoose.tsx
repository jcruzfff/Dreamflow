"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const FoundersChoose = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  
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
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animate logo scrolling
    const logoContainer = logosRef.current?.querySelector('.clients-container');
    if (logoContainer) {
      gsap.to(logoContainer, {
        x: "-50%",
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    }
    
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section title */}
        <h2 
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-[72px] text-gradient font-medium text-center mb-16 md:mb-24 leading-[100%] tracking-[-1.44px]"
        >
          Designed For<br className="md:hidden" /> High-Growth Startups
        </h2>
        
        {/* Feature cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-20"
        >
          <div className="founder-card p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-start gap-2">
            <Image 
              src="/images/creative-icon.svg" 
              alt="Creative Team Icon" 
              width={48}
              height={48}
              className="w-12 h-12 mb-2" 
            />
            <h3 className="text-xl font-medium text-white">All-in-One Creative Team</h3>
            <p className="text-dreamflow-gray-light text-lg">No extensive hiring needed</p>
          </div>
          
          <div className="founder-card p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-start gap-2">
            <Image 
              src="/images/ai-icon.svg" 
              alt="AI Icon" 
              width={48}
              height={48}
              className="w-12 h-12 mb-2" 
            />
            <h3 className="text-xl font-medium text-white">Award-Winning Designers</h3>
            <p className="text-dreamflow-gray-light text-lg">North America-based senior talent</p>
          </div>
          
          <div className="founder-card p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-start gap-2">
            <Image 
              src="/images/pricing-icon.svg" 
              alt="Pricing Icon" 
              width={48}
              height={48}
              className="w-12 h-12 mb-2" 
            />
            <h3 className="text-xl font-medium text-white">Predictable Pricing</h3>
            <p className="text-dreamflow-gray-light text-lg">Fixed monthly rate. No surprises.</p>
          </div>
          
          <div className="founder-card p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-start gap-2">
            <Image 
              src="/images/dg-icon.svg" 
              alt="DreamGate Icon" 
              width={48}
              height={48}
              className="w-12 h-12 mb-2" 
            />
            <h3 className="text-xl font-medium text-white">DreamGate™ System</h3>
            <p className="text-dreamflow-gray-light text-lg">A seamless portal to manage your projects</p>
          </div>
          
          <div className="founder-card p-6 rounded-3xl bg-card-gradient shadow-card flex flex-col items-start gap-2">
            <Image 
              src="/images/ai-icon.svg" 
              alt="AI Icon" 
              width={48}
              height={48}
              className="w-12 h-12 mb-2" 
            />
            <h3 className="text-xl font-medium text-white">Web3 & AI Native</h3>
            <p className="text-dreamflow-gray-light text-lg">We speak it. Using the latest Web3 & AI tools</p>
          </div>
        </div>
        
        {/* Client logos */}
        <div ref={logosRef} className="w-full overflow-hidden mt-16 py-4">
          <div className="clients-container flex whitespace-nowrap">
            {/* First set of logos */}
            <div className="flex-shrink-0">
              <Image 
                src="/images/client_logos.svg" 
                alt="Client logos" 
                width={400}
                height={64}
                className="h-12 md:h-16" 
              />
            </div>
            {/* Duplicate for seamless scrolling */}
            <div className="flex-shrink-0">
              <Image 
                src="/icons/client_logos.svg" 
                alt="Client logos" 
                width={400}
                height={64}
                className="h-12 md:h-16" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersChoose; 