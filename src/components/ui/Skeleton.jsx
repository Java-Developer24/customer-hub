import React from 'react';
import { cn } from '@/lib/utils';

// Base skeleton component with shimmer effect
const Skeleton = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-muted/50',
    glass: 'glass-card',
    glow: 'bg-muted/30 glow-soft',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-md animate-pulse',
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmerSlide_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5" />
    </div>
  );
});
Skeleton.displayName = 'Skeleton';

// Card skeleton with glassmorphism
const SkeletonCard = ({ className, showHeader = true, lines = 3, showImage = false, showAction = true }) => {
  return (
    <div className={cn('glass-card rounded-2xl p-6 space-y-4 shimmer', className)}>
      {showImage && (
        <Skeleton variant="glass" className="h-40 w-full rounded-xl mb-4" />
      )}
      {showHeader && (
        <div className="flex items-center gap-4">
          <Skeleton variant="glow" className="h-12 w-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-3"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
      {showAction && (
        <Skeleton variant="glow" className="h-10 w-full rounded-lg mt-4" />
      )}
    </div>
  );
};

// Stats skeleton
const SkeletonStats = ({ count = 4, className }) => {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-6 space-y-3 stat-card shimmer">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton variant="glow" className="h-8 w-2/3" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
};

// Table skeleton
const SkeletonTable = ({ rows = 5, columns = 4, className }) => {
  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="glass-strong p-4 border-b border-border/50">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-border/30">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 p-4 shimmer">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className="h-4 flex-1"
                style={{ animationDelay: `${(rowIndex * columns + colIndex) * 0.05}s` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile skeleton
const SkeletonProfile = ({ className }) => {
  return (
    <div className={cn('glass-card rounded-2xl p-6 shimmer', className)}>
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="glow" className="h-16 w-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton variant="glass" className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Pricing card skeleton
const SkeletonPricingCard = ({ className, popular = false }) => {
  return (
    <div className={cn(
      'glass-card rounded-2xl p-8 space-y-6 shimmer',
      popular && 'ring-2 ring-primary/30 glow',
      className
    )}>
      {popular && (
        <Skeleton variant="glow" className="h-6 w-24 mx-auto rounded-full -mt-11 mb-4" />
      )}
      <div className="text-center space-y-2">
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton variant="glow" className="h-10 w-2/3 mx-auto" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton variant="glow" className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton variant="glow" className="h-12 w-full rounded-xl" />
    </div>
  );
};

// Dashboard skeleton
const SkeletonDashboard = ({ className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Stats row */}
      <SkeletonStats count={4} />
      
      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonCard lines={5} showImage />
        </div>
        <div className="space-y-4">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </div>
      </div>
      
      {/* Table */}
      <SkeletonTable rows={5} columns={5} />
    </div>
  );
};

// Hero skeleton
const SkeletonHero = ({ className }) => {
  return (
    <div className={cn('grid lg:grid-cols-2 gap-12 items-center py-20', className)}>
      <div className="space-y-6">
        <Skeleton variant="glow" className="h-8 w-48 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-12 w-3/5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="flex gap-4 pt-4">
          <Skeleton variant="glow" className="h-14 w-40 rounded-xl" />
          <Skeleton variant="glass" className="h-14 w-40 rounded-xl" />
        </div>
      </div>
      <Skeleton variant="glass" className="h-[400px] rounded-2xl hidden lg:block" />
    </div>
  );
};

export {
  Skeleton,
  SkeletonCard,
  SkeletonStats,
  SkeletonTable,
  SkeletonProfile,
  SkeletonPricingCard,
  SkeletonDashboard,
  SkeletonHero
};

export default Skeleton;
