import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'My Products', path: '/dashboard/products' },
  { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
  { icon: CreditCard, label: 'Subscriptions', path: '/dashboard/subscriptions' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: MessageSquare, label: 'Support', path: '/dashboard/support' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const quickLinks = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: ShoppingBag, label: 'Browse Products', path: '/products' },
];

const UserSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">SaaSPlatform</span>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="p-3 border-b border-sidebar-border">
          {!collapsed && <p className="text-xs text-muted-foreground mb-2 px-3">Quick Links</p>}
          {quickLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {!collapsed && <p className="text-xs text-muted-foreground mb-2 px-3">Account</p>}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-destructive",
              collapsed && "justify-center px-0"
            )}
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default UserSidebar;
