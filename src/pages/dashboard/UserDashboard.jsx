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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const stats = [
  {
    title: 'Active Products',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Package,
    color: 'primary',
  },
  {
    title: 'Active Subscriptions',
    value: '8',
    change: '+1',
    trend: 'up',
    icon: CreditCard,
    color: 'success',
  },
  {
    title: 'Monthly Spend',
    value: '$1,249',
    change: '-5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'accent',
  },
  {
    title: 'Pending Renewals',
    value: '3',
    change: '',
    trend: 'neutral',
    icon: Clock,
    color: 'warning',
  },
];

const recentProducts = [
  { id: 1, name: 'Enterprise Plan', status: 'active', expiresAt: '2024-03-15', price: '$299/mo' },
  { id: 2, name: 'API Access Pro', status: 'active', expiresAt: '2024-02-28', price: '$99/mo' },
  { id: 3, name: 'Analytics Suite', status: 'expiring', expiresAt: '2024-01-20', price: '$149/mo' },
  { id: 4, name: 'Storage Plus', status: 'suspended', expiresAt: '2024-01-05', price: '$49/mo' },
];

const notifications = [
  { id: 1, type: 'warning', message: 'Analytics Suite expires in 5 days', time: '2 hours ago' },
  { id: 2, type: 'info', message: 'New feature available: Advanced Reports', time: '1 day ago' },
  { id: 3, type: 'success', message: 'Payment processed successfully', time: '3 days ago' },
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your account activity
          </p>
        </div>
        <Button variant="outline" className="w-fit">
          <Bell className="w-4 h-4 mr-2" />
          View All Notifications
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    {stat.change && (
                      <div className={`flex items-center gap-1 mt-1 text-sm ${
                        stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                        {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                        <span>{stat.change}</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-2.5 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Your Products</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {product.expiresAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getStatusBadge(product.status)}>
                        {product.status}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" size="sm">
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
