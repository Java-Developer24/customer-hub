import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const products = [
  { id: 1, name: 'Enterprise Plan', description: 'Full-featured enterprise solution with unlimited access', price: 299, period: 'monthly', status: 'active', expiresAt: '2024-03-15', features: ['Unlimited users', 'API access', '24/7 support', 'Custom integrations'] },
  { id: 2, name: 'API Access Pro', description: 'Advanced API access with higher rate limits', price: 99, period: 'monthly', status: 'active', expiresAt: '2024-02-28', features: ['100k requests/month', 'Priority support', 'Webhooks'] },
  { id: 3, name: 'Analytics Suite', description: 'Comprehensive analytics and reporting dashboard', price: 149, period: 'monthly', status: 'expiring', expiresAt: '2024-01-20', features: ['Real-time analytics', 'Custom reports', 'Export data'] },
  { id: 4, name: 'Storage Plus', description: 'Extended cloud storage solution', price: 49, period: 'monthly', status: 'suspended', expiresAt: '2024-01-05', features: ['500GB storage', 'Auto backup', 'CDN'] },
];

const UserProducts = () => {
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const variants = {
      active: { class: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
      expiring: { class: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
      suspended: { class: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertCircle },
    };
    return variants[status] || variants.active;
  };

  const handleRenew = (product) => {
    toast({
      title: "Renewal Initiated",
      description: `Processing renewal for ${product.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground">
            Manage your purchased products and subscriptions
          </p>
        </div>
        <Button>
          <Package className="w-4 h-4 mr-2" />
          Browse Products
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product, index) => {
          const statusInfo = getStatusBadge(product.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass card-hover ${product.status === 'suspended' && 'opacity-70'}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        product.status === 'suspended' ? 'bg-muted' : 'bg-primary/10'
                      }`}>
                        <Package className={`w-6 h-6 ${
                          product.status === 'suspended' ? 'text-muted-foreground' : 'text-primary'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline" className={statusInfo.class}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">${product.price}</p>
                      <p className="text-sm text-muted-foreground">/{product.period}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {product.status === 'suspended' ? 'Expired' : 'Expires'}: {product.expiresAt}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    {product.status === 'suspended' || product.status === 'expiring' ? (
                      <Button className="flex-1" onClick={() => handleRenew(product)}>
                        Renew Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        Manage
                      </Button>
                    )}
                    <Button variant="ghost">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProducts;
