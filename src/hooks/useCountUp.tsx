import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (endValue - startValue) * easeOut;
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, start, end, duration, hasAnimated]);

  const formattedValue = `${prefix}${count.toFixed(decimals)}${suffix}`;
  
  return { ref, count, formattedValue };
};

// Component version for easier usage
interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const CountUp = ({ 
  end, 
  suffix = '', 
  prefix = '', 
  decimals = 0, 
  duration = 2000,
  className = ''
}: CountUpProps) => {
  const { ref, formattedValue } = useCountUp({ 
    end, 
    suffix, 
    prefix, 
    decimals, 
    duration 
  });
  
  return (
    <span ref={ref} className={className}>
      {formattedValue}
    </span>
  );
};