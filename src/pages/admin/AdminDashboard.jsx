import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Mail,
  Ticket,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Total Customers',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'primary',
  },
  {
    title: 'Active Products',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    color: 'success',
  },
  {
    title: 'Monthly Revenue',
    value: '$84,232',
    change: '+18.3%',
    trend: 'up',
    icon: CreditCard,
    color: 'accent',
  },
  {
    title: 'Active Subscriptions',
    value: '1,429',
    change: '-2.1%',
    trend: 'down',
    icon: TrendingUp,
    color: 'warning',
  },
];

const recentCustomers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', status: 'active', products: 5, spent: '$1,249' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', products: 3, spent: '$847' },
  { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'suspended', products: 2, spent: '$299' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', status: 'active', products: 8, spent: '$2,199' },
  { id: 5, name: 'David Lee', email: 'david@example.com', status: 'pending', products: 1, spent: '$99' },
];

const recentTickets = [
  { id: 1, subject: 'Payment issue', customer: 'John Smith', status: 'open', priority: 'high' },
  { id: 2, subject: 'Feature request', customer: 'Sarah Johnson', status: 'in_progress', priority: 'medium' },
  { id: 3, subject: 'Account access', customer: 'Mike Wilson', status: 'open', priority: 'high' },
  { id: 4, subject: 'Billing question', customer: 'Emily Brown', status: 'closed', priority: 'low' },
];

const AdminDashboard = () => {
  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      open: 'bg-primary/10 text-primary border-primary/20',
      in_progress: 'bg-warning/10 text-warning border-warning/20',
      closed: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[status] || variants.active;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[priority] || variants.medium;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CloudHost Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your platform performance and metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Send Broadcast
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
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
                    <div className={`flex items-center gap-1 mt-1 text-sm ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{stat.change}</span>
                      <span className="text-muted-foreground ml-1">vs last month</span>
                    </div>
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
        {/* Recent Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Customers</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Customer</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Products</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Spent</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {customer.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{customer.name}</p>
                              <p className="text-xs text-muted-foreground">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className={getStatusBadge(customer.status)}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-foreground">{customer.products}</td>
                        <td className="py-3 text-sm font-medium text-foreground">{customer.spent}</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="icon-sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Tickets</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-foreground text-sm">{ticket.subject}</p>
                      <Badge variant="outline" className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{ticket.customer}</p>
                      <Badge variant="outline" className={getStatusBadge(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
