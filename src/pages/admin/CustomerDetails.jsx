import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  UserCog,
  Ban,
  Edit,
  Server,
  Cloud,
  Globe,
  Lock,
  Palette,
  Search,
  Monitor,
  Activity,
  ShoppingCart,
  Settings,
  LogIn,
  FileText,
  MessageSquare,
  Send,
  Plus,
  Download,
  Eye,
  MoreHorizontal,
  StickyNote,
  User,
  Trash2,
  AlertTriangle,
  Key
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { extendedCustomerData } from '@/data/admin-dashboard-data';

const getProductIcon = (productName) => {
  const lowerName = productName.toLowerCase();
  if (lowerName.includes('hosting')) return Server;
  if (lowerName.includes('cloud')) return Cloud;
  if (lowerName.includes('domain')) return Globe;
  if (lowerName.includes('email')) return Mail;
  if (lowerName.includes('ssl')) return Lock;
  if (lowerName.includes('builder')) return Palette;
  if (lowerName.includes('seo')) return Search;
  if (lowerName.includes('vps')) return Monitor;
  return Package;
};

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { startImpersonation } = useImpersonation();
  
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [impersonateDialogOpen, setImpersonateDialogOpen] = useState(false);
  const [impersonateReason, setImpersonateReason] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundCustomer = extendedCustomerData.find(c => c.id === parseInt(customerId));
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setEditForm(foundCustomer);
      setNotes(foundCustomer.notes || []);
    }
  }, [customerId]);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-foreground mb-2">Customer Not Found</h2>
        <p className="text-muted-foreground mb-4">The customer you are looking for does not exist.</p>
        <Button onClick={() => navigate('/admin/customers')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-success/10 text-success border-success/20',
      suspended: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      delivered: 'bg-success/10 text-success border-success/20',
      completed: 'bg-success/10 text-success border-success/20',
      processing: 'bg-primary/10 text-primary border-primary/20',
      resolved: 'bg-success/10 text-success border-success/20',
      open: 'bg-warning/10 text-warning border-warning/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return variants[status] || variants.active;
  };

  const handleSuspend = () => {
    setCustomer(prev => ({ ...prev, status: 'suspended' }));
    toast({
      title: "Account Suspended",
      description: `${customer.name}'s account has been suspended. Reason: ${suspendReason}`,
      variant: "destructive",
    });
    setSuspendDialogOpen(false);
    setSuspendReason('');
  };

  const handleActivate = () => {
    setCustomer(prev => ({ ...prev, status: 'active' }));
    toast({
      title: "Account Activated",
      description: `${customer.name}'s account is now active`,
    });
  };

  const handleStartImpersonation = () => {
    startImpersonation(customer, impersonateReason);
    toast({
      title: "Impersonation Started",
      description: `You are now viewing as ${customer.name}`,
    });
    setImpersonateDialogOpen(false);
    navigate('/dashboard');
  };

  const handleSaveEdit = () => {
    setCustomer(editForm);
    setIsEditing(false);
    toast({
      title: "Customer Updated",
      description: "Customer details have been saved.",
    });
  };

  const handlePasswordReset = () => {
    toast({
      title: "Password Reset Link Sent",
      description: `A password reset link has been sent to ${customer.email}`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Account Deleted",
      description: `${customer.name}'s account has been permanently deleted.`,
      variant: "destructive",
    });
    setDeleteDialogOpen(false);
    navigate('/admin/customers');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: `NOTE-${Date.now()}`,
      content: newNote,
      addedBy: 'Admin User',
      addedAt: new Date().toISOString()
    };
    setNotes(prev => [note, ...prev]);
    setNewNote('');
    toast({
      title: "Note Added",
      description: "Internal note has been saved.",
    });
  };

  const handleExtendSubscription = (subId) => {
    toast({
      title: "Subscription Extended",
      description: "Subscription has been extended by 30 days.",
    });
  };

  const handleCancelSubscription = (subId) => {
    toast({
      title: "Subscription Cancelled",
      description: "The subscription has been cancelled.",
      variant: "destructive",
    });
  };

  const handleRefundOrder = (orderId) => {
    toast({
      title: "Refund Processed",
      description: `Refund for order ${orderId} has been initiated.`,
    });
  };

  const handleResendEmail = (emailId) => {
    toast({
      title: "Email Resent",
      description: "The email has been queued for resending.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/admin/customers')} className="mb-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Customers
      </Button>

      {/* Customer Header */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/20">
                <span className="text-3xl font-bold text-primary">{customer.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{customer.name}</h1>
                  <Badge variant="outline" className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </Badge>
                  <Badge variant="secondary">{customer.shopperId}</Badge>
                </div>
                <div className="space-y-1 text-muted-foreground text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {customer.city}, {customer.state} {customer.zip}, {customer.country}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Region: {customer.region}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" onClick={() => setImpersonateDialogOpen(true)}>
                <UserCog className="w-4 h-4 mr-2" />
                View as Customer
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handlePasswordReset}>
                <Key className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              {customer.status === 'active' ? (
                <Button variant="destructive" size="sm" onClick={() => setSuspendDialogOpen(true)}>
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleActivate}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">${customer.totalSpent.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.subscriptions.length}</p>
              <p className="text-sm text-muted-foreground">Subscriptions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.orders.length}</p>
              <p className="text-sm text-muted-foreground">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{customer.tickets.length}</p>
              <p className="text-sm text-muted-foreground">Tickets</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{customer.joined}</p>
              <p className="text-sm text-muted-foreground">Member Since</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-secondary flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="emails">Email Logs</TabsTrigger>
          <TabsTrigger value="sms">SMS Logs</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Customer Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={editForm.name} onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={editForm.email} onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={editForm.phone} onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input value={editForm.address} onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))} />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input value={editForm.city} onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))} />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input value={editForm.state} onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Zip</Label>
                    <Input value={editForm.zip} onChange={(e) => setEditForm(prev => ({ ...prev, zip: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input value={editForm.country} onChange={(e) => setEditForm(prev => ({ ...prev, country: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                    <Button variant="outline" onClick={() => { setIsEditing(false); setEditForm(customer); }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div><Label className="text-muted-foreground">Full Name</Label><p className="font-medium">{customer.name}</p></div>
                    <div><Label className="text-muted-foreground">Email</Label><p className="font-medium">{customer.email}</p></div>
                    <div><Label className="text-muted-foreground">Phone</Label><p className="font-medium">{customer.phone}</p></div>
                    <div><Label className="text-muted-foreground">Shopper ID</Label><p className="font-medium">{customer.shopperId}</p></div>
                  </div>
                  <div className="space-y-4">
                    <div><Label className="text-muted-foreground">Address</Label><p className="font-medium">{customer.address}</p></div>
                    <div><Label className="text-muted-foreground">City, State, Zip</Label><p className="font-medium">{customer.city}, {customer.state} {customer.zip}</p></div>
                    <div><Label className="text-muted-foreground">Country</Label><p className="font-medium">{customer.country}</p></div>
                    <div><Label className="text-muted-foreground">Last Login</Label><p className="font-medium">{new Date(customer.lastLogin).toLocaleString()}</p></div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-4 text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Danger Zone
                </h4>
                <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Subscriptions ({customer.subscriptions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.subscriptions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No subscriptions</p>
              ) : (
                <div className="space-y-4">
                  {customer.subscriptions.map((sub) => {
                    const IconComponent = getProductIcon(sub.product);
                    return (
                      <div key={sub.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{sub.product}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>Next billing: {sub.nextBilling}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusBadge(sub.status)}>{sub.status}</Badge>
                          <p className="font-semibold">${sub.amount}/mo</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleExtendSubscription(sub.id)}>
                                <Calendar className="w-4 h-4 mr-2" />Extend 30 Days
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="w-4 h-4 mr-2" />Suspend
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleCancelSubscription(sub.id)}>
                                <XCircle className="w-4 h-4 mr-2" />Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Orders ({customer.orders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Order ID</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Date</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Items</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Total</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Status</th>
                      <th className="text-right text-sm font-medium text-muted-foreground pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-4 text-sm font-medium text-primary">{order.id}</td>
                        <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {order.items.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{item}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium">${order.total.toFixed(2)}</td>
                        <td className="py-4">
                          <Badge variant="outline" className={getStatusBadge(order.status)}>{order.status}</Badge>
                        </td>
                        <td className="py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />View Details</DropdownMenuItem>
                              <DropdownMenuItem><Download className="w-4 h-4 mr-2" />Download Invoice</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleRefundOrder(order.id)}>
                                <RefreshCw className="w-4 h-4 mr-2" />Refund
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Logs Tab */}
        <TabsContent value="emails">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email Logs ({customer.emailLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.emailLogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No email logs</p>
              ) : (
                <div className="space-y-3">
                  {customer.emailLogs.map((email) => (
                    <div key={email.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium">{email.subject}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{email.type.replace('_', ' ')}</Badge>
                          <span>{new Date(email.sentAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusBadge(email.status)}>{email.status}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleResendEmail(email.id)}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Logs Tab */}
        <TabsContent value="sms">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                SMS Logs ({customer.smsLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.smsLogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No SMS logs</p>
              ) : (
                <div className="space-y-3">
                  {customer.smsLogs.map((sms) => (
                    <div key={sms.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium">{sms.message}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{sms.type.replace('_', ' ')}</Badge>
                          <span>{new Date(sms.sentAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusBadge(sms.status)}>{sms.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Support Tickets ({customer.tickets.length})
              </CardTitle>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" />Create Ticket</Button>
            </CardHeader>
            <CardContent>
              {customer.tickets.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No support tickets</p>
              ) : (
                <div className="space-y-3">
                  {customer.tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">{ticket.id}</span>
                          <Badge variant="outline">{ticket.priority}</Badge>
                        </div>
                        <p className="text-sm">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">Created: {ticket.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusBadge(ticket.status)}>{ticket.status}</Badge>
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-primary" />
                Internal Notes ({notes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Textarea
                  placeholder="Add an internal note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button onClick={handleAddNote}>
                  <Plus className="w-4 h-4 mr-2" />Add
                </Button>
              </div>
              {notes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No internal notes yet</p>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-foreground">{note.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{note.addedBy}</span>
                        <span>•</span>
                        <span>{new Date(note.addedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Suspend Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Ban className="w-5 h-5" />
              Suspend Account
            </DialogTitle>
            <DialogDescription>
              This will suspend {customer.name}'s account. They will not be able to access their services.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label>Reason for Suspension</Label>
            <Textarea
              placeholder="Enter the reason for suspension..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleSuspend}>Suspend Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Impersonate Dialog */}
      <Dialog open={impersonateDialogOpen} onOpenChange={setImpersonateDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-primary" />
              View as Customer
            </DialogTitle>
            <DialogDescription>
              You will see the portal exactly as {customer.name} sees it. All actions will be in read-only mode.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Enter reason for impersonation..."
              value={impersonateReason}
              onChange={(e) => setImpersonateReason(e.target.value)}
              rows={2}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImpersonateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleStartImpersonation}>Start Impersonation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete {customer.name}'s account and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDetails;
