"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from 'next/script';

// Section Components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProcessSection from '../components/ProcessSection';
import FoundersChoose from '../components/FoundersChoose';
import Testimonials from '../components/Testimonials';
import AllInOneDesign from '../components/AllInOneDesign';
import Pricing from '../components/Pricing';
import FoundersAwards from '../components/FoundersAwards';
import CalendarSection from '../components/CalendarSection';
import SpreadingCards from '../components/SpreadingCards';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

// Add type for particlesJS to Window interface
interface ParticlesConfig {
  particles: {
    number: { value: number; density: { enable: boolean; value_area: number } };
    color: { value: string };
    shape: { type: string };
    opacity: { 
      value: number; 
      random: boolean; 
      anim: { 
        enable: boolean; 
        speed: number; 
        opacity_min: number; 
        sync: boolean 
      } 
    };
    size: { value: number; random: boolean };
    line_linked: { 
      enable: boolean; 
      distance: number; 
      color: string; 
      opacity: number; 
      width: number 
    };
    move: { 
      enable: boolean; 
      speed: number; 
      direction: string; 
      random: boolean; 
      straight: boolean; 
      out_mode: string; 
      bounce: boolean 
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: { enable: boolean; mode: string };
      onclick: { enable: boolean; mode: string };
      resize: boolean;
    };
    modes: {
      grab: { distance: number; line_linked: { opacity: number } };
    };
  };
  retina_detect: boolean;
}

interface ParticlesJS {
  (elementId: string, config: ParticlesConfig): void;
}

declare global {
  interface Window {
    particlesJS: ParticlesJS;
  }
}

export default function Home() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Force scroll to top on page load
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Initialize particles if needed
    if (typeof window !== 'undefined' && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 180, density: { enable: true, value_area: 1000 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.1, opacity_min: 0.1, sync: false } },
          size: { value: 2, random: true },
          line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0, width: 0 },
          move: { enable: true, speed: 0.8, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.3 } }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Particles background */}
      <div id="particles-js" className="fixed inset-0 -z-10" />
      
      {/* Particles.js script */}
      <Script src="/particles.min.js" strategy="afterInteractive" />
      
      {/* Main Navigation */}
      <Navbar />
      
      {/* Main content sections */}
      <div>
        <Hero />
        <ProcessSection />
        <FoundersChoose />
        <Testimonials />
        <AllInOneDesign />
        <Pricing />
        <FoundersAwards />
        <CalendarSection />
        <SpreadingCards />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}
