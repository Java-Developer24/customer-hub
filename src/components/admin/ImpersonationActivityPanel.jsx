import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Eye,
  MousePointer,
  Clock,
  ChevronUp,
  ChevronDown,
  Globe,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { cn } from '@/lib/utils';

const ImpersonationActivityPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { isImpersonating, pagesViewed, actionsPerformed, impersonatedCustomer } = useImpersonation();

  if (!isImpersonating) return null;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getPageName = (path) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Home';
    return segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1);
  };

  const allActivity = [
    ...pagesViewed.map(p => ({ ...p, type: 'page' })),
    ...actionsPerformed.map(a => ({ ...a, type: 'action' }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="gap-2 bg-primary shadow-lg"
        >
          <Activity className="w-4 h-4" />
          <span>{pagesViewed.length} pages</span>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "fixed left-4 z-50 bg-card border border-border rounded-lg shadow-xl transition-all duration-300",
        isExpanded ? "bottom-4 w-80" : "bottom-4 w-72"
      )}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b border-border cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Session Activity</p>
            <p className="text-xs text-muted-foreground">
              {impersonatedCustomer?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="secondary" className="text-xs">
            {pagesViewed.length} pages
          </Badge>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-around p-2 border-b border-border bg-secondary/30">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{pagesViewed.length}</p>
          <p className="text-xs text-muted-foreground">Pages</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-accent">{actionsPerformed.length}</p>
          <p className="text-xs text-muted-foreground">Actions</p>
        </div>
      </div>

      {/* Activity List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScrollArea className="h-64">
              <div className="p-2 space-y-1">
                {allActivity.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No activity yet</p>
                    <p className="text-xs">Navigate pages to see activity</p>
                  </div>
                ) : (
                  allActivity.map((item, index) => (
                    <motion.div
                      key={`${item.type}-${item.timestamp}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2 p-2 rounded-md bg-secondary/30 hover:bg-secondary/50"
                    >
                      <div className={cn(
                        "p-1 rounded mt-0.5",
                        item.type === 'page' ? "bg-primary/10" : "bg-accent/10"
                      )}>
                        {item.type === 'page' ? (
                          <Eye className="w-3 h-3 text-primary" />
                        ) : (
                          <MousePointer className="w-3 h-3 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.type === 'page' ? getPageName(item.path) : item.action}
                        </p>
                        {item.type === 'page' && (
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            {item.path}
                          </p>
                        )}
                        {item.details && (
                          <p className="text-xs text-muted-foreground truncate">
                            {item.details}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Clock className="w-3 h-3" />
                        {formatTime(item.timestamp)}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity (collapsed state) */}
      {!isExpanded && pagesViewed.length > 0 && (
        <div className="p-2">
          <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
            <Eye className="w-4 h-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {getPageName(pagesViewed[pagesViewed.length - 1]?.path || '')}
              </p>
              <p className="text-xs text-muted-foreground">Latest page view</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ImpersonationActivityPanel;
