// Kilangi Jewellery - Main JavaScript
// Homepage interactions and animations

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');

        // Switch between hamburger and close icon
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolling down
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Category tabs - switch between product categories
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active to clicked button
        this.classList.add('active');

        // Little click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // TODO: Add actual filtering logic here
        console.log('Switched to category:', this.textContent);
    });
});

// Wishlist button on products
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const icon = this.querySelector('i');

        if (icon.classList.contains('far')) {
            // Add to wishlist
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#ff4757';

            // Heart beat animation
            this.style.animation = 'heartBeat 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            console.log('Added to wishlist');
        } else {
            // Remove from wishlist
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
            console.log('Removed from wishlist');
        }
    });
});

// Product cards - hover and click effects
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    card.addEventListener('click', function(e) {
        // Don't trigger if clicking wishlist button
        if (!e.target.closest('.wishlist-btn')) {
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(10, 61, 61, 0.3)';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.left = e.offsetX - 50 + 'px';
            ripple.style.top = e.offsetY - 50 + 'px';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // TODO: Navigate to product page
            console.log('Product clicked');
        }
    });
});

// Add animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.3); }
        50% { transform: scale(1.1); }
        75% { transform: scale(1.2); }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
const sections = document.querySelectorAll('.section-title, .product-card, .collection-item, .gift-occasion, .testimonial-card, .feature-item');
sections.forEach(section => {
    observer.observe(section);
});

// Parallax effect on hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Search bar functionality
const searchInput = document.querySelector('.search-bar input');
const searchIcon = document.querySelector('.search-bar i');

if (searchInput && searchIcon) {
    searchInput.addEventListener('focus', () => {
        searchIcon.style.color = 'var(--primary-dark)';
    });

    searchInput.addEventListener('blur', () => {
        searchIcon.style.color = 'var(--text-gray)';
    });

    searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            // Change to close icon
            searchIcon.classList.remove('fa-search');
            searchIcon.classList.add('fa-times');
            searchIcon.style.cursor = 'pointer';

            searchIcon.onclick = () => {
                searchInput.value = '';
                searchIcon.classList.remove('fa-times');
                searchIcon.classList.add('fa-search');
                searchIcon.style.cursor = 'default';
                searchIcon.onclick = null;
            };
        } else {
            searchIcon.classList.remove('fa-times');
            searchIcon.classList.add('fa-search');
            searchIcon.style.cursor = 'default';
            searchIcon.onclick = null;
        }
    });
}

// Button hover effects with particles
const buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();

        // Create a few particles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('span');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(212, 175, 55, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = Math.random() * rect.height + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'particleFade 1s ease-out forwards';

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    });
});

// Particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Product slider auto-scroll for mobile
let sliderInterval;
const productSlider = document.querySelector('.products-slider');

function startSliderAutoScroll() {
    if (window.innerWidth <= 768 && productSlider) {
        sliderInterval = setInterval(() => {
            if (productSlider.scrollLeft >= productSlider.scrollWidth - productSlider.clientWidth) {
                productSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                productSlider.scrollBy({ left: productSlider.clientWidth / 2, behavior: 'smooth' });
            }
        }, 3000);
    }
}

function stopSliderAutoScroll() {
    clearInterval(sliderInterval);
}

if (productSlider) {
    productSlider.addEventListener('mouseenter', stopSliderAutoScroll);
    productSlider.addEventListener('mouseleave', startSliderAutoScroll);
    productSlider.addEventListener('touchstart', stopSliderAutoScroll);
}

// Start auto-scroll on mobile devices
if (window.innerWidth <= 768) {
    startSliderAutoScroll();
}

// Testimonials auto-rotate (mobile only)
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (window.innerWidth <= 768 && testimonialCards.length > 0) {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'none';
            }
        });

        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
}

setInterval(rotateTestimonials, 3000);

// Gift cards 3D hover effect
const giftCards = document.querySelectorAll('.gift-card');

giftCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Collection items - magnetic text effect
const collectionItems = document.querySelectorAll('.collection-item');

collectionItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const heading = item.querySelector('h3');
        if (heading) {
            heading.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        }
    });

    item.addEventListener('mouseleave', () => {
        const heading = item.querySelector('h3');
        if (heading) {
            heading.style.transform = 'translate(0, 0)';
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Floating animation for icons
const featureIcons = document.querySelectorAll('.feature-item i, .icon-circle');
featureIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Price counter animation when scrolling into view
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = '₹' + value.toLocaleString('en-IN');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe prices for counter animation
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceElement = entry.target;
            const priceText = priceElement.textContent.replace('₹', '').replace(/,/g, '');
            const price = parseInt(priceText);

            if (!isNaN(price) && !priceElement.dataset.animated) {
                priceElement.dataset.animated = 'true';
                animateValue(priceElement, 0, price, 1000);
            }

            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const prices = document.querySelectorAll('.current-price');
prices.forEach(price => {
    priceObserver.observe(price);
});

// Easter egg - click logo 5 times for confetti
let logoClickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        logoClickCount++;

        if (logoClickCount === 5) {
            createConfetti();
            logoClickCount = 0;
            console.log('🎉 Confetti!');
        }

        // Reset after 2 seconds
        setTimeout(() => {
            logoClickCount = 0;
        }, 2000);
    });
}

function createConfetti() {
    const colors = ['#D4AF37', '#0A3D3D', '#F8F4EF', '#ff6b6b', '#4ecdc4'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        document.body.appendChild(confetti);

        const fallDuration = Math.random() * 3 + 2;
        const fallDelay = Math.random() * 0.5;
        const xMovement = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            delay: fallDelay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => confetti.remove(), (fallDuration + fallDelay) * 1000);
    }
}

// Smooth page transitions (not really working for multi-page but looks cool for SPA)
// const links = document.querySelectorAll('a');
// links.forEach(link => {
//     if (link.hostname === window.location.hostname && !link.getAttribute('href').startsWith('#')) {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const href = link.getAttribute('href');

//             document.body.style.opacity = '0';
//             setTimeout(() => {
//                 window.location.href = href;
//             }, 300);
//         });
//     }
// });

console.log('🎨 Kilangi Jewellery - Website loaded');
console.log('✨ All interactions ready');
