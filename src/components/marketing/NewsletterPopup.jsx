import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Gift, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    const hasSubscribed = localStorage.getItem('newsletter-subscribed');
    
    if (!hasSeenPopup && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('newsletter-popup-seen', 'true');
      }, 15000); // Show after 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('newsletter-subscribed', 'true');
    setIsSuccess(true);
    setIsSubmitting(false);
    
    toast({
      title: 'Welcome aboard!',
      description: 'You\'ve successfully subscribed to our newsletter.',
    });
    
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg glass-card rounded-2xl p-8 shadow-2xl glow-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Mail className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center"
                  >
                    <Gift className="w-4 h-4 text-accent-foreground" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-foreground mb-2">
                  Get 20% Off Your First Order!
                </h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and receive exclusive offers, tips, and updates delivered to your inbox.
                </p>
              </div>

              {/* Benefits */}
              <div className="flex justify-center gap-6 mb-8">
                {['Exclusive Deals', 'Expert Tips', 'Early Access'].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-6 text-center glass border-border/50 focus:border-primary/50"
                  required
                />
                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-primary hover:bg-primary/90 glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Subscribing...'
                  ) : (
                    <>
                      Get My 20% Discount
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam, unsubscribe anytime. By subscribing you agree to our{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">You're In!</h2>
              <p className="text-muted-foreground">
                Check your email for your 20% discount code.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsletterPopup;