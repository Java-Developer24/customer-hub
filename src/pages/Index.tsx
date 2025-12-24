import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, Star, Shield, Zap, HeadphonesIcon, Check, Globe, 
  Server, Mail, Lock, Palette, Search, Cloud, Monitor, Users,
  TrendingUp, Clock, DollarSign, ChevronDown, Play, Sparkles,
  Building2, Rocket, Target, Award, CheckCircle2
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

const Index = () => {
  const [isYearly, setIsYearly] = useState(false);

  const stats = [
    { value: '500K+', label: 'Websites Hosted', icon: Globe },
    { value: '150+', label: 'Countries Served', icon: Users },
    { value: '4.8/5', label: 'Customer Rating', icon: Star },
    { value: '99.9%', label: 'Uptime Guarantee', icon: Shield },
  ];

  const productCategories = [
    { 
      icon: Server, 
      name: 'Web Hosting', 
      description: 'Fast, reliable hosting for any website',
      features: ['Free SSL', '1-Click Install', '24/7 Support'],
      gradient: 'from-primary/20 to-emerald-500/20',
      link: '/product/web-hosting'
    },
    { 
      icon: Cloud, 
      name: 'Cloud Servers', 
      description: 'Scalable cloud infrastructure',
      features: ['Auto Scaling', 'SSD Storage', 'Root Access'],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      link: '/product/cloud-servers'
    },
    { 
      icon: Globe, 
      name: 'Domain Names', 
      description: 'Find your perfect domain',
      features: ['Free Privacy', 'Easy Transfer', 'DNS Management'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      link: '/product/domain-names'
    },
    { 
      icon: Mail, 
      name: 'Email Hosting', 
      description: 'Professional email solutions',
      features: ['Custom Domain', 'Mobile Sync', 'Spam Protection'],
      gradient: 'from-orange-500/20 to-yellow-500/20',
      link: '/product/email-hosting'
    },
    { 
      icon: Lock, 
      name: 'SSL Certificates', 
      description: 'Secure your website',
      features: ['Auto Renewal', 'Trust Badges', 'Quick Install'],
      gradient: 'from-green-500/20 to-emerald-500/20',
      link: '/product/ssl-certificates'
    },
    { 
      icon: Palette, 
      name: 'Website Builder', 
      description: 'Build without coding',
      features: ['Drag & Drop', '200+ Templates', 'Mobile Ready'],
      gradient: 'from-pink-500/20 to-rose-500/20',
      link: '/product/website-builder'
    },
    { 
      icon: Search, 
      name: 'SEO Tools', 
      description: 'Rank higher on search',
      features: ['Keyword Research', 'Site Audit', 'Rank Tracking'],
      gradient: 'from-indigo-500/20 to-blue-500/20',
      link: '/product/seo-tools'
    },
    { 
      icon: Monitor, 
      name: 'VPS Hosting', 
      description: 'Virtual private servers',
      features: ['Full Control', 'Dedicated IP', 'Managed Options'],
      gradient: 'from-slate-500/20 to-zinc-500/20',
      link: '/product/vps-hosting'
    },
  ];

  const howItWorks = [
    { step: 1, title: 'Choose Product', description: 'Browse our selection of hosting and domain services', icon: Search },
    { step: 2, title: 'Configure', description: 'Customize your plan to match your needs', icon: Palette },
    { step: 3, title: 'Launch', description: 'Go live with one-click deployment', icon: Rocket },
    { step: 4, title: 'Grow & Scale', description: 'Expand as your business grows', icon: TrendingUp },
  ];

  const benefits = [
    { icon: Rocket, title: 'Launch Faster', description: 'Get your website online in minutes with our streamlined setup process', stat: '5 min setup' },
    { icon: TrendingUp, title: 'Scale Seamlessly', description: 'Upgrade resources instantly as your traffic grows', stat: 'Instant scaling' },
    { icon: Users, title: 'Reach More Customers', description: 'Global CDN ensures fast loading speeds worldwide', stat: '200+ locations' },
    { icon: Globe, title: 'Go Global', description: 'Deploy to multiple regions with a single click', stat: '50+ countries' },
    { icon: DollarSign, title: 'Save Money', description: 'Pay only for what you use with flexible billing', stat: 'Up to 50% off' },
    { icon: Shield, title: 'Stay Secure', description: 'Enterprise-grade security protects your data', stat: '24/7 monitoring' },
  ];

  const testimonials = [
    {
      quote: "We migrated our entire infrastructure and saw a 40% improvement in load times. The support team is incredible!",
      author: 'Sarah Chen',
      role: 'CTO, TechStart Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      result: '40% faster'
    },
    {
      quote: "The best hosting decision we ever made. Uptime has been flawless and our site has never been faster.",
      author: 'Michael Rodriguez',
      role: 'Founder, EcomFlow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5,
      result: '99.99% uptime'
    },
    {
      quote: "Setting up our online store was incredibly easy. The website builder is intuitive and powerful.",
      author: 'Emily Watson',
      role: 'Owner, Artisan Crafts',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      result: '3x sales growth'
    },
    {
      quote: "Enterprise-level features at startup prices. We've scaled from 1,000 to 100,000 users without any issues.",
      author: 'David Park',
      role: 'VP Engineering, ScaleUp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5,
      result: '100x scale'
    },
    {
      quote: "The migration was seamless and the performance gains were immediate. Highly recommend!",
      author: 'Lisa Thompson',
      role: 'Director, MediaCorp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      rating: 5,
      result: '60% cost savings'
    },
    {
      quote: "Outstanding support and reliable infrastructure. They truly understand developer needs.",
      author: 'James Wilson',
      role: 'Lead Developer, CodeLabs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      result: '24/7 support'
    },
  ];

  const pricingPlans = [
    { name: 'Starter', price: { monthly: 4.99, yearly: 3.99 }, popular: false, features: ['1 Website', '10GB Storage', 'Free SSL', 'Email Support'] },
    { name: 'Professional', price: { monthly: 9.99, yearly: 7.99 }, popular: true, features: ['Unlimited Websites', '50GB Storage', 'Free SSL', 'Priority Support', 'Free Domain'] },
    { name: 'Business', price: { monthly: 19.99, yearly: 15.99 }, popular: false, features: ['Unlimited Everything', '200GB Storage', 'Advanced Security', '24/7 Phone Support', 'Dedicated IP'] },
  ];

  const faqs = [
    { q: 'How do I get started?', a: 'Simply choose a plan, create an account, and you can have your website online in minutes. Our setup wizard guides you through every step.' },
    { q: 'Can I upgrade my plan later?', a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.' },
    { q: 'Is there a money-back guarantee?', a: 'Yes! We offer a 30-day money-back guarantee on all plans. If you\'re not satisfied, we\'ll refund your payment in full.' },
    { q: 'Do you offer free migration?', a: 'Yes, we provide free website migration for all new customers. Our expert team handles the entire process for you.' },
    { q: 'What kind of support do you offer?', a: 'We offer 24/7 support via live chat, email, and phone (for Business plans). Our average response time is under 5 minutes.' },
  ];

  const trustBadges = [
    { icon: Shield, label: '99.9% Uptime' },
    { icon: HeadphonesIcon, label: '24/7 Support' },
    { icon: DollarSign, label: '30-Day Money Back' },
    { icon: Globe, label: 'Free Domain' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 glass border-primary/30 text-primary hover:bg-primary/10">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Trusted by 100,000+ Businesses Worldwide
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
              >
                Grow Your Business with{' '}
                <span className="text-gradient-primary">
                  Powerful Cloud Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                From web hosting to domains, cloud servers to security — get premium digital infrastructure at unbeatable prices with 24/7 expert support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 mb-10"
              >
                <Link to="/register">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6 glass border-border/50 hover:border-primary/50">
                    View Plans
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-6"
              >
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <badge.icon className="h-4 w-4 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Dashboard Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <div className="glass-card rounded-2xl p-6 glow-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-sm text-muted-foreground ml-2">Dashboard</span>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Visitors</p>
                      <p className="text-2xl font-bold text-foreground">245.8K</p>
                      <p className="text-xs text-success flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> +12.5%
                      </p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Uptime</p>
                      <p className="text-2xl font-bold text-primary">99.99%</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-end justify-around p-4">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        className="w-6 bg-gradient-to-t from-primary to-primary/50 rounded-t-md"
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass-card rounded-xl p-4 glow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Deployment Success</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-6 glass-card rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Fast Loading</p>
                      <p className="text-xs text-muted-foreground">0.8s avg</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="relative py-16 border-y border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl lg:text-4xl font-black text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">Our Products</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions for hosting, domains, security, and more — all in one place.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={product.link}>
                  <div className="group glass-card rounded-2xl p-6 card-hover h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <product.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">Simple Process</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get online in four simple steps
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center glow-border">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Growth Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">Why Choose Us</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Accelerate Your Business Growth
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful businesses that trust us with their digital infrastructure
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success border-0">
                    {benefit.stat}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Join Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 text-center glow-border"
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Join 100,000+ Successful Businesses</span>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">Customer Stories</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Loved by Businesses Worldwide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our customers have to say about their experience
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
                  {testimonial.result}
                </Badge>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">Pricing</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose the perfect plan for your needs
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-8">
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
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
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
                <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="text-primary hover:underline inline-flex items-center gap-1">
              View Full Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 glass border-primary/30 text-primary">FAQ</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
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
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust us with their digital infrastructure. Start your journey today with our 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2 text-lg px-10 py-6 bg-primary hover:bg-primary/90 glow">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2 text-lg px-10 py-6 glass border-border/50 hover:border-primary/50">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Index;