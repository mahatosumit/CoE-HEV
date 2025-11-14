import { useEffect, useRef } from 'react';

export const useRevealOnScroll = () => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with 'reveal' class
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    elements.forEach((el) => observer.observe(el));
    elementsRef.current = Array.from(elements);

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return elementsRef;
};
