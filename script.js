// Themed Premium Preloader — Reliable on All Devices
(function initPreloader() {
    // Run as early as possible — no waiting for load events
    var preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Lock scroll while loader is visible
    document.body.style.overflow = 'hidden';

    function dismissLoader() {
        preloader.classList.add('loaded');
        // Unlock scroll after the CSS transition finishes (0.9s)
        setTimeout(function () {
            document.body.style.overflow = '';
            preloader.style.display = 'none'; // fully hide so it never blocks taps
        }, 950);
    }

    // Show loader for at least 1.8 seconds — then check if page is ready
    var minTimer = false;
    var pageReady = false;

    setTimeout(function () {
        minTimer = true;
        if (pageReady) dismissLoader();
    }, 1800);

    window.addEventListener('load', function () {
        pageReady = true;
        if (minTimer) dismissLoader();
    });

    // Safety fallback: always dismiss after 4s no matter what
    setTimeout(dismissLoader, 4000);
})();


document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                });

                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-in');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 4. Navbar Background Blur on Scroll
    const navbar = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
    });

    // 5. High-End 3D Tilt Effect for Glass Cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // 6. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ghost');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // 7. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorDot && cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Glow follows with a slight delay
            cursorGlow.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .sidebar-item, .contact-list-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorGlow.style.opacity = '0.6';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.opacity = '0.3';
            });
        });
    }

    // 8. Background Floating Shapes Parallax
    const shapes = document.querySelectorAll('.floating-shape, .parallax-img, .parallax-item');
    if (shapes.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            shapes.forEach(shape => {
                const speed = parseFloat(shape.getAttribute('data-speed')) || 1;
                // Add a slight delay for parallax-img to feel heavier
                if(shape.classList.contains('parallax-img')) {
                    shape.style.transform = `translate(${mouseX * 30 * speed}px, ${mouseY * 30 * speed}px)`;
                    shape.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                } else if(shape.classList.contains('parallax-item')) {
                    shape.style.transform = `translate(${mouseX * 15 * speed}px, ${mouseY * 15 * speed}px)`;
                    shape.style.transition = 'transform 0.4s ease-out';
                } else {
                    const x = (mouseX * 50 * speed);
                    const y = (mouseY * 50 * speed);
                    shape.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        });
    }
});
