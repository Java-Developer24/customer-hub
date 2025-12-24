import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Palette, 
  Database,
  Mail,
  Key,
  Save,
  Upload,
  Building,
  CreditCard,
  Clock,
  Server,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [platformSettings, setPlatformSettings] = useState({
    siteName: 'CloudHost Pro',
    siteDescription: 'Premium Cloud Hosting Solutions',
    supportEmail: 'support@cloudhost.com',
    salesEmail: 'sales@cloudhost.com',
    timezone: 'UTC',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    twoFactorAuth: false
  });

  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@test.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Admin',
    avatar: null
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    newUsers: true,
    lowStock: true,
    systemAlerts: true,
    securityAlerts: true,
    emailReports: 'daily'
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_live_xxxxxxxxxxxxxxxxxxxxx',
    webhookUrl: 'https://api.yoursite.com/webhooks',
    rateLimit: '1000',
    apiVersion: 'v2'
  });

  const handleSave = (section) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CloudHost Settings</h1>
          <p className="text-muted-foreground">Manage platform configuration and preferences</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          <Shield className="w-3 h-3 mr-1" />
          Super Admin
        </Badge>
      </div>

      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="platform" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">Platform</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
        </TabsList>

        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                General Settings
              </CardTitle>
              <CardDescription>Configure your platform's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={platformSettings.siteName}
                    onChange={(e) => setPlatformSettings({...platformSettings, siteName: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    type="email"
                    value={platformSettings.supportEmail}
                    onChange={(e) => setPlatformSettings({...platformSettings, supportEmail: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Site Description</Label>
                <Textarea
                  value={platformSettings.siteDescription}
                  onChange={(e) => setPlatformSettings({...platformSettings, siteDescription: e.target.value})}
                  className="bg-secondary border-border"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={platformSettings.timezone} onValueChange={(v) => setPlatformSettings({...platformSettings, timezone: v})}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={platformSettings.currency} onValueChange={(v) => setPlatformSettings({...platformSettings, currency: v})}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={platformSettings.language} onValueChange={(v) => setPlatformSettings({...platformSettings, language: v})}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Platform Controls</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Temporarily disable the site for maintenance</p>
                    </div>
                    <Switch
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(v) => setPlatformSettings({...platformSettings, maintenanceMode: v})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">Allow new users to register</p>
                    </div>
                    <Switch
                      checked={platformSettings.registrationEnabled}
                      onCheckedChange={(v) => setPlatformSettings({...platformSettings, registrationEnabled: v})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={platformSettings.emailVerification}
                      onCheckedChange={(v) => setPlatformSettings({...platformSettings, emailVerification: v})}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('Platform')} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Platform Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Profile */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Admin Profile
              </CardTitle>
              <CardDescription>Manage your administrator account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {adminProfile.name.charAt(0)}
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={adminProfile.phone}
                    onChange={(e) => setAdminProfile({...adminProfile, phone: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={adminProfile.role}
                    disabled
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" className="bg-secondary border-border" />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('Profile')} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure platform security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                  </div>
                  <Switch
                    checked={platformSettings.twoFactorAuth}
                    onCheckedChange={(v) => setPlatformSettings({...platformSettings, twoFactorAuth: v})}
                  />
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-warning" />
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                    </div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Enter IP addresses (one per line)"
                    className="bg-secondary border-border"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Reset All Settings
                  </Button>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Clear Cache
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleSave('Security')} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'newOrders', label: 'New Orders', desc: 'Get notified when a new order is placed' },
                  { key: 'newUsers', label: 'New Registrations', desc: 'Get notified when a new user registers' },
                  { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Get notified when product inventory is low' },
                  { key: 'systemAlerts', label: 'System Alerts', desc: 'Get notified about system status and updates' },
                  { key: 'securityAlerts', label: 'Security Alerts', desc: 'Get notified about security events' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(v) => setNotifications({...notifications, [item.key]: v})}
                    />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Email Reports</h4>
                <Select value={notifications.emailReports} onValueChange={(v) => setNotifications({...notifications, emailReports: v})}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('Notifications')} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                API Configuration
              </CardTitle>
              <CardDescription>Manage API keys and integration settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiSettings.apiKey}
                        readOnly
                        className="bg-secondary border-border pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({...apiSettings, webhookUrl: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Rate Limit (requests/hour)</Label>
                    <Input
                      type="number"
                      value={apiSettings.rateLimit}
                      onChange={(e) => setApiSettings({...apiSettings, rateLimit: e.target.value})}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>API Version</Label>
                    <Select value={apiSettings.apiVersion} onValueChange={(v) => setApiSettings({...apiSettings, apiVersion: v})}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">v1 (Legacy)</SelectItem>
                        <SelectItem value="v2">v2 (Current)</SelectItem>
                        <SelectItem value="v3">v3 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">API Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Access our comprehensive API documentation to integrate with your applications.
                </p>
                <Button variant="outline">View API Docs</Button>
              </div>

              <Button onClick={() => handleSave('API')} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
