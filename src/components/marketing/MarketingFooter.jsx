import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  products: [
    { name: 'Web Hosting', href: '/products/hosting' },
    { name: 'Cloud Servers', href: '/products/servers' },
    { name: 'Domain Names', href: '/products/domains' },
    { name: 'Email Hosting', href: '/products/email' },
    { name: 'SSL Certificates', href: '/products/ssl' },
    { name: 'VPS Hosting', href: '/products/vps' },
  ],
  solutions: [
    { name: 'For Startups', href: '/solutions/startups' },
    { name: 'For Small Business', href: '/solutions/small-business' },
    { name: 'For Enterprise', href: '/solutions/enterprise' },
    { name: 'For Developers', href: '/solutions/developers' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Status Page', href: '/status' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

const MarketingFooter = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-muted-foreground">
                Get the latest news, updates, and tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary border-border w-full lg:w-80"
              />
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shrink-0">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Server className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">CloudHost</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Powering over 500,000 websites worldwide with fast, reliable, and secure cloud hosting solutions.
            </p>
            <div className="space-y-3">
              <a href="mailto:support@cloudhost.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                support@cloudhost.com
              </a>
              <a href="tel:+18001234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                1-800-123-4567
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CloudHost. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
