"use client";

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0">Dreamflow</h1>
          
          <div className="flex space-x-6">
            <a 
              href="https://twitter.com/dreamflowlabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Image 
                src="/icons/x-logo.svg" 
                alt="Twitter" 
                width={24}
                height={24}
                className="w-6 h-6" 
              />
            </a>
            <a 
              href="mailto:hello@dreamflowlabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Image 
                src="/icons/email-logo.svg" 
                alt="Email" 
                width={24}
                height={24}
                className="w-6 h-6" 
              />
            </a>
            <a 
              href="https://linkedin.com/company/dreamflowlabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Image 
                src="/icons/linkedin-logo.svg" 
                alt="LinkedIn" 
                width={24}
                height={24}
                className="w-6 h-6" 
              />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50 text-center">
            Dreamflow Labs {new Date().getFullYear()} - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;