"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

type TestimonialData = {
  content: string;
  authorImage: string;
  title: string;
  name: string;
};

const testimonials: TestimonialData[] = [
  {
    content: "\"They really understood what we needed, then brought our vision to life and overdelivered.\"",
    authorImage: "/images/dexari-founder.png",
    title: "Co-Founder",
    name: "Dexari | Zac Barron",
  },
  {
    content: "\"Exceptional design work that elevated our brand identity. Their attention to detail is unmatched.\"",
    authorImage: "/images/jutsu-founder.png",
    title: "Founder",
    name: "Jutsu | Zahid Islam",
  },
  {
    content: "\"Working with Dreamflow has been transformative. They consistently deliver results.\"",
    authorImage: "/images/trylivepeer-founder.png",
    title: "Co-Founder",
    name: "TryLivepeer | Elliot Braem",
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  
  // Function to handle fade-out animation, wrapped in useCallback
  const fadeOutTestimonial = useCallback(() => {
    return new Promise<void>((resolve) => {
      // Elements to fade out
      const quoteElement = contentRef.current?.querySelector('.testimonial-content');
      const imageElement = imageRef.current;
      const authorElement = document.querySelector('.author-info');
      
      // Create a timeline for sequential fade out
      const tl = gsap.timeline({
        onComplete: resolve // Resolve promise when animation completes
      });
      
      // Fade out quote lines if they exist
      if (quoteElement) {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // On mobile, fade out the entire quote at once
          const quoteText = quoteElement.querySelector('.quote-line');
          if (quoteText) {
            tl.to(quoteText, { 
              opacity: 0, 
              y: -10, 
              duration: 0.8, 
              ease: "power1.in" 
            });
          } else {
            // Fallback to fading the whole element
            tl.to(quoteElement, { 
              opacity: 0, 
              y: -10, 
              duration: 0.8, 
              ease: "power1.in" 
            });
          }
        } else {
          // On desktop, fade out line by line as before
          const lineElements = quoteElement.querySelectorAll('.quote-line');
          if (lineElements.length > 0) {
            tl.to(lineElements, { 
              opacity: 0, 
              y: -10, 
              duration: 0.8, 
              stagger: 0.1, 
              ease: "power1.in" 
            });
          } else {
            // If no line elements, fade out the whole quote
            tl.to(quoteElement, { 
              opacity: 0, 
              y: -10, 
              duration: 0.8, 
              ease: "power1.in" 
            });
          }
        }
      }
      
      // Fade out author image and info simultaneously
      tl.to([imageElement, authorElement], { 
        opacity: 0, 
        duration: 0.6, 
        ease: "power1.in" 
      }, "-=0.4"); // Start slightly before quote fade completes
    });
  }, [contentRef, imageRef]);
  
  // Functions to navigate slides with fade-out effect, wrapped in useCallback
  const nextSlide = useCallback(() => {
    if (isAnimating) return; // Prevent multiple animations from running
    
    setIsAnimating(true);
    
    // Fade out current testimonial
    fadeOutTestimonial().then(() => {
      // Update slide after fade out completes
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    });
  }, [isAnimating, fadeOutTestimonial]);
  
  const prevSlide = useCallback(() => {
    if (isAnimating) return; // Prevent multiple animations from running
    
    setIsAnimating(true);
    
    // Fade out current testimonial
    fadeOutTestimonial().then(() => {
      // Update slide after fade out completes
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    });
  }, [isAnimating, fadeOutTestimonial]);
  
  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next slide
      handleNavClick('next');
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous slide
      handleNavClick('prev');
    }
  };
  
  // Initial animations and setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate content elements
    if (contentRef.current && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animate awards with stagger
    if (awardsRef.current) {
      const awards = awardsRef.current.querySelectorAll('img');
      gsap.fromTo(
        awards,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Auto-slide effect
  useEffect(() => {
    // Start auto-sliding with 8 seconds interval
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 8000);
    };
    
    startAutoSlide();
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide]);
  
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
    
    // Restart auto-slide with 8 seconds
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };

  // Slide transition animation
  useEffect(() => {
    // Animate the testimonial content
    if (contentRef.current) {
      // Get the quote element
      const quoteElement = contentRef.current.querySelector('.testimonial-content');
      
      if (quoteElement) {
        // Clear existing content
        quoteElement.innerHTML = '';
        
        // Check if mobile view (can be detected by window width)
        const isMobile = window.innerWidth < 768; // 768px is commonly used as the md breakpoint
        
        if (isMobile) {
          // For mobile: Create a single element with the entire quote
          const quoteText = document.createElement('span');
          quoteText.classList.add('quote-line');
          quoteText.textContent = testimonials[currentSlide].content;
          quoteText.style.display = 'inline-block';
          quoteText.style.opacity = '0';
          quoteElement.appendChild(quoteText);
          
          // Animate the entire quote at once
          gsap.fromTo(
            quoteText,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.6,
              ease: "power1.inOut", 
              delay: 0.3
            }
          );
        } else {
          // For desktop: Split the text into lines based on reasonable line breaks
          const text = testimonials[currentSlide].content;
          const words = text.split(' ');
          const lines: string[] = [];
          let currentLine = '';
          
          // Create reasonable line breaks (roughly 5-7 words per line)
          words.forEach((word, index) => {
            currentLine += word + ' ';
            if ((index + 1) % 5 === 0 || index === words.length - 1) {
              lines.push(currentLine.trim());
              currentLine = '';
            }
          });
          
          // Create and append line elements
          lines.forEach((line, index) => {
            const lineElement = document.createElement('span');
            lineElement.classList.add('quote-line');
            lineElement.textContent = index === 0 ? line : ' ' + line;
            lineElement.style.display = 'inline-block';
            lineElement.style.opacity = '0';
            quoteElement.appendChild(lineElement);
          });
          
          // Animate each line sequentially
          const lineElements = quoteElement.querySelectorAll('.quote-line');
          gsap.fromTo(
            lineElements,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.6,    
              stagger: 0.4,     
              ease: "power1.inOut", 
              delay: 0.3        
            }
          );
        }
      }
    }
    
    // Cross-fade the author image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.2, 
          ease: "power1.inOut" 
        }
      );
    }
    
    // Cross-fade the author info (name and title)
    const authorInfo = document.querySelector('.author-info');
    if (authorInfo) {
      gsap.fromTo(
        authorInfo,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.2, 
          ease: "power1.inOut" 
        }
      );
    }
  }, [currentSlide]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 pb-20 md:pb-24 lg:pb-48 px-4 md:px-8 lg:px-12  bg-black/75 
          relative z-10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Slider Navigation - Hidden on mobile */}
          <div className="hidden md:block absolute -left-4  top-1/2 -translate-y-[100%] z-50">
            <button 
              className="w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 group"
              onClick={() => handleNavClick('prev')}
              aria-label="Previous testimonial"
            >
              <svg 
                width="42" 
                height="42" 
                viewBox="0 0 42 42" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 group-hover:brightness-150 group-hover:-translate-x-1"
              >
                <circle cx="21" cy="21" r="20" stroke="#3c3a3a" strokeWidth="2" />
                <path d="M23 15L17 21L23 27" stroke="#7e8185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <div className="hidden md:block absolute -right-4  top-1/2 -translate-y-[100%] z-50">
            <button 
              className="w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 group"
              onClick={() => handleNavClick('next')}
              aria-label="Next testimonial"
            >
              <svg 
                width="42" 
                height="42" 
                viewBox="0 0 42 42" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 group-hover:brightness-150 group-hover:translate-x-1"
              >
                <circle cx="21" cy="21" r="20" stroke="#3c3a3a" strokeWidth="2" />
                <path d="M19 15L25 21L19 27" stroke="#7e8185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          {/* Testimonial content with touch events for mobile */}
          <div 
            className="flex flex-col items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Author Image */}
            <div 
              ref={imageRef}
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-8 md:mb-10 lg:mb-12"
            >
              <Image 
                src={testimonials[currentSlide].authorImage}
                alt={testimonials[currentSlide].name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Testimonial Quote */}
            <div 
              ref={contentRef}
              className="text-center mb-8 max-w-[714px] mx-auto px-4 sm:px-6 md:px-0"
            >
              <p className="testimonial-content text-[24px] md:text-[36px] text-white font-medium md:font-normal leading-[130%]">
                {testimonials[currentSlide].content}
              </p>
            </div>
            
            {/* Author Info */}
            <div className="author-info flex flex-col items-center">
              <div className="text-lg lg:text-[22px] text-white font-medium mb-1">
                {testimonials[currentSlide].title}
              </div>
              <div className="text-lg lg:text-[22px] text-gray-400 font-medium mb-3">
                {testimonials[currentSlide].name}
              </div>
              <div className="mb-3 sm:mb-8 md:mb-10">
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
          
          {/* Testimonial indicator dots - Only visible on mobile */}
          <div 
            ref={dotsRef}
            className="flex md:hidden justify-center mt-8 space-x-3"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
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
        <div 
          ref={awardsRef}
          className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-[68px] mt-10"
        >
          <Image 
            src="/images/award-one.svg" 
            alt="Good Design Award 2023" 
            width={174}
            height={77}
            className=" w-auto h-16 md:h-20 lg:w-[174px] lg:h-[77px]" 
          />
          <Image 
            src="/images/award-two.svg" 
            alt="AI Awards" 
            width={174}
            height={77}
            className="w-auto h-16 md:h-20 lg:w-[174px] lg:h-[77px]" 
          />
          <Image 
            src="/images/award-three.svg" 
            alt="Upwork 5 stars" 
            width={174}
            height={77}
            className=" w-auto h-16 md:h-20 lg:w-[174px] lg:h-[77px]" 
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;