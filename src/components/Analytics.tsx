import React from 'react';
import { env } from '@/config/env';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}

export function Analytics() {
  React.useEffect(() => {
    if (!env.ENABLE_ANALYTICS) return;

    // Google Analytics
    if (env.GA_TRACKING_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${env.GA_TRACKING_ID}', {
          page_title: document.title,
          page_location: window.location.href
        });
      `;
      document.head.appendChild(configScript);
    }

    // Hotjar
    if (env.HOTJAR_ID) {
      const hotjarScript = document.createElement('script');
      hotjarScript.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${env.HOTJAR_ID},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      document.head.appendChild(hotjarScript);
    }
  }, []);

  return null;
}

// Analytics tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!env.ENABLE_ANALYTICS) return;

  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  if (env.DEBUG_MODE) {
    console.log('Analytics Event:', eventName, parameters);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!env.ENABLE_ANALYTICS) return;

  if (window.gtag) {
    window.gtag('config', env.GA_TRACKING_ID, {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }

  if (env.DEBUG_MODE) {
    console.log('Analytics Page View:', pagePath, pageTitle);
  }
};