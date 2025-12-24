import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, Award, Globe, Heart, Target, Zap, Shield, Clock,
  Building, MapPin, Linkedin, Twitter, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';

const stats = [
  { value: '500K+', label: 'Websites Hosted', icon: Globe },
  { value: '150+', label: 'Countries', icon: MapPin },
  { value: '250+', label: 'Team Members', icon: Users },
  { value: '10+', label: 'Years Experience', icon: Award },
];

const values = [
  { title: 'Customer First', desc: 'Every decision we make starts with our customers in mind.', icon: Heart },
  { title: 'Innovation', desc: 'We constantly push boundaries to deliver cutting-edge solutions.', icon: Zap },
  { title: 'Reliability', desc: '99.9% uptime is not just a promise, it\'s our standard.', icon: Shield },
  { title: 'Transparency', desc: 'No hidden fees, no surprises. What you see is what you get.', icon: Target },
  { title: 'Speed', desc: 'Fast servers, fast support, fast everything.', icon: Clock },
];

const team = [
  { name: 'Alex Thompson', role: 'CEO & Founder', image: '/placeholder.svg' },
  { name: 'Sarah Chen', role: 'CTO', image: '/placeholder.svg' },
  { name: 'Michael Roberts', role: 'VP Engineering', image: '/placeholder.svg' },
  { name: 'Emily Davis', role: 'VP Customer Success', image: '/placeholder.svg' },
];

const timeline = [
  { year: '2014', title: 'Founded', desc: 'Started in a small garage with a big dream' },
  { year: '2016', title: '10K Customers', desc: 'Reached our first major milestone' },
  { year: '2018', title: 'Global Expansion', desc: 'Opened data centers in Europe and Asia' },
  { year: '2020', title: '100K Customers', desc: 'Became a trusted name in cloud hosting' },
  { year: '2023', title: '500K Customers', desc: 'Serving half a million websites worldwide' },
];

const About = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              We're on a Mission to <span className="gradient-text">Democratize the Cloud</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Making powerful cloud infrastructure accessible to businesses of all sizes, 
              from solo entrepreneurs to global enterprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CloudHost was born in 2014 from a simple frustration: why was cloud hosting so complicated and expensive? 
                  Our founders, experienced developers themselves, knew there had to be a better way.
                </p>
                <p>
                  We started with a mission to make cloud infrastructure accessible to everyone. 
                  No more confusing pricing, no more complex setups, no more waiting hours for support.
                </p>
                <p>
                  Today, we power over 500,000 websites across 150+ countries. But we're just getting started. 
                  Our vision is to become the most customer-centric cloud platform in the world.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 shrink-0">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border/50 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="text-muted-foreground">Meet the people driving our mission forward</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 overflow-hidden group">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-20 h-20 text-muted-foreground/30" />
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                      </a>
                      <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        <Twitter className="w-4 h-4 text-muted-foreground" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We're always looking for talented people to join our mission
          </p>
          <Link to="/careers">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
              View Open Positions
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default About;
