import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  UserCog,
  Mail,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { adminCustomers } from '@/data/cloudhost-products';

const customers = adminCustomers.map(c => ({
  ...c,
  products: c.products.length,
}));

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [impersonating, setImpersonating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    return variants[status] || variants.active;
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImpersonate = (customer) => {
    setSelectedCustomer(customer);
    setImpersonating(true);
    toast({
      title: "Impersonation Mode",
      description: `You are now viewing ${customer.name}'s account`,
    });
  };

  const handleSuspend = (customer) => {
    toast({
      title: "Customer Suspended",
      description: `${customer.name}'s account has been suspended`,
      variant: "destructive",
    });
  };

  const handleActivate = (customer) => {
    toast({
      title: "Customer Activated",
      description: `${customer.name}'s account is now active`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Impersonation Banner */}
      {impersonating && selectedCustomer && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <UserCog className="w-5 h-5 text-warning" />
            <span className="text-warning font-medium">
              You are impersonating {selectedCustomer.name} (View-only mode)
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setImpersonating(false)}
            className="border-warning/30 text-warning hover:bg-warning/10"
          >
            Exit Impersonation
          </Button>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage CloudHost customer accounts and subscriptions
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Customer</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Region</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Products</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Total Spent</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Joined</th>
                  <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline" className={getStatusBadge(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-foreground">{customer.region}</td>
                    <td className="py-4 text-sm text-foreground">{customer.products}</td>
                    <td className="py-4 text-sm font-medium text-foreground">{customer.spent}</td>
                    <td className="py-4 text-sm text-muted-foreground">{customer.joined}</td>
                    <td className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => navigate(`/admin/customers/${customer.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleImpersonate(customer)}>
                            <UserCog className="w-4 h-4 mr-2" />
                            Impersonate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {customer.status === 'active' ? (
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleSuspend(customer)}
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="text-success"
                              onClick={() => handleActivate(customer)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Activate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Profile Modal */}
      <Dialog open={!!selectedCustomer && !impersonating} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>View and manage customer details</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {selectedCustomer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={`mt-1 ${getStatusBadge(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium text-foreground mt-1">{selectedCustomer.region}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="font-medium text-foreground mt-1">{selectedCustomer.products}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-medium text-foreground mt-1">{selectedCustomer.spent}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button onClick={() => handleImpersonate(selectedCustomer)}>
                  <UserCog className="w-4 h-4 mr-2" />
                  Impersonate
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
