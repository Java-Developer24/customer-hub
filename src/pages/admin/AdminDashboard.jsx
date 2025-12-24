import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Mail,
  Activity,
  ShoppingCart,
  Clock,
  AlertTriangle,
  DollarSign,
  UserPlus,
  UserX,
  Ticket,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  dashboardQuickStats,
  monthlyRevenueData,
  regionDistributionData,
  productSubscriptionData,
  topProducts,
  expiringSubscriptions,
  recentAdminOrders
} from '@/data/admin-dashboard-data';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--success))'];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Customers',
      value: dashboardQuickStats.activeCustomers.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      subtitle: `+${dashboardQuickStats.newCustomersThisMonth} this month`,
      color: 'primary',
    },
    {
      title: 'Active Subscriptions',
      value: dashboardQuickStats.activeSubscriptions.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: RefreshCw,
      subtitle: 'Across all products',
      color: 'success',
    },
    {
      title: 'Monthly Revenue',
      value: `$${(dashboardQuickStats.monthlyRevenue).toLocaleString()}`,
      change: '+18.3%',
      trend: 'up',
      icon: DollarSign,
      subtitle: `YTD: $${(dashboardQuickStats.yearlyRevenue / 1000).toFixed(0)}K`,
      color: 'accent',
    },
    {
      title: 'Total Revenue',
      value: `$${(dashboardQuickStats.totalRevenue / 1000).toFixed(0)}K`,
      change: '+22.1%',
      trend: 'up',
      icon: TrendingUp,
      subtitle: 'All time',
      color: 'warning',
    },
  ];

  const quickStats = [
    { label: 'Active Customers', value: dashboardQuickStats.activeCustomers, icon: Users, color: 'text-success' },
    { label: 'Suspended', value: dashboardQuickStats.suspendedAccounts, icon: UserX, color: 'text-destructive' },
    { label: 'Total Orders', value: dashboardQuickStats.totalOrders, icon: ShoppingCart, color: 'text-primary' },
    { label: 'Pending Payments', value: dashboardQuickStats.pendingPayments, icon: Clock, color: 'text-warning' },
    { label: 'Open Tickets', value: dashboardQuickStats.openTickets, icon: Ticket, color: 'text-accent' },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'bg-success/10 text-success border-success/20',
      processing: 'bg-primary/10 text-primary border-primary/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20',
      refunded: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />
      <div className="orb orb-primary w-[500px] h-[500px] -top-64 -right-64 opacity-20" />
      <div className="orb orb-accent w-80 h-80 bottom-0 -left-40 opacity-15" />
      
      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-gradient-primary">CloudHost Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of platform performance and metrics
          </p>
        </motion.div>
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="glass" onClick={() => navigate('/admin/notifications')}>
            <Mail className="w-4 h-4 mr-2" />
            Notification Logs
          </Button>
          <Button variant="glow" onClick={() => navigate('/admin/orders')}>
            <Activity className="w-4 h-4 mr-2" />
            View All Orders
          </Button>
        </motion.div>
      </div>

      {/* Main Stats Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card variant="stat" className="card-hover group overflow-visible">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}/15 border border-${stat.color}/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
          >
            <Card variant="glass" className="group hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary/80 transition-colors">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stat.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v/1000}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Customer Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={regionDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {regionDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {regionDistributionData.map((region, index) => (
                  <div key={region.name} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-muted-foreground">{region.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Product Stats & Expiring Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Subscriptions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Product Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={productSubscriptionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="product" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expiring Subscriptions Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-border/50 border-warning/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Expiring Soon
              </CardTitle>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringSubscriptions.slice(0, 4).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{sub.customerName}</p>
                      <p className="text-xs text-muted-foreground truncate">{sub.product}</p>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 shrink-0 ml-2">
                      {sub.daysLeft}d
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 gap-1" onClick={() => navigate('/admin/customers')}>
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/orders')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Order</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Customer</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Total</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAdminOrders.slice(0, 6).map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-3">
                          <span className="font-medium text-primary text-sm">{order.id}</span>
                        </td>
                        <td className="py-3">
                          <p className="font-medium text-foreground text-sm">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </td>
                        <td className="py-3 text-sm font-medium">${order.total.toFixed(2)}</td>
                        <td className="py-3">
                          <Badge variant="outline" className={getStatusBadge(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/orders')}>
                            <Eye className="w-4 h-4" />
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

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{product.subscribers} subs</span>
                        <span className="text-success flex items-center">
                          <ArrowUpRight className="w-3 h-3" />
                          {product.growth}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">${product.revenue.toLocaleString()}</p>
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
