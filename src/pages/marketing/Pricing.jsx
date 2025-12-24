import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Check, X, Zap, Shield, Clock, Users, ArrowRight,
  Star, HelpCircle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import { HeroBackground, FloatingParticles, GradientMesh } from '@/components/effects/AnimatedBackground';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for personal projects',
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      { name: '1 Website', included: true },
      { name: '10GB SSD Storage', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Weekly Backups', included: true },
      { name: 'Email Support', included: true },
      { name: 'Free Domain', included: false },
      { name: 'CDN Included', included: false },
      { name: 'Staging Environment', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    desc: 'Best for growing businesses',
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      { name: '10 Websites', included: true },
      { name: '50GB SSD Storage', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Daily Backups', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Free Domain', included: true },
      { name: 'CDN Included', included: true },
      { name: 'Staging Environment', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    desc: 'For serious online businesses',
    monthlyPrice: 79,
    yearlyPrice: 63,
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '200GB SSD Storage', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Real-time Backups', included: true },
      { name: '24/7 Phone Support', included: true },
      { name: 'Free Domain', included: true },
      { name: 'CDN Included', included: true },
      { name: 'Staging Environment', included: true },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    desc: 'Custom solutions for large orgs',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: 'Unlimited Everything', included: true },
      { name: 'Dedicated Resources', included: true },
      { name: 'Custom Security', included: true },
      { name: 'SLA Guarantee', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'On-premise Option', included: true },
      { name: 'Training & Onboarding', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const addons = [
  { name: 'Extra Storage (100GB)', price: 10 },
  { name: 'Priority Support', price: 15 },
  { name: 'Advanced Security', price: 20 },
  { name: 'Dedicated IP', price: 5 },
];

const faqs = [
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Changes take effect immediately and billing is prorated.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
  { q: 'Is there a free trial?', a: 'Yes! All plans come with a 14-day free trial. No credit card required to start.' },
  { q: 'What happens if I exceed my limits?', a: 'We\'ll notify you when you\'re approaching limits. You can upgrade or purchase add-ons as needed.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all plans.' },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">
      <MarketingNavbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <HeroBackground variant="hero" />
        <FloatingParticles count={30} />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 glass border-primary/30 text-primary hover:bg-primary/10">
              <Sparkles className="w-3 h-3 mr-1" />
              Simple & Transparent
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Choose Your <span className="text-gradient-primary">Perfect Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              All plans include a 14-day free trial. No credit card required.
            </p>
            
            {/* Billing Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-full"
            >
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge className="bg-success/20 text-success border-success/30">
                Save 20%
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 relative">
        <GradientMesh className="opacity-30" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card 
                  className={`h-full relative glass-card card-hover transition-all duration-500 ${
                    plan.popular 
                      ? 'border-primary/50 glow' 
                      : 'border-border/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4 pt-8">
                    <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      {plan.monthlyPrice ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl font-black text-gradient-primary">
                              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                            </span>
                            <span className="text-muted-foreground">/mo</span>
                          </div>
                          {isYearly && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Billed annually (${plan.yearlyPrice * 12}/year)
                            </p>
                          )}
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-foreground">Custom</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-success" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center">
                              <X className="w-3 h-3 text-muted-foreground" />
                            </div>
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                      <Button 
                        className={`w-full h-12 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90 glow' 
                            : 'glass-subtle hover:glow-soft'
                        }`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful <span className="text-gradient-primary">Add-ons</span>
            </h2>
            <p className="text-muted-foreground">Enhance your plan with these optional extras</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {addons.map((addon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="glass-card border-border/30 hover:border-primary/30 transition-all">
                  <CardContent className="p-6 text-center">
                    <p className="font-medium text-foreground mb-2">{addon.name}</p>
                    <p className="text-3xl font-bold text-gradient-primary">${addon.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <FloatingParticles count={15} />
        
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
          </motion.div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem 
                  value={`faq-${i}`} 
                  className="glass-card border border-border/30 rounded-xl px-6 data-[state=open]:glow-border"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
          <GradientMesh />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 lg:px-8 text-center relative z-10"
        >
          <div className="glass-card max-w-2xl mx-auto p-12 rounded-3xl glow-border">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our enterprise team can create a tailored package for your organization's specific needs.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow px-8 h-12">
                Contact Enterprise Sales
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Pricing;
