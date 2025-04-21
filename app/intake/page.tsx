"use client";

import { useEffect } from "react";
import Script from 'next/script';
import IntakeForm from "@/components/IntakeForm";

// We can't use static metadata in a client component
// Instead we'll set the title and description using document.title and a meta tag in useEffect

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

export default function IntakePage() {
  useEffect(() => {
    // Set title and description dynamically
    document.title = 'Dreamflow Designs | Application Form';
    
    // Create meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Submit your application to work with Dreamflow Designs, a boutique design agency specializing in website design, UI/UX, and brand identity.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Submit your application to work with Dreamflow Designs, a boutique design agency specializing in website design, UI/UX, and brand identity.';
      document.head.appendChild(meta);
    }
    
    // Force scroll to top on page load
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
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
  }, []);

  return (
    <main className="flex items-center justify-center w-full bg-black text-white overflow-hidden  ">
      {/* Particles.js script */}
      <Script 
        src="/particles.min.js" 
        strategy="afterInteractive"
      />
      
      {/* Particle Background */}
      <div id="particles-js" className="fixed inset-0 z-0" />
      
      {/* Form Container */}
      <div className="w-full z-10 relative">
        <IntakeForm />
      </div>
      
   
    </main>
  );
} 