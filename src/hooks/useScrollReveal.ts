'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  /** Threshold for intersection (0-1). Default: 0.1 (10% visible) */
  threshold?: number;
  /** Root margin for earlier/later triggering. Default: '0px' */
  rootMargin?: string;
  /** Only animate once. Default: true */
  once?: boolean;
}

/**
 * Hook for scroll-triggered reveal animations
 *
 * Respects prefers-reduced-motion automatically via CSS.
 * Returns a ref to attach to the element and a boolean for visibility state.
 *
 * @example
 * const { ref, isVisible } = useScrollReveal();
 * return <div ref={ref} className={isVisible ? 'animate-reveal' : 'animate-hidden'}>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Small delay to ensure CSS transition is applied
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      if (once) return; // Don't set up observer if already visible and once=true
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Hook for staggered reveal of multiple children
 *
 * @example
 * const { containerRef, isVisible } = useStaggerReveal();
 * return (
 *   <div ref={containerRef}>
 *     {items.map((item, i) => (
 *       <div
 *         key={i}
 *         className={isVisible ? 'animate-reveal' : 'animate-hidden'}
 *         style={{ transitionDelay: `${i * 100}ms` }}
 *       />
 *     ))}
 *   </div>
 * );
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  return useScrollReveal<T>(options);
}
