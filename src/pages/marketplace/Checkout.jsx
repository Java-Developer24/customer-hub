import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, Check, Lock, ArrowLeft, ShoppingCart, 
  Shield, Clock, CheckCircle2, Server 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, subtotal, discountAmount, couponCode, clearCart, applyCoupon, removeCoupon } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [couponInput, setCouponInput] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) {
      toast({
        title: "Coupon Applied!",
        description: `You saved ${result.discount}% on your order.`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
    }
    setCouponInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.email || !formData.fullName) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Check your email for confirmation.",
    });
    navigate('/dashboard/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <MarketingNavbar />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link to="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <MarketingFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Secure Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="font-medium">Contact</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        required 
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        required 
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="bg-background/50"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className={`flex items-center space-x-3 p-4 border rounded-xl transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span>Credit / Debit Card</span>
                        </Label>
                        <div className="flex gap-1">
                          <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center">VISA</div>
                          <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center">MC</div>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-3 p-4 border rounded-xl transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer flex-1">PayPal</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className="bg-background/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc"
                              name="cvc"
                              placeholder="123"
                              value={formData.cvc}
                              onChange={handleInputChange}
                              className="bg-background/50"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button 
                  variant="ghost" 
                  type="button"
                  onClick={() => setStep(1)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Contact
                </Button>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Server className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Coupon */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-background/50"
                  />
                  <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
                
                {couponCode && (
                  <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
                    <span className="text-sm text-success">Coupon: {couponCode}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeCoupon}
                      className="h-auto p-1 text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2 glow" 
                  size="lg" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : step === 1 ? (
                    <>Continue to Payment</>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>30-day guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>

      <MarketingFooter />
    </div>
  );
};

export default Checkout;