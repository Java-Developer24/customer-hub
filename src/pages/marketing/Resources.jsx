import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Video, Users, FileText, Wrench, Download,
  ArrowRight, Search, Filter, Clock, Eye, Star,
  Play, ChevronRight, Mail, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', icon: Sparkles },
    { id: 'guides', name: 'Guides & Ebooks', icon: BookOpen },
    { id: 'videos', name: 'Video Tutorials', icon: Video },
    { id: 'webinars', name: 'Webinars', icon: Users },
    { id: 'case-studies', name: 'Case Studies', icon: FileText },
    { id: 'tools', name: 'Tools', icon: Wrench },
    { id: 'cheatsheets', name: 'Cheat Sheets', icon: Download },
  ];

  const resources = [
    {
      id: 1,
      category: 'guides',
      title: 'The Complete Guide to Web Hosting',
      description: 'Everything you need to know about choosing and managing web hosting for your business.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      type: 'Ebook',
      readTime: '25 min read',
      downloads: '12.5K',
      featured: true,
    },
    {
      id: 2,
      category: 'videos',
      title: 'Getting Started with Cloud Servers',
      description: 'Step-by-step video tutorial on setting up and configuring your first cloud server.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      type: 'Video',
      duration: '45 min',
      views: '8.2K',
      featured: true,
    },
    {
      id: 3,
      category: 'webinars',
      title: 'Scaling Your E-commerce Business',
      description: 'Live webinar with industry experts on scaling strategies for online stores.',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop',
      type: 'Webinar',
      date: 'Jan 15, 2025',
      attendees: '2.1K',
      featured: false,
    },
    {
      id: 4,
      category: 'case-studies',
      title: 'How TechCorp Reduced Costs by 60%',
      description: 'A deep dive into how TechCorp optimized their infrastructure with our cloud solutions.',
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop',
      type: 'Case Study',
      industry: 'Technology',
      results: '60% cost reduction',
      featured: true,
    },
    {
      id: 5,
      category: 'guides',
      title: 'WordPress Security Best Practices',
      description: 'Comprehensive guide to securing your WordPress website from common threats.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      type: 'Guide',
      readTime: '15 min read',
      downloads: '9.8K',
      featured: false,
    },
    {
      id: 6,
      category: 'videos',
      title: 'SSL Certificate Installation Tutorial',
      description: 'Quick video guide on installing SSL certificates on various server types.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      type: 'Video',
      duration: '12 min',
      views: '15.3K',
      featured: false,
    },
    {
      id: 7,
      category: 'cheatsheets',
      title: 'Linux Commands Cheat Sheet',
      description: 'Essential Linux commands for server management in a printable format.',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop',
      type: 'Cheat Sheet',
      format: 'PDF',
      downloads: '25.6K',
      featured: false,
    },
    {
      id: 8,
      category: 'tools',
      title: 'Website Speed Test Tool',
      description: 'Free tool to analyze and optimize your website loading performance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      type: 'Tool',
      usage: 'Free',
      users: '50K+',
      featured: false,
    },
    {
      id: 9,
      category: 'webinars',
      title: 'DevOps Best Practices 2025',
      description: 'Learn the latest DevOps strategies and tools from industry leaders.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      type: 'Webinar',
      date: 'Feb 5, 2025',
      attendees: '1.5K',
      featured: false,
    },
    {
      id: 10,
      category: 'case-studies',
      title: 'StartupX: From 0 to 1M Users',
      description: 'How StartupX scaled their platform to handle millions of concurrent users.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      type: 'Case Study',
      industry: 'SaaS',
      results: '1M+ users',
      featured: false,
    },
    {
      id: 11,
      category: 'guides',
      title: 'Email Deliverability Guide',
      description: 'Master the art of email deliverability and avoid spam filters.',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop',
      type: 'Ebook',
      readTime: '30 min read',
      downloads: '7.2K',
      featured: false,
    },
    {
      id: 12,
      category: 'tools',
      title: 'DNS Lookup Tool',
      description: 'Check DNS records, propagation status, and troubleshoot domain issues.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      type: 'Tool',
      usage: 'Free',
      users: '30K+',
      featured: false,
    },
  ];

  const featuredResource = resources.find(r => r.featured && r.category === 'guides');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video':
      case 'Webinar':
        return Play;
      case 'Ebook':
      case 'Guide':
        return BookOpen;
      case 'Case Study':
        return FileText;
      case 'Tool':
        return Wrench;
      case 'Cheat Sheet':
        return Download;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 glass border-primary/30 text-primary">
                Resource Library
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
                Learn, Grow, Succeed
              </h1>
              <p className="text-xl text-muted-foreground">
                Free guides, tutorials, webinars, and tools to help you master cloud infrastructure.
              </p>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg glass border-border/50 focus:border-primary/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'glass text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      {featuredResource && activeCategory === 'all' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl overflow-hidden glow-border"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredResource.image}
                    alt={featuredResource.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent lg:hidden" />
                </div>
                <div className="p-8 lg:py-12">
                  <Badge className="mb-4 bg-primary/10 text-primary border-0">Featured Resource</Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredResource.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredResource.description}
                  </p>
                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredResource.readTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      {featuredResource.downloads} downloads
                    </span>
                  </div>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    Download Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group glass-card rounded-2xl overflow-hidden card-hover"
                >
                  <div className="relative h-48">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground border-0">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {resource.type}
                    </Badge>
                    {resource.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      {resource.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {resource.readTime}
                        </span>
                      )}
                      {resource.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {resource.duration}
                        </span>
                      )}
                      {resource.date && (
                        <span>{resource.date}</span>
                      )}
                      {resource.downloads && (
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads}
                        </span>
                      )}
                      {resource.views && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {resource.views}
                        </span>
                      )}
                      {resource.users && (
                        <span>{resource.users} users</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 lg:p-12 text-center glow-border"
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Get Fresh Resources in Your Inbox
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and receive the latest guides, tutorials, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 glass border-border/50 focus:border-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Resources;