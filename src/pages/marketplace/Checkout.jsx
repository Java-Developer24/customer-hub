import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/marketplace/Navbar';
import Footer from '@/components/marketplace/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/dashboard');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div><Label>Email</Label><Input type="email" required placeholder="you@example.com" /></div>
                <div><Label>Full Name</Label><Input required placeholder="John Doe" /></div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg"><RadioGroupItem value="card" id="card" /><Label htmlFor="card" className="flex items-center gap-2 cursor-pointer"><CreditCard className="h-4 w-4" />Credit Card</Label></div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg"><RadioGroupItem value="paypal" id="paypal" /><Label htmlFor="paypal" className="cursor-pointer">PayPal</Label></div>
              </RadioGroup>
              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                    <div><Label>CVC</Label><Input placeholder="123" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <Button type="submit" className="w-full mt-6 gap-2" size="lg" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : <><Lock className="h-4 w-4" />Pay ${total.toFixed(2)}</>}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1"><Lock className="h-3 w-3" />Secure checkout</p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
