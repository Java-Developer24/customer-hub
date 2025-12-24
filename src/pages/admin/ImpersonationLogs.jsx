import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Calendar,
  Activity,
  FileText,
  Globe,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { impersonationLogs } from '@/data/admin-dashboard-data';

const ImpersonationLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFilter, setAdminFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Get unique admins for filter
  const admins = [...new Set(impersonationLogs.map(log => log.adminName))];

  const filteredLogs = impersonationLogs.filter(log => {
    const matchesSearch = searchQuery === '' ||
      log.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.customerShopperId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAdmin = adminFilter === 'all' || log.adminName === adminFilter;

    let matchesDate = true;
    if (dateFrom) {
      matchesDate = matchesDate && new Date(log.startTime) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDate = matchesDate && new Date(log.startTime) <= new Date(dateTo + 'T23:59:59');
    }

    return matchesSearch && matchesAdmin && matchesDate;
  });

  const toggleRow = (id) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
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

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Impersonation Logs</h1>
        <p className="text-muted-foreground">
          View all past impersonation sessions with detailed activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{impersonationLogs.length}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(impersonationLogs.reduce((sum, log) => sum + log.duration, 0) / impersonationLogs.length)} min
                </p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
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
                <p className="text-2xl font-bold">{admins.length}</p>
                <p className="text-sm text-muted-foreground">Active Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or admin..."
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
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Session Logs ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No impersonation logs found</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <Collapsible
                key={log.id}
                open={expandedRows.has(log.id)}
                onOpenChange={() => toggleRow(log.id)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <div className="p-4 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{log.customerName}</span>
                              <Badge variant="outline" className="text-xs">{log.customerShopperId}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Impersonated by {log.adminName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatDateTime(log.startTime)}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{log.duration} min</span>
                              <span>•</span>
                              <Eye className="w-3 h-3" />
                              <span>{log.pagesViewed.length} pages</span>
                            </div>
                          </div>
                          {expandedRows.has(log.id) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 bg-background border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Session Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Session Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Session ID</span>
                              <span className="font-mono">{log.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Admin Email</span>
                              <span>{log.adminEmail}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Customer Email</span>
                              <span>{log.customerEmail}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Start Time</span>
                              <span>{formatDateTime(log.startTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">End Time</span>
                              <span>{formatDateTime(log.endTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">IP Address</span>
                              <span className="font-mono">{log.ipAddress}</span>
                            </div>
                            {log.reason && (
                              <div className="pt-2 border-t border-border">
                                <span className="text-muted-foreground">Reason:</span>
                                <p className="mt-1">{log.reason}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Activity */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            Pages Viewed
                          </h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {log.pagesViewed.map((page, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-secondary/50 rounded">
                                <span className="font-mono text-primary">{page.path}</span>
                                <span className="text-xs text-muted-foreground">{formatTime(page.timestamp)}</span>
                              </div>
                            ))}
                          </div>

                          {log.actionsPerformed.length > 0 && (
                            <>
                              <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
                                <Activity className="w-4 h-4 text-primary" />
                                Actions Performed
                              </h4>
                              <div className="space-y-2">
                                {log.actionsPerformed.map((action, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm p-2 bg-secondary/50 rounded">
                                    <div>
                                      <span className="font-medium">{action.action}</span>
                                      {action.details && (
                                        <span className="text-muted-foreground ml-2">({action.details})</span>
                                      )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{formatTime(action.timestamp)}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </motion.div>
              </Collapsible>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpersonationLogs;
