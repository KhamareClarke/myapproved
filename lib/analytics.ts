"use client";

// Analytics and tracking utilities
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;
  private userId: string | null = null;

  // Initialize analytics
  init(userId?: string) {
    if (this.isInitialized) return;
    
    this.userId = userId || null;
    this.isInitialized = true;

    // Initialize Google Analytics 4
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      this.initGA4();
    }

    // Initialize Hotjar
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_HOTJAR_ID) {
      this.initHotjar();
    }

    console.log('Analytics initialized');
  }

  // Google Analytics 4 initialization
  private initGA4() {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    // Load GA4 script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };

    (window as any).gtag('js', new Date());
    (window as any).gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      user_id: this.userId
    });
  }

  // Hotjar initialization
  private initHotjar() {
    const hjId = process.env.NEXT_PUBLIC_HOTJAR_ID;
    if (!hjId) return;

    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: hjId, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }

  // Track page views
  trackPageView(url: string, title?: string) {
    if (!this.isInitialized) return;

    // GA4 page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: title || document.title,
        page_location: url,
        user_id: this.userId
      });
    }

    // Custom tracking
    this.track({
      action: 'page_view',
      category: 'navigation',
      properties: {
        url,
        title: title || document.title,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Track custom events
  track(event: AnalyticsEvent) {
    if (!this.isInitialized) return;

    // GA4 event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        user_id: this.userId,
        custom_parameters: event.properties
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Send to custom analytics endpoint
    this.sendToCustomEndpoint(event);
  }

  // Business-specific tracking methods
  trackQuoteRequest(tradeType: string, location: string, urgency: string) {
    this.track({
      action: 'quote_request',
      category: 'conversion',
      label: tradeType,
      properties: {
        trade_type: tradeType,
        location,
        urgency,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackUserRegistration(userType: 'client' | 'tradesperson', method: string) {
    this.track({
      action: 'user_registration',
      category: 'conversion',
      label: userType,
      properties: {
        user_type: userType,
        registration_method: method,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackChatInteraction(action: 'open' | 'message' | 'close', messageType?: string) {
    this.track({
      action: `chat_${action}`,
      category: 'engagement',
      label: messageType,
      properties: {
        chat_action: action,
        message_type: messageType,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackSearchQuery(query: string, results: number) {
    this.track({
      action: 'search',
      category: 'engagement',
      label: query,
      value: results,
      properties: {
        search_query: query,
        results_count: results,
        timestamp: new Date().toISOString()
      }
    });
  }

  trackButtonClick(buttonName: string, location: string) {
    this.track({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
      properties: {
        button_name: buttonName,
        page_location: location,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Set user ID
  setUserId(userId: string) {
    this.userId = userId;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        user_id: userId
      });
    }
  }

  // Send to custom analytics endpoint
  private async sendToCustomEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          userId: this.userId,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
        })
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }
}

// Create singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackQuoteRequest: analytics.trackQuoteRequest.bind(analytics),
    trackUserRegistration: analytics.trackUserRegistration.bind(analytics),
    trackChatInteraction: analytics.trackChatInteraction.bind(analytics),
    trackSearchQuery: analytics.trackSearchQuery.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics)
  };
}
