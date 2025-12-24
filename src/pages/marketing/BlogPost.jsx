import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, Twitter, Linkedin,
  Facebook, Link as LinkIcon, BookOpen, ChevronRight, MessageSquare,
  ThumbsUp, ArrowRight, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data
  const post = {
    title: 'The Complete Guide to Cloud Migration: Strategies and Best Practices',
    excerpt: 'Learn how to successfully migrate your infrastructure to the cloud with our comprehensive guide covering planning, execution, and optimization.',
    content: `
      <h2>Introduction</h2>
      <p>Cloud migration has become an essential strategy for businesses looking to modernize their infrastructure, reduce costs, and improve scalability. In this comprehensive guide, we'll walk you through everything you need to know about migrating to the cloud successfully.</p>
      
      <h2>Why Migrate to the Cloud?</h2>
      <p>Before diving into the how, let's understand the why. Cloud migration offers several compelling benefits:</p>
      <ul>
        <li><strong>Cost Optimization:</strong> Pay only for what you use, eliminating the need for expensive on-premises hardware.</li>
        <li><strong>Scalability:</strong> Scale resources up or down based on demand without significant lead time.</li>
        <li><strong>Reliability:</strong> Benefit from enterprise-grade infrastructure with built-in redundancy.</li>
        <li><strong>Security:</strong> Leverage advanced security features and compliance certifications.</li>
      </ul>
      
      <h2>Planning Your Migration</h2>
      <p>A successful cloud migration starts with thorough planning. Here are the key steps:</p>
      
      <h3>1. Assess Your Current Infrastructure</h3>
      <p>Document all your existing applications, databases, and dependencies. Understand the interconnections between different systems and identify potential challenges.</p>
      
      <h3>2. Choose Your Migration Strategy</h3>
      <p>The "6 R's" of migration provide a framework for your approach:</p>
      <ul>
        <li><strong>Rehost:</strong> Lift and shift - move applications as-is</li>
        <li><strong>Replatform:</strong> Make minor optimizations during migration</li>
        <li><strong>Refactor:</strong> Re-architect applications for cloud-native features</li>
        <li><strong>Repurchase:</strong> Move to a different product (SaaS)</li>
        <li><strong>Retire:</strong> Decommission applications no longer needed</li>
        <li><strong>Retain:</strong> Keep some workloads on-premises</li>
      </ul>
      
      <h3>3. Create a Migration Roadmap</h3>
      <p>Prioritize applications based on complexity, business impact, and dependencies. Start with less critical applications to build experience before tackling mission-critical systems.</p>
      
      <h2>Executing the Migration</h2>
      <p>With your plan in place, it's time to execute. Here are best practices for a smooth migration:</p>
      
      <h3>Testing and Validation</h3>
      <p>Thoroughly test migrated applications in the cloud environment before cutting over. Compare performance metrics with your baseline measurements.</p>
      
      <h3>Data Migration</h3>
      <p>For large datasets, consider using dedicated data transfer services. Implement proper encryption and validate data integrity after transfer.</p>
      
      <h2>Post-Migration Optimization</h2>
      <p>Migration is just the beginning. Continuously optimize your cloud environment for cost and performance. Implement monitoring and alerting to identify issues proactively.</p>
      
      <h2>Conclusion</h2>
      <p>Cloud migration is a journey that requires careful planning, execution, and ongoing optimization. By following the strategies and best practices outlined in this guide, you can ensure a successful transition to the cloud that delivers lasting value for your organization.</p>
    `,
    category: 'Cloud Computing',
    author: {
      name: 'Sarah Chen',
      role: 'Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Sarah is a certified cloud architect with over 10 years of experience helping businesses modernize their infrastructure.',
    },
    date: 'December 20, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    tags: ['Cloud', 'Migration', 'Infrastructure', 'DevOps'],
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'why-migrate', title: 'Why Migrate to the Cloud?' },
    { id: 'planning', title: 'Planning Your Migration' },
    { id: 'executing', title: 'Executing the Migration' },
    { id: 'optimization', title: 'Post-Migration Optimization' },
    { id: 'conclusion', title: 'Conclusion' },
  ];

  const relatedPosts = [
    {
      title: 'Understanding Cloud Security Best Practices',
      slug: 'cloud-security-best-practices',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      category: 'Security',
      readTime: '8 min read',
    },
    {
      title: 'Kubernetes vs Docker: Which Should You Choose?',
      slug: 'kubernetes-vs-docker',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop',
      category: 'DevOps',
      readTime: '10 min read',
    },
    {
      title: 'Cost Optimization Strategies for AWS',
      slug: 'aws-cost-optimization',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'Cloud Computing',
      readTime: '7 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>{post.category}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-0">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div className="glass-card rounded-xl p-6 mt-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-primary" />
                    Share this article
                  </h3>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="glass border-border/50">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="glass border-border/50">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="glass border-border/50">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="glass border-border/50">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  '--tw-prose-headings': 'hsl(var(--foreground))',
                  '--tw-prose-body': 'hsl(var(--muted-foreground))',
                  '--tw-prose-bold': 'hsl(var(--foreground))',
                  '--tw-prose-links': 'hsl(var(--primary))',
                  '--tw-prose-bullets': 'hsl(var(--primary))',
                }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="glass">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Bio */}
              <div className="glass-card rounded-2xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{post.author.name}</p>
                    <p className="text-sm text-primary mb-2">{post.author.role}</p>
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Comments (12)
                </h3>

                {/* Comment Form */}
                <div className="glass-card rounded-xl p-6 mb-8">
                  <h4 className="font-medium text-foreground mb-4">Leave a comment</h4>
                  <Textarea
                    placeholder="Share your thoughts..."
                    className="mb-4 glass border-border/50 focus:border-primary/50"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    Post Comment
                  </Button>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="glass-card rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/40?img=${i + 10}`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-foreground">User {i}</p>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Great article! This really helped me understand the cloud migration process better.
                          </p>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ThumbsUp className="w-4 h-4 mr-1" /> 5
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${relatedPost.slug}`}>
                  <div className="group glass-card rounded-xl overflow-hidden card-hover">
                    <div className="relative h-40">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 bg-primary/10 text-primary border-0 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">{relatedPost.readTime}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 text-center glow-border">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Enjoyed this article?</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to get more insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 glass border-border/50"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default BlogPost;