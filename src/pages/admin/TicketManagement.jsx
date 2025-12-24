import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Send,
  Paperclip,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const initialTickets = [
  { id: 1, subject: 'Payment processing issue', customer: 'John Smith', email: 'john@example.com', status: 'open', priority: 'high', created: '2024-01-15 10:30', lastUpdate: '2 hours ago', messages: 3 },
  { id: 2, subject: 'Feature request: Dark mode', customer: 'Sarah Johnson', email: 'sarah@example.com', status: 'in_progress', priority: 'medium', created: '2024-01-14 15:45', lastUpdate: '1 day ago', messages: 5 },
  { id: 3, subject: 'Account access denied', customer: 'Mike Wilson', email: 'mike@example.com', status: 'open', priority: 'high', created: '2024-01-15 09:15', lastUpdate: '3 hours ago', messages: 2 },
  { id: 4, subject: 'Billing question about invoice', customer: 'Emily Brown', email: 'emily@example.com', status: 'closed', priority: 'low', created: '2024-01-13 11:20', lastUpdate: '2 days ago', messages: 8 },
  { id: 5, subject: 'API rate limit exceeded', customer: 'David Lee', email: 'david@example.com', status: 'open', priority: 'medium', created: '2024-01-15 08:00', lastUpdate: '4 hours ago', messages: 1 },
  { id: 6, subject: 'Integration help needed', customer: 'Lisa Chen', email: 'lisa@example.com', status: 'in_progress', priority: 'medium', created: '2024-01-14 16:30', lastUpdate: '1 day ago', messages: 4 },
];

const ticketMessages = [
  { id: 1, sender: 'customer', name: 'John Smith', content: 'Hi, I\'m having trouble processing my payment. The transaction keeps failing.', time: '10:30 AM' },
  { id: 2, sender: 'admin', name: 'Support Team', content: 'Hello John, I\'m sorry to hear about the payment issue. Could you please provide the last 4 digits of the card you\'re trying to use?', time: '11:15 AM' },
  { id: 3, sender: 'customer', name: 'John Smith', content: 'Sure, the last 4 digits are 4242. I\'ve tried multiple times but it keeps showing an error.', time: '11:45 AM' },
];

const TicketManagement = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const variants = {
      open: 'bg-primary/10 text-primary border-primary/20',
      in_progress: 'bg-warning/10 text-warning border-warning/20',
      closed: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[status] || variants.open;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground border-muted',
    };
    return variants[priority] || variants.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      open: <AlertCircle className="w-4 h-4 text-primary" />,
      in_progress: <Clock className="w-4 h-4 text-warning" />,
      closed: <CheckCircle2 className="w-4 h-4 text-muted-foreground" />,
    };
    return icons[status] || icons.open;
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
    toast({
      title: "Status Updated",
      description: `Ticket status changed to ${newStatus.replace('_', ' ')}`,
    });
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer",
    });
    setReplyText('');
  };

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage customer support requests and issues
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold text-primary">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed</p>
                <p className="text-2xl font-bold text-muted-foreground">{stats.closed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-muted-foreground/50" />
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
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            All Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(ticket.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                        <Badge variant="outline" className={getPriorityBadge(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ticket.customer} • {ticket.email}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Created: {ticket.created}</span>
                        <span>•</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messages} messages
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusBadge(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{selectedTicket?.subject}</span>
              <Badge variant="outline" className={getPriorityBadge(selectedTicket?.priority)}>
                {selectedTicket?.priority}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Ticket Info */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedTicket.customer}</span>
                  {' • '}{selectedTicket.email}
                </div>
                <Select 
                  value={selectedTicket.status} 
                  onValueChange={(value) => {
                    handleStatusChange(selectedTicket.id, value);
                    setSelectedTicket({ ...selectedTicket, status: value });
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin">
                {ticketMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.sender === 'admin' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-foreground'
                    } rounded-lg p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium opacity-75">{message.name}</span>
                        <span className="text-xs opacity-50">{message.time}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="pt-4 border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 min-h-[80px] bg-secondary border-border"
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach File
                  </Button>
                  <Button onClick={handleReply} disabled={!replyText.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketManagement;
