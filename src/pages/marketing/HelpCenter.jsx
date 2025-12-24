import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Book, MessageCircle, Phone, Mail, Video,
  ChevronRight, HelpCircle, Zap, Shield, Server, Globe,
  CreditCard, Users, Settings, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const categories = [
  { name: 'Getting Started', icon: Zap, articles: 12, color: 'from-blue-500 to-cyan-500' },
  { name: 'Hosting & Domains', icon: Globe, articles: 24, color: 'from-green-500 to-emerald-500' },
  { name: 'Billing & Payments', icon: CreditCard, articles: 8, color: 'from-orange-500 to-red-500' },
  { name: 'Security', icon: Shield, articles: 15, color: 'from-purple-500 to-pink-500' },
  { name: 'Server Management', icon: Server, articles: 18, color: 'from-indigo-500 to-purple-500' },
  { name: 'Account Settings', icon: Settings, articles: 10, color: 'from-teal-500 to-cyan-500' },
  { name: 'Email & DNS', icon: Mail, articles: 14, color: 'from-rose-500 to-pink-500' },
  { name: 'Troubleshooting', icon: HelpCircle, articles: 20, color: 'from-yellow-500 to-orange-500' },
];

const popularArticles = [
  { title: 'How to connect your domain', category: 'Getting Started', views: '12.5K' },
  { title: 'Reset your account password', category: 'Account Settings', views: '8.2K' },
  { title: 'Understanding SSL certificates', category: 'Security', views: '7.8K' },
  { title: 'Migrating from another host', category: 'Getting Started', views: '6.4K' },
  { title: 'Setting up email forwarding', category: 'Email & DNS', views: '5.9K' },
];

const supportOptions = [
  { 
    title: 'Live Chat', 
    desc: 'Chat with our support team in real-time', 
    icon: MessageCircle, 
    action: 'Start Chat',
    available: true 
  },
  { 
    title: 'Phone Support', 
    desc: 'Call us 24/7 at 1-800-123-4567', 
    icon: Phone, 
    action: 'Call Now',
    available: true 
  },
  { 
    title: 'Email Support', 
    desc: 'Get a response within 24 hours', 
    icon: Mail, 
    action: 'Send Email',
    available: true 
  },
];

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How can we <span className="gradient-text">help you?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Search our knowledge base or browse categories below
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for articles, tutorials, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/30 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{option.desc}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">Find answers organized by topic</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/help/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Popular Articles</h2>
              <div className="space-y-4">
                {popularArticles.map((article, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to="#" className="block p-4 rounded-lg hover:bg-secondary transition-colors group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{article.category}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Video Tutorials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <Card key={i} className="border-border/50 overflow-hidden group cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                      <Video className="w-12 h-12 text-muted-foreground/50" />
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline" size="sm">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium text-foreground">Getting Started Tutorial #{i + 1}</p>
                      <p className="text-sm text-muted-foreground">5:30 min</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status & Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-gradient-to-br from-success/10 to-success/5">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="font-medium text-success">All Systems Operational</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">System Status</h3>
                <p className="text-muted-foreground mb-4">Check the current status of all CloudHost services</p>
                <Button variant="outline">
                  View Status Page
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-2">Can't find what you need?</h3>
                <p className="text-muted-foreground mb-4">Our support team is here to help you 24/7</p>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Contact Support
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default HelpCenter;
