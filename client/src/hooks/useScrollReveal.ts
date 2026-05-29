/**
 * useScrollReveal  -  OptiCheck SEO & CRO Playbook
 * Applies IntersectionObserver to all .scroll-reveal and .scroll-reveal-stagger
 * elements within the document, adding .revealed when they enter the viewport.
 * 0KB overhead  -  pure CSS transitions, no framer-motion.
 */

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-stagger");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
