"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Hero = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scrolling gallery animation
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (topRow && bottomRow) {
      gsap.to(topRow, {
        x: "-50%", 
        duration: 40,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(bottomRow, {
        x: "-50%", 
        duration: 30,
        repeat: -1,
        ease: "none",
        reversed: true
      });
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-14 pb-16 flex flex-col justify-start" id="home">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <div className="max-w-[1117px] mx-auto">
          {/* Logo and brand */}
          <div className="flex items-center mb-[84px]">
            <Image 
              src="/icons/dreamflow-small-icon.svg" 
              alt="Dreamflow Design logo" 
              width={28}
              height={28}
              className="mr-1.5"
            />
            <p className="text-white text-lg font-medium">Dreamflow</p>
          </div>

          {/* Hero content */}
          <div className="text-left">
            <h1 className="text-gradient text-4xl md:text-5xl lg:text-[70px] font-medium leading-[100%] tracking-[-1.4px] mb-6">
              World-class Designs.<br />Delivered In 48 hours.
            </h1>
            <p className="text-dreamflow-text-secondary text-xl md:text-2xl font-normal mb-10 max-w-3xl">
              The monthly design subscription built for Web3 & AI founders.
            </p>
            <a 
              href="#pricing" 
              className="inline-flex items-center bg-white text-black px-[51px] py-4 rounded-[46.55px] text-xl font-medium transition-all"
            >
              Apply Now
              <Image 
                src="/icons/black-arrow.svg" 
                alt="Arrow" 
                width={13}
                height={13}
                className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scrolling gallery */}
      <div className="w-screen overflow-hidden">
        {/* Top row */}
        <div className="flex whitespace-nowrap py-5" ref={topRowRef}>
          {/* First set of images */}
          <div className="flex space-x-10 px-2">
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/1t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/2t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/3t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/4t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/5t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Duplicate for seamless scrolling */}
          <div className="flex space-x-10 px-2">
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/1t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/2t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/3t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/4t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/5t.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom row - reversed direction */}
        <div className="flex whitespace-nowrap py-5" ref={bottomRowRef}>
          {/* First set of images */}
          <div className="flex space-x-10 px-2">
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/1b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/3b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/2b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/4b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/5b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Duplicate for seamless scrolling */}
          <div className="flex space-x-10 px-2">
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/1b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/3b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/2b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/4b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
            <div className="w-[527px] h-[327px] flex-shrink-0 overflow-hidden rounded-2xl">
              <Image src="/images/5b.png" alt="Design showcase" width={527} height={327} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 