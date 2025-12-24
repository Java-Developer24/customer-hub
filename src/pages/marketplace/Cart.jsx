import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/marketplace/Navbar';
import Footer from '@/components/marketplace/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, applyCoupon, removeCoupon, couponCode, discount, subtotal, discountAmount, total } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) {
      toast.success(`Coupon applied! ${result.discount}% discount`);
      setCouponInput('');
    } else {
      toast.error(result.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Browse our products and add items to your cart.</p>
          <Link to="/products"><Button>Browse Products</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div key={item.id} layout className="bg-card border border-border rounded-xl p-4 flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-semibold text-foreground hover:text-primary">{item.name}</Link>
                  <p className="text-sm text-muted-foreground">${item.price}/{item.subscription === 'yearly' ? 'yr' : 'mo'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="sm" className="text-destructive mt-2" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
            <h2 className="font-semibold text-lg text-foreground mb-4">Order Summary</h2>
            {!couponCode ? (
              <div className="flex gap-2 mb-4">
                <Input placeholder="Coupon code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                <Button variant="outline" onClick={handleApplyCoupon}><Tag className="h-4 w-4" /></Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3 mb-4">
                <span className="text-sm text-primary font-medium">{couponCode} (-{discount}%)</span>
                <Button variant="ghost" size="sm" onClick={removeCoupon}><X className="h-4 w-4" /></Button>
              </div>
            )}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-green-500"><span>Discount</span><span>-${discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <Button className="w-full gap-2" size="lg" onClick={() => navigate('/checkout')}>Proceed to Checkout<ArrowRight className="h-4 w-4" /></Button>
            <p className="text-xs text-muted-foreground text-center mt-4">Try coupons: SAVE10, SAVE20, WELCOME</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
