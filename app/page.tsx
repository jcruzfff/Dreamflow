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
    shape: { 
      type: string;
      stroke?: { width: number; color: string };
      polygon?: { nb_sides: number };
      image?: { src: string; width: number; height: number };
    };
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
    size: { 
      value: number; 
      random: boolean; 
      anim?: { 
        enable: boolean; 
        speed: number; 
        size_min: number; 
        sync: boolean 
      } 
    };
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
      bounce: boolean;
      attract?: { 
        enable: boolean; 
        rotateX: number; 
        rotateY: number 
      } 
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
      bubble?: { distance: number; size: number; duration: number; opacity: number; speed: number };
      repulse?: { distance: number; duration: number };
      push?: { particles_nb: number };
      remove?: { particles_nb: number };
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
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Remove hash if present to avoid auto-scrolling
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Maintain scroll position on resize
    const maintainScrollPosition = () => {
      // Calculate how far down the page we are (as a percentage)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / totalHeight;
      
      // Store this percentage
      sessionStorage.setItem('scrollPercentage', scrollPercentage.toString());
    };
    
    // Apply the saved scroll percentage after resize
    const applyScrollPosition = () => {
      const storedScrollPercentage = sessionStorage.getItem('scrollPercentage');
      if (storedScrollPercentage) {
        const percentage = parseFloat(storedScrollPercentage);
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTarget = percentage * totalHeight;
        
        window.scrollTo(0, scrollTarget);
      }
    };
    
    // Add event listeners for scroll position maintenance
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('scroll', maintainScrollPosition);
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applyScrollPosition();
      }, 50); // Short delay to let layout settle
    });
    
    // Initialize particles once the script is loaded
    const initParticles = () => {
      if (typeof window !== 'undefined' && window.particlesJS) {
        window.particlesJS("particles-js", {
          "particles": {
              "number": {
                  "value": 380,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#ffffff"
              },
              "shape": {
                  "type": "circle",
                  "stroke": {
                      "width": 0,
                      "color": "#000000"
                  },
                  "polygon": {
                      "nb_sides": 5
                  },
                  "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                  }
              },
              "opacity": {
                  "value": 0.3,
                  "random": true,
                  "anim": {
                      "enable": true,
                      "speed": 1,
                      "opacity_min": 0,
                      "sync": false
                  }
              },
              "size": {
                  "value": 2,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 60,
                      "size_min": 1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#ffffff",
                  "opacity": 0,
                  "width": 1
              },
              "move": {
                  "enable": true,
                  "speed": 0.3,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "detect_on": "canvas",
              "events": {
                  "onhover": {
                      "enable": false,
                      "mode": "grab"
                  },
                  "onclick": {
                      "enable": true,
                      "mode": "push"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 140,
                      "line_linked": {
                          "opacity": .8
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 80,
                      "duration": 1,
                      "opacity": 0.8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200,
                      "duration": 0.4
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true
      });
      }
    };

    // Check if the particles script is loaded and initialize
    if (typeof window !== 'undefined') {
      // Check if particlesJS is already loaded
      if (typeof window.particlesJS === 'function') {
        initParticles();
      } else {
        // Create a listener for when the script loads
        const checkForParticles = setInterval(() => {
          if (typeof window.particlesJS === 'function') {
            initParticles();
            clearInterval(checkForParticles);
          }
        }, 100);
        
        // Clear interval after 5 seconds to prevent infinite checks
        setTimeout(() => clearInterval(checkForParticles), 5000);
      }
    }

    // Handle smooth scrolling for nav links
    const handleSmoothScroll = () => {
      const navLinks = document.querySelectorAll('a[href^="#"]');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = (link as HTMLAnchorElement).getAttribute('href');
          if (!href || href === '#') return;
          
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            // Calculate offset position (10% of viewport height)
            const offset = window.innerHeight * 0.1;
            
            // Calculate the final scroll position
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            // Perform the scroll
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    // Initialize smooth scrolling after a short delay to ensure DOM is ready
    setTimeout(handleSmoothScroll, 500);

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      // Clean up event listeners
      window.removeEventListener('scroll', maintainScrollPosition);
      window.removeEventListener('resize', () => {
        clearTimeout(resizeTimer);
      });
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <main className="min-h-screen text-white">
      {/* Particles background */}
      <div id="particles-js" className="fixed inset-0 z-0" />
      
      {/* Particles.js script */}
      <Script 
        src="/particles.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Particles.js loaded successfully");
        }}
      />
      
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
