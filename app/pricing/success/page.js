'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
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
        setOrderDetails({
          status: 'SUCCESS',
          message: 'Your payment was processed successfully!'
        });
        
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl p-8 rounded-3xl bg-gradient-to-b from-[#161616] to-[#242424] border border-[#303030] text-white">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <div className="w-16 h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
            <p className="mt-8 text-xl">Verifying your payment...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#1ADABA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01l-3-3" stroke="#1ADABA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-xl text-white/80 mb-8">
              Thank you for your order. We've received your payment and our team will reach out to you shortly.
            </p>
            
            <div className="w-full max-w-md p-6 bg-neutral-900 rounded-2xl mb-8">
              <h3 className="text-lg font-medium mb-4">What happens next?</h3>
              <ol className="space-y-4 text-left">
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ADABA]/20 text-[#1ADABA] flex items-center justify-center font-bold">1</span>
                  <span>You'll receive a confirmation email with your order details</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ADABA]/20 text-[#1ADABA] flex items-center justify-center font-bold">2</span>
                  <span>A Dreamflow team member will contact you within 24 hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ADABA]/20 text-[#1ADABA] flex items-center justify-center font-bold">3</span>
                  <span>We'll schedule an initial discovery call to kickstart your project</span>
                </li>
              </ol>
            </div>
            
            <div className="flex gap-4">
              <Link href="/" className="bg-white text-black px-8 py-3 rounded-full font-medium">
                Return to Homepage
              </Link>
              <Link href="/pricing" className="bg-transparent border border-white/30 px-8 py-3 rounded-full font-medium">
                Create Another Design
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 