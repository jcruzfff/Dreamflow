"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Form Field Types
type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  goals: string;
  budget: string;
  timeline: string;
  services: string[];
  source: string;
};

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // If isSuccess is true, move to success step
  useEffect(() => {
    if (isSuccess) {
      setStep(10); // Move to success step
    }
  }, [isSuccess]);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      goals: '',
      budget: '',
      timeline: '',
      services: [],
      source: ''
    }
  });

  const services = [
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'brand-strategy', label: 'Brand Strategy' },
    { id: 'web-design', label: 'Web Design' },
    { id: 'ui-ux-design', label: 'UI/UX Design' },
    { id: 'marketing-assets', label: 'Marketing Assets' },
    { id: 'event-design', label: 'Event Design' },
    { id: 'development-services', label: 'Development Services' },
    { id: 'other-services', label: 'Other' }
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for framer-motion
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="text-white h-screen w-screen overflow-hidden overflow-y-hidden relative flex flex-col items-center justify-center">
      {/* Particles Background */}
      <div id="particles-js" className="fixed inset-0 z-[-4]"></div>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-[4%] left-[4%] bg-transparent border border-[#242424] rounded-[32px] py-3 px-6 text-white text-lg cursor-pointer z-[2000] hover:bg-white/5 transition-colors">
        <span className="flex items-center">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Exit
        </span>
      </Link>
      
      {/* Form Container - centered on screen */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-[1000] p-5">
        {/* Logo - only show on welcome screen */}
        {step === 1 && (
          <Image 
            src="/icons/dreamflow-small-icon.svg" 
            alt="Dreamflow" 
            width={120} 
            height={40} 
            className="mb-5 dreamflow-logo-intake"
          />
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative z-[1000] flex flex-col items-center">
          {/* Welcome Step - centered */}
          {step === 1 && (
            <motion.div
              className="flex flex-col items-center text-center justify-center w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              id="welcome-section"
            >
              <h1 
                id="welcome-header" 
                className="text-[42px] md:text-[64px] lg:text-[80px] font-medium leading-[100%] tracking-[-2px] mb-6"
                style={{
                  background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  textAlign: "center",
                  fontFamily: "Helvetica Neue"
                }}
              >
                Welcome to Dreamflow
              </h1>
              <p className="text-[#B2B2B2] text-xl md:text-2xl font-medium mb-8 md:mb-10 w-[90%] sm:w-[70%] md:w-[90%] max-w-3xl mx-auto lg:mx-0">
                At Dreamflow, we&apos;re more than designers. We&apos;re your strategic partner in bringing world-changing ideas to life. Apply now to explore how we can co-create an experience that transforms your brand.
              </p>
              
              <div className="flex gap-3 welcome-buttons items-center justify-center">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 welcome-btn flex items-center justify-center font-medium group"
                >
                  Let&apos;s go!
                  <Image 
                    src="/icons/black-arrow.svg" 
                    alt="Arrow" 
                    width={13}
                    height={13}
                    className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                  />
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              <div className="flex items-center justify-center text-sm mt-6 text-white time-message">
                <span className="mr-[5px] flex items-center clock-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                Takes 2 mins
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Name - left aligned */}
          {step === 2 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Let&apos;s start with an introduction</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">What&apos;s your name?</p>
              
              <input
                type="text"
                placeholder="Type your name here..."
                autoFocus
                {...register('name', { required: 'Please fill out required information' })}
                className="text-[32px] border-0 border-b border-b-white w-full py-[10px] px-[10px] my-5 bg-transparent text-white outline-none transition-all duration-300 input-field focus:border-b-white text-left"
              />
              
              <div className="flex gap-3 items-center mt-4">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.name && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.name.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 3: Email - left aligned */}
          {step === 3 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Where can we reach you with next steps?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">Enter your email</p>
              
              <input
                type="email"
                placeholder="Type your email here..."
                autoFocus
                {...register('email', { 
                  required: 'Please fill out required information',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="text-[32px] border-0 border-b border-b-white w-full py-[10px] px-[10px] my-5 bg-transparent text-white outline-none transition-all duration-300 input-field focus:border-b-white text-left"
              />
              
              <div className="flex gap-3 items-center mt-4">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.email && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.email.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 4: Company/Project Name - left aligned */}
          {step === 4 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">What should we call this masterpiece in the making?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">Company/Project Name</p>
              
              <input
                type="text"
                placeholder="Type your answer here..."
                autoFocus
                {...register('company', { required: 'Please fill out required information' })}
                className="text-[32px] border-0 border-b border-b-white w-full py-[10px] px-[10px] my-5 bg-transparent text-white outline-none transition-all duration-300 input-field focus:border-b-white text-left"
              />
              
              <div className="flex gap-3 items-center mt-4">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.company && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.company.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 5: Website - left aligned */}
          {step === 5 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Where can we see your brand in action?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">Website or Social Media Link (optional)</p>
              
              <input
                type="text"
                placeholder="Type your answer here..."
                autoFocus
                {...register('website')}
                className="text-[32px] border-0 border-b border-b-white w-full py-[10px] px-[10px] my-5 bg-transparent text-white outline-none transition-all duration-300 input-field focus:border-b-white text-left"
              />
              
              <div className="flex gap-3 items-center mt-4">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
            </motion.div>
          )}
          
          {/* Step 6: Project Goals - left aligned */}
          {step === 6 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Tell us about your project.</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">What&apos;s the big idea, and what are your goals?</p>
              
              <input
                type="text"
                placeholder="What's your vision for the future..."
                autoFocus
                {...register('goals', { required: 'Please fill out required information' })}
                className="text-[32px] border-0 border-b border-b-white w-full py-[10px] px-[10px] my-5 bg-transparent text-white outline-none transition-all duration-300 input-field focus:border-b-white text-left"
              />
              
              <div className="flex gap-3 items-center mt-4">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.goals && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.goals.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 7: Timeline - left aligned */}
          {step === 7 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">When do you want to launch?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">(Select one)</p>
              
              <div className="flex flex-col w-full gap-3">
                {[
                  { id: 'asap', label: 'Urgent (ASAP)' },
                  { id: '1-2-months', label: '1 - 2 months' },
                  { id: '3-6-months', label: '3 - 6 months' },
                  { id: 'flexible', label: 'Flexible, let\'s discuss' }
                ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('timeline', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-3 px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('timeline') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.timeline && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.timeline.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 8: Services - left aligned */}
          {step === 8 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Which of our services are you interested in?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">(Check all that apply)</p>
              
              <div className="flex flex-col w-full gap-3">
                {services.map((service) => (
                  <label key={service.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={service.id}
                      {...register('services', { required: 'Please select at least one option' })}
                      className="hidden hidden-checkbox"
                    />
                    <div className="flex items-center border border-[#242424] rounded-[32px] py-3 px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-checkbox">
                      <span className="flex-1 text-white text-lg custom-checkbox-label">{service.label}</span>
                      <span className="checkmark">
                        <Image src="/icons/check.svg" alt="Selected" width={24} height={24} />
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.services && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.services.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 9: Budget - left aligned */}
          {step === 9 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">What&apos;s your ballpark budget?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">This helps us create a proposal that fits your vision and resources.</p>
              
              <div className="flex flex-col w-full gap-3">
                {[
                  { id: '2k-5k', label: '$2k - $5k' },
                  { id: '5k-10k', label: '$5k - $10k' },
                  { id: '10k-20k', label: '$10k - $20k' },
                  { id: '20k-50k', label: '$20k - $50k' },
                  { id: '50k-100k+', label: '$50k - $100k+' }
                ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('budget', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-3 px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('budget') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press enter <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.budget && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.budget.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Step 10: Source - left aligned */}
          {step === 10 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-2 font-normal question">Where did you hear about us?</h2>
              <p className="text-xl text-[#aaa] mb-6 subheader">Who sent you our way? We&apos;d love to know.</p>
              
              <div className="flex flex-col w-full gap-3">
                {[
                  { id: 'referral', label: 'Referral' },
                  { id: 'social-media', label: 'Social Media' },
                  { id: 'google', label: 'Google Search' },
                  { id: 'event', label: 'Event or Conference' },
                  { id: 'other', label: 'Other' }
                ].map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option.id}
                      {...register('source', { required: 'Please select an option' })}
                      className="hidden hidden-radio"
                    />
                    <div className={`flex items-center border border-[#242424] rounded-[32px] py-3 px-6 w-full bg-transparent transition-all duration-300 hover:bg-white/5 custom-radio ${watch('source') === option.id ? 'bg-white/[0.03] shadow-[0px_-2px_19px_5px_rgba(255,255,255,0.06)_inset] backdrop-blur-[33.75px] checked' : ''}`}>
                      <span className="flex-1 text-white text-lg custom-radio-label">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex gap-3 items-center mt-6">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300"
                >
                  OK
                </button>
                
                <span className="text-sm ml-[10px] text-[#aaa] enter-message flex items-center">
                  Press <span className="mx-1 text-lg">↵</span>
                </span>
              </div>
              
              {errors.source && (
                <p className="text-[#ff4c4c] text-base mt-[10px] error-message">{errors.source.message}</p>
              )}
            </motion.div>
          )}
          
          {/* Final Step - left aligned content with centered button */}
          {step === 11 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              id="last-question"
            >
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] mb-8 font-normal question last-question">
                Thank you for sharing your goals with us. We love partnering with forward-thinking clients to create groundbreaking projects. Book your Dream Discovery Call and let&apos;s bring your vision to life!
              </h2>
              
              <div className="w-full flex justify-start">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="py-[14px] px-[42px] text-lg bg-white text-black border-none rounded-[50px] cursor-pointer hover:bg-white/90 transition-all duration-300 submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Book'}
                </button>
              </div>
              
              {error && (
                <p className="text-[#ff4c4c] text-base mt-4">{error}</p>
              )}
            </motion.div>
          )}
          
          {/* Success Step */}
          {step === 12 && (
            <motion.div
              className="flex flex-col items-start text-left w-full"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className="mb-8">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#1ADABA" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="#1ADABA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h2 className="text-[36px] md:text-[50px] lg:text-[64px] mb-4 font-normal">Application submitted!</h2>
              <p className="text-xl text-[#dadada] mb-8">
                Thank you for your application. Our team will review it and get back to you within 1-2 business days to schedule your Dream Discovery Call.
              </p>
              
              <Link 
                href="/" 
                className="py-3 px-[42px] text-lg bg-white text-black border-none rounded-[50px] hover:bg-white/90 transition-all duration-300"
              >
                Return to Homepage
              </Link>
            </motion.div>
          )}
        </form>
      </div>
      
      {/* Navigation Buttons */}
      {step > 1 && step < 11 && (
        <div className="fixed bottom-6 right-6 flex z-[1000] gap-3">
          {step > 1 && step < 11 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="bg-transparent border border-[#dcdcdc] rounded-[32px] p-3 text-white cursor-pointer hover:bg-white/5 transition-colors flex justify-center items-center"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          
          {step < 11 && (
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-transparent border border-[#dcdcdc] rounded-[32px] p-3 text-white cursor-pointer hover:bg-white/5 transition-colors flex justify-center items-center"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}
      
      {/* Bottom Image */}
      <div className="fixed bottom-0 left-0 w-full z-0 bottom-image">
        <div 
          className="absolute w-[1728px] h-[66px]" 
          style={{
            bottom: "-80%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "1728px",
            background: "linear-gradient(98deg, #1ADBBB 6.26%, #14A5ED 42.34%, #926FE9 53.54%, #FFAF84 68.77%, #FF766C 75.65%, #F33265 84.13%)",
            filter: "blur(121.8px)",
            opacity: "0.8"
          }}
        />
      </div>
      
      {/* Custom Styles for Elements Not Easily Done with Tailwind */}
      <style jsx global>{`
        /* Make sure body and html don't scroll */
        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        
        /* Checkbox style adjustments */
        .hidden-checkbox + .custom-checkbox .checkmark {
          display: none;
        }
        
        .hidden-checkbox:checked + .custom-checkbox .checkmark {
          display: block;
        }
        
        /* Custom radio button style */
        .custom-radio::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 1px solid #242424;
          border-radius: 50%;
          margin-right: 12px;
          transition: border-color 0.3s ease;
        }
        
        .custom-radio.checked::before {
          background-color: rgba(251, 251, 251, 0.4);
        }
        
        /* Remove placeholder when valid */
        .input-field:valid::placeholder {
          color: transparent;
        }
        
        /* Ensure all form steps are centered */
        .form-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        /* Add responsive styles */
        @media screen and (max-width: 990px) {
          #welcome-header {
            font-size: 3rem;
            height: auto;
            margin-bottom: 24px;
            white-space: normal;
          }
        }
        
        @media screen and (max-width: 500px) {
          .dreamflow-logo-intake {
            width: 64px;
            height: auto;
          }
          
          #welcome-header {
            font-size: 54px;
            margin: 0px;
            margin-bottom: 20px;
            box-sizing: border-box;
            width: inherit;
            padding: 0px 12px;
          }
          
          .welcome-buttons {
            display: flex;
            margin-left: 0px;
            gap: 12px;
            align-items: center;
            flex-direction: column;
          }
          
          .enter-message {
            display: none;
          }
          
          .question {
            font-size: 1.75rem;
          }
          
          .subheader {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 