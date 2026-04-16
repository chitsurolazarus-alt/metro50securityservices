/* ============================================
   METRO 50 SECURITY - MAIN JAVASCRIPT
   With Lightbox Gallery Feature
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
                }, 500);
            } else {
                width += Math.floor(Math.random() * 5) + 2;
                if (width > 100) width = 100;
                progressBar.style.width = width + '%';
                if (loadPercent) loadPercent.textContent = width + '%';
            }
        }, 40);
    } else {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            }
        });
    }

    // ===== LIGHTBOX GALLERY =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    // Collect all gallery images
    document.querySelectorAll('.card-image-full').forEach((container, index) => {
        const img = container.querySelector('img');
        const caption = container.closest('.showcase-card-full')?.querySelector('h3')?.textContent || '';
        if (img) {
            galleryImages.push({
                src: img.src,
                alt: img.alt,
                caption: caption
            });
        }
    });

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        const card = element.closest('.showcase-card-full');
        const caption = card?.querySelector('h3')?.textContent || '';
        
        // Find index of current image
        currentImageIndex = galleryImages.findIndex(item => item.src === img.src);
        
        if (lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (lightboxCaption) {
                lightboxCaption.textContent = caption;
            }
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'visible';
        }
    };

    window.changeImage = function(direction) {
        currentImageIndex += direction;
        
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        
        const image = galleryImages[currentImageIndex];
        if (lightboxImg && image) {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            if (lightboxCaption) {
                lightboxCaption.textContent = image.caption;
            }
        }
    };

    // Lightbox keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ===== BOOK NOW MODAL =====
    const modal = document.getElementById('bookModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    function openModal(e) {
        if (e) e.preventDefault();
        if (modal) modal.style.display = 'flex';
    }
    
    function closeModal() {
        if (modal) modal.style.display = 'none';
    }
    
    // Book now triggers
    const bookTriggers = [
        document.getElementById('bookNowHeader'),
        document.getElementById('heroBookNow'),
        document.getElementById('ctaWhatsApp')
    ];
    
    bookTriggers.forEach(trigger => {
        if (trigger) trigger.addEventListener('click', openModal);
    });
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== PARALLAX EFFECT =====
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = heroSection.querySelector('.hero-image img');
            if (heroImage) {
                heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // ===== COUNTER ANIMATION =====
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start) + (end === 500 ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                if (statNumbers.length && !statNumbers[0].classList.contains('counted')) {
                    statNumbers[0].classList.add('counted');
                    if (statNumbers[0].innerText !== '7+') {
                        animateCounter(statNumbers[0], 0, 7, 1500);
                    }
                    if (statNumbers[1] && statNumbers[1].innerText !== '500+') {
                        animateCounter(statNumbers[1], 0, 500, 1500);
                    }
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) counterObserver.observe(statsSection);

    // ===== AOS INITIALIZATION =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // ===== CREATE PARTICLES FOR CTA =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(255,255,255,${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add float animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-200px) translateX(50px); opacity: 0; }
        }
        .particle { pointer-events: none; }
    `;
    document.head.appendChild(style);

    // ===== IMAGE FALLBACK HANDLING =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const parent = this.closest('.card-image-full, .image-wrapper, .hero-image');
            
            if (parent) {
                const colors = ['#1a2b7c', '#8b1e1e', '#0a2a5e', '#1a3f5c', '#9e2a2a', '#1e3a5f'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                parent.style.background = `linear-gradient(135deg, ${randomColor} 0%, #0f172a 100%)`;
                
                const placeholderText = document.createElement('div');
                placeholderText.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 24px;
                    font-weight: 700;
                    text-align: center;
                    z-index: 5;
                `;
                placeholderText.textContent = this.alt || 'METRO 50 SECURITY';
                
                if (!parent.querySelector('.placeholder-text')) {
                    placeholderText.classList.add('placeholder-text');
                    parent.style.position = 'relative';
                    parent.appendChild(placeholderText);
                }
            }
            
            this.style.opacity = '0';
        });
    });

    // ===== CURRENT YEAR FOR FOOTER =====
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const year = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', year);
    }

})();