// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      frameCount: 0,
      lastFpsCheck: 0,
      averageFps: 60,
      memoryUsage: 0,
      isLowPerformance: false
    };
    
    this.thresholds = {
      lowFpsThreshold: 45,
      highFpsThreshold: 55,
      memoryThreshold: 100 * 1024 * 1024 // 100MB
    };
  }
  
  updateFPS(currentTime) {
    this.metrics.frameCount++;
    
    if (currentTime - this.metrics.lastFpsCheck > 1000) {
      this.metrics.averageFps = this.metrics.frameCount;
      this.metrics.frameCount = 0;
      this.metrics.lastFpsCheck = currentTime;
      
      // Check if performance has degraded
      const wasLowPerformance = this.metrics.isLowPerformance;
      this.metrics.isLowPerformance = this.metrics.averageFps < this.thresholds.lowFpsThreshold;
      
      // Log performance changes
      if (this.metrics.isLowPerformance && !wasLowPerformance) {
        console.warn('Performance degradation detected. FPS:', this.metrics.averageFps);
      } else if (!this.metrics.isLowPerformance && wasLowPerformance) {
        console.log('Performance restored. FPS:', this.metrics.averageFps);
      }
      
      return true; // Indicates FPS was updated
    }
    
    return false;
  }
  
  checkMemoryUsage() {
    if (performance.memory) {
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
      
      if (this.metrics.memoryUsage > this.thresholds.memoryThreshold) {
        console.warn('High memory usage detected:', 
          Math.round(this.metrics.memoryUsage / 1024 / 1024) + 'MB');
        return true;
      }
    }
    return false;
  }
  
  shouldSkipFrame() {
    return this.metrics.isLowPerformance && this.metrics.frameCount % 2 === 0;
  }
  
  getRecommendedVideoUpdateInterval() {
    if (this.metrics.isLowPerformance) {
      return 1000 / 20; // 20fps for low performance
    }
    return 1000 / 30; // 30fps for normal performance
  }
  
  getRecommendedTextureSize() {
    const isHighPerformance = this.metrics.averageFps > this.thresholds.highFpsThreshold && 
                             !this.checkMemoryUsage();
    return isHighPerformance ? 512 : 256;
  }
}

export class VisibilityManager {
  constructor() {
    this.isVisible = !document.hidden;
    this.callbacks = new Set();
    
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      this.callbacks.forEach(callback => callback(this.isVisible));
    });
  }
  
  onVisibilityChange(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
}

export class ResourceManager {
  constructor() {
    this.resources = new Map();
    this.cleanupTasks = new Set();
  }
  
  register(id, resource, cleanup) {
    this.resources.set(id, resource);
    if (cleanup) {
      this.cleanupTasks.add({ id, cleanup });
    }
  }
  
  unregister(id) {
    const cleanupTask = Array.from(this.cleanupTasks).find(task => task.id === id);
    if (cleanupTask) {
      cleanupTask.cleanup();
      this.cleanupTasks.delete(cleanupTask);
    }
    this.resources.delete(id);
  }
  
  cleanup() {
    this.cleanupTasks.forEach(task => {
      try {
        task.cleanup();
      } catch (error) {
        console.warn('Error during cleanup:', error);
      }
    });
    this.cleanupTasks.clear();
    this.resources.clear();
  }
}

// Debounce utility for performance-sensitive operations
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle utility for high-frequency operations
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}