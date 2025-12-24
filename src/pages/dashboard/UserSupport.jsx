import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Paperclip,
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

const tickets = [
  { id: 1, subject: 'Cannot access API dashboard', status: 'open', priority: 'high', created: '2024-01-15', lastUpdate: '2 hours ago', messages: 3 },
  { id: 2, subject: 'Billing question about invoice #1234', status: 'in_progress', priority: 'medium', created: '2024-01-14', lastUpdate: '1 day ago', messages: 5 },
  { id: 3, subject: 'Feature request: Export to PDF', status: 'closed', priority: 'low', created: '2024-01-10', lastUpdate: '5 days ago', messages: 8 },
];

const UserSupport = () => {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    priority: 'medium',
    description: '',
  });
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

  const handleCreateTicket = (e) => {
    e.preventDefault();
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted. We'll respond within 24 hours.",
    });
    setShowNewTicket(false);
    setTicketForm({ subject: '', priority: 'medium', description: '' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast({
      title: "Message Sent",
      description: "Your message has been added to the ticket.",
    });
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support</h1>
          <p className="text-muted-foreground">
            Get help with your account and products
          </p>
        </div>
        <Button onClick={() => setShowNewTicket(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Quick Help */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex-1 min-w-[200px]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with Support Bot
            </Button>
            <Button variant="outline" className="flex-1 min-w-[200px]">
              Browse FAQ
            </Button>
            <Button variant="outline" className="flex-1 min-w-[200px]">
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                      <Badge variant="outline" className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <Badge variant="outline" className={getStatusBadge(ticket.status)}>
                    {ticket.status.replace('_', ' ')}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Ticket Modal */}
      <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={ticketForm.priority}
                onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                placeholder="Describe your issue in detail..."
                className="min-h-[120px]"
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Ticket
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{selectedTicket?.subject}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 py-3 border-b border-border">
                <Badge variant="outline" className={getStatusBadge(selectedTicket.status)}>
                  {selectedTicket.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline" className={getPriorityBadge(selectedTicket.priority)}>
                  {selectedTicket.priority}
                </Badge>
              </div>

              <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted-foreground mb-2">You • {selectedTicket.created}</p>
                    <p className="text-foreground">Initial ticket message would appear here with the full description of the issue...</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/10 ml-8">
                    <p className="text-sm text-primary mb-2">Support Team • 1 day ago</p>
                    <p className="text-foreground">Thank you for reaching out. We're looking into your issue and will get back to you shortly.</p>
                  </div>
                </div>
              </div>

              {selectedTicket.status !== 'closed' && (
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your reply..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[80px]"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach File
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserSupport;
