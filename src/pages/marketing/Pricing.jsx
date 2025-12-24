import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Check, X, Zap, Shield, Clock, Users, ArrowRight,
  Star, HelpCircle, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

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
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge className="ml-2 bg-success/20 text-success">Save 20%</Badge>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-border/50'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      {plan.monthlyPrice ? (
                        <>
                          <span className="text-4xl font-bold text-foreground">
                            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                          {isYearly && (
                            <p className="text-xs text-muted-foreground mt-1">Billed annually</p>
                          )}
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-foreground">Custom</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-success shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground shrink-0" />
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-accent' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
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
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Add-ons</h2>
            <p className="text-muted-foreground">Enhance your plan with these optional extras</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {addons.map((addon, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-foreground">{addon.name}</p>
                  <p className="text-2xl font-bold gradient-text">${addon.price}/mo</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pricing FAQ</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our enterprise team can create a tailored package for your organization's specific needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              Contact Enterprise Sales
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Pricing;
