import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  UserCog,
  Ban,
  Edit,
  Server,
  Cloud,
  Globe,
  Lock,
  Palette,
  Search,
  Monitor,
  Activity,
  ShoppingCart,
  Settings,
  LogIn,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { adminCustomers } from '@/data/cloudhost-products';

// Extended customer data with more details
const getCustomerDetails = (id) => {
  const customer = adminCustomers.find(c => c.id === parseInt(id));
  if (!customer) return null;
  
  return {
    ...customer,
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco, CA 94102',
    avatar: customer.name.charAt(0),
    subscriptions: [
      { id: 1, product: customer.products[0] || 'Web Hosting - Professional', status: 'active', nextBilling: '2024-02-15', amount: 5.99, autoRenew: true },
      { id: 2, product: customer.products[1] || 'SSL Certificates - Wildcard SSL', status: 'active', nextBilling: '2024-03-01', amount: 39.99, autoRenew: true },
    ].filter((_, i) => i < customer.products.length),
    orders: [
      { id: 'ORD-2024-001', date: '2024-01-15', items: customer.products.slice(0, 2), total: 47.98, status: 'delivered' },
      { id: 'ORD-2023-089', date: '2023-12-20', items: customer.products.slice(0, 1), total: 5.99, status: 'delivered' },
      { id: 'ORD-2023-056', date: '2023-11-10', items: ['Domain Names - .com'], total: 9.99, status: 'delivered' },
    ],
    activity: [
      { id: 1, action: 'Logged in', icon: LogIn, time: '2 hours ago', type: 'info' },
      { id: 2, action: 'Updated payment method', icon: CreditCard, time: '1 day ago', type: 'info' },
      { id: 3, action: 'Renewed Web Hosting subscription', icon: RefreshCw, time: '3 days ago', type: 'success' },
      { id: 4, action: 'Created support ticket #1234', icon: FileText, time: '1 week ago', type: 'warning' },
      { id: 5, action: 'Changed account settings', icon: Settings, time: '2 weeks ago', type: 'info' },
      { id: 6, action: 'Purchased SSL Certificate', icon: ShoppingCart, time: '1 month ago', type: 'success' },
    ],
    tickets: [
      { id: 'TKT-1234', subject: 'SSL installation help', status: 'resolved', date: '2024-01-10' },
      { id: 'TKT-1180', subject: 'Email configuration', status: 'resolved', date: '2023-12-15' },
    ],
  };
};

const iconMap = {
  'web-hosting': Server,
  'cloud-servers': Cloud,
  'domain-names': Globe,
  'email-hosting': Mail,
  'ssl-certificates': Lock,
  'website-builder': Palette,
  'seo-tools': Search,
  'vps-hosting': Monitor,
};

const getProductIcon = (productName) => {
  const lowerName = productName.toLowerCase();
  if (lowerName.includes('hosting')) return Server;
  if (lowerName.includes('cloud')) return Cloud;
  if (lowerName.includes('domain')) return Globe;
  if (lowerName.includes('email')) return Mail;
  if (lowerName.includes('ssl')) return Lock;
  if (lowerName.includes('builder')) return Palette;
  if (lowerName.includes('seo')) return Search;
  if (lowerName.includes('vps')) return Monitor;
  return Package;
};

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const customer = getCustomerDetails(customerId);
  
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-foreground mb-2">Customer Not Found</h2>
        <p className="text-muted-foreground mb-4">The customer you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/customers')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      delivered: 'bg-success/10 text-success border-success/20',
      processing: 'bg-primary/10 text-primary border-primary/20',
      resolved: 'bg-success/10 text-success border-success/20',
      open: 'bg-warning/10 text-warning border-warning/20',
    };
    return variants[status] || variants.active;
  };

  const getActivityIcon = (type) => {
    const colors = {
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-destructive bg-destructive/10',
      info: 'text-primary bg-primary/10',
    };
    return colors[type] || colors.info;
  };

  const handleSuspend = () => {
    toast({
      title: "Account Suspended",
      description: `${customer.name}'s account has been suspended`,
      variant: "destructive",
    });
  };

  const handleActivate = () => {
    toast({
      title: "Account Activated",
      description: `${customer.name}'s account is now active`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/admin/customers')} className="mb-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Customers
      </Button>

      {/* Customer Header */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/20">
                <span className="text-3xl font-bold text-primary">{customer.avatar}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{customer.name}</h1>
                  <Badge variant="outline" className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {customer.address}, {customer.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <UserCog className="w-4 h-4 mr-2" />
                Impersonate
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {customer.status === 'active' ? (
                <Button variant="destructive" size="sm" onClick={handleSuspend}>
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleActivate}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.spent}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.products.length}</p>
              <p className="text-sm text-muted-foreground">Active Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.orders.length}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.joined}</p>
              <p className="text-sm text-muted-foreground">Member Since</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="orders">Purchase History</TabsTrigger>
          <TabsTrigger value="activity">Account Activity</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Active Subscriptions ({customer.subscriptions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.subscriptions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No active subscriptions</p>
              ) : (
                <div className="space-y-4">
                  {customer.subscriptions.map((sub, index) => {
                    const IconComponent = getProductIcon(sub.product);
                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{sub.product}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>Next billing: {sub.nextBilling}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusBadge(sub.status)}>
                            {sub.status}
                          </Badge>
                          <p className="font-semibold text-foreground">${sub.amount}/mo</p>
                          <div className="flex items-center gap-1 text-sm">
                            {sub.autoRenew ? (
                              <span className="flex items-center gap-1 text-success">
                                <CheckCircle2 className="w-4 h-4" />
                                Auto-renew
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <XCircle className="w-4 h-4" />
                                Manual
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Purchase History ({customer.orders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Order ID</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Date</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Items</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Total</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-4 text-sm font-medium text-primary">{order.id}</td>
                        <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {order.items.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-foreground">${order.total}</td>
                        <td className="py-4">
                          <Badge variant="outline" className={getStatusBadge(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Account Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.activity.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityIcon(item.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.action}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Support Tickets ({customer.tickets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.tickets.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No support tickets</p>
              ) : (
                <div className="space-y-4">
                  {customer.tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium text-primary">{ticket.id}</p>
                        <p className="text-foreground">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground">{ticket.date}</p>
                      </div>
                      <Badge variant="outline" className={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;