import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  Phone,
  AlertTriangle
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { sampleEmailLogs, sampleSMSLogs, emailTypes } from '@/data/order-payment-data';

const getStatusBadge = (status) => {
  const config = {
    delivered: { label: 'Delivered', color: 'bg-success/20 text-success', icon: CheckCircle },
    sent: { label: 'Sent', color: 'bg-primary/20 text-primary', icon: Send },
    pending: { label: 'Pending', color: 'bg-warning/20 text-warning', icon: Clock },
    failed: { label: 'Failed', color: 'bg-destructive/20 text-destructive', icon: XCircle }
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

const getEmailTypeBadge = (type) => {
  const typeInfo = emailTypes.find(t => t.value === type);
  const colors = {
    welcome: 'bg-primary/20 text-primary',
    order_confirmation: 'bg-success/20 text-success',
    payment_success: 'bg-success/20 text-success',
    payment_failure: 'bg-destructive/20 text-destructive',
    subscription_activation: 'bg-accent/20 text-accent',
    subscription_expiry_reminder: 'bg-warning/20 text-warning',
    suspension_notice: 'bg-destructive/20 text-destructive',
    refund_confirmation: 'bg-muted text-muted-foreground',
    password_reset: 'bg-primary/20 text-primary',
    default: 'bg-secondary text-secondary-foreground'
  };
  
  return (
    <Badge className={colors[type] || colors.default}>
      {typeInfo?.label || type}
    </Badge>
  );
};

const AdminNotificationLogs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('email');
  
  // Email state
  const [emailLogs, setEmailLogs] = useState(sampleEmailLogs);
  const [emailSearch, setEmailSearch] = useState('');
  const [emailTypeFilter, setEmailTypeFilter] = useState('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState('all');
  const [emailPage, setEmailPage] = useState(1);
  
  // SMS state
  const [smsLogs, setSmsLogs] = useState(sampleSMSLogs);
  const [smsSearch, setSmsSearch] = useState('');
  const [smsStatusFilter, setSmsStatusFilter] = useState('all');
  const [smsPage, setSmsPage] = useState(1);
  
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const itemsPerPage = 10;

  // Filter email logs
  const filteredEmailLogs = emailLogs.filter(log => {
    const matchesSearch = 
      log.id.toLowerCase().includes(emailSearch.toLowerCase()) ||
      log.shopperId.toLowerCase().includes(emailSearch.toLowerCase()) ||
      log.recipient.toLowerCase().includes(emailSearch.toLowerCase()) ||
      log.subject.toLowerCase().includes(emailSearch.toLowerCase());
    const matchesType = emailTypeFilter === 'all' || log.emailType === emailTypeFilter;
    const matchesStatus = emailStatusFilter === 'all' || log.status === emailStatusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Filter SMS logs
  const filteredSmsLogs = smsLogs.filter(log => {
    const matchesSearch = 
      log.id.toLowerCase().includes(smsSearch.toLowerCase()) ||
      log.shopperId.toLowerCase().includes(smsSearch.toLowerCase()) ||
      log.phoneNumber.includes(smsSearch) ||
      log.message.toLowerCase().includes(smsSearch.toLowerCase());
    const matchesStatus = smsStatusFilter === 'all' || log.status === smsStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const emailTotalPages = Math.ceil(filteredEmailLogs.length / itemsPerPage);
  const paginatedEmailLogs = filteredEmailLogs.slice(
    (emailPage - 1) * itemsPerPage,
    emailPage * itemsPerPage
  );

  const smsTotalPages = Math.ceil(filteredSmsLogs.length / itemsPerPage);
  const paginatedSmsLogs = filteredSmsLogs.slice(
    (smsPage - 1) * itemsPerPage,
    smsPage * itemsPerPage
  );

  // Stats
  const emailStats = {
    total: emailLogs.length,
    delivered: emailLogs.filter(l => l.status === 'delivered').length,
    failed: emailLogs.filter(l => l.status === 'failed').length
  };

  const smsStats = {
    total: smsLogs.length,
    delivered: smsLogs.filter(l => l.status === 'delivered').length,
    failed: smsLogs.filter(l => l.status === 'failed').length
  };

  const handleViewDetails = (log, type) => {
    setSelectedLog({ ...log, type });
    setDetailsOpen(true);
  };

  const handleResend = (log, type) => {
    toast({
      title: `${type === 'email' ? 'Email' : 'SMS'} Resent`,
      description: `The ${type} has been queued for resending.`,
    });
  };

  const handleExportCSV = (type) => {
    const logs = type === 'email' ? filteredEmailLogs : filteredSmsLogs;
    const headers = type === 'email' 
      ? ['ID', 'Shopper ID', 'Recipient', 'Type', 'Subject', 'Status', 'Sent At', 'Error']
      : ['ID', 'Shopper ID', 'Phone', 'Type', 'Message', 'Status', 'Sent At', 'Error'];
    
    const csvContent = [
      headers.join(','),
      ...logs.map(l => type === 'email'
        ? [l.id, l.shopperId, l.recipient, l.emailType, `"${l.subject}"`, l.status, l.sentAt, l.error || ''].join(',')
        : [l.id, l.shopperId, l.phoneNumber, l.type, `"${l.message}"`, l.status, l.sentAt, l.error || ''].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: `${logs.length} ${type} logs exported to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notification Logs</h1>
        <p className="text-muted-foreground">View and manage email and SMS notification logs</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="email" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Logs
          </TabsTrigger>
          <TabsTrigger value="sms" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            SMS Logs
          </TabsTrigger>
        </TabsList>

        {/* Email Logs Tab */}
        <TabsContent value="email" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{emailStats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Emails</p>
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
                    <p className="text-2xl font-bold">{emailStats.delivered}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
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
                    <p className="text-2xl font-bold">{emailStats.failed}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
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
                    placeholder="Search by ID, email, subject..."
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Select value={emailTypeFilter} onValueChange={setEmailTypeFilter}>
                  <SelectTrigger className="w-48 bg-secondary border-border">
                    <SelectValue placeholder="Email Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {emailTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={emailStatusFilter} onValueChange={setEmailStatusFilter}>
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => handleExportCSV('email')} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmailLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.recipient}</p>
                          <p className="text-xs text-muted-foreground">{log.shopperId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getEmailTypeBadge(log.emailType)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{log.subject}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        {new Date(log.sentAt).toLocaleDateString('en-US', {
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
                            <DropdownMenuItem onClick={() => handleViewDetails(log, 'email')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {log.status === 'failed' && (
                              <DropdownMenuItem onClick={() => handleResend(log, 'email')}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Resend
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {emailTotalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(emailPage - 1) * itemsPerPage + 1} to {Math.min(emailPage * itemsPerPage, filteredEmailLogs.length)} of {filteredEmailLogs.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEmailPage(p => Math.max(1, p - 1))}
                      disabled={emailPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm">Page {emailPage} of {emailTotalPages}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEmailPage(p => Math.min(emailTotalPages, p + 1))}
                      disabled={emailPage === emailTotalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Logs Tab */}
        <TabsContent value="sms" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{smsStats.total}</p>
                    <p className="text-xs text-muted-foreground">Total SMS</p>
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
                    <p className="text-2xl font-bold">{smsStats.delivered}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
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
                    <p className="text-2xl font-bold">{smsStats.failed}</p>
                    <p className="text-xs text-muted-foreground">Failed</p>
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
                    placeholder="Search by ID, phone, message..."
                    value={smsSearch}
                    onChange={(e) => setSmsSearch(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Select value={smsStatusFilter} onValueChange={setSmsStatusFilter}>
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => handleExportCSV('sms')} className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SMS Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSmsLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.phoneNumber}</p>
                          <p className="text-xs text-muted-foreground">{log.shopperId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{log.type.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate">{log.message}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>
                        {new Date(log.sentAt).toLocaleDateString('en-US', {
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
                            <DropdownMenuItem onClick={() => handleViewDetails(log, 'sms')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {log.status === 'failed' && (
                              <DropdownMenuItem onClick={() => handleResend(log, 'sms')}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Resend
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {smsTotalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(smsPage - 1) * itemsPerPage + 1} to {Math.min(smsPage * itemsPerPage, filteredSmsLogs.length)} of {filteredSmsLogs.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSmsPage(p => Math.max(1, p - 1))}
                      disabled={smsPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm">Page {smsPage} of {smsTotalPages}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSmsPage(p => Math.min(smsTotalPages, p + 1))}
                      disabled={smsPage === smsTotalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLog?.type === 'email' ? (
                <Mail className="w-5 h-5 text-primary" />
              ) : (
                <MessageSquare className="w-5 h-5 text-primary" />
              )}
              {selectedLog?.type === 'email' ? 'Email' : 'SMS'} Details
            </DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedLog.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Sent At</p>
                  <p className="font-medium">{new Date(selectedLog.sentAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">ID</p>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Shopper ID</p>
                  <p className="font-medium">{selectedLog.shopperId}</p>
                </div>
              </div>

              {selectedLog.type === 'email' ? (
                <>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Recipient</p>
                    <p className="font-medium">{selectedLog.recipient}</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedLog.subject}</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Type</p>
                    {getEmailTypeBadge(selectedLog.emailType)}
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{selectedLog.phoneNumber}</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Message</p>
                    <p className="text-sm">{selectedLog.message}</p>
                  </div>
                </>
              )}

              {selectedLog.error && (
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 text-destructive mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <p className="text-xs font-medium">Error</p>
                  </div>
                  <p className="text-sm">{selectedLog.error}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedLog?.status === 'failed' && (
              <Button onClick={() => handleResend(selectedLog, selectedLog.type)} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Resend
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNotificationLogs;
