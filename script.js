document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"], a.scroll-down-link[href^="#"]'); // Include scroll-down link

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset for fixed header dynamically
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0; // Get current header height or 0
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                 // Optional: Close mobile menu if open after click
                 // Example: document.querySelector('.mobile-menu').classList.remove('active');
            }
        });
    });

    // --- Add 'scrolled' class to header on scroll ---
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50; // Pixels to scroll before adding class

    const handleScroll = () => {
         if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Improve scroll performance


    // --- Intersection Observer for Scroll Animations ---
    // Select all elements that have a class starting with "reveal-"
    const revealElements = document.querySelectorAll('[class*="reveal-"]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible - adjust as needed
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the transition
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
            // No 'else' block needed if we only want elements to animate in once
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Optional: Trigger scroll handler once on load in case the page loads already scrolled down
    handleScroll();

}); // End DOMContentLoaded