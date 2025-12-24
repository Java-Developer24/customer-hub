import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, Server, Cloud, Globe, Mail, Lock, Palette,
  Search, Monitor, Zap, Shield, HeadphonesIcon, Clock, Star,
  ChevronDown, Play, Sparkles, Users, TrendingUp, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const ProductPage = () => {
  const { productId } = useParams();
  const [isYearly, setIsYearly] = useState(true);

  // Product data based on productId
  const products = {
    'web-hosting': {
      name: 'Web Hosting',
      tagline: 'Fast, Reliable Hosting for Any Website',
      description: 'Launch your website with our blazing-fast, secure web hosting. Perfect for blogs, business sites, and everything in between.',
      icon: Server,
      gradient: 'from-primary/20 to-emerald-500/20',
      benefits: [
        'Lightning-fast SSD storage',
        'Free SSL certificate included',
        '99.9% uptime guarantee',
        '24/7 expert support',
      ],
      features: [
        { icon: Zap, title: 'Ultra-Fast Performance', description: 'SSD storage and optimized servers deliver page loads in milliseconds' },
        { icon: Shield, title: 'Enterprise Security', description: 'DDoS protection, malware scanning, and free SSL certificates' },
        { icon: Cloud, title: 'Daily Backups', description: 'Automatic daily backups with one-click restore functionality' },
        { icon: Globe, title: 'Global CDN', description: 'Content delivery network with 200+ edge locations worldwide' },
        { icon: HeadphonesIcon, title: '24/7 Support', description: 'Expert support team available around the clock via chat and phone' },
        { icon: Server, title: 'Easy Management', description: 'Intuitive control panel with one-click installs for popular apps' },
      ],
      plans: [
        { 
          name: 'Starter', 
          price: { monthly: 4.99, yearly: 2.99 }, 
          popular: false, 
          features: ['1 Website', '10GB SSD Storage', 'Free SSL', 'Weekly Backups', 'Email Support'],
          cta: 'Start Free Trial'
        },
        { 
          name: 'Professional', 
          price: { monthly: 9.99, yearly: 5.99 }, 
          popular: true, 
          features: ['Unlimited Websites', '50GB SSD Storage', 'Free SSL', 'Daily Backups', 'Free Domain', 'Priority Support'],
          cta: 'Get Started'
        },
        { 
          name: 'Business', 
          price: { monthly: 19.99, yearly: 12.99 }, 
          popular: false, 
          features: ['Unlimited Websites', '200GB SSD Storage', 'Free SSL', 'Real-time Backups', 'Free Domain', 'Dedicated IP', '24/7 Phone Support'],
          cta: 'Contact Sales'
        },
      ],
      useCases: [
        { title: 'Personal Blog', description: 'Share your thoughts with the world', result: '10K monthly visitors' },
        { title: 'Business Website', description: 'Establish your online presence', result: '2x lead generation' },
        { title: 'Online Portfolio', description: 'Showcase your work professionally', result: '50% more clients' },
        { title: 'Community Forum', description: 'Build engaged communities', result: '100K active users' },
      ],
      specs: [
        { label: 'Disk Space', starter: '10GB', pro: '50GB', business: '200GB' },
        { label: 'Bandwidth', starter: '100GB', pro: 'Unlimited', business: 'Unlimited' },
        { label: 'Email Accounts', starter: '5', pro: 'Unlimited', business: 'Unlimited' },
        { label: 'Databases', starter: '1', pro: '10', business: 'Unlimited' },
        { label: 'FTP Accounts', starter: '1', pro: '10', business: 'Unlimited' },
        { label: 'Free Domain', starter: '❌', pro: '1 Year', business: 'Lifetime' },
        { label: 'SSL Certificate', starter: '✓', pro: '✓', business: '✓' },
        { label: 'Daily Backups', starter: '❌', pro: '✓', business: '✓' },
      ],
      faqs: [
        { q: 'Can I upgrade my plan later?', a: 'Yes! You can upgrade your plan at any time. The price difference will be prorated.' },
        { q: 'Do you offer a money-back guarantee?', a: 'Absolutely! We offer a 30-day money-back guarantee on all plans.' },
        { q: 'Can I migrate my existing website?', a: 'Yes, we offer free migration assistance. Our team will handle everything for you.' },
        { q: 'What CMS can I install?', a: 'You can install WordPress, Joomla, Drupal, and 100+ other applications with one click.' },
        { q: 'Is there a limit on traffic?', a: 'Our Professional and Business plans include unlimited bandwidth for normal usage.' },
        { q: 'Do you provide email hosting?', a: 'Yes, all plans include email hosting with your domain name.' },
        { q: 'What is your uptime guarantee?', a: 'We guarantee 99.9% uptime, backed by our Service Level Agreement.' },
        { q: 'Can I use my own domain?', a: 'Yes, you can use your existing domain or register a new one with us.' },
      ],
    },
    'cloud-servers': {
      name: 'Cloud Servers',
      tagline: 'Scalable Cloud Infrastructure for Any Workload',
      description: 'Deploy high-performance cloud servers in seconds. Scale resources instantly as your needs grow.',
      icon: Cloud,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      benefits: [
        'Deploy in 60 seconds',
        'Pay only for what you use',
        'Scale resources instantly',
        'Root access included',
      ],
      features: [
        { icon: Zap, title: 'Instant Deployment', description: 'Spin up new servers in under 60 seconds' },
        { icon: TrendingUp, title: 'Auto Scaling', description: 'Automatically scale resources based on demand' },
        { icon: Shield, title: 'Enterprise Security', description: 'Firewall, DDoS protection, and private networking' },
        { icon: Globe, title: 'Global Regions', description: 'Deploy to 15+ data centers worldwide' },
        { icon: Server, title: 'NVMe Storage', description: 'Ultra-fast NVMe SSD storage for maximum IOPS' },
        { icon: HeadphonesIcon, title: 'Managed Options', description: 'Let our experts manage your servers' },
      ],
      plans: [
        { 
          name: 'Basic', 
          price: { monthly: 10, yearly: 8 }, 
          popular: false, 
          features: ['1 vCPU', '2GB RAM', '50GB NVMe', '2TB Transfer', 'Shared Network'],
          cta: 'Deploy Now'
        },
        { 
          name: 'Standard', 
          price: { monthly: 40, yearly: 32 }, 
          popular: true, 
          features: ['4 vCPU', '8GB RAM', '200GB NVMe', '4TB Transfer', 'Dedicated IP', 'Free Backups'],
          cta: 'Deploy Now'
        },
        { 
          name: 'Performance', 
          price: { monthly: 80, yearly: 64 }, 
          popular: false, 
          features: ['8 vCPU', '32GB RAM', '400GB NVMe', '8TB Transfer', 'Dedicated IP', 'Priority Support', 'DDoS Protection'],
          cta: 'Contact Sales'
        },
      ],
      useCases: [
        { title: 'Web Applications', description: 'Host scalable web applications', result: '10M requests/day' },
        { title: 'Dev/Test Environments', description: 'Spin up dev environments instantly', result: '80% faster dev cycles' },
        { title: 'Machine Learning', description: 'Train ML models at scale', result: '5x faster training' },
        { title: 'Game Servers', description: 'Low-latency game hosting', result: '<10ms latency' },
      ],
      specs: [
        { label: 'CPU Cores', starter: '1 vCPU', pro: '4 vCPU', business: '8 vCPU' },
        { label: 'RAM', starter: '2GB', pro: '8GB', business: '32GB' },
        { label: 'Storage', starter: '50GB NVMe', pro: '200GB NVMe', business: '400GB NVMe' },
        { label: 'Transfer', starter: '2TB', pro: '4TB', business: '8TB' },
        { label: 'Backups', starter: 'Manual', pro: 'Daily', business: 'Hourly' },
        { label: 'DDoS Protection', starter: 'Basic', pro: 'Standard', business: 'Advanced' },
      ],
      faqs: [
        { q: 'What operating systems are available?', a: 'Ubuntu, Debian, CentOS, Rocky Linux, Windows Server, and more.' },
        { q: 'Can I resize my server?', a: 'Yes, you can upgrade CPU, RAM, and storage with minimal downtime.' },
        { q: 'Do you provide managed services?', a: 'Yes, we offer fully managed cloud server options with 24/7 monitoring.' },
        { q: 'Is there a minimum commitment?', a: 'No, pay hourly or monthly with no long-term contracts required.' },
        { q: 'What is the network speed?', a: 'All servers include 10Gbps network connectivity.' },
        { q: 'Can I create custom images?', a: 'Yes, you can create and deploy custom server images.' },
      ],
    },
  };

  // Default to web-hosting if productId doesn't exist
  const product = products[productId] || products['web-hosting'];
  const ProductIcon = product.icon;

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 glass border-primary/30 text-primary">
                  <ProductIcon className="w-3 h-3 mr-1" />
                  {product.name}
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
              >
                {product.tagline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8"
              >
                {product.description}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3 mb-8"
              >
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {benefit}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 glow">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2 glass border-border/50">
                  <Play className="w-5 h-5" /> Watch Demo
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-sm text-muted-foreground mt-6"
              >
                Starting at <span className="text-primary font-bold">${product.plans[0].price.yearly}/mo</span> • 30-day money-back guarantee
              </motion.p>
            </div>

            {/* Product Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className={`glass-card rounded-2xl p-8 glow-border bg-gradient-to-br ${product.gradient}`}>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <ProductIcon className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass rounded-lg p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-2 bg-muted/50 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass border-primary/30 text-primary">Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you succeed online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass border-primary/30 text-primary">Pricing</Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that fits your needs
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-muted'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform ${isYearly ? 'left-8' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly <Badge className="ml-1 bg-success/10 text-success border-0 text-xs">Save 20%</Badge>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {product.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`glass-card rounded-2xl p-8 ${plan.popular ? 'ring-2 ring-primary glow relative' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-foreground">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} 
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass border-primary/30 text-primary">Use Cases</Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
              Perfect For Your Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <h3 className="font-bold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <Badge className="bg-success/10 text-success border-0">{useCase.result}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass border-primary/30 text-primary">Specifications</Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
              Technical Details
            </h2>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-b border-border font-medium text-foreground">
              <div>Feature</div>
              <div className="text-center">Starter</div>
              <div className="text-center">Professional</div>
              <div className="text-center">Business</div>
            </div>
            {product.specs.map((spec, index) => (
              <div key={spec.label} className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? 'bg-background/50' : ''}`}>
                <div className="text-muted-foreground">{spec.label}</div>
                <div className="text-center text-foreground">{spec.starter}</div>
                <div className="text-center text-foreground">{spec.pro}</div>
                <div className="text-center text-foreground">{spec.business}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass border-primary/30 text-primary">FAQ</Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {product.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-xl px-6 border-0">
                <AccordionTrigger className="text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that trust us with their {product.name.toLowerCase()}. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-lg px-10 py-6 bg-primary hover:bg-primary/90 glow">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-lg px-10 py-6 glass border-border/50">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default ProductPage;