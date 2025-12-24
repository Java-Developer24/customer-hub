import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const emailLogs = [
  { id: 1, type: 'renewal_reminder', recipient: 'john@example.com', subject: 'Your subscription expires in 7 days', status: 'delivered', sentAt: '2024-01-15 10:30', openedAt: '2024-01-15 11:45' },
  { id: 2, type: 'payment_confirmation', recipient: 'sarah@example.com', subject: 'Payment received - Thank you!', status: 'delivered', sentAt: '2024-01-15 09:15', openedAt: '2024-01-15 09:30' },
  { id: 3, type: 'welcome', recipient: 'david@example.com', subject: 'Welcome to SaaSPlatform!', status: 'delivered', sentAt: '2024-01-15 08:00', openedAt: null },
  { id: 4, type: 'suspension_notice', recipient: 'mike@example.com', subject: 'Account Suspended - Action Required', status: 'delivered', sentAt: '2024-01-14 16:30', openedAt: '2024-01-14 17:00' },
  { id: 5, type: 'renewal_reminder', recipient: 'emily@example.com', subject: 'Your subscription expires tomorrow', status: 'failed', sentAt: '2024-01-14 14:00', openedAt: null },
  { id: 6, type: 'feature_announcement', recipient: 'lisa@example.com', subject: 'New Feature: Advanced Analytics', status: 'pending', sentAt: '2024-01-15 12:00', openedAt: null },
];

const EmailManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeData, setComposeData] = useState({
    recipients: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return variants[status] || variants.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: <CheckCircle2 className="w-4 h-4 text-success" />,
      pending: <Clock className="w-4 h-4 text-warning" />,
      failed: <AlertCircle className="w-4 h-4 text-destructive" />,
    };
    return icons[status] || icons.pending;
  };

  const getTypeBadge = (type) => {
    const labels = {
      renewal_reminder: 'Renewal',
      payment_confirmation: 'Payment',
      welcome: 'Welcome',
      suspension_notice: 'Suspension',
      feature_announcement: 'Announcement',
    };
    return labels[type] || type;
  };

  const filteredEmails = emailLogs.filter((email) => {
    const matchesSearch = 
      email.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || email.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleSendEmail = (e) => {
    e.preventDefault();
    toast({
      title: "Email Sent",
      description: "Your email has been queued for delivery",
    });
    setShowComposeModal(false);
    setComposeData({ recipients: '', subject: '', message: '' });
  };

  const handleRetry = (email) => {
    toast({
      title: "Retrying",
      description: `Retrying delivery to ${email.recipient}`,
    });
  };

  const stats = {
    delivered: emailLogs.filter(e => e.status === 'delivered').length,
    pending: emailLogs.filter(e => e.status === 'pending').length,
    failed: emailLogs.filter(e => e.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email & Notifications</h1>
          <p className="text-muted-foreground">
            Manage email templates and view delivery logs
          </p>
        </div>
        <Button onClick={() => setShowComposeModal(true)}>
          <Send className="w-4 h-4 mr-2" />
          Compose Email
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-success">{stats.delivered}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-destructive">{stats.failed}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Email Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="renewal_reminder">Renewal Reminders</SelectItem>
                <SelectItem value="payment_confirmation">Payment Confirmation</SelectItem>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="suspension_notice">Suspension Notice</SelectItem>
                <SelectItem value="feature_announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email Logs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Email Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Recipient</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Subject</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Type</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Sent At</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Opened</th>
                  <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email) => (
                  <tr key={email.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(email.status)}
                        <Badge variant="outline" className={getStatusBadge(email.status)}>
                          {email.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-foreground">{email.recipient}</td>
                    <td className="py-3">
                      <p className="text-sm text-foreground max-w-xs truncate">{email.subject}</p>
                    </td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                        {getTypeBadge(email.type)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{email.sentAt}</td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {email.openedAt || '-'}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setSelectedEmail(email)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {email.status === 'failed' && (
                          <Button variant="ghost" size="icon-sm" onClick={() => handleRetry(email)}>
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Compose Email Modal */}
      <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input
                id="recipients"
                value={composeData.recipients}
                onChange={(e) => setComposeData({ ...composeData, recipients: e.target.value })}
                placeholder="email@example.com, or 'all customers'"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={composeData.subject}
                onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                placeholder="Email subject"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={composeData.message}
                onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                placeholder="Write your message..."
                className="min-h-[150px]"
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowComposeModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Email Modal */}
      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Email Details</DialogTitle>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedEmail.status)}
                <Badge variant="outline" className={getStatusBadge(selectedEmail.status)}>
                  {selectedEmail.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">To</Label>
                <p className="text-foreground">{selectedEmail.recipient}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Subject</Label>
                <p className="text-foreground">{selectedEmail.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Sent At</Label>
                  <p className="text-foreground text-sm">{selectedEmail.sentAt}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Opened At</Label>
                  <p className="text-foreground text-sm">{selectedEmail.openedAt || 'Not opened'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailManagement;
