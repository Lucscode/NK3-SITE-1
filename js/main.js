document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Glassmorphism on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-In-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Cookie Banner Logic
    const initCookieBanner = () => {
        if (!localStorage.getItem('cookieConsent')) {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <p>Usamos cookies e outras tecnologias para melhorar sua experiência. Ao continuar navegando, você concorda com a nossa <a href="politicas.html">Política de Privacidade</a>.</p>
                <button class="btn-primary" id="accept-cookies">Entendi</button>
            `;
            document.body.appendChild(banner);

            // Small delay to allow the DOM to render before adding the 'show' class for animation
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);

            document.getElementById('accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'true');
                banner.classList.remove('show');
                setTimeout(() => {
                    banner.remove();
                }, 600); // Wait for transition to finish
            });
        }
    };
    initCookieBanner();
});
