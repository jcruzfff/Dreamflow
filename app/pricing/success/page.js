'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Get parameters from URL
  const checkoutId = searchParams.get('checkoutId');

  useEffect(() => {
    // Optional: Verify the payment status with server
    async function verifyPayment() {
      try {
        // Placeholder for payment verification API call
        // const response = await fetch(`/api/square/verify-payment?checkoutId=${checkoutId}`);
        // const data = await response.json();
        
        // For now, we'll just simulate a successful verification
        setLoading(false);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setLoading(false);
      }
    }

    if (checkoutId) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [checkoutId]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Background Component with 32px padding - width hugs content */}
      <div className="bg-neutral-900 rounded-[24px] border border-neutral-800 p-8">
        <div className="max-w-lg mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
              <p className="mt-6 text-lg sm:text-xl text-white">Verifying your payment...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              {/* Success Icon with Gold Gradient */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-full bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] flex items-center justify-center shadow-[0px_8px_32px_rgba(244,206,132,0.3)]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-12 sm:h-12">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Main Content */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white leading-tight">
                  Payment Successful!
                </h1>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed px-4">
                  Thank you for your order. We&apos;ve received your payment and our team will 
                  reach out to you shortly.
                </p>
              </div>
              
              {/* What's Next Section */}
              <div className="w-full mb-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-white">
                  What happens next?
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] flex items-center justify-center font-bold text-black text-sm sm:text-base">
                      1
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-medium text-sm sm:text-base mb-1">
                        Confirmation Email
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        You&apos;ll receive a confirmation email with your order details
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] flex items-center justify-center font-bold text-black text-sm sm:text-base">
                      2
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-medium text-sm sm:text-base mb-1">
                        Team Contact
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        A Dreamflow team member will contact you within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#F4CE84] to-[#CEA24C] flex items-center justify-center font-bold text-black text-sm sm:text-base">
                      3
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-medium text-sm sm:text-base mb-1">
                        Launch off!
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        Receive your client portal and we&apos;ll begin designing your assets
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button - Matching Intake Form Submit Button */}
              <Link 
                href="/" 
                className="relative z-[1000] py-3 md:py-4 px-10 md:px-[51px] text-lg md:text-xl bg-white text-black border-none rounded-[46.55px] cursor-pointer hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center font-medium group"
              >
                Return to Homepage
                <Image 
                  src="/icons/black-arrow.svg" 
                  alt="Arrow" 
                  width={13}
                  height={13}
                  className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="bg-neutral-900 rounded-[24px] border border-neutral-800 p-8">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col items-center py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
            <p className="mt-6 text-lg sm:text-xl text-white">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
} 