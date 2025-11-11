"use client";

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimateOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimate = <T extends HTMLElement>(options?: UseScrollAnimateOptions) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: options?.threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options?.threshold, options?.triggerOnce]);

  return { ref, isInView };
};