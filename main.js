/* ============================================
   Mostafa Emad Portfolio — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ========== MOBILE MENU ==========
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ========== ACTIVE NAV ==========
    const sections = document.querySelectorAll('section[id]');
    function updateNav() {
        const y = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const h = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', y >= top && y < top + h);
            }
        });
    }
    window.addEventListener('scroll', updateNav);

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ========== SCROLL REVEAL ==========
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => observer.observe(el));

    // ========== PHONE CAROUSEL ==========
    const slides = document.querySelectorAll('.phone-slide');
    const dots = document.querySelectorAll('.dot-btn');
    let currentSlide = 0;
    let autoplayTimer;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, 2800);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // Dot button clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(parseInt(dot.dataset.index));
            startAutoplay();
        });
    });

    // Touch/swipe on phone
    const carousel = document.getElementById('phone-carousel');
    if (carousel) {
        let startX = 0;
        carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAutoplay(); });
        carousel.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) showSlide((currentSlide + 1) % slides.length);
                else showSlide((currentSlide - 1 + slides.length) % slides.length);
            }
            startAutoplay();
        });
    }

    startAutoplay();

    // ========== ORBIT COUNTER-ROTATION FIX ==========
    // Each orbit item needs its own counter-rotation
    document.querySelectorAll('.orbit-item').forEach(item => {
        const angle = item.style.getPropertyValue('--angle');
        const deg = parseFloat(angle);
        item.style.setProperty('--angle', angle);
    });

    // ========== CONTACT FORM ==========
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i><span>Message Sent!</span>';
            btn.style.background = '#10b981';
            btn.style.boxShadow = '0 4px 20px rgba(16,185,129,0.3)';
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.style.boxShadow = '';
                form.reset();
            }, 3500);
        });
    }

    // ========== STAGGER PROJECT CARDS ==========
    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.06}s`;
    });

    // ========== TIMELINE stagger ==========
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });

});
