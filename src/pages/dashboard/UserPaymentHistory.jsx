import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ArrowDownLeft,
  Receipt,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Sample user payment history
const userPaymentHistory = [
  {
    id: 'PAY-001',
    orderId: 'ORD-240001',
    amount: 47.97,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_1234567890',
    status: 'succeeded',
    cardBrand: 'visa',
    cardLast4: '4242',
    description: 'Web Hosting + SSL + Domain',
    createdAt: '2024-01-15T10:32:00'
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-240008',
    amount: 64.00,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_QWERTYUIOP',
    status: 'succeeded',
    cardBrand: 'amex',
    cardLast4: '0001',
    description: 'Cloud Servers - Performance',
    createdAt: '2024-01-25T10:02:00'
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-SUB-001',
    amount: 5.99,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_SUB123456',
    status: 'succeeded',
    cardBrand: 'visa',
    cardLast4: '4242',
    description: 'Web Hosting - Professional (Renewal)',
    createdAt: '2024-02-15T00:00:00'
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-SUB-002',
    amount: 32.00,
    currency: 'USD',
    paymentMethod: 'paypal',
    gateway: 'paypal',
    transactionId: 'PAY-RENEWAL789',
    status: 'succeeded',
    cardBrand: null,
    cardLast4: null,
    description: 'Cloud Servers - Standard (Renewal)',
    createdAt: '2024-02-28T00:00:00'
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-240010',
    amount: 29.99,
    currency: 'USD',
    paymentMethod: 'card',
    gateway: 'stripe',
    transactionId: 'txn_FAILED001',
    status: 'failed',
    cardBrand: 'mastercard',
    cardLast4: '5555',
    description: 'SEO Tools - Starter',
    createdAt: '2024-03-01T14:30:00'
  },
  {
    id: 'PAY-006',
    orderId: 'ORD-240011',
    amount: 39.99,
    currency: 'USD',
    paymentMethod: 'upi',
    gateway: 'razorpay',
    transactionId: 'pay_REFUND001',
    status: 'refunded',
    cardBrand: null,
    cardLast4: null,
    description: 'SSL Certificates - Wildcard SSL',
    createdAt: '2024-03-05T09:15:00'
  }
];

const getStatusBadge = (status) => {
  const config = {
    succeeded: { label: 'Succeeded', color: 'bg-success/20 text-success', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-warning/20 text-warning', icon: Clock },
    failed: { label: 'Failed', color: 'bg-destructive/20 text-destructive', icon: XCircle },
    refunded: { label: 'Refunded', color: 'bg-muted text-muted-foreground', icon: ArrowDownLeft }
  };
  const statusConfig = config[status] || config.pending;
  const Icon = statusConfig.icon;
  
  return (
    <Badge className={statusConfig.color}>
      <Icon className="w-3 h-3 mr-1" />
      {statusConfig.label}
    </Badge>
  );
};

const getGatewayIcon = (gateway) => {
  switch (gateway) {
    case 'stripe': return <CreditCard className="w-4 h-4" />;
    case 'paypal': return <Wallet className="w-4 h-4" />;
    case 'razorpay': return <Smartphone className="w-4 h-4" />;
    default: return <CreditCard className="w-4 h-4" />;
  }
};

const UserPaymentHistory = () => {
  const { toast } = useToast();
  const [payments] = useState(userPaymentHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: payments.length,
    succeeded: payments.filter(p => p.status === 'succeeded').length,
    totalSpent: payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + p.amount, 0)
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setDetailsOpen(true);
  };

  const handleDownloadReceipt = (payment) => {
    toast({
      title: "Downloading Receipt",
      description: `Receipt for ${payment.id} is being generated.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground">View all your payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.succeeded}</p>
                <p className="text-xs text-muted-foreground">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Receipt className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="succeeded">Succeeded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <div className="space-y-4">
        {paginatedPayments.length > 0 ? (
          paginatedPayments.map((payment) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary">
                        {getGatewayIcon(payment.gateway)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{payment.description}</h3>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(payment.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{payment.gateway}</span>
                          {payment.cardLast4 && (
                            <>
                              <span>•</span>
                              <span>{payment.cardBrand?.toUpperCase()} •••• {payment.cardLast4}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-lg font-bold ${payment.status === 'refunded' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                          ${payment.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {payment.orderId}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {payment.status === 'succeeded' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payments found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'You have no payment history yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Payment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Payment Details
            </DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedPayment.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-xl font-bold text-primary">${selectedPayment.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="font-medium">{selectedPayment.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="font-mono text-sm">{selectedPayment.orderId}</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Payment ID</p>
                    <p className="font-mono text-sm">{selectedPayment.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Gateway</p>
                    <div className="flex items-center gap-2">
                      {getGatewayIcon(selectedPayment.gateway)}
                      <span className="capitalize">{selectedPayment.gateway}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Method</p>
                    <p className="capitalize">{selectedPayment.paymentMethod}</p>
                  </div>
                </div>
                {selectedPayment.cardLast4 && (
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Card</p>
                    <p className="font-medium">{selectedPayment.cardBrand?.toUpperCase()} •••• {selectedPayment.cardLast4}</p>
                  </div>
                )}
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="font-mono text-sm break-all">{selectedPayment.transactionId}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p>{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedPayment.status === 'succeeded' && (
                <Button 
                  onClick={() => handleDownloadReceipt(selectedPayment)} 
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPaymentHistory;
