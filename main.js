/* =============================================
   KPMA Landing Page - JavaScript
   ============================================= */

(function () {
    'use strict';

    // ========== NAVIGATION ==========

    // Scroll effect for nav
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close mobile menu when nav link clicked
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ========== SMOOTH SCROLL ==========

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = nav.offsetHeight;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== SCROLL ANIMATIONS ==========

    var animateElements = document.querySelectorAll(
        '.program-card, .feature-card, .journey-step, .pricing-card, .partner-benefit, .faq-item, .problem-card, .visual-card'
    );

    animateElements.forEach(function (el) {
        el.classList.add('animate-in');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    animateElements.forEach(function (el) {
        observer.observe(el);
    });

    // ========== FAQ ACCESSIBILITY ==========

    document.querySelectorAll('.faq-item').forEach(function (item) {
        item.querySelector('summary').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.toggleAttribute('open');
            }
        });
    });

    // ========== STAGGERED ANIMATIONS ==========

    var staggerGroups = [
        '.programs-grid .program-card',
        '.features-grid .feature-card',
        '.pricing-grid .pricing-card'
    ];

    staggerGroups.forEach(function (selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.1) + 's';
        });
    });

})();
