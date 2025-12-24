import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Calendar,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const subscriptions = [
  { id: 1, product: 'Enterprise Plan', nextBilling: '2024-03-15', amount: 299, status: 'active', autoRenew: true },
  { id: 2, product: 'API Access Pro', nextBilling: '2024-02-28', amount: 99, status: 'active', autoRenew: true },
  { id: 3, product: 'Analytics Suite', nextBilling: '2024-01-20', amount: 149, status: 'expiring', autoRenew: false },
  { id: 4, product: 'Storage Plus', nextBilling: '2024-01-05', amount: 49, status: 'cancelled', autoRenew: false },
];

const billingHistory = [
  { id: 1, date: '2024-01-01', description: 'Enterprise Plan - Monthly', amount: 299, status: 'paid' },
  { id: 2, date: '2024-01-01', description: 'API Access Pro - Monthly', amount: 99, status: 'paid' },
  { id: 3, date: '2023-12-20', description: 'Analytics Suite - Monthly', amount: 149, status: 'paid' },
  { id: 4, date: '2023-12-15', description: 'Storage Plus - Monthly', amount: 49, status: 'refunded' },
];

const UserSubscriptions = () => {
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      expiring: 'bg-warning/10 text-warning border-warning/20',
      cancelled: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[status] || variants.active;
  };

  const handleToggleAutoRenew = (subscription) => {
    toast({
      title: subscription.autoRenew ? "Auto-renew disabled" : "Auto-renew enabled",
      description: `Changes applied to ${subscription.product}`,
    });
  };

  const handleCancel = (subscription) => {
    toast({
      title: "Subscription cancelled",
      description: `${subscription.product} will not renew`,
      variant: "destructive",
    });
  };

  const totalMonthly = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your CloudHost billing and subscription preferences
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Total</p>
                <p className="text-2xl font-bold text-foreground">${totalMonthly}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold text-success">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Billing</p>
                <p className="text-2xl font-bold text-foreground">Jan 20</p>
              </div>
              <Calendar className="w-8 h-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription, index) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    subscription.status === 'cancelled' ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${
                      subscription.status === 'cancelled' ? 'text-muted-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{subscription.product}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Next billing: {subscription.nextBilling}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getStatusBadge(subscription.status)}>
                    {subscription.status}
                  </Badge>
                  <p className="font-semibold text-foreground">${subscription.amount}/mo</p>
                  
                  {subscription.status !== 'cancelled' && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAutoRenew(subscription)}
                      >
                        <RefreshCw className={`w-4 h-4 ${subscription.autoRenew ? 'text-success' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancel(subscription)}
                      >
                        <XCircle className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Date</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Description</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Amount</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b border-border/50">
                    <td className="py-3 text-sm text-muted-foreground">{item.date}</td>
                    <td className="py-3 text-sm text-foreground">{item.description}</td>
                    <td className="py-3 text-sm font-medium text-foreground">${item.amount}</td>
                    <td className="py-3">
                      <Badge 
                        variant="outline" 
                        className={item.status === 'paid' 
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSubscriptions;
