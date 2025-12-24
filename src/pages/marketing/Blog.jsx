import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Calendar, User, Clock, ArrowRight, Tag,
  ChevronRight, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const categories = ['All', 'Tutorials', 'News', 'Tips & Tricks', 'Case Studies', 'Product Updates'];

const blogPosts = [
  {
    id: 1,
    title: 'How to Optimize Your Website for Speed in 2024',
    excerpt: 'Learn the latest techniques for making your website lightning fast with our comprehensive guide.',
    category: 'Tutorials',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    featured: true,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Announcing CloudHost 3.0: Our Biggest Update Yet',
    excerpt: 'Discover all the new features and improvements in our latest platform update.',
    category: 'Product Updates',
    author: 'Alex Thompson',
    date: '2024-01-12',
    readTime: '5 min read',
    featured: false,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Case Study: How TechStart Scaled to 1M Users',
    excerpt: 'An in-depth look at how one startup used CloudHost to handle explosive growth.',
    category: 'Case Studies',
    author: 'Mike Johnson',
    date: '2024-01-10',
    readTime: '12 min read',
    featured: false,
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: '10 Essential Security Tips for Your Hosting Setup',
    excerpt: 'Protect your website and data with these must-know security best practices.',
    category: 'Tips & Tricks',
    author: 'Emily Davis',
    date: '2024-01-08',
    readTime: '6 min read',
    featured: false,
    image: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'The Future of Cloud Computing: Trends to Watch',
    excerpt: 'Explore the emerging technologies that will shape cloud infrastructure in the coming years.',
    category: 'News',
    author: 'Sarah Chen',
    date: '2024-01-05',
    readTime: '7 min read',
    featured: false,
    image: '/placeholder.svg'
  },
  {
    id: 6,
    title: 'Beginner\'s Guide to Domain Names',
    excerpt: 'Everything you need to know about choosing and managing your perfect domain.',
    category: 'Tutorials',
    author: 'Alex Thompson',
    date: '2024-01-03',
    readTime: '10 min read',
    featured: false,
    image: '/placeholder.svg'
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPost = blogPosts.find(post => post.featured);
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory && !post.featured;
  });

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
              CloudHost <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, tutorials, and updates from the CloudHost team
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-secondary border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to={`/blog/${featuredPost.id}`}>
                <Card className="border-border/50 overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-muted-foreground/30" />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                      <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? 'bg-gradient-to-r from-primary to-accent' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.id}`}>
                  <Card className="h-full border-border/50 overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">{post.category}</Badge>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest articles and updates
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input placeholder="Enter your email" className="bg-secondary border-border" />
            <Button className="bg-gradient-to-r from-primary to-accent shrink-0">Subscribe</Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Blog;
