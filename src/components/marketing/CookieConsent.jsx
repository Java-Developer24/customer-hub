import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div className="glass-card rounded-2xl p-6 shadow-2xl border border-border/50">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">We Value Your Privacy</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-3 py-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Necessary</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Always active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Analytics</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Marketing</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Accept All
            </Button>
            <Button
              onClick={handleAcceptNecessary}
              variant="outline"
              className="flex-1 glass border-border/50"
            >
              Necessary Only
            </Button>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By clicking "Accept All", you consent to our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;