// DOM Elements
const themeToggle = document.getElementById('theme-toggle');

const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-link');
const header = document.getElementById('header');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Add animation to button
    themeToggle.style.transform = 'rotate(180deg) scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});


// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
    
    skillBars.forEach(bar => {
        // Reset width to 0
        const originalWidth = bar.style.width;
        bar.style.width = '0%';
        
        // Animate to original width
        setTimeout(() => {
            bar.style.width = originalWidth;
        }, 300);
    });
}

// Floating icons animation enhancement
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach(icon => {
    // Add random rotation on hover
    icon.addEventListener('mouseenter', () => {
        const randomRotation = Math.floor(Math.random() * 360);
        icon.style.transform = `rotate(${randomRotation}deg) scale(1.2)`;
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
    });
});

// Card hover effects
const cards = document.querySelectorAll('.contact-card, .info-card, .timeline-content, .achievement-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = card.style.transform + ' scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        // Remove the scale transform but keep other transforms
        const transform = card.style.transform;
        card.style.transform = transform.replace('scale(1.02)', '');
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.theme-toggle,  .social-icon');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
        `;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    // Add animated class to hero section
    document.querySelector('.hero').classList.add('animated');
    
    // Trigger skill bar animation after a delay
    setTimeout(() => {
        if (document.querySelector('#skills').getBoundingClientRect().top < window.innerHeight) {
            animateSkillBars();
        }
    }, 1000);
});

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileMenuContent = document.querySelector('.mobile-menu-content');

// Create close button for mobile menu
const closeButton = document.createElement('button');
closeButton.className = 'mobile-menu-close';
closeButton.innerHTML = '<i class="fas fa-times"></i>';
closeButton.setAttribute('aria-label', 'Close menu');
mobileMenuContent.appendChild(closeButton);

// Toggle mobile menu
function toggleMobileMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isActive);
    
    // Update aria attributes
    mobileMenuBtn.setAttribute('aria-expanded', isActive);
    
    // Add ripple effect to button
    const ripple = document.createElement('span');
    const rect = mobileMenuBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    mobileMenuBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

// Event Listeners
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeButton.addEventListener('click', closeMobileMenu);

// Close menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click feedback
        link.classList.add('active');
        setTimeout(() => link.classList.remove('active'), 200);
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close menu with slight delay for smooth transition
            setTimeout(closeMobileMenu, 300);
            
            // Smooth scroll to section
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 350);
        }
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Touch-friendly improvements
let touchStartY = 0;
let touchEndY = 0;

mobileMenu.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

mobileMenu.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    const touchDiff = touchStartY - touchEndY;
    
    // Close menu on swipe down
    if (touchDiff > 100 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevent body scroll when menu is open (for mobile)
document.addEventListener('touchmove', (e) => {
    if (mobileMenu.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Update active link based on scroll position
function updateActiveMobileLink() {
    const scrollPos = window.scrollY + 100;
    
    mobileNavLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Initial call to set active link
updateActiveMobileLink();

// Listen for scroll events
window.addEventListener('scroll', updateActiveMobileLink);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    }, 250);
});

// Initialize menu state
mobileMenuBtn.setAttribute('aria-expanded', 'false');
mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
mobileMenu.setAttribute('aria-hidden', 'true');

// Add CSS for ripple animation if not already present
if (!document.querySelector('#ripple-styles')) {
    const rippleStyles = document.createElement('style');
    rippleStyles.id = 'ripple-styles';
    rippleStyles.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
}