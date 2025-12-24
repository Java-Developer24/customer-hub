import React, { useState, useMemo } from 'react';
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
  Download,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { extendedCustomerData } from '@/data/admin-dashboard-data';

const ITEMS_PER_PAGE = 50;

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'joined', direction: 'desc' });
  const [impersonationModal, setImpersonationModal] = useState(null);
  const [impersonationReason, setImpersonationReason] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startImpersonation } = useImpersonation();

  // Get unique regions for filter
  const regions = useMemo(() => {
    const unique = [...new Set(extendedCustomerData.map(c => c.region))];
    return unique.sort();
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
    };
    return variants[status] || variants.active;
  };

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    let result = extendedCustomerData.filter((customer) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.shopperId.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

      // Region filter
      const matchesRegion = regionFilter === 'all' || customer.region === regionFilter;

      // Date range filter
      let matchesDate = true;
      if (dateFrom) {
        matchesDate = matchesDate && new Date(customer.joined) >= new Date(dateFrom);
      }
      if (dateTo) {
        matchesDate = matchesDate && new Date(customer.joined) <= new Date(dateTo);
      }

      return matchesSearch && matchesStatus && matchesRegion && matchesDate;
    });

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'totalSpent') {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      } else if (sortConfig.key === 'joined') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, regionFilter, dateFrom, dateTo, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setRegionFilter('all');
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const hasActiveFilters = statusFilter !== 'all' || regionFilter !== 'all' || dateFrom || dateTo;

  const handleExportCSV = () => {
    const headers = ['Shopper ID', 'Name', 'Email', 'Region', 'Status', 'Joined', 'Total Spent'];
    const rows = filteredCustomers.map(c => [
      c.shopperId,
      c.name,
      c.email,
      c.region,
      c.status,
      c.joined,
      `$${c.totalSpent.toFixed(2)}`
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredCustomers.length} customers to CSV`,
    });
  };

  const handleStartImpersonation = () => {
    if (!impersonationModal) return;
    
    startImpersonation(impersonationModal, impersonationReason);
    setImpersonationModal(null);
    setImpersonationReason('');
    
    toast({
      title: "Impersonation Started",
      description: `You are now viewing ${impersonationModal.name}'s account`,
    });
    
    // Navigate to customer dashboard
    navigate('/dashboard');
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage CloudHost customer accounts and subscriptions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by shopperId, email, or name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        !
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Filters</h4>
                      {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                          <X className="w-3 h-3 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger>
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Region</Label>
                      <Select value={regionFilter} onValueChange={(v) => { setRegionFilter(v); setCurrentPage(1); }}>
                        <SelectTrigger>
                          <SelectValue placeholder="All regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          {regions.map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Registration Date Range</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                            className="w-full"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="date"
                            value={dateTo}
                            onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {statusFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {statusFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter('all')} />
                  </Badge>
                )}
                {regionFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Region: {regionFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setRegionFilter('all')} />
                  </Badge>
                )}
                {dateFrom && (
                  <Badge variant="secondary" className="gap-1">
                    From: {dateFrom}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setDateFrom('')} />
                  </Badge>
                )}
                {dateTo && (
                  <Badge variant="secondary" className="gap-1">
                    To: {dateTo}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setDateTo('')} />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            All Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('shopperId')}
                  >
                    Shopper ID {sortConfig.key === 'shopperId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('name')}
                  >
                    Customer {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('region')}
                  >
                    Region {sortConfig.key === 'region' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('status')}
                  >
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('joined')}
                  >
                    Joined {sortConfig.key === 'joined' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-muted-foreground pb-3 cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('totalSpent')}
                  >
                    Total Spent {sortConfig.key === 'totalSpent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-4">
                      <span className="font-mono text-sm text-primary">{customer.shopperId}</span>
                    </td>
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
                    <td className="py-4 text-sm text-foreground">{customer.region}</td>
                    <td className="py-4">
                      <Badge variant="outline" className={getStatusBadge(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{customer.joined}</td>
                    <td className="py-4 text-sm font-medium text-foreground">${customer.totalSpent.toFixed(2)}</td>
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
                          <DropdownMenuItem onClick={() => setImpersonationModal(customer)}>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} of {filteredCustomers.length} customers
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Impersonation Modal */}
      <Dialog open={!!impersonationModal} onOpenChange={() => setImpersonationModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Impersonation Session</DialogTitle>
            <DialogDescription>
              You are about to view the account as {impersonationModal?.name}. This session will be logged.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {impersonationModal?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{impersonationModal?.name}</p>
                  <p className="text-sm text-muted-foreground">{impersonationModal?.email}</p>
                  <p className="text-xs text-muted-foreground">{impersonationModal?.shopperId}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Reason for impersonation (optional)</Label>
              <Textarea
                placeholder="e.g., Investigating billing issue, helping with configuration..."
                value={impersonationReason}
                onChange={(e) => setImpersonationReason(e.target.value)}
              />
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm text-warning">
              <p className="font-medium">Read-Only Access</p>
              <p className="text-xs mt-1">You will see the customer's dashboard in read-only mode. All actions are logged.</p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setImpersonationModal(null)}>
                Cancel
              </Button>
              <Button onClick={handleStartImpersonation}>
                <UserCog className="w-4 h-4 mr-2" />
                Start Impersonation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
