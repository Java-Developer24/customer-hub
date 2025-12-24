import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  MoreHorizontal,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowDownLeft,
  TrendingUp
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { samplePaymentTransactions, paymentGateways, paymentStatuses } from '@/data/order-payment-data';

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

const AdminPayments = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(samplePaymentTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gatewayFilter, setGatewayFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter transactions
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.shopperId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || txn.gateway === gatewayFilter;
    
    let matchesDate = true;
    if (dateFrom) {
      matchesDate = matchesDate && new Date(txn.createdAt) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDate = matchesDate && new Date(txn.createdAt) <= new Date(dateTo);
    }
    
    return matchesSearch && matchesStatus && matchesGateway && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: transactions.length,
    succeeded: transactions.filter(t => t.status === 'succeeded').length,
    failed: transactions.filter(t => t.status === 'failed').length,
    totalVolume: transactions.filter(t => t.status === 'succeeded').reduce((sum, t) => sum + t.amount, 0),
    refunded: transactions.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0)
  };

  const handleViewDetails = (txn) => {
    setSelectedTransaction(txn);
    setDetailsOpen(true);
  };

  const handleRefund = (txn) => {
    setSelectedTransaction(txn);
    setRefundOpen(true);
  };

  const processRefund = () => {
    if (!selectedTransaction) return;
    
    setTransactions(prev => prev.map(t => 
      t.id === selectedTransaction.id 
        ? { ...t, status: 'refunded', metadata: { ...t.metadata, refundedAt: new Date().toISOString() } }
        : t
    ));
    
    toast({
      title: "Refund Initiated",
      description: `Refund of $${selectedTransaction.amount.toFixed(2)} has been initiated.`,
    });
    
    setRefundOpen(false);
    setSelectedTransaction(null);
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Order ID', 'Customer', 'Amount', 'Gateway', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => [
        t.transactionId || t.id,
        t.orderId,
        t.customerName,
        `$${t.amount.toFixed(2)}`,
        t.gateway,
        t.status,
        new Date(t.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `${filteredTransactions.length} transactions exported to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Transactions</h1>
          <p className="text-muted-foreground">Monitor and manage all payment transactions</p>
        </div>
        <Button onClick={handleExportCSV} className="gap-2">
          <Download className="w-4 h-4" />
          Export Transactions
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
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
                <p className="text-xs text-muted-foreground">Succeeded</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.failed}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalVolume.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <ArrowDownLeft className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.refunded.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Refunded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions, orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="succeeded">Succeeded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gatewayFilter} onValueChange={setGatewayFilter}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Gateway" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gateways</SelectItem>
                {paymentGateways.map(gw => (
                  <SelectItem key={gw.id} value={gw.id}>{gw.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-secondary border-border"
              placeholder="From Date"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium font-mono text-xs">{txn.transactionId || txn.id}</p>
                      {txn.cardLast4 && (
                        <p className="text-xs text-muted-foreground">
                          {txn.cardBrand?.toUpperCase()} •••• {txn.cardLast4}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{txn.orderId}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{txn.customerName}</p>
                      <p className="text-xs text-muted-foreground">{txn.shopperId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getGatewayIcon(txn.gateway)}
                      <span className="capitalize">{txn.gateway}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${txn.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  <TableCell>
                    {new Date(txn.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(txn)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {txn.metadata?.receiptUrl && (
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Receipt
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {txn.status === 'succeeded' && (
                          <DropdownMenuItem 
                            onClick={() => handleRefund(txn)}
                            className="text-destructive"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refund
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
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
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Transaction Details
            </DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-xl font-bold text-primary">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="font-mono text-sm">{selectedTransaction.transactionId || selectedTransaction.id}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedTransaction.orderId}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Gateway</p>
                  <div className="flex items-center gap-2">
                    {getGatewayIcon(selectedTransaction.gateway)}
                    <span className="capitalize">{selectedTransaction.gateway}</span>
                  </div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Method</p>
                  <p className="capitalize">{selectedTransaction.paymentMethod}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedTransaction.customerName}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p>{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedTransaction.cardLast4 && (
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Card</p>
                  <p className="font-medium">{selectedTransaction.cardBrand?.toUpperCase()} •••• {selectedTransaction.cardLast4}</p>
                </div>
              )}

              {selectedTransaction.metadata?.failureReason && (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-xs text-destructive">Failure Reason</p>
                  <p className="text-sm">{selectedTransaction.metadata.failureReason}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Confirmation Dialog */}
      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <RefreshCw className="w-5 h-5" />
              Process Refund
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to refund this transaction? 
              This will refund ${selectedTransaction?.amount.toFixed(2)} to the customer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={processRefund}>Process Refund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;
