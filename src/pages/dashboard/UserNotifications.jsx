import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  CreditCard,
  Package,
  Settings,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const notifications = [
  { id: 1, type: 'warning', title: 'Subscription Expiring Soon', message: 'Your Analytics Suite subscription expires in 5 days. Renew now to avoid interruption.', time: '2 hours ago', read: false, icon: Calendar },
  { id: 2, type: 'info', title: 'New Feature Available', message: 'Check out our new Advanced Reports feature, now available for all Enterprise users.', time: '1 day ago', read: false, icon: Info },
  { id: 3, type: 'success', title: 'Payment Successful', message: 'Your payment of $299 for Enterprise Plan was processed successfully.', time: '3 days ago', read: true, icon: CreditCard },
  { id: 4, type: 'info', title: 'Product Update', message: 'API Access Pro now includes 50% more API calls per month at no extra cost.', time: '5 days ago', read: true, icon: Package },
  { id: 5, type: 'warning', title: 'Action Required', message: 'Please update your payment method to continue using Storage Plus.', time: '1 week ago', read: true, icon: AlertCircle },
  { id: 6, type: 'success', title: 'Account Verified', message: 'Your account email has been successfully verified.', time: '2 weeks ago', read: true, icon: CheckCircle2 },
];

const UserNotifications = () => {
  const getTypeStyles = (type) => {
    const styles = {
      warning: { bg: 'bg-warning/10', border: 'border-warning/20', icon: 'text-warning' },
      success: { bg: 'bg-success/10', border: 'border-success/20', icon: 'text-success' },
      info: { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'text-primary' },
    };
    return styles[type] || styles.info;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your CloudHost account activity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Mark All as Read
          </Button>
          <Button variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Badge variant="outline" className="px-4 py-2">
          <Bell className="w-4 h-4 mr-2" />
          {unreadCount} unread
        </Badge>
        <Badge variant="outline" className="px-4 py-2 bg-warning/10 text-warning border-warning/20">
          <AlertCircle className="w-4 h-4 mr-2" />
          {notifications.filter(n => n.type === 'warning').length} action required
        </Badge>
      </div>

      {/* Notifications List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const styles = getTypeStyles(notification.type);
              const Icon = notification.icon;
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    notification.read 
                      ? 'bg-secondary/30 border-border' 
                      : `${styles.bg} ${styles.border}`
                  } hover:bg-secondary`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${styles.bg}`}>
                      <Icon className={`w-5 h-5 ${styles.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-foreground' : 'text-foreground'}`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2" />
                          )}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserNotifications;
