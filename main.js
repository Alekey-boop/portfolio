document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Hover Effect for Skill Cards (Premium Glow)
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealElements = document.querySelectorAll('.reveal');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if it's a staggered list
                if (entry.target.classList.contains('stagger')) {
                    // Get all stagger elements in the same parent
                    const parent = entry.target.parentElement;
                    const children = Array.from(parent.querySelectorAll('.stagger'));
                    const index = children.indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100); // 100ms delay per item
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    // Initial load animations
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach((el, index) => {
             setTimeout(() => {
                el.classList.add('active');
             }, index * 200);
        });
    }, 100);

    // 3. Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(9, 9, 11, 0.8)';
            nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
            nav.style.padding = '1rem 5%';
        } else {
            nav.style.background = 'rgba(9, 9, 11, 0.4)';
            nav.style.boxShadow = 'none';
            nav.style.padding = '1.5rem 5%';
        }
    });

});
