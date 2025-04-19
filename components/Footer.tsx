"use client";

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="new-footer py-16 pb-0 md:pb-0 md:py-20 bg-black min-h-[60vh] flex flex-col justify-center items-center relative w-full">
      <div className="footer-content container mx-auto flex flex-col items-center justify-center w-[90%] mb-auto">
        <h1 className="footer-logo text-[19vw] font-medium leading-[100%] tracking-[-0.02em] m-0 p-0 text-center">
          Dreamflow
        </h1>
        
        <div className="social-icons flex gap-6 sm:gap-12 md:gap-16 mt-8 md:mt-12 mb-20 md:mb-32">
          <a 
            href="https://twitter.com/dreamflowlabs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link hover:opacity-80 transition-opacity"
          >
            <Image 
              src="/icons/x-logo.svg" 
              alt="Twitter" 
              width={36}
              height={36}
              className="social-icon w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
          </a>
          <a 
            href="mailto:hello@dreamflowlabs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link hover:opacity-80 transition-opacity"
          >
            <Image 
              src="/icons/email-logo.svg" 
              alt="Email" 
              width={36}
              height={36}
              className="social-icon w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
          </a>
          <a 
            href="https://linkedin.com/company/dreamflowlabs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link hover:opacity-80 transition-opacity"
          >
            <Image 
              src="/icons/linkedin-logo.svg" 
              alt="LinkedIn" 
              width={36}
              height={36}
              className="social-icon w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
          </a>
        </div>
      </div>
      
      <div className="footer-border w-full h-px bg-white/10"></div>
      
      <div className="footer-bottom w-full flex justify-center px-6 sm:px-10 py-6 text-white bg-black">
        <p className="footer-text text-sm opacity-50">
          Dreamflow Labs {new Date().getFullYear()} - All rights reserved
        </p>
      </div>

      <style jsx>{`
        .footer-logo {
          background: radial-gradient(100% 45% at 50% 50%, #FFF 30%, rgba(255, 255, 255, 0.40) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: "Helvetica Neue", sans-serif;
        }
        
        @media (max-width: 768px) {
          .footer-logo {
            font-size: 20vw;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;