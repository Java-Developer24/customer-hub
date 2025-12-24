import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Floating Particles Component
export const FloatingParticles = ({ count = 50, className = '' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Aurora Effect Component
export const AuroraEffect = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Aurora Wave 1 */}
      <motion.div
        className="absolute w-[200%] h-[50%] -top-[10%] -left-[50%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(270 100% 65% / 0.15) 30%, hsl(180 100% 50% / 0.1) 60%, transparent 100%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: ['-25%', '25%', '-25%'],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Aurora Wave 2 */}
      <motion.div
        className="absolute w-[150%] h-[40%] -top-[5%] -left-[25%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(300 100% 60% / 0.1) 40%, hsl(270 100% 65% / 0.15) 70%, transparent 100%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['15%', '-15%', '15%'],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Aurora Wave 3 */}
      <motion.div
        className="absolute w-[180%] h-[35%] top-[5%] -left-[40%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(180 100% 50% / 0.08) 50%, transparent 100%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

// Gradient Mesh Animation Component
export const GradientMesh = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Mesh Blob 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(270 100% 65% / 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          left: '-10%',
          top: '10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Mesh Blob 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(180 100% 50% / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          right: '-5%',
          top: '20%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Mesh Blob 3 */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(300 100% 60% / 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          left: '30%',
          bottom: '10%',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Mesh Blob 4 - Accent */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(200 100% 60% / 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          right: '20%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
};

// Grid Pattern with Animation
export const AnimatedGrid = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          y: ['-100vh', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

// Combined Hero Background
export const HeroBackground = ({ variant = 'default', className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Grid overlay */}
      <AnimatedGrid />
      
      {/* Aurora for hero sections */}
      {(variant === 'default' || variant === 'hero') && <AuroraEffect />}
      
      {/* Gradient mesh */}
      <GradientMesh />
      
      {/* Floating particles */}
      <FloatingParticles count={30} />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(270 100% 65% / 0.15) 0%, transparent 50%)',
        }}
      />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

// Noise texture overlay
export const NoiseOverlay = ({ opacity = 0.03, className = '' }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
};

export default HeroBackground;
