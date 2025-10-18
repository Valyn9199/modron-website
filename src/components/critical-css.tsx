"use client"

export function CriticalCSS() {
  return (
    <style jsx global>{`
      /* Critical CSS for above-the-fold content */
      
      /* Hero Section Critical Styles */
      .hero-section {
        min-height: 100vh;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        position: relative;
        overflow: hidden;
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem 1rem;
        min-height: 100vh;
      }
      
      .hero-title {
        font-size: clamp(2.5rem, 8vw, 6rem);
        font-weight: 800;
        line-height: 1.1;
        color: #1f2937;
        margin-bottom: 1rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .hero-subtitle {
        font-size: clamp(0.875rem, 2vw, 1rem);
        color: #40d0f2;
        margin-bottom: 1.5rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      
      /* Specific hero classes */
      .hero-subheading {
        font-size: clamp(0.875rem, 2vw, 1.5rem);
        color: #1f2937;
        margin-bottom: 1rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        max-width: 48rem;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.625;
        padding: 0 1rem;
      }
      
      .hero-description {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        color: #1f2937;
        margin-bottom: 2.5rem;
        max-width: 64rem;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.625;
        font-weight: 700;
        padding: 0 1rem;
      }
      
      /* Text utility classes */
      .text-body {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        line-height: 1.5;
        font-weight: 400;
      }
      
      .text-gray-800 {
        color: #1f2937 !important;
      }
      
      /* Ensure critical styles take precedence during initial load */
      .hero-subheading.text-gray-800 {
        color: #1f2937 !important;
      }
      
      .hero-description.text-gray-800 {
        color: #1f2937 !important;
      }
      
      .hero-cta-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        width: 100%;
        max-width: 400px;
      }
      
      .hero-cta-button {
        width: 100%;
        padding: 0.875rem 2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
      }
      
      .hero-cta-primary {
        background: linear-gradient(135deg, #40d0f2 0%, #32ca73 100%);
        color: white;
      }
      
      .hero-cta-primary:hover {
        background: linear-gradient(135deg, #32ca73 0%, #40d0f2 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(64, 208, 242, 0.3);
      }
      
      .hero-cta-secondary {
        background: transparent;
        color: #CCCCCC;
        border: 1px solid #999999;
      }
      
      .hero-cta-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-color: #40d0f2;
      }
      
      /* Header Critical Styles */
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        height: 4rem;
      }
      
      .header-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .header-logo {
        height: 2rem;
        width: auto;
        object-fit: contain;
      }
      
      /* Loading States */
      .loading-skeleton {
        background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Responsive Design */
      @media (min-width: 640px) {
        .hero-cta-container {
          flex-direction: row;
          max-width: 500px;
        }
        
        .hero-cta-button {
          width: auto;
          min-width: 200px;
        }
      }
      
      @media (min-width: 768px) {
        .hero-content {
          padding: 3rem 2rem;
        }
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        .hero-cta-button {
          transition: none;
        }
        
        .hero-cta-primary:hover {
          transform: none;
        }
        
        .loading-skeleton {
          animation: none;
        }
      }
    `}</style>
  )
}
