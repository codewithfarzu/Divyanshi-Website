// ===================================
// Brands Swiper Carousel
// ===================================
new Swiper('.brands-swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    speed: 3000,
    freeMode: true,
    breakpoints: {
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
        1200: { slidesPerView: 6 },
    }
});

// ===================================
// Sub-Dropdown toggle on mobile
// ===================================
document.querySelectorAll('.dropdown-submenu .dropdown-item-sub').forEach(function (item) {
    item.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
            e.preventDefault();
            const parent = this.closest('.dropdown-submenu');
            parent.classList.toggle('open');
        }
    });
});

// ===================================
// Dropdown - Hover open on Desktop
// ===================================
if (window.innerWidth >= 768) {
    document.querySelectorAll('.navbar .dropdown').forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            this.querySelector('.dropdown-menu').classList.add('show');
            this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
        });
        dropdown.addEventListener('mouseleave', function () {
            this.querySelector('.dropdown-menu').classList.remove('show');
            this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    });
}

// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNav');
    const topBar = document.querySelector('.top-bar');
    const body = document.body;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
        topBar.classList.add('hide');
        body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        topBar.classList.remove('hide');
        body.classList.remove('scrolled');
    }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbar = document.getElementById('mainNav');
            const topBar = document.querySelector('.top-bar');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Calculate offset based on scroll position
            let offset = 114; // top-bar + navbar height
            if (scrollTop > 50) {
                offset = 70; // just navbar height when scrolled
            }

            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 20,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}


const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const target = parseInt(item.textContent);
                animateCounter(item, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// ===================================
// Mobile Menu Close on Outside Click
// ===================================
document.addEventListener('click', function (event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    if (navbar && navbar.classList.contains('show')) {
        if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
            navbar.classList.remove('show');
        }
    }
});

// ===================================
// Lazy Loading for Images (Optional Enhancement)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Add Animation to Elements on Scroll
// ===================================
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
});



document.querySelectorAll('.dropdown-item-sub.dropdown-toggle').forEach(function(element) {
    element.addEventListener('click', function(e) {
        // Mobile/tablet behavior
        if (window.innerWidth < 992) {
            const href = (this.getAttribute('href') || '').trim();
            const nextEl = this.nextElementSibling;

            // If this item has a real href (not '#'), navigate to it on mobile
            if (href && href !== '#' && href.toLowerCase().indexOf('javascript:') !== 0) {
                // Allow normal navigation — using assignment to ensure navigation even
                // if other handlers call preventDefault.
                window.location.href = href;
                return;
            }

            // If there's a submenu, toggle its visibility instead of navigating
            if (nextEl && !nextEl.classList.contains('show')) {
                e.preventDefault();
                e.stopPropagation();
                nextEl.classList.add('show');
            } else if (nextEl && nextEl.classList.contains('show')) {
                // If already open, allow link (or close the submenu)
                nextEl.classList.remove('show');
                e.preventDefault();
                e.stopPropagation();
            } else {
                // No submenu and no valid href — nothing to do
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
});

