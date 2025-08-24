// Lightbox module
export function init() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxContainer = lightbox.querySelector('.lightbox-image-container');
  const preloader = lightbox.querySelector('.lightbox-preloader');
  const gestureIndicator = lightbox.querySelector('.gesture-indicator');
  
  let currentScale = 1;
  let startDistance = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  
  // Show gesture indicator on mobile
  if ('ontouchstart' in window) {
    setTimeout(() => {
      gestureIndicator.classList.add('active');
      setTimeout(() => {
        gestureIndicator.classList.remove('active');
      }, 3000);
    }, 1000);
  }
  
  // Image preloading
  async function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  
  async function openLightbox(index) {
    const images = Array.from(document.querySelectorAll('figure img'));
    const img = images[index];
    
    // Show preloader
    preloader.classList.add('active');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    try {
      // Preload image
      await preloadImage(img.src);
      lightboxImage.src = img.src;
      lightbox.querySelector('.lightbox-caption').textContent = img.alt;
      
      // Reset zoom and position
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      updateImageTransform();
      
      // Update button states
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
      nextBtn.style.visibility = index === images.length - 1 ? 'hidden' : 'visible';
    } catch (error) {
      console.error('Error loading image:', error);
      lightboxImage.src = '/images/portfolio/placeholder.jpg';
    } finally {
      preloader.classList.remove('active');
    }
  }
  
  // Touch feedback
  function createTouchFeedback(x, y) {
    const feedback = document.createElement('div');
    feedback.className = 'touch-feedback';
    feedback.style.left = x + 'px';
    feedback.style.top = y + 'px';
    lightboxContainer.appendChild(feedback);
    
    feedback.addEventListener('animationend', () => {
      feedback.remove();
    });
  }
  
  // Image zoom and pan
  function updateImageTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  }
  
  // Event listeners
  lightboxContainer.addEventListener('touchstart', handleTouchStart);
  lightboxContainer.addEventListener('touchmove', handleTouchMove);
  lightboxContainer.addEventListener('touchend', handleTouchEnd);
  lightboxContainer.addEventListener('wheel', handleWheel);
  lightboxImage.addEventListener('dblclick', handleDoubleClick);
  
  // Event handlers
  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      startDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    } else if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].pageX - translateX;
      startY = e.touches[0].pageY - translateY;
      createTouchFeedback(e.touches[0].pageX, e.touches[0].pageY);
    }
  }
  
  function handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const scale = (currentDistance / startDistance) * currentScale;
      currentScale = Math.min(Math.max(scale, 1), 4);
      updateImageTransform();
    } else if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      translateX = e.touches[0].pageX - startX;
      translateY = e.touches[0].pageY - startY;
      updateImageTransform();
    }
  }
  
  function handleTouchEnd() {
    isDragging = false;
    if (currentScale < 1.1) {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      updateImageTransform();
    }
  }
  
  function handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    currentScale = Math.min(Math.max(currentScale + delta, 1), 4);
    updateImageTransform();
  }
  
  function handleDoubleClick() {
    currentScale = currentScale === 1 ? 2 : 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
  }
  
  // Initialize click handlers for images
  document.querySelectorAll('figure').forEach((figure, index) => {
    figure.addEventListener('click', () => openLightbox(index));
  });
  
  // Close handlers
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeBtn.click();
        break;
      case 'ArrowLeft':
        lightbox.querySelector('.lightbox-prev').click();
        break;
      case 'ArrowRight':
        lightbox.querySelector('.lightbox-next').click();
        break;
    }
  });
  
  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });
} 