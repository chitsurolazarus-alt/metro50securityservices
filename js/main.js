/* ============================================
   METRO 50 SECURITY - MAIN JAVASCRIPT
   With Lightbox & Mobile Optimizations
   ============================================ */

(function() {
    'use strict';

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const loadPercent = document.getElementById('loadPercent');
    
    if (preloader && progressBar) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    document.body.style.overflow = 'visible';
                }, 400);
            } else {
                width += Math.floor(Math.random() * 6) + 3;
                if (width > 100) width = 100;
                progressBar.style.width = width + '%';
                if (loadPercent) loadPercent.textContent = width + '%';
            }
        }, 35);
    }

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== LIGHTBOX GALLERY =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    let currentImageIndex = 0;
    const galleryImages = [];
    
    document.querySelectorAll('.gallery-image').forEach((container) => {
        const img = container.querySelector('img');
        const caption = container.closest('.gallery-card')?.querySelector('h3')?.textContent || '';
        if (img) {
            galleryImages.push({ src: img.src, alt: img.alt, caption });
        }
    });

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        const card = element.closest('.gallery-card');
        const caption = card?.querySelector('h3')?.textContent || '';
        currentImageIndex = galleryImages.findIndex(item => item.src === img.src);
        if (lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (lightboxCaption) lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    window.changeImage = function(direction) {
        if (galleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        const image = galleryImages[currentImageIndex];
        if (lightboxImg && image) {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            if (lightboxCaption) lightboxCaption.textContent = image.caption;
        }
    };

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') changeImage(-1);
            else if (e.key === 'ArrowRight') changeImage(1);
        }
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ===== BOOK NOW MODAL =====
    const modal = document.getElementById('bookModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    function openModal(e) { if (e) e.preventDefault(); if (modal) modal.style.display = 'flex'; }
    function closeModal() { if (modal) modal.style.display = 'none'; }
    
    ['bookNowHeader', 'heroBookNow', 'ctaWhatsApp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', openModal);
    });
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.style.display === 'flex') closeModal(); });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== AOS INIT =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 600, once: true, offset: 50 });
    }

    // ===== PARTICLES =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `position:absolute;width:${Math.random()*4+2}px;height:${Math.random()*4+2}px;background:rgba(255,255,255,${Math.random()*0.3+0.1});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:float ${Math.random()*8+8}s linear infinite;pointer-events:none;`;
            particlesContainer.appendChild(particle);
        }
    }

    // ===== IMAGE FALLBACK =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const parent = this.closest('.gallery-image, .image-wrapper, .hero-image');
            if (parent) {
                parent.style.background = 'linear-gradient(135deg, #1a2b7c 0%, #8b1e1e 100%)';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:white;font-size:16px;font-weight:700;z-index:5;';
                placeholder.textContent = this.alt || 'METRO 50 SECURITY';
                parent.style.position = 'relative';
                parent.appendChild(placeholder);
            }
            this.style.opacity = '0';
        });
    });

    // ===== CURRENT YEAR =====
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());

})();