import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Eye, 
  Download, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  CreditCard,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: [
      { name: 'Premium Web Hosting', quantity: 1, price: 149.99, image: '/placeholder.svg' },
      { name: 'SSL Certificate', quantity: 1, price: 99.99, image: '/placeholder.svg' },
      { name: 'Domain Registration', quantity: 1, price: 50.01, image: '/placeholder.svg' }
    ],
    payment: { method: 'Credit Card', last4: '4242' },
    tracking: [
      { status: 'Order Placed', date: '2024-01-15 10:30', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-15 10:32', completed: true },
      { status: 'Processing', date: '2024-01-15 11:00', completed: true },
      { status: 'Activated', date: '2024-01-15 11:15', completed: true },
      { status: 'Delivered', date: '2024-01-15 11:20', completed: true }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 599.99,
    items: [
      { name: 'Cloud VPS Server', quantity: 1, price: 599.99, image: '/placeholder.svg' }
    ],
    payment: { method: 'PayPal', last4: null },
    tracking: [
      { status: 'Order Placed', date: '2024-01-20 14:00', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-20 14:05', completed: true },
      { status: 'Processing', date: '2024-01-20 14:30', completed: true },
      { status: 'Configuring Server', date: '2024-01-20 15:00', completed: false },
      { status: 'Ready', date: null, completed: false }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'pending',
    total: 79.99,
    items: [
      { name: 'Email Hosting Pro', quantity: 1, price: 79.99, image: '/placeholder.svg' }
    ],
    payment: { method: 'Credit Card', last4: '1234' },
    tracking: [
      { status: 'Order Placed', date: '2024-01-22 09:00', completed: true },
      { status: 'Awaiting Payment', date: null, completed: false },
      { status: 'Processing', date: null, completed: false },
      { status: 'Activated', date: null, completed: false }
    ]
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    total: 199.99,
    items: [
      { name: 'Website Builder Pro', quantity: 1, price: 199.99, image: '/placeholder.svg' }
    ],
    payment: { method: 'Credit Card', last4: '5678' },
    tracking: [
      { status: 'Order Placed', date: '2024-01-10 16:00', completed: true },
      { status: 'Cancelled by User', date: '2024-01-10 16:30', completed: true }
    ]
  }
];

const statusConfig = {
  delivered: { label: 'Delivered', color: 'bg-success/20 text-success', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-primary/20 text-primary', icon: RefreshCw },
  pending: { label: 'Pending', color: 'bg-warning/20 text-warning', icon: Clock },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/20 text-destructive', icon: XCircle },
  shipped: { label: 'Shipped', color: 'bg-accent/20 text-accent', icon: Truck }
};

const OrderCard = ({ order, onViewDetails }) => {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{order.id}</h3>
                  <Badge className={status.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''} • Ordered on {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {order.items.slice(0, 2).map((item, index) => (
                    <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
                      {item.name}
                    </span>
                  ))}
                  {order.items.length > 2 && (
                    <span className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
                      +{order.items.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {order.payment.method} {order.payment.last4 && `•••• ${order.payment.last4}`}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails(order)}
                className="group-hover:border-primary group-hover:text-primary"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const OrderDetailsModal = ({ order, open, onClose }) => {
  if (!order) return null;
  
  const status = statusConfig[order.status];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            Order {order.id}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 mt-4">
            {/* Order Status */}
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Order Status</p>
                <Badge className={`${status.color} mt-1`}>{status.label}</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Items */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Order Items
              </h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-muted"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{order.payment.method}</p>
                  {order.payment.last4 && (
                    <p className="text-sm text-muted-foreground">•••• {order.payment.last4}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <Button variant="destructive" className="flex-1">
                  Cancel Order
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tracking" className="mt-4">
            <div className="relative pl-8">
              {order.tracking.map((step, index) => (
                <div key={index} className="relative pb-8 last:pb-0">
                  {/* Connecting line */}
                  {index < order.tracking.length - 1 && (
                    <div 
                      className={`absolute left-[-20px] top-8 w-0.5 h-full ${
                        step.completed ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                  
                  {/* Status dot */}
                  <div 
                    className={`absolute left-[-24px] top-1 w-3 h-3 rounded-full border-2 ${
                      step.completed 
                        ? 'bg-primary border-primary' 
                        : 'bg-background border-border'
                    }`}
                  />
                  
                  <div className={step.completed ? 'opacity-100' : 'opacity-50'}>
                    <p className="font-medium">{step.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.date || 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const UserOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const stats = {
    total: mockOrders.length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    pending: mockOrders.filter(o => o.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground">View and track your CloudHost purchases</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: Package, color: 'text-foreground' },
          { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'text-success' },
          { label: 'Processing', value: stats.processing, icon: RefreshCw, color: 'text-primary' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning' }
        ].map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-secondary border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You haven\'t placed any orders yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
};

export default UserOrders;
