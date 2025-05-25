'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PricingProvider, usePricing, CartItem } from './context/PricingContext';
import ConfiguratorPanel from './components/ConfiguratorPanel';
import CartPanel from './components/CartPanel';
import SuccessOverlay from './components/SuccessOverlay';
import Script from 'next/script';

// Add type for particlesJS to Window interface
interface ParticlesConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
      stroke: {
        width: number;
        color: string;
      };
      polygon: {
        nb_sides: number;
      };
      image: {
        src: string;
        width: number;
        height: number;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        size_min: number;
        sync: boolean;
      };
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
      attract: {
        enable: boolean;
        rotateX: number;
        rotateY: number;
      };
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      bubble: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
      push?: { particles_nb: number };
      remove?: { particles_nb: number };
    };
  };
  retina_detect: boolean;
}

// Mobile cart icon for floating button
const MobileCartIcon = ({ onClick, itemCount }: { onClick: () => void; itemCount: number }) => (
  <button 
    onClick={onClick} 
    className="fixed bottom-32 right-4 z-20 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black w-14 h-14 rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] flex items-center justify-center lg:hidden transition-all duration-200 hover:shadow-lg"
    aria-label="Open cart"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </button>
);

// Fixed cart footer for mobile
const MobileCartFooter = ({ onClick, total, itemCount }: { onClick: () => void; total: number; itemCount: number }) => {
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 z-20 lg:hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-neutral-400">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span className="font-medium text-lg">${total.toFixed(2)}</span>
      </div>
      <button 
        onClick={onClick}
        className="w-full py-3 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] text-black font-semibold rounded-full shadow-[0px_2.684px_2.684px_0px_rgba(0,0,0,0.55)] transition-all duration-200 hover:shadow-lg"
      >
        Checkout ${total.toFixed(2)}
      </button>
    </div>
  );
};

// Mobile cart slide out
const MobileCart = ({ isOpen, onClose, cartItems }: { isOpen: boolean; onClose: () => void; cartItems: CartItem[] }) => {
  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Cart Content */}
      <div className="fixed inset-0 bg-neutral-900 shadow-xl z-40 transform transition-transform duration-300 lg:hidden"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800">
            <div>
              <h2 className="text-xl font-semibold">Order list</h2>
              <span className="text-neutral-400 text-sm">Items: {cartItems.length}</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors" aria-label="Close cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <CartPanel isMobile={true} />
          </div>
        </div>
      </div>
    </>
  );
};

const ResponsivePricingLayout = () => {
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const { cartItems, cartTotal } = usePricing();
  const searchParams = useSearchParams();
  
  // Check for submitted parameter immediately during render to avoid flash
  const submitted = searchParams.get('submitted');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(submitted === 'true');
  
  // Check if user came from home page
  const fromHome = searchParams.get('from') === 'home';
  
  // Back button component
  const BackButton = () => (
    <button 
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 mb-6 group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:-translate-x-1"
      >
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
      </svg>
      <span className="text-sm font-medium">Back</span>
    </button>
  );
  
  // Initialize particles once the script is loaded
  const initParticles = () => {
    if (typeof window !== 'undefined' && window.particlesJS) {
      const config: ParticlesConfig = {
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
      };
      
      window.particlesJS("particles-js", config);
    }
  };
  
  // Check if the particles script is loaded and initialize
  useEffect(() => {
    // Check if particlesJS is already loaded
    if (typeof window.particlesJS === 'function') {
      initParticles();
    } else {
      // Wait for the script to load
      const checkForParticles = setInterval(() => {
        if (typeof window.particlesJS === 'function') {
          initParticles();
          clearInterval(checkForParticles);
        }
      }, 100);
      
      // Clean up interval after 5 seconds to avoid infinite checking
      setTimeout(() => clearInterval(checkForParticles), 5000);
    }
  }, []);
  
  // Clean up URL when overlay is shown, but only once
  useEffect(() => {
    if (submitted === 'true') {
      const url = new URL(window.location.href);
      url.searchParams.delete('submitted');
      window.history.replaceState({}, '', url.toString());
    }
  }, [submitted]);
  
  return (
    <>
      {/* Particles Background - Same as IntakeForm and Homepage */}
      <div id="particles-js" className="fixed inset-0 z-0 bg-black"></div>
      
      {/* Fallback background when overlay is showing */}
      {showSuccessOverlay && (
        <div className="min-h-screen bg-black" />
      )}
      
      {/* Only render pricing content if overlay is not showing */}
      {!showSuccessOverlay && (
        <>
          <div className={`min-h-screen text-white px-4 sm:px-6 lg:px-8 ${cartItems.length > 0 ? 'pb-36' : 'pb-6'} md:pb-12 relative z-10`}>
            <div className="max-w-7xl mx-auto pt-8 sm:pt-12 md:pt-16">
              {/* Back button - only show when coming from home page */}
              {fromHome && <BackButton />}
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Start building your own package</h1>
              <p className="text-neutral-400 mb-6 sm:mb-8 w-full sm:w-[80%] md:w-[60%] text-sm sm:text-base">Select as many services as you want. Add them to your cart. Order instantly.</p>
              
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Configurator Panel - now a floating component */}
                <div className="lg:w-2/3 bg-neutral-900 rounded-[20px] sm:rounded-[24px] overflow-hidden border border-neutral-800">
                  <ConfiguratorPanel />
                </div>
                
                {/* Cart Panel - now a floating component */}
                <div className="hidden lg:block lg:w-1/3 bg-neutral-900 rounded-[20px] sm:rounded-[24px] overflow-hidden border border-neutral-800">
                  <CartPanel />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile cart footer */}
          <MobileCartFooter 
            onClick={() => setIsMobileCartOpen(true)} 
            total={cartTotal} 
            itemCount={cartItems.length} 
          />
          
          {/* Mobile cart floating button */}
          <MobileCartIcon 
            onClick={() => setIsMobileCartOpen(true)} 
            itemCount={cartItems.length} 
          />
          
          {/* Mobile cart slide out */}
          <MobileCart 
            isOpen={isMobileCartOpen} 
            onClose={() => setIsMobileCartOpen(false)}
            cartItems={cartItems}
          />
        </>
      )}
      
      {/* Success Overlay */}
      <SuccessOverlay 
        isOpen={showSuccessOverlay} 
        onClose={() => setShowSuccessOverlay(false)} 
      />
    </>
  );
};

// Loading fallback component
function PricingLoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="w-12 h-12 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
      <p className="mt-6 text-lg text-white">Loading pricing...</p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <PricingProvider>
      {/* Particles.js script */}
      <Script 
        src="/particles.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Particles.js loaded successfully");
        }}
      />
      <Suspense fallback={<PricingLoadingFallback />}>
        <ResponsivePricingLayout />
      </Suspense>
    </PricingProvider>
  );
}
