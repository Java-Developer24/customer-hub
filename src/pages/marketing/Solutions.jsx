import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, Building, Building2, Code, Check, ArrowRight, 
  Zap, Shield, Clock, Users, Star, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const solutionsData = {
  startups: {
    title: 'For Startups',
    subtitle: 'Launch Fast, Scale Faster',
    desc: 'Get your MVP to market quickly with our developer-friendly platform designed for speed and scalability.',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    challenges: [
      'Limited budget and resources',
      'Need to move fast and iterate',
      'Uncertain traffic patterns',
      'Technical complexity'
    ],
    benefits: [
      { title: 'Pay as you grow', desc: 'Start small and scale seamlessly', icon: Zap },
      { title: 'One-click deploys', desc: 'Ship features in minutes, not hours', icon: Clock },
      { title: 'Auto-scaling', desc: 'Handle viral traffic without breaking', icon: Users },
      { title: 'Free SSL & CDN', desc: 'Enterprise security from day one', icon: Shield },
    ],
    products: ['Web Hosting', 'Cloud Servers', 'Domain Names'],
    testimonial: {
      quote: 'CloudHost helped us go from idea to 100K users in just 3 months.',
      name: 'Sarah Chen',
      role: 'Founder, TechStart',
      result: '100K users'
    },
    recommendedPlan: 'Professional',
    planPrice: 29
  },
  'small-business': {
    title: 'For Small Business',
    subtitle: 'Grow Your Online Presence',
    desc: 'Everything you need to establish and grow your business online with professional tools and support.',
    icon: Building,
    color: 'from-green-500 to-emerald-500',
    challenges: [
      'Building credibility online',
      'Managing multiple digital assets',
      'Limited technical expertise',
      'Budget constraints'
    ],
    benefits: [
      { title: 'Professional Email', desc: 'Custom domain email addresses', icon: Zap },
      { title: 'Website Builder', desc: 'No coding required', icon: Clock },
      { title: '24/7 Support', desc: 'Help when you need it', icon: Users },
      { title: 'All-in-one Platform', desc: 'Domain, hosting, email in one place', icon: Shield },
    ],
    products: ['Web Hosting', 'Email Hosting', 'Website Builder', 'Domain Names'],
    testimonial: {
      quote: 'Finally, a hosting company that speaks my language. Simple, reliable, and affordable.',
      name: 'Mike Johnson',
      role: 'Owner, Local Bakery',
      result: '3x more orders'
    },
    recommendedPlan: 'Professional',
    planPrice: 29
  },
  enterprise: {
    title: 'For Enterprise',
    subtitle: 'Enterprise-Grade Infrastructure',
    desc: 'Secure, compliant, and scalable solutions for organizations that demand the highest standards.',
    icon: Building2,
    color: 'from-purple-500 to-pink-500',
    challenges: [
      'Compliance and security requirements',
      'Need for high availability',
      'Complex infrastructure needs',
      'Global deployment requirements'
    ],
    benefits: [
      { title: 'Dedicated Resources', desc: 'Guaranteed performance', icon: Zap },
      { title: 'SLA Guarantee', desc: '99.99% uptime commitment', icon: Clock },
      { title: 'Dedicated Support', desc: 'Named account manager', icon: Users },
      { title: 'Custom Security', desc: 'SOC 2, HIPAA, GDPR compliant', icon: Shield },
    ],
    products: ['Cloud Servers', 'VPS Hosting', 'SSL Certificates', 'Dedicated IPs'],
    testimonial: {
      quote: 'CloudHost handles our infrastructure so we can focus on what matters: our customers.',
      name: 'Jennifer Williams',
      role: 'CTO, FinanceApp',
      result: '99.99% uptime'
    },
    recommendedPlan: 'Enterprise',
    planPrice: null
  },
  developers: {
    title: 'For Developers',
    subtitle: 'Built by Developers, for Developers',
    desc: 'Powerful APIs, CLI tools, and integrations that fit seamlessly into your workflow.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    challenges: [
      'Need for automation and CI/CD',
      'Multiple environments to manage',
      'Complex deployment pipelines',
      'Performance optimization'
    ],
    benefits: [
      { title: 'Git Integration', desc: 'Deploy from your repo', icon: Zap },
      { title: 'CLI & API', desc: 'Full programmatic control', icon: Clock },
      { title: 'Staging Environments', desc: 'Test before you ship', icon: Users },
      { title: 'SSH Access', desc: 'Full server control', icon: Shield },
    ],
    products: ['VPS Hosting', 'Cloud Servers', 'SSL Certificates'],
    testimonial: {
      quote: 'The developer experience is unmatched. Git push to deploy in seconds.',
      name: 'Alex Kumar',
      role: 'Senior Developer',
      result: '10x faster deploys'
    },
    recommendedPlan: 'Business',
    planPrice: 79
  }
};

const Solutions = () => {
  const { solutionId } = useParams();
  const solution = solutionsData[solutionId] || solutionsData.startups;
  const SolutionIcon = solution.icon;

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mx-auto mb-6`}>
              <SolutionIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {solution.title}
            </h1>
            <p className="text-2xl gradient-text font-semibold mb-4">{solution.subtitle}</p>
            <p className="text-xl text-muted-foreground mb-8">{solution.desc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Talk to Sales</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                We Understand Your Challenges
              </h2>
              <ul className="space-y-4">
                {solution.challenges.map((challenge, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-sm">✕</span>
                    </div>
                    <span className="text-muted-foreground">{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Here's How We Help
              </h2>
              <ul className="space-y-4">
                {solution.benefits.map((benefit, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{benefit.title}</span>
                      <span className="text-muted-foreground"> - {benefit.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-xl text-foreground mb-6">"{solution.testimonial.quote}"</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {solution.testimonial.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{solution.testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{solution.testimonial.role}</p>
                  </div>
                  <Badge className="bg-success/20 text-success ml-4">{solution.testimonial.result}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recommended Plan */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Recommended Plan</h2>
          <p className="text-muted-foreground mb-8">
            Based on your needs, we recommend our {solution.recommendedPlan} plan
          </p>
          <Card className="max-w-md mx-auto border-primary">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">{solution.recommendedPlan}</h3>
              {solution.planPrice ? (
                <p className="text-4xl font-bold gradient-text mb-4">
                  ${solution.planPrice}<span className="text-lg text-muted-foreground">/mo</span>
                </p>
              ) : (
                <p className="text-2xl font-bold text-foreground mb-4">Custom Pricing</p>
              )}
              <ul className="space-y-2 mb-6 text-left">
                {solution.products.map((product, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
              <Link to={solution.planPrice ? '/register' : '/contact'}>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  {solution.planPrice ? 'Start Free Trial' : 'Contact Sales'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Other Solutions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(solutionsData).filter(([key]) => key !== solutionId).map(([key, sol]) => {
              const Icon = sol.icon;
              return (
                <Link key={key} to={`/solutions/${key}`}>
                  <Card className="border-border/50 hover:border-primary/30 transition-all h-full">
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sol.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-medium text-foreground">{sol.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Solutions;
