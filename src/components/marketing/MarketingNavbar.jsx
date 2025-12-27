import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Search,
  ShoppingCart,
  User,
  Globe,
  Server,
  Mail,
  Shield,
  Layout,
  TrendingUp,
  Cpu,
  Cloud,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

const products = [
  { name: 'Web Hosting', icon: Server, href: '/product/web-hosting', desc: 'Fast & reliable hosting' },
  { name: 'Cloud Servers', icon: Cloud, href: '/product/cloud-servers', desc: 'Scalable cloud infrastructure' },
  { name: 'Domain Names', icon: Globe, href: '/product/domain-names', desc: 'Find your perfect domain' },
  { name: 'Email Hosting', icon: Mail, href: '/product/email-hosting', desc: 'Professional email solutions' },
  { name: 'SSL Certificates', icon: Shield, href: '/product/ssl-certificates', desc: 'Secure your website' },
  { name: 'Website Builder', icon: Layout, href: '/product/website-builder', desc: 'Build without code' },
  { name: 'SEO Tools', icon: TrendingUp, href: '/product/seo-tools', desc: 'Boost your rankings' },
  { name: 'VPS Hosting', icon: Cpu, href: '/product/vps-hosting', desc: 'Dedicated virtual servers' },
];

const solutions = [
  { name: 'For Startups', href: '/solutions/startups', desc: 'Launch your idea fast' },
  { name: 'For Small Business', href: '/solutions/small-business', desc: 'Grow your business online' },
  { name: 'For Enterprise', href: '/solutions/enterprise', desc: 'Enterprise-grade solutions' },
  { name: 'For Developers', href: '/solutions/developers', desc: 'Developer-friendly tools' },
];

const resources = [
  { name: 'Blog', href: '/blog' },
  { name: 'Help Center', href: '/help' },
  { name: 'Resources', href: '/resources' },
];

// Mock blog data for search
const blogPosts = [
  { title: 'How to Choose the Right Web Hosting', slug: 'how-to-choose-web-hosting', type: 'blog' },
  { title: '10 Tips for Website Security', slug: 'website-security-tips', type: 'blog' },
  { title: 'Understanding SSL Certificates', slug: 'understanding-ssl', type: 'blog' },
  { title: 'Domain Name Best Practices', slug: 'domain-best-practices', type: 'blog' },
  { title: 'Cloud vs Shared Hosting', slug: 'cloud-vs-shared-hosting', type: 'blog' },
];

const MarketingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { items, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search products
    const productResults = products
      .filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
      .map(p => ({ ...p, type: 'product' }));
    
    // Search blog posts
    const blogResults = blogPosts
      .filter(b => b.title.toLowerCase().includes(query))
      .map(b => ({ ...b, href: `/blog/${b.slug}`, icon: FileText, name: b.title, desc: 'Blog Post' }));

    setSearchResults([...productResults, ...blogResults].slice(0, 6));
  }, [searchQuery]);

  const handleSearchSelect = (href) => {
    navigate(href);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const cartCount = itemCount || 0;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Server className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">CloudHost</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Products
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-[500px] p-4 bg-card border border-border rounded-xl shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        to={product.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <product.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link to="/products" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      View all products
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'solutions' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-72 p-2 bg-card border border-border rounded-xl shadow-xl"
                >
                  {solutions.map((solution) => (
                    <Link
                      key={solution.name}
                      to={solution.href}
                      className="block p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <p className="font-medium text-foreground">{solution.name}</p>
                      <p className="text-xs text-muted-foreground">{solution.desc}</p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'resources' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 w-48 p-2 bg-card border border-border rounded-xl shadow-xl"
                >
                  {resources.map((resource) => (
                    <Link
                      key={resource.name}
                      to={resource.href}
                      className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary transition-colors"
                    >
                      {resource.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle variant="minimal" />
            
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 p-4 glass-card rounded-xl shadow-xl border border-border"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search products, blog posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                        autoFocus
                      />
                    </div>
                    
                    {searchResults.length > 0 && (
                      <div className="mt-4 space-y-1 max-h-64 overflow-y-auto">
                        {searchResults.map((result, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearchSelect(result.href)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                          >
                            <div className="p-1.5 bg-primary/10 rounded">
                              <result.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{result.name}</p>
                              <p className="text-xs text-muted-foreground">{result.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <p className="mt-4 text-sm text-muted-foreground text-center">No results found</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cart" className="relative p-2 text-foreground/80 hover:text-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to={isAdmin ? "/admin" : "/dashboard"}>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-card border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-1 pb-4 border-b border-border">
                {searchResults.map((result, idx) => (
                  <Link
                    key={idx}
                    to={result.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary"
                  >
                    <result.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm">{result.name}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Products</p>
              {products.slice(0, 4).map((product) => (
                <Link
                  key={product.name}
                  to={product.href}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <product.icon className="w-4 h-4 text-primary" />
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solutions</p>
              {solutions.map((solution) => (
                <Link
                  key={solution.name}
                  to={solution.href}
                  className="block p-2 rounded-lg hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {solution.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Link to="/pricing" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Pricing</Button>
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">About</Button>
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Contact</Button>
              </Link>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              {isAuthenticated ? (
                <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default MarketingNavbar;