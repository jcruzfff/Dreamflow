"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type TestimonialData = {
  content: string;
  authorImage: string;
  title: string;
  name: string;
};

const testimonials: TestimonialData[] = [
  {
    content: "They really understood what we needed, brought our vision to life and overdelivered.",
    authorImage: "/images/dexari-founder.png",
    title: "Founder",
    name: "Dexari | Zac Barron",
  },
  {
    content: "Exceptional design work that elevated our brand identity. Their attention to detail is unmatched.",
    authorImage: "/images/jutsu-founder.png",
    title: "Founder",
    name: "Jutsu | Zahid Islam",
  },
  {
    content: "Working with Dreamflow has been transformative. They consistently deliver outstanding results.",
    authorImage: "/images/trylivepeer-founder.png",
    title: "Founder",
    name: "TryLivepeer | Elliot Braem",
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Functions to navigate slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-slide effect
  useEffect(() => {
    // Start auto-sliding
    intervalRef.current = setInterval(nextSlide, 5000);
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Reset interval when manually changing slide
  const handleNavClick = (direction: 'next' | 'prev') => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    
    // Restart auto-slide
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Slider Navigation */}
          <div className="absolute -left-10 md:-left-16 top-1/2 -translate-y-1/2 z-10">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-full"
              onClick={() => handleNavClick('prev')}
              aria-label="Previous testimonial"
            >
              <Image 
                src="/icons/left-arrow.svg" 
                alt="Previous" 
                width={20}
                height={20}
                className="w-5 h-5" 
              />
            </button>
          </div>
          
          <div className="absolute -right-10 md:-right-16 top-1/2 -translate-y-1/2 z-10">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-full"
              onClick={() => handleNavClick('next')}
              aria-label="Next testimonial"
            >
              <Image 
                src="/icons/right-arrow.svg" 
                alt="Next" 
                width={20}
                height={20}
                className="w-5 h-5" 
              />
            </button>
          </div>
          
          {/* Testimonial content */}
          <div className="flex flex-col items-center">
            {/* Author Image */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-8">
              <Image 
                src={testimonials[currentSlide].authorImage}
                alt={testimonials[currentSlide].name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Testimonial Quote */}
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium">
                &ldquo;{testimonials[currentSlide].content}&rdquo;
              </p>
            </div>
            
            {/* Author Info */}
            <div className="flex flex-col items-center">
              <div className="text-lg md:text-xl text-white/70 mb-1">
                {testimonials[currentSlide].title}
              </div>
              <div className="text-lg md:text-xl text-white mb-3">
                {testimonials[currentSlide].name}
              </div>
              <div className="mb-16">
                <Image 
                  src="/images/stars.png" 
                  alt="5 star rating" 
                  width={120}
                  height={32}
                  className="h-8" 
                />
              </div>
            </div>
          </div>
          
          {/* Testimonial indicator dots */}
          <div className="flex justify-center mt-2 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                  }
                  intervalRef.current = setInterval(nextSlide, 5000);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Awards section */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 mt-8">
          <Image 
            src="/images/award-one.svg" 
            alt="Good Design Award 2023" 
            width={140}
            height={140}
            className="h-24 md:h-28" 
          />
          <Image 
            src="/images/award-two.svg" 
            alt="AI Awards" 
            width={140}
            height={140}
            className="h-24 md:h-28" 
          />
          <Image 
            src="/images/award-three.svg" 
            alt="Upwork 5 stars" 
            width={140}
            height={140}
            className="h-24 md:h-28" 
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 