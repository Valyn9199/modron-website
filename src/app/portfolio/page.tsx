'use client';

import { useEffect } from 'react';

export default function PortfolioPage() {
  useEffect(() => {
    // Set the base URL for the portfolio so all relative paths work correctly
    const base = document.createElement('base');
    base.href = '/portfolio/';
    document.head.appendChild(base);
    
    // Load the portfolio HTML content
    fetch('/portfolio/portfolio.html')
      .then(response => response.text())
      .then(html => {
        // Replace the current page content with the portfolio HTML
        document.documentElement.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading portfolio:', error);
        document.body.innerHTML = '<div style="padding: 50px; text-align: center;">Error loading portfolio. Please try again.</div>';
      });

    // Cleanup function
    return () => {
      const baseElement = document.querySelector('base');
      if (baseElement) {
        baseElement.remove();
      }
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Loading portfolio...
    </div>
  );
}
