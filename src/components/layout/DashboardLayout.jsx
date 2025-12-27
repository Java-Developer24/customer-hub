import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserSidebar from './UserSidebar';
import { cn } from '@/lib/utils';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { isImpersonating, logPageView, impersonatedCustomer } = useImpersonation();

  // Track page views during impersonation
  useEffect(() => {
    if (isImpersonating) {
      logPageView(location.pathname);
    }
  }, [location.pathname, isImpersonating, logPageView]);

  return (
    <div className={cn("min-h-screen bg-background", isImpersonating && "pt-12")}>
      <UserSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isImpersonating={isImpersonating}
        impersonatedCustomer={impersonatedCustomer}
      />
      
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Top Bar with Theme Toggle */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center justify-end px-6 py-3">
            <ThemeToggle variant="minimal" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
