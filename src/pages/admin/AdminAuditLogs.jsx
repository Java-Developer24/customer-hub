import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Clock,
  User,
  UserCog,
  Ban,
  CheckCircle2,
  RefreshCw,
  StickyNote,
  MessageSquare,
  CreditCard,
  LogIn,
  LogOut,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adminActionLogs } from '@/data/admin-dashboard-data';

const actionTypeConfig = {
  impersonate: { icon: UserCog, color: 'text-warning', bgColor: 'bg-warning/10', label: 'Impersonation Started' },
  end_impersonation: { icon: LogOut, color: 'text-muted-foreground', bgColor: 'bg-secondary', label: 'Impersonation Ended' },
  suspend: { icon: Ban, color: 'text-destructive', bgColor: 'bg-destructive/10', label: 'Account Suspended' },
  unsuspend: { icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10', label: 'Account Activated' },
  add_note: { icon: StickyNote, color: 'text-primary', bgColor: 'bg-primary/10', label: 'Note Added' },
  create_ticket: { icon: MessageSquare, color: 'text-accent', bgColor: 'bg-accent/10', label: 'Ticket Created' },
  refund: { icon: CreditCard, color: 'text-warning', bgColor: 'bg-warning/10', label: 'Refund Processed' },
  login: { icon: LogIn, color: 'text-success', bgColor: 'bg-success/10', label: 'Admin Login' },
  logout: { icon: LogOut, color: 'text-muted-foreground', bgColor: 'bg-secondary', label: 'Admin Logout' },
};

const AdminAuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFilter, setAdminFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { toast } = useToast();

  // Get unique admins and action types
  const admins = [...new Set(adminActionLogs.map(log => log.adminName))];
  const actionTypes = [...new Set(adminActionLogs.map(log => log.actionType))];

  const filteredLogs = useMemo(() => {
    return adminActionLogs.filter(log => {
      const matchesSearch = searchQuery === '' ||
        log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.targetShopperId?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAdmin = adminFilter === 'all' || log.adminName === adminFilter;
      const matchesAction = actionFilter === 'all' || log.actionType === actionFilter;

      let matchesDate = true;
      if (dateFrom) {
        matchesDate = matchesDate && new Date(log.timestamp) >= new Date(dateFrom);
      }
      if (dateTo) {
        matchesDate = matchesDate && new Date(log.timestamp) <= new Date(dateTo + 'T23:59:59');
      }

      return matchesSearch && matchesAdmin && matchesAction && matchesDate;
    });
  }, [searchQuery, adminFilter, actionFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchQuery('');
    setAdminFilter('all');
    setActionFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = adminFilter !== 'all' || actionFilter !== 'all' || dateFrom || dateTo;

  const handleExportCSV = () => {
    const headers = ['ID', 'Admin', 'Action', 'Target', 'Description', 'Timestamp'];
    const rows = filteredLogs.map(log => [
      log.id,
      log.adminName,
      log.actionType,
      log.targetShopperId || '-',
      log.description,
      new Date(log.timestamp).toISOString()
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredLogs.length} audit logs to CSV`,
    });
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionConfig = (type) => {
    return actionTypeConfig[type] || { 
      icon: AlertTriangle, 
      color: 'text-muted-foreground', 
      bgColor: 'bg-secondary',
      label: type 
    };
  };

  // Stats
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayLogs = adminActionLogs.filter(log => new Date(log.timestamp).toDateString() === today);
    const suspensions = adminActionLogs.filter(log => log.actionType === 'suspend').length;
    const refunds = adminActionLogs.filter(log => log.actionType === 'refund').length;
    
    return {
      total: adminActionLogs.length,
      today: todayLogs.length,
      suspensions,
      refunds
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all admin activities like suspensions, refunds, and account changes
          </p>
        </div>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <User className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Ban className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.suspensions}</p>
                <p className="text-sm text-muted-foreground">Suspensions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <RefreshCw className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.refunds}</p>
                <p className="text-sm text-muted-foreground">Refunds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by admin, description, or target..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
              <Select value={adminFilter} onValueChange={setAdminFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  {admins.map(admin => (
                    <SelectItem key={admin} value={admin}>{admin}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {actionTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {getActionConfig(type).label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-[150px]"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-[150px]"
                />
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {adminFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Admin: {adminFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setAdminFilter('all')} />
                  </Badge>
                )}
                {actionFilter !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Action: {getActionConfig(actionFilter).label}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setActionFilter('all')} />
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

      {/* Logs Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Activity Log ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No audit logs found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log, index) => {
                const config = getActionConfig(log.actionType);
                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{config.label}</span>
                            {log.targetShopperId && (
                              <Badge variant="outline" className="text-xs font-mono">
                                {log.targetShopperId}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-medium">{log.adminName}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(log.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuditLogs;
