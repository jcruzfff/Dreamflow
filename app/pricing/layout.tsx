import { PricingProvider } from './context/PricingContext';
import ToastContainer from './components/ToastContainer';

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PricingProvider>
      {children}
      <ToastContainer />
    </PricingProvider>
  );
} 