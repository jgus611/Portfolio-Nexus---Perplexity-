// Phase 4C: Production Features & Infrastructure
// Performance optimization, monitoring, and production-ready features

class ProductionManager {
  constructor() {
    this.performanceMetrics = {
      loadTime: 0,
      renderTime: 0,
      apiResponseTimes: {},
      errorCount: 0,
      userInteractions: 0
    };
    
    this.errorTracker = [];
    this.analyticsQueue = [];
    this.featureFlags = {
      realTimeData: true,
      advancedCharts: true,
      pushNotifications: true,
      offlineMode: true,
      debugMode: false
    };
    
    this.initializeProductionFeatures();
    console.log('🏗️ Production Manager initialized');
  }

  initializeProductionFeatures() {
    this.startPerformanceMonitoring();
    this.setupErrorHandling();
    this.initializeAnalytics();
    this.setupSecurityFeatures();
    this.initializeNotifications();
    this.setupServiceWorker();
    
    console.log('✅ Production features initialized');
  }

  // Performance Monitoring
  startPerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      this.performanceMetrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log('⚡ Page load time:', this.performanceMetrics.loadTime + 'ms');
      this.sendAnalytics('performance', {
        loadTime: this.performanceMetrics.loadTime,
        timestamp: Date.now()
      });
    });

    // Monitor API response times
    this.monitorAPIPerformance();
    
    // Track user interactions
    this.trackUserInteractions();
    
    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  monitorAPIPerformance() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch.apply(window, args);
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        this.performanceMetrics.apiResponseTimes[url] = responseTime;
        
        if (responseTime > 5000) { // Alert if API takes more than 5 seconds
          console.warn('⚠️ Slow API response:', url, responseTime + 'ms');
          this.logError('SLOW_API_RESPONSE', `${url} took ${responseTime}ms`);
        }
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        console.error('❌ API error:', url, error);
        this.logError('API_ERROR', `${url}: ${error.message}`);
        
        throw error;
      }
    };
  }

  trackUserInteractions() {
    const events = ['click', 'scroll', 'keypress', 'resize'];
    
    events.forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.performanceMetrics.userInteractions++;
      }, { passive: true });
    });
  }

  monitorMemoryUsage() {
    if (performance.memory) {
      setInterval(() => {
        const memory = performance.memory;
        const usage = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        };
        
        if (usage.used / usage.limit > 0.9) {
          console.warn('⚠️ High memory usage:', usage);
          this.logError('HIGH_MEMORY_USAGE', `${usage.used}MB used of ${usage.limit}MB`);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  // Error Handling & Logging
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError('JAVASCRIPT_ERROR', event.error?.message || event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('UNHANDLED_PROMISE_REJECTION', event.reason?.message || event.reason, {
        promise: event.promise
      });
    });

    // Console error tracking
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.logError('CONSOLE_ERROR', args.join(' '));
      originalConsoleError.apply(console, args);
    };
  }

  logError(type, message, details = {}) {
    const error = {
      type: type,
      message: message,
      details: details,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: window.authManager?.getCurrentUser()?.id || 'anonymous'
    };
    
    this.errorTracker.push(error);
    this.performanceMetrics.errorCount++;
    
    // Keep only last 100 errors in memory
    if (this.errorTracker.length > 100) {
      this.errorTracker.shift();
    }
    
    // Store errors in local storage
    this.storeErrorLog(error);
    
    // Send critical errors immediately
    if (this.isCriticalError(type)) {
      this.sendErrorReport(error);
    }
    
    console.error('🚨 Error logged:', type, message);
  }

  isCriticalError(type) {
    const criticalTypes = [
      'JAVASCRIPT_ERROR',
      'UNHANDLED_PROMISE_REJECTION',
      'API_ERROR',
      'AUTH_ERROR',
      'DATA_CORRUPTION'
    ];
    return criticalTypes.includes(type);
  }

  storeErrorLog(error) {
    try {
      const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
      errors.push(error);
      
      // Keep only last 50 errors in storage
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }
      
      localStorage.setItem('portfolio_errors', JSON.stringify(errors));
    } catch (e) {
      console.warn('Could not store error log:', e);
    }
  }

  async sendErrorReport(error) {
    try {
      // In production, send to error tracking service
      console.log('📤 Sending error report:', error.type);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('✅ Error report sent successfully');
    } catch (e) {
      console.warn('Failed to send error report:', e);
    }
  }

  // Analytics & User Tracking
  initializeAnalytics() {
    // Track page views
    this.trackPageView();
    
    // Track feature usage
    this.trackFeatureUsage();
    
    // Track user journey
    this.trackUserJourney();
    
    // Batch send analytics data
    setInterval(() => {
      this.sendAnalyticsBatch();
    }, 60000); // Send every minute
  }

  trackPageView() {
    this.sendAnalytics('page_view', {
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now(),
      userId: window.authManager?.getCurrentUser()?.id || 'anonymous'
    });
  }

  trackFeatureUsage() {
    const features = [
      'dashboard', 'portfolio', 'analytics', 'reports', 
      'risk', 'esg', 'rebalancing', 'ai-insights'
    ];
    
    features.forEach(feature => {
      document.addEventListener('click', (event) => {
        if (event.target.closest(`[data-feature="${feature}"]`)) {
          this.sendAnalytics('feature_usage', {
            feature: feature,
            timestamp: Date.now(),
            userId: window.authManager?.getCurrentUser()?.id || 'anonymous'
          });
        }
      });
    });
  }

  trackUserJourney() {
    // Track navigation between views
    let lastView = null;
    
    const trackView = (viewName) => {
      if (lastView && lastView !== viewName) {
        this.sendAnalytics('view_transition', {
          from: lastView,
          to: viewName,
          timestamp: Date.now()
        });
      }
      lastView = viewName;
    };
    
    // Listen for view changes
    document.addEventListener('click', (event) => {
      const navButton = event.target.closest('.nav-btn');
      if (navButton) {
        const viewName = navButton.textContent.trim().toLowerCase();
        trackView(viewName);
      }
    });
  }

  sendAnalytics(event, data) {
    this.analyticsQueue.push({
      event: event,
      data: data,
      timestamp: Date.now()
    });
  }

  async sendAnalyticsBatch() {
    if (this.analyticsQueue.length === 0) return;
    
    try {
      const batch = [...this.analyticsQueue];
      this.analyticsQueue = [];
      
      // In production, send to analytics service
      console.log('📊 Sending analytics batch:', batch.length, 'events');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('✅ Analytics batch sent successfully');
    } catch (error) {
      console.error('❌ Analytics batch send failed:', error);
      // Re-queue failed events
      this.analyticsQueue.unshift(...batch);
    }
  }

  // Security Features
  setupSecurityFeatures() {
    // Content Security Policy monitoring
    document.addEventListener('securitypolicyviolation', (event) => {
      this.logError('CSP_VIOLATION', event.violatedDirective, {
        blockedURI: event.blockedURI,
        documentURI: event.documentURI,
        originalPolicy: event.originalPolicy
      });
    });

    // Monitor for XSS attempts
    this.monitorXSSAttempts();
    
    // Session security
    this.monitorSessionSecurity();
    
    // Input validation
    this.setupInputValidation();
  }

  monitorXSSAttempts() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        const value = event.target.value;
        const xssPatterns = [
          /<script/i,
          /javascript:/i,
          /on\w+\s*=/i,
          /<iframe/i,
          /eval\(/i
        ];
        
        if (xssPatterns.some(pattern => pattern.test(value))) {
          this.logError('XSS_ATTEMPT', 'Potential XSS detected in input', {
            inputId: input.id,
            inputValue: value.substring(0, 100) // Log first 100 chars only
          });
          
          // Clear the input
          input.value = '';
          
          // Show warning to user
          this.showSecurityWarning('Invalid input detected and removed for security.');
        }
      });
    });
  }

  monitorSessionSecurity() {
    // Check for session hijacking attempts
    setInterval(() => {
      const user = window.authManager?.getCurrentUser();
      if (user) {
        // In production, validate session token with server
        const storedFingerprint = localStorage.getItem('session_fingerprint');
        const currentFingerprint = this.generateSessionFingerprint();
        
        if (storedFingerprint && storedFingerprint !== currentFingerprint) {
          this.logError('SESSION_HIJACK_ATTEMPT', 'Session fingerprint mismatch');
          window.authManager?.logout();
        } else if (!storedFingerprint) {
          localStorage.setItem('session_fingerprint', currentFingerprint);
        }
      }
    }, 30000); // Check every 30 seconds
  }

  generateSessionFingerprint() {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset()
    ];
    
    return btoa(components.join('|'));
  }

  setupInputValidation() {
    // Add global input sanitization
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        if (input.type !== 'password') {
          input.value = this.sanitizeInput(input.value);
        }
      });
    });
  }

  sanitizeInput(value) {
    if (typeof value !== 'string') return value;
    
    return value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  showSecurityWarning(message) {
    // Create and show security warning
    const warning = document.createElement('div');
    warning.className = 'security-warning';
    warning.textContent = message;
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
      warning.remove();
    }, 5000);
  }

  // Progressive Web App Features
  initializeNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      this.setupPushNotifications();
    }
  }

  async setupPushNotifications() {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('✅ Notification permission granted');
        this.schedulePortfolioUpdates();
      } else {
        console.log('📵 Notification permission denied');
      }
    } catch (error) {
      console.error('Notification setup error:', error);
    }
  }

  schedulePortfolioUpdates() {
    // Send daily portfolio summary
    setInterval(() => {
      if (this.shouldSendPortfolioUpdate()) {
        this.sendPortfolioNotification();
      }
    }, 3600000); // Check every hour
  }

  shouldSendPortfolioUpdate() {
    const now = new Date();
    const hour = now.getHours();
    
    // Send notification at 9 AM if user hasn't seen app today
    return hour === 9 && !this.hasUserSeenAppToday();
  }

  hasUserSeenAppToday() {
    const lastSeen = localStorage.getItem('last_app_visit');
    if (!lastSeen) return false;
    
    const lastVisit = new Date(lastSeen);
    const today = new Date();
    
    return lastVisit.toDateString() === today.toDateString();
  }

  sendPortfolioNotification() {
    if (Notification.permission === 'granted') {
      const user = window.authManager?.getCurrentUser();
      const notification = new Notification('Portfolio Update', {
        body: `Good morning${user ? `, ${user.firstName}` : ''}! Check your portfolio performance today.`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'portfolio-update',
        requireInteraction: false
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      
      setTimeout(() => notification.close(), 10000);
    }
  }

  // Service Worker for PWA
  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered:', registration.scope);
        
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          console.log('🔄 Service Worker update found');
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateAvailable();
            }
          });
        });
        
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  showUpdateAvailable() {
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; background: #007acc; color: white; padding: 12px; text-align: center; z-index: 10000;">
        <span>A new version is available!</span>
        <button onclick="this.parentElement.parentElement.remove(); location.reload();" style="background: white; color: #007acc; border: none; padding: 4px 12px; margin-left: 12px; border-radius: 4px; cursor: pointer;">
          Update Now
        </button>
        <button onclick="this.parentElement.parentElement.remove();" style="background: transparent; color: white; border: 1px solid white; padding: 4px 12px; margin-left: 8px; border-radius: 4px; cursor: pointer;">
          Later
        </button>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
  }

  // Feature Flags
  isFeatureEnabled(featureName) {
    return this.featureFlags[featureName] || false;
  }

  enableFeature(featureName) {
    this.featureFlags[featureName] = true;
    console.log('✅ Feature enabled:', featureName);
  }

  disableFeature(featureName) {
    this.featureFlags[featureName] = false;
    console.log('❌ Feature disabled:', featureName);
  }

  // Performance Optimization
  optimizePerformance() {
    // Debounce expensive operations
    this.setupDebouncing();
    
    // Lazy load images
    this.setupLazyLoading();
    
    // Virtualize large lists
    this.setupVirtualization();
  }

  setupDebouncing() {
    // Debounce search inputs
    const searchInputs = document.querySelectorAll('input[type="search"], input[data-search]');
    
    searchInputs.forEach(input => {
      let timeout;
      input.addEventListener('input', (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          // Trigger search after 300ms delay
          const searchEvent = new CustomEvent('debouncedSearch', {
            detail: { value: event.target.value }
          });
          input.dispatchEvent(searchEvent);
        }, 300);
      });
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupVirtualization() {
    // Implement virtual scrolling for large data sets
    const largeContainers = document.querySelectorAll('[data-virtualize]');
    
    largeContainers.forEach(container => {
      // Simplified virtual scrolling implementation
      let startIndex = 0;
      const itemHeight = 50; // Assuming fixed height items
      const containerHeight = container.clientHeight;
      const visibleItems = Math.ceil(containerHeight / itemHeight) + 5; // Buffer
      
      container.addEventListener('scroll', () => {
        const newStartIndex = Math.floor(container.scrollTop / itemHeight);
        if (newStartIndex !== startIndex) {
          startIndex = newStartIndex;
          this.renderVirtualItems(container, startIndex, visibleItems);
        }
      });
    });
  }

  renderVirtualItems(container, startIndex, count) {
    // This would be implemented based on the specific data structure
    console.log('Rendering virtual items:', startIndex, 'to', startIndex + count);
  }

  // Get performance report
  getPerformanceReport() {
    return {
      metrics: this.performanceMetrics,
      errors: this.errorTracker.slice(-10), // Last 10 errors
      timestamp: new Date().toISOString(),
      featureFlags: this.featureFlags
    };
  }

  // Mark app visit
  markAppVisit() {
    localStorage.setItem('last_app_visit', new Date().toISOString());
  }
}

// Initialize global production manager
window.productionManager = new ProductionManager();

// Mark app visit when initialized
window.addEventListener('load', () => {
  window.productionManager.markAppVisit();
});

console.log('🏗️ Phase 4C: Production Features & Infrastructure loaded successfully!');