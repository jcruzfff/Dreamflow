"use client";


import { useState } from 'react';
import Image from 'next/image';
import EmailSignupOverlay from './components/EmailSignupOverlay';

const NewsletterPage = () => {
  const [showEmailOverlay, setShowEmailOverlay] = useState(false);

  const testimonials = [

  
    
    {
      name: "Preston L",
      title: "Co Founder | Soltar", 
      quote: "Visioneer is the only newsletter I use. Every drop gives us a proven system we implement real results, zero fluff, shared with my whole team",
      image: "/images/soltar-founder.png"
    },
    {
      name: " Alex R",
      title: "Founder | Deliberate Self",
      quote: "Visioneer saved me over 20 hours in the first week. I used it to launch a clean, scalable brand with systems that actually work - without hiring a full team.",
      image: "/images/deliberate-founder.png" // Using existing image as placeholder
    },
    {
      name: "Zac B",
      title: "Co Founder | Dexari",
      quote: "We raised $3M in seed funding after launching with Dreamflow. The brand, UX, and systems did exactly what investors and users needed to say yes.",
      image: "/images/dexari-founder.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
  

      {/* Header */}
      <header className="relative z-10 flex justify-center items-center pt-8 pb-12">
        <div className="flex items-center gap-3">
          <Image 
            src="/icons/dreamflow-small-icon.svg"
            alt="Dreamflow"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-[22.32px] font-normal font-['Helvetica_Neue'] capitalize text-white">
            Dreamflow
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 lg:px-[180px] pt-4 lg:pt-14">
        {/* Hero Section */}
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-[55px] font-medium font-['Helvetica_Neue'] capitalize leading-tight lg:leading-[55px] mb-8  max-w-[499px]">
              The Newsletter To Help You Build A Profitable Brand.
            </h1>
            
            <p className="text-lg lg:text-[22px] font-normal font-['Helvetica_Neue'] leading-8 lg:leading-9 text-[#e9e9e9] mb-12  max-w-[478px]">
              Every week, get the exact systems, design templates and AI workflows that save time, drive growth and unlock founder freedom.
            </p>

            <button 
              onClick={() => setShowEmailOverlay(true)}
              className="w-[256px] h-[56px] bg-gradient-to-b from-[#F4CE84] via-[#E2B969] to-[#CEA24C] text-black rounded-full font-medium font-['Helvetica_Neue'] shadow-md border-2 border-[#D9BB75] hover:scale-105 transition-all duration-200 flex justify-center items-center"
            >
              GET THE SYSTEMS
            </button>
          </div>

          {/* Right side - Hero image placeholder */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="w-full h-[500px] lg:h-[450px] bg-gradient-to-br from-[#1d1d1d] to-[#2d2d2d] rounded-2xl border border-[#393939] flex items-center justify-center">
            
            </div>
          </div>
        </div>

        {/* Testimonials Section - matches hero container width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 mb-16 mt-16 lg:mb-24">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full max-w-[354px] lg:max-w-none mx-auto relative">
              {/* Profile Picture - positioned to overlap card */}
              <div className="w-[80px] h-[80px] lg:w-[103px] lg:h-[103px] bg-[#8b8b8b] rounded-full border-[0.65px] border-[#dddddd] overflow-hidden relative z-10 ml-6">
                <Image 
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={103}
                  height={103}
                  className="w-full h-full object-cover rounded-full"
                  quality={100}
                  unoptimized={true}
                />
              </div>

              {/* Card with gradient background */}
              <div className="w-full bg-gradient-to-b from-[#1F1F1F] to-[#111] rounded-3xl border border-[#393939] shadow-[0px_1.318px_2.635px_0px_#525154_inset] p-6 pt-12 -mt-[40px] lg:-mt-[51px] relative">
                {/* Name and Title - stacked above quote on smaller screens, top-right on xl */}
                <div className="mb-4 lg:pt-6 xl:absolute xl:top-6 xl:right-6 xl:mb-0 xl:pt-0">
                  <h3 className="text-white text-lg font-semibold font-['Helvetica_Neue'] leading-tight xl:text-right">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#86868B] text-sm font-normal font-['Helvetica_Neue'] xl:text-right">
                    {testimonial.title}
                  </p>
                </div>
                
                {/* Quote */}
                <blockquote className="text-[#fdfdfd] text-base font-normal font-['Helvetica_Neue'] leading-7 pt-0 xl:pt-8">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Large preview image section - overhangs footer by 90px, extends beyond page edges */}
      <div className="mb-[-180px] relative z-20 flex justify-center overflow-hidden">
        <div className="w-[120vw] lg:w-[80%] h-[400px] lg:h-[679px] relative rounded-2xl overflow-hidden">
          <Image 
            src="/images/systems-image.png"
            alt="Dreamflow AI-First Org Chart"
            fill
            className="object-cover lg:object-contain object-center"
            quality={100}
            priority
            unoptimized={true}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-30 w-full min-h-[88px] bg-[#e4e4e4] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)] px-6 lg:px-[35px] py-4 lg:py-0">
        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col items-center gap-4">
          {/* Links on top for mobile */}
          <div className="flex items-center gap-4 text-black text-sm font-normal font-['Helvetica_Neue']">
            <a href="https://dreamflowlabs.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Website</a>
            <span>|</span>
            <a href="https://skool.com/dreamflow" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Skool</a>
            <span>|</span>
            <a href="https://calendly.com/dreamflowlabs/free-ux-audit-fix-friction-boost-adoption" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Contact</a>
          </div>
          
          {/* Bottom row for mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-black text-sm font-normal font-['Helvetica_Neue'] text-center">
            <p>Dreamflow Labs 2025</p>
            <span className="hidden sm:inline">|</span>
            <p>Privacy Policy - Terms of Use</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-[88px]">
          <p className="text-black text-sm font-normal font-['Helvetica_Neue']">
            Dreamflow Labs 2025 - All rights reserved
          </p>
          
          {/* Centered links for desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-black text-sm font-normal font-['Helvetica_Neue']">
            <a href="https://dreamflowlabs.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Visit Website</a>
            <span>|</span>
            <a href="https://skool.com/dreamflow" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Join the Skool Community</a>
            <span>|</span>
            <a href="https://calendly.com/dreamflowlabs/free-ux-audit-fix-friction-boost-adoption" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Contact</a>
          </div>

          <p className="text-black text-sm font-normal font-['Helvetica_Neue'] text-right">
            Privacy Policy - Terms of Use
          </p>
        </div>
      </footer>

      {/* Email Signup Overlay */}
      {showEmailOverlay && (
        <EmailSignupOverlay onClose={() => setShowEmailOverlay(false)} />
      )}

      <style jsx>{`
        .polygon-shape {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default NewsletterPage; 