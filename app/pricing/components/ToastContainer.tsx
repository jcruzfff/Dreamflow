'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastContainer() {
  return (
    <>
      <style jsx global>{`
        .toast-slide-right-enter {
          transform: translateX(100%);
          opacity: 0;
        }
        
        .toast-slide-right-enter-active {
          transform: translateX(0);
          opacity: 1;
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        
        .toast-slide-right-exit {
          transform: translateX(0);
          opacity: 1;
        }
        
        .toast-slide-right-exit-active {
          transform: translateX(100%);
          opacity: 0;
          transition: transform 0.3s ease-in, opacity 0.3s ease-in;
        }
        
        /* Custom positioning for react-hot-toast */
        [data-react-hot-toast] {
          top: 20px !important;
        }
        
        /* Desktop positioning */
        @media (min-width: 768px) {
          [data-react-hot-toast] {
            top: 100px !important;
          }
        }
        
        /* Custom animation keyframes */
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        /* Apply custom animations to toast */
        [data-react-hot-toast] > div {
          animation: slideInFromRight 0.3s ease-out;
        }
        
        [data-react-hot-toast] > div[data-removing="true"] {
          animation: slideOutToRight 0.3s ease-in;
        }
      `}</style>
      
      <Toaster
        position="top-center"
        containerStyle={{
          top: '20px',
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#32D74B',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            maxWidth: '90vw',
            animation: 'slideInFromRight 0.3s ease-out',
          },
          success: {
            style: {
              background: 'linear-gradient(to bottom, #32D74B, #28A745)',
              animation: 'slideInFromRight 0.3s ease-out',
              maxWidth: '90vw',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#32D74B',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(to bottom, #FF453A, #E03131)',
              animation: 'slideInFromRight 0.3s ease-out',
              maxWidth: '90vw',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#FF453A',
            },
          },
        }}
      />
    </>
  );
} 