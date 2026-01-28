'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type AnimationVariant = 'fade-up' | 'fade' | 'fade-left' | 'fade-right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation variant. Default: 'fade-up' */
  variant?: AnimationVariant;
  /** Delay in milliseconds. Default: 0 */
  delay?: number;
  /** Duration in milliseconds. Default: 400 */
  duration?: number;
  /** Additional className */
  className?: string;
  /** Threshold for triggering (0-1). Default: 0.1 */
  threshold?: number;
}

/**
 * ScrollReveal - Wrapper component for scroll-triggered animations
 *
 * Animations are subtle and respect prefers-reduced-motion.
 * Designed for "no hype" brand voice - purposeful, not flashy.
 *
 * @example
 * <ScrollReveal variant="fade-up" delay={100}>
 *   <Card>Content</Card>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 400,
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only enable animations after initial paint (avoids hydration mismatch)
  useEffect(() => {
    // Small delay to ensure initial render is complete
    const timer = setTimeout(() => setShouldAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const hiddenStyles: Record<AnimationVariant, React.CSSProperties> = {
    'fade-up': { opacity: 0, transform: 'translateY(20px)' },
    'fade': { opacity: 0 },
    'fade-left': { opacity: 0, transform: 'translateX(-20px)' },
    'fade-right': { opacity: 0, transform: 'translateX(20px)' },
    'scale': { opacity: 0, transform: 'scale(0.95)' },
  };

  // Before animation system is ready: render content fully visible
  // After ready: apply animation based on intersection
  const style: React.CSSProperties = shouldAnimate
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : hiddenStyles[variant].transform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        transitionDelay: `${delay}ms`,
      }
    : {}; // No styles during SSR/initial render = content visible

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  /** Base delay before first item. Default: 0 */
  baseDelay?: number;
  /** Delay between each item. Default: 100 */
  staggerDelay?: number;
  /** Duration for each item. Default: 400 */
  duration?: number;
  /** Animation variant. Default: 'fade-up' */
  variant?: AnimationVariant;
  /** Additional className for container */
  className?: string;
  /** Threshold for triggering. Default: 0.1 */
  threshold?: number;
}

/**
 * StaggerContainer - Reveals children with staggered delays
 *
 * Wrap items that should animate in sequence. Each direct child
 * gets an increasing delay automatically.
 *
 * @example
 * <StaggerContainer staggerDelay={100}>
 *   <Card>First</Card>
 *   <Card>Second (100ms delay)</Card>
 *   <Card>Third (200ms delay)</Card>
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  baseDelay = 0,
  staggerDelay = 100,
  duration = 400,
  variant = 'fade-up',
  className = '',
  threshold = 0.1,
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Only enable animations after initial paint
  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const hiddenStyles: Record<AnimationVariant, React.CSSProperties> = {
    'fade-up': { opacity: 0, transform: 'translateY(20px)' },
    'fade': { opacity: 0 },
    'fade-left': { opacity: 0, transform: 'translateX(-20px)' },
    'fade-right': { opacity: 0, transform: 'translateX(20px)' },
    'scale': { opacity: 0, transform: 'scale(0.95)' },
  };

  // Clone children with stagger styles
  const staggeredChildren = Array.isArray(children)
    ? children.map((child, index) => {
        if (!child) return null;

        const style: React.CSSProperties = shouldAnimate
          ? {
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : hiddenStyles[variant].transform,
              transitionProperty: 'opacity, transform',
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              transitionDelay: `${baseDelay + index * staggerDelay}ms`,
            }
          : {}; // No styles during SSR = content visible

        return (
          <div key={index} style={style}>
            {child}
          </div>
        );
      })
    : children;

  return (
    <div ref={ref} className={className}>
      {staggeredChildren}
    </div>
  );
}
