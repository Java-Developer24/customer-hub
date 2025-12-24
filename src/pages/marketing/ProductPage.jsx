import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, Server, Cloud, Globe, Mail, Lock, Palette,
  Search, Monitor, Zap, Shield, HeadphonesIcon, Clock, Star,
  ChevronDown, Play, Sparkles, Users, TrendingUp, CheckCircle2,
  Cpu
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
import CookieConsent from '@/components/marketing/CookieConsent';
import NewsletterPopup from '@/components/marketing/NewsletterPopup';

const ProductPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [isYearly, setIsYearly] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    'domain-names': {
      name: 'Domain Names',
      tagline: 'Find Your Perfect Domain Name',
      description: 'Register your domain name with free privacy protection, easy DNS management, and reliable support.',
      icon: Globe,
      gradient: 'from-purple-500/20 to-pink-500/20',
      benefits: [
        'Free WHOIS privacy protection',
        'Easy domain transfer',
        'Advanced DNS management',
        'Auto-renewal available',
      ],
      features: [
        { icon: Shield, title: 'Privacy Protection', description: 'Keep your personal info safe with free WHOIS privacy' },
        { icon: Globe, title: 'DNS Management', description: 'Full control over your DNS records with our intuitive panel' },
        { icon: Zap, title: 'Instant Activation', description: 'Your domain is ready to use within minutes' },
        { icon: Lock, title: 'Domain Lock', description: 'Prevent unauthorized transfers with domain locking' },
        { icon: TrendingUp, title: 'SEO Friendly', description: 'Choose domains that boost your search rankings' },
        { icon: HeadphonesIcon, title: 'Expert Support', description: '24/7 domain specialists ready to help' },
      ],
      plans: [
        { name: '.com', price: { monthly: 12.99, yearly: 9.99 }, popular: true, features: ['1 Year Registration', 'Free Privacy', 'DNS Management', 'Email Forwarding', 'Domain Lock'], cta: 'Register Now' },
        { name: '.net', price: { monthly: 14.99, yearly: 11.99 }, popular: false, features: ['1 Year Registration', 'Free Privacy', 'DNS Management', 'Email Forwarding', 'Domain Lock'], cta: 'Register Now' },
        { name: '.org', price: { monthly: 13.99, yearly: 10.99 }, popular: false, features: ['1 Year Registration', 'Free Privacy', 'DNS Management', 'Email Forwarding', 'Domain Lock'], cta: 'Register Now' },
      ],
      useCases: [
        { title: 'Business Brand', description: 'Establish your brand identity', result: '95% brand recall' },
        { title: 'Personal Portfolio', description: 'Create your online presence', result: '3x more opportunities' },
        { title: 'E-commerce Store', description: 'Build customer trust', result: '40% more sales' },
        { title: 'Blog or Media', description: 'Share your content', result: '100K+ readers' },
      ],
      specs: [
        { label: 'Registration Period', starter: '1 Year', pro: '2 Years', business: '5 Years' },
        { label: 'Privacy Protection', starter: 'Free', pro: 'Free', business: 'Free' },
        { label: 'DNS Records', starter: 'Unlimited', pro: 'Unlimited', business: 'Unlimited' },
        { label: 'Subdomains', starter: 'Unlimited', pro: 'Unlimited', business: 'Unlimited' },
        { label: 'Email Forwarding', starter: '5', pro: '20', business: 'Unlimited' },
        { label: 'Domain Lock', starter: '✓', pro: '✓', business: '✓' },
      ],
      faqs: [
        { q: 'How long does domain registration take?', a: 'Most domains are registered instantly and ready to use within minutes.' },
        { q: 'Can I transfer my existing domain?', a: 'Yes! We offer free domain transfers with extended registration.' },
        { q: 'What happens when my domain expires?', a: 'We send multiple reminders before expiry. You have a 30-day grace period to renew.' },
        { q: 'Do you offer premium domains?', a: 'Yes, we have a marketplace of premium domains available for purchase.' },
      ],
    },
    'email-hosting': {
      name: 'Email Hosting',
      tagline: 'Professional Email for Your Business',
      description: 'Get a professional email address with your domain name. Reliable, secure, and feature-rich.',
      icon: Mail,
      gradient: 'from-orange-500/20 to-yellow-500/20',
      benefits: [
        'Custom domain email addresses',
        'Advanced spam protection',
        'Mobile sync across devices',
        '99.9% uptime guarantee',
      ],
      features: [
        { icon: Mail, title: 'Custom Email', description: 'Create professional emails like you@yourdomain.com' },
        { icon: Shield, title: 'Spam Protection', description: 'Advanced filters block 99.9% of spam and malware' },
        { icon: Cloud, title: 'Webmail Access', description: 'Access your email from any browser, anywhere' },
        { icon: Zap, title: 'Mobile Sync', description: 'Seamlessly sync across all your devices' },
        { icon: Lock, title: 'Encrypted Storage', description: 'Enterprise-grade encryption for your data' },
        { icon: HeadphonesIcon, title: '24/7 Support', description: 'Expert email support around the clock' },
      ],
      plans: [
        { name: 'Basic', price: { monthly: 2.99, yearly: 1.99 }, popular: false, features: ['5GB Storage', '1 Email Account', 'Webmail Access', 'Basic Spam Filter', 'Email Support'], cta: 'Get Started' },
        { name: 'Business', price: { monthly: 5.99, yearly: 3.99 }, popular: true, features: ['25GB Storage', '10 Email Accounts', 'Webmail Access', 'Advanced Spam Filter', 'Calendar & Contacts', 'Priority Support'], cta: 'Get Started' },
        { name: 'Enterprise', price: { monthly: 9.99, yearly: 7.99 }, popular: false, features: ['50GB Storage', 'Unlimited Accounts', 'Webmail Access', 'Premium Spam Filter', 'Calendar & Contacts', 'Admin Console', '24/7 Phone Support'], cta: 'Contact Sales' },
      ],
      useCases: [
        { title: 'Small Business', description: 'Professional communication', result: '50% more client trust' },
        { title: 'Remote Teams', description: 'Stay connected anywhere', result: '100% uptime access' },
        { title: 'E-commerce', description: 'Customer correspondence', result: '30% faster response' },
        { title: 'Freelancers', description: 'Build credibility', result: '2x more clients' },
      ],
      specs: [
        { label: 'Storage per User', starter: '5GB', pro: '25GB', business: '50GB' },
        { label: 'Email Accounts', starter: '1', pro: '10', business: 'Unlimited' },
        { label: 'Attachment Size', starter: '25MB', pro: '50MB', business: '100MB' },
        { label: 'Calendar', starter: '❌', pro: '✓', business: '✓' },
        { label: 'Contacts', starter: '❌', pro: '✓', business: '✓' },
        { label: 'Admin Console', starter: '❌', pro: '❌', business: '✓' },
      ],
      faqs: [
        { q: 'Can I use my existing domain?', a: 'Yes! Simply update your MX records to point to our servers.' },
        { q: 'How do I migrate my existing emails?', a: 'We offer free migration assistance for all plans.' },
        { q: 'Is there a mobile app?', a: 'You can use any email app that supports IMAP/POP3 or our webmail.' },
        { q: 'What spam protection do you use?', a: 'We use AI-powered spam filtering that blocks 99.9% of unwanted emails.' },
      ],
    },
    'ssl-certificates': {
      name: 'SSL Certificates',
      tagline: 'Secure Your Website with SSL',
      description: 'Protect your website and customers with industry-standard SSL certificates. Build trust and improve SEO.',
      icon: Lock,
      gradient: 'from-green-500/20 to-emerald-500/20',
      benefits: [
        'Instant activation',
        'Trust badges included',
        'Auto-renewal available',
        'Boost SEO rankings',
      ],
      features: [
        { icon: Lock, title: 'Strong Encryption', description: '256-bit encryption protects all data in transit' },
        { icon: Shield, title: 'Trust Badges', description: 'Display trust seals to increase customer confidence' },
        { icon: Zap, title: 'Quick Issuance', description: 'Domain validation certificates issued in minutes' },
        { icon: TrendingUp, title: 'SEO Boost', description: 'Google ranks HTTPS sites higher in search results' },
        { icon: Globe, title: 'Browser Trust', description: 'Trusted by all major browsers worldwide' },
        { icon: HeadphonesIcon, title: 'Expert Support', description: 'SSL specialists available 24/7' },
      ],
      plans: [
        { name: 'Domain SSL', price: { monthly: 4.99, yearly: 2.99 }, popular: false, features: ['Single Domain', 'Domain Validation', '256-bit Encryption', 'Trust Seal', 'Quick Issuance'], cta: 'Get SSL' },
        { name: 'Wildcard SSL', price: { monthly: 49.99, yearly: 39.99 }, popular: true, features: ['Unlimited Subdomains', 'Domain Validation', '256-bit Encryption', 'Trust Seal', 'Quick Issuance', 'Priority Support'], cta: 'Get SSL' },
        { name: 'EV SSL', price: { monthly: 99.99, yearly: 79.99 }, popular: false, features: ['Single Domain', 'Extended Validation', '256-bit Encryption', 'Green Address Bar', 'Company Verification', 'Highest Trust Level'], cta: 'Get SSL' },
      ],
      useCases: [
        { title: 'E-commerce', description: 'Secure customer payments', result: '85% trust increase' },
        { title: 'Business Sites', description: 'Protect contact forms', result: 'Zero data breaches' },
        { title: 'SaaS Apps', description: 'Secure user data', result: 'Compliance ready' },
        { title: 'Blogs', description: 'Build reader trust', result: '15% SEO boost' },
      ],
      specs: [
        { label: 'Encryption', starter: '256-bit', pro: '256-bit', business: '256-bit' },
        { label: 'Validation', starter: 'Domain', pro: 'Domain', business: 'Extended' },
        { label: 'Warranty', starter: '$10K', pro: '$100K', business: '$1M' },
        { label: 'Issuance Time', starter: '5 min', pro: '5 min', business: '3-5 days' },
        { label: 'Subdomains', starter: '1', pro: 'Unlimited', business: '1' },
        { label: 'Trust Seal', starter: '✓', pro: '✓', business: '✓' },
      ],
      faqs: [
        { q: 'How do I install an SSL certificate?', a: 'We provide step-by-step guides or can install it for you.' },
        { q: 'Do I need SSL for my site?', a: 'Yes! SSL is essential for security, trust, and SEO rankings.' },
        { q: 'What is the difference between DV and EV?', a: 'DV validates domain ownership. EV validates your business identity.' },
        { q: 'How long are certificates valid?', a: 'Certificates are valid for 1 year with easy renewal options.' },
      ],
    },
    'website-builder': {
      name: 'Website Builder',
      tagline: 'Build Beautiful Websites Without Code',
      description: 'Create stunning websites with our drag-and-drop builder. No coding required. 200+ professional templates.',
      icon: Palette,
      gradient: 'from-pink-500/20 to-rose-500/20',
      benefits: [
        'Drag-and-drop editor',
        '200+ professional templates',
        'Mobile-responsive designs',
        'Built-in SEO tools',
      ],
      features: [
        { icon: Palette, title: 'Visual Editor', description: 'Drag-and-drop interface for easy customization' },
        { icon: Monitor, title: 'Responsive Design', description: 'Sites look great on all devices automatically' },
        { icon: TrendingUp, title: 'SEO Built-in', description: 'Tools to help your site rank higher in search' },
        { icon: Zap, title: 'Fast Loading', description: 'Optimized code ensures lightning-fast performance' },
        { icon: Globe, title: 'Free Hosting', description: 'Hosting included with all builder plans' },
        { icon: HeadphonesIcon, title: 'Support', description: 'Tutorials, guides, and 24/7 live support' },
      ],
      plans: [
        { name: 'Basic', price: { monthly: 6.99, yearly: 4.99 }, popular: false, features: ['1 Website', '500MB Storage', 'Free Subdomain', '50+ Templates', 'Basic Support'], cta: 'Start Building' },
        { name: 'Pro', price: { monthly: 12.99, yearly: 9.99 }, popular: true, features: ['3 Websites', '5GB Storage', 'Free Domain', '200+ Templates', 'E-commerce (10 products)', 'Priority Support'], cta: 'Start Building' },
        { name: 'Business', price: { monthly: 24.99, yearly: 19.99 }, popular: false, features: ['Unlimited Websites', '50GB Storage', 'Free Domain', '200+ Templates', 'Unlimited E-commerce', 'VIP Support', 'Advanced Analytics'], cta: 'Contact Sales' },
      ],
      useCases: [
        { title: 'Portfolio Sites', description: 'Showcase your work', result: '5x more inquiries' },
        { title: 'Small Business', description: 'Get online fast', result: 'Live in 1 hour' },
        { title: 'Online Store', description: 'Sell products online', result: '$10K+ revenue' },
        { title: 'Landing Pages', description: 'Convert visitors', result: '40% conversion' },
      ],
      specs: [
        { label: 'Websites', starter: '1', pro: '3', business: 'Unlimited' },
        { label: 'Storage', starter: '500MB', pro: '5GB', business: '50GB' },
        { label: 'Templates', starter: '50+', pro: '200+', business: '200+' },
        { label: 'E-commerce', starter: '❌', pro: '10 products', business: 'Unlimited' },
        { label: 'Custom Domain', starter: '❌', pro: '✓', business: '✓' },
        { label: 'Analytics', starter: 'Basic', pro: 'Standard', business: 'Advanced' },
      ],
      faqs: [
        { q: 'Do I need coding skills?', a: 'No! Our drag-and-drop builder requires zero coding knowledge.' },
        { q: 'Can I use my own domain?', a: 'Yes, Pro and Business plans include a free domain.' },
        { q: 'Can I sell products online?', a: 'Yes! Pro allows 10 products, Business allows unlimited.' },
        { q: 'What if I need help?', a: 'We offer tutorials, guides, and 24/7 live support.' },
      ],
    },
    'seo-tools': {
      name: 'SEO Tools',
      tagline: 'Rank Higher in Search Results',
      description: 'Comprehensive SEO toolkit to improve your search rankings. Keyword research, site audits, and rank tracking.',
      icon: Search,
      gradient: 'from-indigo-500/20 to-blue-500/20',
      benefits: [
        'Keyword research tools',
        'Comprehensive site audits',
        'Rank tracking',
        'Competitor analysis',
      ],
      features: [
        { icon: Search, title: 'Keyword Research', description: 'Find high-value keywords for your niche' },
        { icon: TrendingUp, title: 'Rank Tracking', description: 'Monitor your positions across search engines' },
        { icon: Monitor, title: 'Site Audit', description: 'Identify and fix technical SEO issues' },
        { icon: Users, title: 'Competitor Analysis', description: 'See what\'s working for your competitors' },
        { icon: Globe, title: 'Backlink Analysis', description: 'Track and analyze your backlink profile' },
        { icon: Zap, title: 'Real-time Alerts', description: 'Get notified of ranking changes instantly' },
      ],
      plans: [
        { name: 'Starter', price: { monthly: 29, yearly: 24 }, popular: false, features: ['1 Website', '100 Keywords', 'Weekly Audits', 'Basic Reports', 'Email Support'], cta: 'Start Free Trial' },
        { name: 'Pro', price: { monthly: 79, yearly: 59 }, popular: true, features: ['5 Websites', '500 Keywords', 'Daily Audits', 'Advanced Reports', 'Competitor Tracking', 'Priority Support'], cta: 'Start Free Trial' },
        { name: 'Agency', price: { monthly: 199, yearly: 159 }, popular: false, features: ['Unlimited Websites', '2000 Keywords', 'Real-time Audits', 'White-label Reports', 'API Access', 'Dedicated Manager'], cta: 'Contact Sales' },
      ],
      useCases: [
        { title: 'E-commerce', description: 'Boost product visibility', result: '200% organic traffic' },
        { title: 'Agencies', description: 'Manage client SEO', result: '50+ clients managed' },
        { title: 'Bloggers', description: 'Grow audience', result: '1M+ monthly views' },
        { title: 'Local Business', description: 'Dominate local search', result: '#1 local ranking' },
      ],
      specs: [
        { label: 'Websites', starter: '1', pro: '5', business: 'Unlimited' },
        { label: 'Keywords', starter: '100', pro: '500', business: '2000' },
        { label: 'Audit Frequency', starter: 'Weekly', pro: 'Daily', business: 'Real-time' },
        { label: 'Competitor Tracking', starter: '❌', pro: '5', business: '20' },
        { label: 'API Access', starter: '❌', pro: '❌', business: '✓' },
        { label: 'White-label', starter: '❌', pro: '❌', business: '✓' },
      ],
      faqs: [
        { q: 'How accurate is rank tracking?', a: 'We check rankings daily across Google, Bing, and Yahoo.' },
        { q: 'Can I track local rankings?', a: 'Yes! Track rankings in any city, state, or country.' },
        { q: 'What SEO issues do you detect?', a: 'We check 100+ technical, on-page, and off-page factors.' },
        { q: 'Do you offer a free trial?', a: 'Yes! All plans include a 14-day free trial.' },
      ],
    },
    'vps-hosting': {
      name: 'VPS Hosting',
      tagline: 'Dedicated Performance at VPS Prices',
      description: 'Get the power of a dedicated server at a fraction of the cost. Full root access, guaranteed resources.',
      icon: Monitor,
      gradient: 'from-slate-500/20 to-zinc-500/20',
      benefits: [
        'Guaranteed resources',
        'Full root access',
        'Choice of OS',
        'Managed options available',
      ],
      features: [
        { icon: Server, title: 'Guaranteed Resources', description: 'CPU, RAM, and storage dedicated to you' },
        { icon: Lock, title: 'Root Access', description: 'Full control over your server environment' },
        { icon: Zap, title: 'SSD Storage', description: 'NVMe SSDs for maximum performance' },
        { icon: Shield, title: 'DDoS Protection', description: 'Enterprise-grade protection included' },
        { icon: Globe, title: 'Multiple Locations', description: 'Deploy in US, EU, or Asia data centers' },
        { icon: HeadphonesIcon, title: 'Managed Option', description: 'Let our experts handle server management' },
      ],
      plans: [
        { name: 'VPS 1', price: { monthly: 12, yearly: 10 }, popular: false, features: ['1 vCPU', '2GB RAM', '40GB SSD', '1TB Bandwidth', 'Root Access', 'Basic Support'], cta: 'Deploy Now' },
        { name: 'VPS 2', price: { monthly: 24, yearly: 20 }, popular: true, features: ['2 vCPU', '4GB RAM', '80GB SSD', '2TB Bandwidth', 'Root Access', 'Managed Option', 'Priority Support'], cta: 'Deploy Now' },
        { name: 'VPS 4', price: { monthly: 48, yearly: 40 }, popular: false, features: ['4 vCPU', '8GB RAM', '160GB SSD', '4TB Bandwidth', 'Root Access', 'Managed Option', 'DDoS Protection', '24/7 Phone Support'], cta: 'Deploy Now' },
      ],
      useCases: [
        { title: 'Web Applications', description: 'Host demanding apps', result: '99.99% uptime' },
        { title: 'Game Servers', description: 'Low-latency gaming', result: '<10ms ping' },
        { title: 'Development', description: 'Flexible dev environments', result: 'Unlimited deploys' },
        { title: 'Reseller Hosting', description: 'Start your own hosting', result: '$5K+ MRR' },
      ],
      specs: [
        { label: 'CPU Cores', starter: '1 vCPU', pro: '2 vCPU', business: '4 vCPU' },
        { label: 'RAM', starter: '2GB', pro: '4GB', business: '8GB' },
        { label: 'SSD Storage', starter: '40GB', pro: '80GB', business: '160GB' },
        { label: 'Bandwidth', starter: '1TB', pro: '2TB', business: '4TB' },
        { label: 'Managed', starter: '❌', pro: 'Optional', business: 'Optional' },
        { label: 'DDoS Protection', starter: 'Basic', pro: 'Standard', business: 'Advanced' },
      ],
      faqs: [
        { q: 'What is the difference between VPS and shared hosting?', a: 'VPS gives you dedicated resources, while shared hosting shares resources with other users.' },
        { q: 'Can I upgrade my VPS?', a: 'Yes! Upgrade CPU, RAM, and storage anytime with minimal downtime.' },
        { q: 'What operating systems are available?', a: 'Ubuntu, CentOS, Debian, Fedora, and Windows Server.' },
        { q: 'Do you offer managed VPS?', a: 'Yes! Our team can manage updates, security, and monitoring for you.' },
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
      <CookieConsent />
      <NewsletterPopup />
    </div>
  );
};

export default ProductPage;