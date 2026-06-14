document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        });
        // Fallback if load event already fired
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1500);
    }

    // Cursor Glow
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const percentage = (window.pageYOffset / totalScroll) * 100;
            if (scrollProgress) scrollProgress.style.width = `${percentage}%`;
        }
    });

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    const roles = ["Full Stack Developer", "Android app Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // Dark/Light Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeIcon) {
        themeIcon.className = currentTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) {
                themeIcon.className = newTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
            }
        });
    }

    // Active Menu Link on Scroll & Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Reveal Sections on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // trigger counter if it's stat section
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
                // trigger skill fill animations
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.progress-fill').forEach(bar => {
                        bar.style.width = bar.getAttribute('data-progress') + '%';
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // Animate Counter Stats
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                const speed = target / 40; // animation duration speed control
                if (count < target) {
                    counter.innerText = Math.ceil(count + speed) + '+';
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    }

    // Tilt Card Effect for Projects
    const tiltCards = document.querySelectorAll('.project-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            const rotateX = (-10 * mouseY / (cardHeight / 2)).toFixed(2);
            const rotateY = (10 * mouseX / (cardWidth / 2)).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
            }
        });

        // Close menu on nav-link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'ri-menu-line';
            });
        });
    }

    // Scroll To Top Button
    const scrollTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact Form Validation & Success Popup
    const contactForm = document.getElementById('contact-form');
    const successPopup = document.getElementById('success-popup');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple Validation Checks (Standard HTML validators do majority, JS handles display)
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            if (name && email && message) {
                // Show Success Toast
                if (successPopup) {
                    successPopup.classList.add('show');
                    setTimeout(() => {
                        successPopup.classList.remove('show');
                    }, 3000);
                }
                contactForm.reset();
            }
        });
    }
});
