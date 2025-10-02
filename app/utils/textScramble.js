import React from 'react';
import { gsap } from 'gsap';

/**
 * Text Scramble Effect Utility
 * Creates a GSAP-based text scramble animation similar to ScrambletextPlugin
 */
class TextScramble {
  constructor(element) {
    this.element = element;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    this.originalText = element.textContent || element.innerText;
    this.isAnimating = false;
  }

  scramble(duration = 0.8, delay = 0) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const text = this.originalText;
    const textLength = text.length;
    
    // Create timeline for the scramble effect
    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
        this.element.textContent = this.originalText; // Ensure we end with original text
      }
    });

    // Initial scramble phase - all characters random
    tl.to({}, {
      duration: duration * 0.3,
      delay: delay,
      ease: "none",
      onUpdate: () => {
        let scrambledText = '';
        for (let i = 0; i < textLength; i++) {
          if (text[i] === ' ') {
            scrambledText += ' ';
          } else {
            scrambledText += this.chars[Math.floor(Math.random() * this.chars.length)];
          }
        }
        this.element.textContent = scrambledText;
      }
    });

    // Reveal phase - characters resolve one by one
    for (let i = 0; i < textLength; i++) {
      if (text[i] !== ' ') {
        tl.to({}, {
          duration: (duration * 0.7) / textLength,
          ease: "none",
          onUpdate: () => {
            let revealText = '';
            for (let j = 0; j < textLength; j++) {
              if (j <= i || text[j] === ' ') {
                revealText += text[j];
              } else {
                revealText += this.chars[Math.floor(Math.random() * this.chars.length)];
              }
            }
            this.element.textContent = revealText;
          }
        }, "-=0.02"); // Slight overlap for smoother animation
      }
    }

    return tl;
  }

  // Method to apply hover effect
  applyHoverEffect(options = {}) {
    const {
      duration = 0.8,
      delay = 0,
      triggerOnMouseEnter = true,
      triggerOnMouseLeave = false
    } = options;

    // Store references to event handlers for cleanup
    this.mouseEnterHandler = () => {
      this.scramble(duration, delay);
    };

    this.mouseLeaveHandler = () => {
      this.scramble(duration * 0.5, delay);
    };

    if (triggerOnMouseEnter) {
      this.element.addEventListener('mouseenter', this.mouseEnterHandler);
    }

    if (triggerOnMouseLeave) {
      this.element.addEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }

  // Method to cleanup event listeners
  cleanup() {
    if (this.mouseEnterHandler) {
      this.element.removeEventListener('mouseenter', this.mouseEnterHandler);
    }
    if (this.mouseLeaveHandler) {
      this.element.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }

  // Static method to create and apply to element
  static create(element, options = {}) {
    const scrambler = new TextScramble(element);
    scrambler.applyHoverEffect(options);
    return scrambler;
  }

  // Static method to apply to multiple elements
  static applyToElements(selector, options = {}) {
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector) 
      : selector;
    
    const scramblers = [];
    elements.forEach(element => {
      if (element.textContent && element.textContent.trim()) {
        scramblers.push(TextScramble.create(element, options));
      }
    });
    
    return scramblers;
  }
}

// React Hook for Text Scramble
export const useTextScramble = (ref, options = {}) => {
  const {
    duration = 0.8,
    delay = 0,
    triggerOnMouseEnter = true,
    triggerOnMouseLeave = false,
    autoApply = true
  } = options;

  React.useEffect(() => {
    if (!ref.current || !autoApply) return;

    const scrambler = TextScramble.create(ref.current, {
      duration,
      delay,
      triggerOnMouseEnter,
      triggerOnMouseLeave
    });

    return () => {
      // Cleanup event listeners
      if (scrambler.element) {
        const newElement = scrambler.element.cloneNode(true);
        scrambler.element.parentNode.replaceChild(newElement, scrambler.element);
      }
    };
  }, [ref, duration, delay, triggerOnMouseEnter, triggerOnMouseLeave, autoApply]);

  // Return manual trigger function
  return (customDuration) => {
    if (ref.current) {
      const scrambler = new TextScramble(ref.current);
      scrambler.scramble(customDuration || duration, delay);
    }
  };
};

// Global utility to apply to all text elements
export const applyScrambleToAllText = (options = {}) => {
  const {
    selectors = [
      'p', 'span', 'a', 'button',
      '.title', '.japanese', '.status',
      '.info__title', '.info__description',
      '.class__name', '.project-title',
      '.project-year', '.project-class',
      '.back-button', '.external-link'
    ],
    duration = 0.8,
    delay = 0,
    excludeSelectors = ['.loading', '.loading-screen *', '.face-title', '.name']
  } = options;

  // Wait for DOM to be ready
  const applyScramble = () => {
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Check if element should be excluded
          const shouldExclude = excludeSelectors.some(excludeSelector => 
            element.matches(excludeSelector) || element.closest(excludeSelector.replace(' *', ''))
          );

          if (!shouldExclude && element.textContent && element.textContent.trim()) {
            TextScramble.create(element, { duration, delay });
          }
        });
      } catch (error) {
        console.warn(`Failed to apply scramble to selector: ${selector}`, error);
      }
    });
  };

  // Apply immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyScramble);
  } else {
    // Use setTimeout to ensure React components are mounted
    setTimeout(applyScramble, 100);
  }

  // Also apply when navigating (for SPAs)
  let lastUrl = window.location.href;
  new MutationObserver(() => {
    const url = window.location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(applyScramble, 100);
    }
  }).observe(document, { subtree: true, childList: true });
};

export default TextScramble;