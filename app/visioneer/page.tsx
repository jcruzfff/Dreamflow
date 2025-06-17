"use client";


import { useState } from 'react';
import Image from 'next/image';
import EmailSignupOverlay from './components/EmailSignupOverlay';

const NewsletterPage = () => {
  const [showEmailOverlay, setShowEmailOverlay] = useState(false);

  const testimonials = [
    {
      name: "Preston Lee",
      title: "Co Founder | Soltar",
      quote: "Dreamflow brought our prototype to life with polished design and animations that made it feel like a final product.",
      image: "/images/jonathan.png" // Using existing image as placeholder
    },
    {
      name: "Preston Lee",
      title: "Co Founder | Soltar", 
      quote: "Dreamflow brought our prototype to life with polished design and animations that made it feel like a final product.",
      image: "/images/jonathan.png"
    },
    {
      name: "Preston Lee",
      title: "Co Founder | Soltar",
      quote: "Dreamflow brought our prototype to life with polished design and animations that made it feel like a final product.",
      image: "/images/jonathan.png"
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
      <main className="relative z-10 container mx-auto px-6 lg:px-[180px] mt-18">
        {/* Hero Section */}
        <div className="mb-24 lg:mb-24 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-[55px] font-medium font-['Helvetica_Neue'] capitalize leading-tight lg:leading-[55px] mb-8 lg:mb-12 max-w-[499px]">
              The Newsletter To Help You Build A Profitable Brand.
            </h1>
            
            <p className="text-lg lg:text-[22px] font-normal font-['Helvetica_Neue'] leading-8 lg:leading-9 text-[#e9e9e9] mb-12 lg:mb-16 max-w-[478px]">
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

                {/* Testimonials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 mt-16 lg:mb-24">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-[354px] h-[271px] relative mx-auto">
              {/* Card with bg-card.svg background */}
              <div 
                className="w-[354px] h-[238px] absolute left-0 top-[33px] rounded-3xl"
                style={{
                  backgroundImage: "url('/images/bg-card.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                {/* Name and Title */}
                <div className="absolute left-[156px] top-[20px] justify-start">
                  <span className="text-white text-lg font-semibold font-['Helvetica_Neue']">
                    {testimonial.name}<br/>
                  </span>
                  <span className="text-[#bababa] text-sm font-normal font-['Helvetica_Neue']">
                    {testimonial.title}
                  </span>
                </div>
                
                {/* Quote */}
                <div className="w-[306px] absolute left-[24px] top-[103px] justify-start text-[#fdfdfd] text-base font-normal font-['Helvetica_Neue'] leading-7">
                  &quot;{testimonial.quote}&quot;
                </div>
              </div>
              
              {/* Profile Picture */}
              <div className="w-[103px] h-[103px] absolute left-[24px] top-0 bg-[#8b8b8b] rounded-[651.16px] border-[0.65px] border-[#dddddd] overflow-hidden">
                <Image 
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={103}
                  height={103}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Large preview image section - overhangs footer by 90px, outside container */}
      <div className="mb-[-180px] relative z-20 w-full flex justify-center">
        <div className="w-[90%] h-[400px] lg:h-[679px] relative rounded-2xl overflow-hidden">
          <Image 
            src="/images/systems-image.png"
            alt="Dreamflow AI-First Org Chart"
            fill
            className="object-contain object-top"
            quality={100}
            priority
            unoptimized={true}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-30 w-full h-[88px] bg-[#e4e4e4] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)] flex items-center justify-between px-6 lg:px-[35px]">
        <p className="text-black text-sm font-normal font-['Helvetica_Neue']">
          Dreamflow Labs 2025 - All rights reserved
        </p>
        
        <div className="hidden lg:flex items-center gap-6 text-black text-sm font-normal font-['Helvetica_Neue']">
          <a href="#" className="hover:opacity-70">Visit Website</a>
          <span>|</span>
          <a href="#" className="hover:opacity-70">Join the Skool Community</a>
          <span>|</span>
          <a href="#" className="hover:opacity-70">Contact</a>
        </div>

        <p className="text-black text-sm font-normal font-['Helvetica_Neue'] text-right">
          Privacy Policy - Terms of Use
        </p>
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