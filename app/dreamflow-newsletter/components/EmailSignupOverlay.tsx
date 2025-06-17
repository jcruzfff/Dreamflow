"use client";

import React, { useState } from 'react';

interface EmailSignupOverlayProps {
  onClose: () => void;
}

const EmailSignupOverlay = ({ onClose }: EmailSignupOverlayProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        
        // Close overlay after success message
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        console.error('Subscription failed:', data.error);
        alert('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal with card gradient like pricing */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#1F1F1F] to-[#111] rounded-3xl border border-[#393939] shadow-[0px_1.318px_2.635px_0px_#525154_inset] p-8 mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            {/* Header with Helvetica Neue font like homepage */}
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-medium font-['Helvetica_Neue'] mb-3"
                style={{
                  background: "radial-gradient(41% 80% at 50% 50%, #fff 42%, rgba(255, 255, 255, .4) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent"
                }}
              >
                Join Dreamflow
              </h2>
              <p className="text-[#86868B] text-base font-['Helvetica_Neue']">
                Get weekly systems, templates, and AI workflows
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium font-['Helvetica_Neue'] text-[#86868B] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] border border-[#393939] rounded-xl text-white placeholder-[#787878] focus:outline-none focus:ring-2 focus:ring-[#F4CE84] focus:border-[#D9BB75] transition-all font-['Helvetica_Neue']"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium font-['Helvetica_Neue'] text-[#86868B] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gradient-to-b from-[#161616] via-[#1D1D1D] to-[#242424] border border-[#393939] rounded-xl text-white placeholder-[#787878] focus:outline-none focus:ring-2 focus:ring-[#F4CE84] focus:border-[#D9BB75] transition-all font-['Helvetica_Neue']"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Yellow gradient button like pricing page */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[56px] bg-gradient-to-b from-[#F4CE84] via-[#E2B969] to-[#CEA24C] text-black rounded-full font-medium font-['Helvetica_Neue'] shadow-md border-2 border-[#D9BB75] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
              >
                {isSubmitting ? 'Joining...' : 'Join Dreamflow'}
              </button>
            </form>
          </>
        ) : (
          /* Success State with gold gradient like pricing */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0px_8px_32px_rgba(244,206,132,0.3)]">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium font-['Helvetica_Neue'] text-white mb-3">
              Welcome to Dreamflow!
            </h3>
            <p className="text-[#86868B] font-['Helvetica_Neue'] text-base">
              Check your email for a confirmation link.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmailSignupOverlay; 