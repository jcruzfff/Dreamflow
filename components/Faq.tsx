"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "How fast are designs delivered?",
    answer: "Most designs are delivered within 2-3 business days. For more complex projects like full websites or apps, we'll break it down into smaller deliverables to maintain quick turnaround times. We also offer same-day delivery for urgent requests when available."
  },
  {
    question: "Do you really do unlimited requests?",
    answer: "Yes! You can submit as many design requests as you'd like. We work on them one at a time to ensure the highest quality and fastest delivery. Once a design is completed, we move straight to your next request."
  },
  {
    question: "What if I don't like the result?",
    answer: "We offer unlimited revisions until you're completely satisfied. If you're not happy with the direction, we'll start fresh with a new concept. Plus, we offer a 30-day money-back guarantee if we're not meeting your expectations."
  },
  {
    question: "Who's designing the work?",
    answer: "Your work is designed by our North America-based senior design team. Each designer has 8+ years of experience working with tech startups and major brands. We carefully match designers to projects based on their expertise and your needs."
  },
  {
    question: "Do you handle development?",
    answer: "Yes! Our Full-Stack plan includes both design and development services. We can build responsive websites, web apps, and handle front-end development. For more complex development needs, we can recommend trusted partners from our network."
  },
  {
    question: "Can I use it for multiple brands?",
    answer: "Absolutely! You can use your subscription for any number of brands or projects. Many of our clients use us for their main business, side projects, and client work. There's no limit to how you can use the service."
  },
  {
    question: "Can I pause or cancel?",
    answer: "Yes, you can pause or cancel your subscription at any time. Pausing puts your subscription on hold and saves your spot. When you're ready to resume, just let us know. Canceling is hassle-free with no questions asked."
  },
  {
    question: "What's the difference between Essential, Elite and Full-Stack?",
    answer: "Essential includes unlimited design requests with one active task at a time. Elite adds faster turnaround, multiple active tasks, and priority support. Full-Stack includes everything in Elite plus development services, turning your designs into fully functional websites and applications."
  },
  {
    question: "How do I submit requests?",
    answer: "You'll get access to our DreamGate™ platform where you can submit and track all your design requests. Simply describe what you need, attach any reference materials, and we'll take care of the rest. Your dedicated design concierge is always available to help refine your requests."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with our service within the first 30 days, we'll refund your subscription. For our trial week, you can get 75% back if you decide it's not the right fit."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  
  // Toggle FAQ item - only one open at a time
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate FAQ items with stagger
    const faqItems = faqContainerRef.current?.querySelectorAll('.faq-item');
    if (faqItems && faqItems.length > 0) {
      gsap.fromTo(
        faqItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: faqContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="faq-section py-24 md:py-32 px-4 md:px-8 lg:px-12 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className="text-[34px] md:text-5xl lg:text-[72px] text-gradient font-medium text-center mb-12 md:mb-[42px] leading-[100%] tracking-[-2%] mx-auto w-full md:w-4/5"
        >
          What Founders Ask
        </h2>
        
        <div 
          ref={faqContainerRef}
          className="faq-container max-w-4xl mx-auto"
          style={{
            background: "linear-gradient(180deg, #1F1F1F 0%, #111 69%)",
            borderRadius: "32px",
            boxShadow: "0px 1.318px 2.635px 0px #525154 inset"
          }}
        >
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <svg 
                  className="chevron w-6 h-6 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <div 
                className={`faq-answer ${openIndex === index ? 'active' : ''}`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section .section-title {
          margin-bottom: 64px;
          text-align: center;
        }

        .faq-container {
          padding: 0;
          overflow: hidden;
        }

        .faq-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          background: transparent;
          border: none;
          padding: 24px 42px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          color: #fff;
          text-align: left;
          font-family: "Helvetica Neue", sans-serif;
          font-size: 20px;
          font-weight: 400;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 20px 24px;
            font-size: 18px;
          }
          
          .faq-answer {
            padding: 0 24px;
          }
          
          .faq-answer.active {
            padding: 0 24px 20px 24px;
          }
          
          .faq-section .section-title {
            margin-bottom: 48px;
          }
        }

        .faq-question:hover {
          opacity: 0.8;
        }

        .faq-question span {
          flex: 1;
          padding-right: 16px;
        }

        .chevron {
          transition: transform 0.3s ease;
        }

        .faq-question[aria-expanded="true"] .chevron {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 42px;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-family: "Helvetica Neue", sans-serif;
          font-size: 16px;
          line-height: 1.5;
          text-align: left;
          transform: translateY(-10px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-answer.active {
          max-height: 1000px;
          opacity: 1;
          padding: 0 42px 24px 42px;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default Faq; 