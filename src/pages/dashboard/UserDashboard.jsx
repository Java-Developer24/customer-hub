import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  CreditCard,
  TrendingUp,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Cloud,
  Lock,
  Mail,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { sampleUserProducts, sampleSubscriptions } from '@/data/cloudhost-products';

const iconMap = {
  'web-hosting': Server,
  'cloud-servers': Cloud,
  'ssl-certificates': Lock,
  'email-hosting': Mail,
};

const stats = [
  {
    title: 'Active Services',
    value: sampleUserProducts.filter(p => p.status === 'active').length.toString(),
    change: '+1',
    trend: 'up',
    icon: Package,
    color: 'primary',
  },
  {
    title: 'Active Subscriptions',
    value: sampleSubscriptions.filter(s => s.status === 'active').length.toString(),
    change: '+1',
    trend: 'up',
    icon: CreditCard,
    color: 'success',
  },
  {
    title: 'Monthly Spend',
    value: `$${sampleSubscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0).toFixed(2)}`,
    change: '-5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'accent',
  },
  {
    title: 'Pending Renewals',
    value: sampleUserProducts.filter(p => p.status === 'expiring').length.toString(),
    change: '',
    trend: 'neutral',
    icon: Clock,
    color: 'warning',
  },
];

const notifications = [
  { id: 1, type: 'warning', message: 'SSL Certificates - Wildcard SSL expires in 5 days', time: '2 hours ago' },
  { id: 2, type: 'info', message: 'New feature available: CDN Integration', time: '1 day ago' },
  { id: 3, type: 'success', message: 'Payment processed successfully for Cloud Servers', time: '3 days ago' },
];

const UserDashboard = () => {
  const { user } = useAuth();

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      expiring: 'bg-warning/10 text-warning border-warning/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return variants[status] || variants.active;
  };

  const getNotificationIcon = (type) => {
    const icons = {
      warning: <AlertCircle className="w-4 h-4 text-warning" />,
      info: <Bell className="w-4 h-4 text-primary" />,
      success: <CheckCircle2 className="w-4 h-4 text-success" />,
    };
    return icons[type] || icons.info;
  };

  return (
    <div className="space-y-6 relative">
      {/* Background orbs */}
      <div className="orb orb-primary w-96 h-96 -top-48 -left-48 opacity-30" />
      <div className="orb orb-accent w-64 h-64 top-1/2 -right-32 opacity-20" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gradient-primary">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your CloudHost account
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button variant="glass" className="w-fit gap-2">
            <Bell className="w-4 h-4" />
            View All Notifications
          </Button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card variant="stat" className="card-hover group">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    {stat.change && (
                      <div className={`flex items-center gap-1.5 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                        {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                        <span>{stat.change}</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}/15 border border-${stat.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card variant="glass" className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 bg-secondary/20">
              <CardTitle className="text-lg font-semibold">Your Products</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {sampleUserProducts.map((product, idx) => {
                  const ProductIcon = iconMap[product.productId] || Package;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/20 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                          <ProductIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires: {product.expiresAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={`${getStatusBadge(product.status)} font-medium`}>
                          {product.status}
                        </Badge>
                        <span className="text-sm font-bold text-foreground">${product.price}/{product.period}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card variant="glass" className="h-full">
            <CardHeader className="border-b border-border/30 bg-secondary/20">
              <CardTitle className="text-lg font-semibold">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {notifications.map((notification, idx) => (
                  <motion.div 
                    key={notification.id} 
                    className="flex gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-secondary/50 group-hover:bg-secondary/80 transition-colors">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground leading-relaxed">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">{notification.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                See All Notifications
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
