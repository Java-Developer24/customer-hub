import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { HeroBackground, FloatingParticles } from '@/components/effects/AnimatedBackground';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { z } from 'zod';

// Input validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validate inputs
    const validation = registerSchema.safeParse({ name, email, password, confirmPassword });
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const result = await register(name, email, password);
    
    if (result.success) {
      toast({
        title: "Account created!",
        description: "Welcome to SaaSPlatform. You can now access your dashboard.",
      });
      navigate('/dashboard');
    } else {
      // Handle specific error cases
      let errorMessage = result.error || "Registration failed";
      if (result.error?.includes('already registered')) {
        errorMessage = "This email is already registered. Please sign in instead.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-destructive', 'bg-warning', 'bg-primary', 'bg-success'];
    
    return { strength, label: labels[strength - 1] || '', color: colors[strength - 1] || '' };
  };

  const passwordStrength = getPasswordStrength();

  const features = [
    'Unlimited projects',
    'Advanced analytics',
    '24/7 support',
    'API access',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <HeroBackground variant="hero" />
        
        {/* Floating orbs */}
        <div className="orb orb-accent w-96 h-96 top-1/3 right-1/4" style={{ animationDelay: '0s' }} />
        <div className="orb orb-primary w-80 h-80 bottom-1/3 left-1/4" style={{ animationDelay: '2s' }} />
        <div className="orb orb-pink w-64 h-64 top-1/2 left-1/3" style={{ animationDelay: '4s' }} />
        
        <FloatingParticles count={40} />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div 
              className="flex items-center justify-center gap-3 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg glow animate-pulse-slow">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-gradient-primary">SaaSPlatform</span>
            </motion.div>
            
            <h1 className="text-5xl font-black mb-6 text-foreground leading-tight">
              Start Your Journey
              <span className="block text-gradient-primary mt-2">Today</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
              Join thousands of businesses already using our platform to grow and succeed.
            </p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-3 max-w-sm mx-auto"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 glass-card p-3 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle variant="minimal" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Create account</h2>
            <p className="text-muted-foreground">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 h-12 glass-subtle border-border/50 focus:border-primary focus:glow-soft transition-all ${errors.name ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 h-12 glass-subtle border-border/50 focus:border-primary focus:glow-soft transition-all ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 h-12 glass-subtle border-border/50 focus:border-primary focus:glow-soft transition-all ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
              {password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i <= passwordStrength.strength ? passwordStrength.color : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: <span className={passwordStrength.strength >= 3 ? 'text-success' : passwordStrength.strength >= 2 ? 'text-primary' : 'text-destructive'}>{passwordStrength.label || 'Too weak'}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 h-12 glass-subtle border-border/50 focus:border-primary focus:glow-soft transition-all ${errors.confirmPassword ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword}</p>
              )}
              {confirmPassword && password === confirmPassword && confirmPassword.length > 0 && (
                <p className="text-xs text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
