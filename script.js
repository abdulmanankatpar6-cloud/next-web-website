// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Mobile Profile Icon - Open Auth Modal
const mobileProfileIcon = document.getElementById('mobileProfileIcon');
const mobileProfileIconLoggedIn = document.getElementById('mobileProfileIconLoggedIn');

if (mobileProfileIcon) {
    mobileProfileIcon.addEventListener('click', () => {
        // Open login modal
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileProfileIconLoggedIn) {
    mobileProfileIconLoggedIn.addEventListener('click', () => {
        // Show logout confirmation
        if (confirm('Do you want to logout?')) {
            // Clear session
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('nextWebUser');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('nextWebUser');
            
            // Update UI
            updateLoginState(false);
            
            // Show success message
            alert('Logged out successfully!');
        }
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Enhanced Typing Animation for Hero Title
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.getAttribute('data-text');
    let index = 0;
    typingText.textContent = '';
    
    function type() {
        if (index < text.length) {
            const char = document.createElement('span');
            char.className = 'char';
            char.textContent = text.charAt(index);
            char.style.animationDelay = `${index * 0.05}s`;
            typingText.appendChild(char);
            index++;
            setTimeout(type, 80);
        } else {
            // After typing is complete, add a subtle bounce to the cursor
            setTimeout(() => {
                const cursor = typingText.querySelector('::after');
                if (cursor) {
                    cursor.style.animation = 'blink 0.7s infinite, cursorBounce 1s ease-in-out infinite';
                }
            }, 500);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 800);
}

// Add particle effect on button hover
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
    // Ripple effect on click
    heroBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = heroBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        heroBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Particle effect on hover
    heroBtn.addEventListener('mouseenter', function(e) {
        createParticles(e);
    });
    
    // Magnetic effect
    heroBtn.addEventListener('mousemove', function(e) {
        const rect = heroBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        heroBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
    });
    
    heroBtn.addEventListener('mouseleave', function() {
        heroBtn.style.transform = '';
    });
    
    function createParticles(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 30 + Math.random() * 20;
            
            particle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: ${i % 2 === 0 ? 'var(--secondary)' : 'var(--primary)'};
                border-radius: 50%;
                pointer-events: none;
                left: 50%;
                top: 50%;
                animation: particleExplode 0.8s ease-out forwards;
                --tx: ${Math.cos(angle) * velocity}px;
                --ty: ${Math.sin(angle) * velocity}px;
                opacity: 1;
                box-shadow: 0 0 10px currentColor;
            `;
            button.appendChild(particle);
            
            setTimeout(() => particle.remove(), 800);
        }
    }
}

// Add CSS for particle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleExplode {
        0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes cursorBounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-3px);
        }
    }
    
    .hero-btn {
        position: relative;
        transition: transform 0.1s ease-out, background 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hero-btn:hover {
        transition: transform 0.1s ease-out, background 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add text reveal animation on scroll
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.innerHTML = text.split(' ').map((word, index) => 
        `<span class="word" style="animation-delay: ${1.5 + index * 0.1}s">${word}</span>`
    ).join(' ');
}

// Add word animation CSS
const wordStyle = document.createElement('style');
wordStyle.textContent = `
    .hero-subtitle .word {
        display: inline-block;
        opacity: 0;
        animation: fadeInWord 0.5s forwards;
    }
    
    @keyframes fadeInWord {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(wordStyle);

// Enhanced Smooth Scroll for Navigation Links and Contact Buttons
const navLinks = document.querySelectorAll('.nav-link, .top-nav-link');
const contactButtons = document.querySelectorAll('.btn-contact-sidebar, .btn-contact-top, .btn-primary, .sticky-mobile-cta .btn-primary, .pulse-btn');

// Smooth scroll function with offset and animation
function smoothScrollToSection(targetId, highlightSection = false) {
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        // Calculate offset (accounting for sticky header)
        const headerOffset = 100; // Adjust based on your header height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll with custom behavior
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        // Highlight section on arrival
        if (highlightSection) {
            setTimeout(() => {
                highlightContactSection(targetSection);
            }, 600); // Wait for scroll to complete
        }
        
        // Update active states for navigation
        document.querySelectorAll('.nav-link, .top-nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Find corresponding nav links and activate them
        document.querySelectorAll(`[href="#${targetId}"]`).forEach(l => {
            l.classList.add('active');
        });
        
        // Set focus for accessibility
        setTimeout(() => {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus({ preventScroll: true });
        }, 700);
    }
}

// Highlight section with animation
function highlightContactSection(section) {
    // Add highlight class
    section.classList.add('section-highlight');
    
    // Create ripple effect
    createScrollRipple(section);
    
    // Remove highlight after animation
    setTimeout(() => {
        section.classList.remove('section-highlight');
    }, 2000);
}

// Create ripple effect on scroll arrival
function createScrollRipple(section) {
    const ripple = document.createElement('div');
    ripple.className = 'scroll-ripple';
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(13, 110, 253, 0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: rippleExpand 1.5s ease-out;
        z-index: 0;
    `;
    
    section.style.position = 'relative';
    section.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1500);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 800px;
            height: 800px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Navigation links smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            smoothScrollToSection(targetId, false);
        }
    });
    
    // Keyboard navigation support
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// Contact buttons smooth scroll with highlight
contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        button.classList.add('clicking');
        setTimeout(() => button.classList.remove('clicking'), 300);
        
        // Check if button has href attribute
        const href = button.getAttribute('href');
        
        // If it's a link with href, handle it
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            smoothScrollToSection(targetId, true);
        } 
        // If it's a button without href, scroll to contact
        else if (button.classList.contains('btn-contact-sidebar') || 
                 button.classList.contains('btn-contact-top') ||
                 button.classList.contains('pulse-btn') ||
                 (button.classList.contains('btn-primary') && !button.closest('form') && !button.closest('.auth-modal'))) {
            e.preventDefault();
            smoothScrollToSection('contact', true);
        }
    });
    
    // Keyboard navigation support
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// Scroll progress indicator (optional)
function updateScrollProgress() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link, .top-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Update scroll progress bar
    const scrollProgressFill = document.querySelector('.scroll-progress-fill');
    if (scrollProgressFill) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgressFill.style.width = scrolled + '%';
    }
}

// Update scroll progress on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollProgress, 50);
});

// Initial update
updateScrollProgress();

// Smooth scroll for anchor links in content
document.addEventListener('DOMContentLoaded', () => {
    // Handle hash in URL on page load
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            smoothScrollToSection(targetId, true);
        }, 100);
    }
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-link') && 
            !anchor.classList.contains('top-nav-link') &&
            !anchor.classList.contains('btn-contact-sidebar') &&
            !anchor.classList.contains('btn-contact-top')) {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href && href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    smoothScrollToSection(targetId, true);
                }
            });
        }
    });
});

// Active Section Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link, .top-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Service Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        serviceCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Portfolio Carousel
const portfolioTrack = document.getElementById('portfolioTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');
const portfolioCards = document.querySelectorAll('.portfolio-card');

let currentPortfolioIndex = 0;
const cardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;

// Create dots for portfolio
function createPortfolioDots() {
    const totalDots = Math.ceil(portfolioCards.length / cardsPerView);
    carouselDots.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPortfolioSlide(i));
        carouselDots.appendChild(dot);
    }
}

function updatePortfolioDots() {
    const dots = carouselDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPortfolioIndex);
    });
}

function goToPortfolioSlide(index) {
    const totalSlides = Math.ceil(portfolioCards.length / cardsPerView);
    currentPortfolioIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updatePortfolioDots();
}

prevBtn.addEventListener('click', () => {
    if (currentPortfolioIndex > 0) {
        currentPortfolioIndex--;
        updatePortfolioDots();
    }
});

nextBtn.addEventListener('click', () => {
    const totalSlides = Math.ceil(portfolioCards.length / cardsPerView);
    if (currentPortfolioIndex < totalSlides - 1) {
        currentPortfolioIndex++;
        updatePortfolioDots();
    }
});

createPortfolioDots();

// Testimonials Carousel
const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentTestimonialIndex = 0;
const testimonialsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;

// Create dots for testimonials
function createTestimonialDots() {
    const totalDots = Math.ceil(testimonialCards.length / testimonialsPerView);
    testimonialDots.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonialSlide(i));
        testimonialDots.appendChild(dot);
    }
}

function updateTestimonialDots() {
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
}

function goToTestimonialSlide(index) {
    const totalSlides = Math.ceil(testimonialCards.length / testimonialsPerView);
    currentTestimonialIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateTestimonialDots();
}

prevTestimonial.addEventListener('click', () => {
    if (currentTestimonialIndex > 0) {
        currentTestimonialIndex--;
        updateTestimonialDots();
    }
});

nextTestimonial.addEventListener('click', () => {
    const totalSlides = Math.ceil(testimonialCards.length / testimonialsPerView);
    if (currentTestimonialIndex < totalSlides - 1) {
        currentTestimonialIndex++;
        updateTestimonialDots();
    }
});

createTestimonialDots();

// Auto-scroll testimonials
let testimonialAutoScroll = setInterval(() => {
    const totalSlides = Math.ceil(testimonialCards.length / testimonialsPerView);
    currentTestimonialIndex = (currentTestimonialIndex + 1) % totalSlides;
    updateTestimonialDots();
}, 5000);

// Pause auto-scroll on hover
testimonialsTrack.addEventListener('mouseenter', () => {
    clearInterval(testimonialAutoScroll);
});

testimonialsTrack.addEventListener('mouseleave', () => {
    testimonialAutoScroll = setInterval(() => {
        const totalSlides = Math.ceil(testimonialCards.length / testimonialsPerView);
        currentTestimonialIndex = (currentTestimonialIndex + 1) % totalSlides;
        updateTestimonialDots();
    }, 5000);
});

// Portfolio Modal/Lightbox
const modal = document.getElementById('portfolioModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const viewProjectButtons = document.querySelectorAll('.btn-view-project');

const projectData = [
    {
        title: 'E-Commerce Platform',
        description: 'A comprehensive e-commerce solution with advanced features including product management, secure payment processing, inventory tracking, and customer analytics. Built with modern technologies for optimal performance and scalability.',
        tags: ['E-commerce', 'Web Development', 'Payment Integration', 'Analytics'],
        image: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFlM2E4YSIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjM2MCIgaGVpZ2h0PSIyNjAiIGZpbGw9IiMzYjgyZjYiLz48L3N2Zz4='
    },
    {
        title: 'Mobile Banking App',
        description: 'Secure and intuitive mobile banking application for iOS and Android. Features include account management, fund transfers, bill payments, and real-time notifications. Designed with security and user experience as top priorities.',
        tags: ['Mobile App', 'iOS', 'Android', 'FinTech', 'Security'],
        image: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjwvc3ZnPg=='
    },
    {
        title: 'Corporate Website',
        description: 'Professional corporate website with modern design, content management system, and SEO optimization. Includes company information, services showcase, team profiles, and integrated contact forms.',
        tags: ['Web Design', 'CMS', 'SEO', 'Corporate'],
        image: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzBmMTcyYSIvPjwvc3ZnPg=='
    },
    {
        title: 'SaaS Dashboard',
        description: 'Comprehensive SaaS dashboard with data visualization, user management, and analytics. Features real-time updates, customizable widgets, and responsive design for all devices.',
        tags: ['SaaS', 'Dashboard', 'Analytics', 'Data Visualization'],
        image: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RiZWFmZSIvPjwvc3ZnPg=='
    }
];

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectIndex = parseInt(button.getAttribute('data-project'));
        const project = projectData[projectIndex];
        
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <h2 class="modal-project-title">${project.title}</h2>
            <p class="modal-project-description">${project.description}</p>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Real-time validation
function validateName() {
    const nameError = document.getElementById('nameError');
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.classList.add('error');
        nameInput.classList.remove('success');
        return false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
        nameInput.classList.add('success');
        return true;
    }
}

function validateEmail() {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        emailInput.classList.remove('success');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        emailInput.classList.add('success');
        return true;
    }
}

function validateMessage() {
    const messageError = document.getElementById('messageError');
    if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.classList.add('error');
        messageInput.classList.remove('success');
        return false;
    } else {
        messageError.textContent = '';
        messageInput.classList.remove('error');
        messageInput.classList.add('success');
        return true;
    }
}

// Add real-time validation listeners
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
        const originalText = btnText.textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Karachi',
                dateStyle: 'full',
                timeStyle: 'long'
            })
        };
        
        // Simulate sending email (replace with actual email service)
        sendContactEmail(formData)
            .then(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Remove validation classes
                nameInput.classList.remove('success', 'error');
                emailInput.classList.remove('success', 'error');
                messageInput.classList.remove('success', 'error');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // Log success
                console.log('✅ Message sent successfully to abdulmanankatpar6@gmail.com');
            })
            .catch((error) => {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message-box show';
                errorMsg.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <div>
                        <strong>Oops! Something went wrong.</strong>
                        <p>Please try again or contact us via WhatsApp.</p>
                    </div>
                `;
                
                // Insert error message
                const existingError = contactForm.querySelector('.error-message-box');
                if (existingError) {
                    existingError.remove();
                }
                contactForm.appendChild(errorMsg);
                
                // Remove error message after 7 seconds
                setTimeout(() => {
                    errorMsg.classList.remove('show');
                    setTimeout(() => errorMsg.remove(), 300);
                }, 7000);
                
                console.error('❌ Contact form error:', error);
            })
            .finally(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            });
    }
});

// Email Service Integration - Web3Forms (Works Immediately!)
async function sendContactEmail(formData) {
    // Web3Forms - Get your free access key at: https://web3forms.com
    
    const web3formsKey = 'c8bc59b0-5a6b-4d5d-ad5b-e5712ad20d93'; // Your Web3Forms access key
    
    // Check if key is configured
    if (web3formsKey === 'YOUR_WEB3FORMS_KEY') {
        // Demo mode - Show success without sending email
        console.log('📧 DEMO MODE: Form validated successfully!');
        console.log('📝 Form Data:', formData);
        console.log('⚠️ To send real emails, get your free key from: https://web3forms.com');
        console.log('📧 Emails will be sent to: abdulmanankatpar6@gmail.com');
        
        // Simulate successful submission
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    success: true, 
                    message: 'Demo mode - Form validated successfully!' 
                });
            }, 1000);
        });
    }
    
    // Production mode - Send actual email
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: web3formsKey,
                name: formData.name,
                email: formData.email,
                message: formData.message,
                subject: 'New Contact Form Submission from Next Web',
                from_name: 'Next Web Website',
                to_email: 'abdulmanankatpar6@gmail.com',
                timestamp: formData.timestamp
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Email sent successfully to abdulmanankatpar6@gmail.com');
            return result;
        } else {
            throw new Error(result.message || 'Failed to send email');
        }
        
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
    }
}

// Alternative: WhatsApp Direct Contact
function sendWhatsAppMessage(name, email, message) {
    const phoneNumber = '923097553991'; // Pakistan WhatsApp number
    const text = `Hello! I'm ${name} (${email}). ${message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp quick contact button to contact form
const contactFormContainer = document.querySelector('.contact-form');
if (contactFormContainer && !document.getElementById('whatsappQuickContact')) {
    const whatsappBtn = document.createElement('button');
    whatsappBtn.type = 'button';
    whatsappBtn.id = 'whatsappQuickContact';
    whatsappBtn.className = 'btn-whatsapp-contact';
    whatsappBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.488 2.031 7.794L.05 31.95l8.344-2.187A15.917 15.917 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.444 0-4.75-.656-6.731-1.8l-.481-.288-5.006 1.313 1.338-4.888-.313-.5A13.25 13.25 0 012.667 16c0-7.363 5.97-13.333 13.333-13.333S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.294-9.956c-.4-.2-2.369-1.169-2.738-1.3-.369-.131-.637-.2-.906.2-.269.4-1.038 1.3-1.275 1.569-.237.269-.475.3-.875.1-.4-.2-1.688-.625-3.213-1.988-1.188-1.063-1.988-2.375-2.219-2.775-.231-.4-.025-.619.175-.819.181-.181.4-.475.6-.713.2-.237.269-.4.4-.669.131-.269.069-.5-.031-.7-.1-.2-.906-2.188-1.244-2.994-.331-.788-.669-.681-.906-.694-.231-.012-.5-.019-.769-.019s-.7.1-1.069.5c-.369.4-1.406 1.375-1.406 3.356s1.438 3.894 1.638 4.163c.2.269 2.825 4.313 6.844 6.05.956.413 1.7.656 2.281.844.963.306 1.838.263 2.531.163.769-.119 2.369-.969 2.7-1.906.331-.938.331-1.738.231-1.906-.1-.169-.369-.269-.769-.469z"/>
        </svg>
        <span>Contact via WhatsApp</span>
    `;
    
    const whatsappStyle = document.createElement('style');
    whatsappStyle.textContent = `
        .btn-whatsapp-contact {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 32px;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 16px;
        }
        
        .btn-whatsapp-contact:hover {
            background: #20BA5A;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }
    `;
    document.head.appendChild(whatsappStyle);
    
    whatsappBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || 'Visitor';
        const email = emailInput.value.trim() || 'No email provided';
        const message = messageInput.value.trim() || 'I would like to discuss a project';
        sendWhatsAppMessage(name, email, message);
    });
    
    contactFormContainer.appendChild(whatsappBtn);
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Responsive adjustments on window resize
window.addEventListener('resize', () => {
    // Recreate dots if screen size changes significantly
    const newCardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    
    if (newCardsPerView !== cardsPerView) {
        createPortfolioDots();
        createTestimonialDots();
    }
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .why-card, .portfolio-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active state
    const homeLink = document.querySelector('[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});


// ==================== AUTHENTICATION SYSTEM ====================

// Modal Controls
const authModal = document.getElementById('authModal');
const authModalOverlay = document.getElementById('authModalOverlay');
const authModalClose = document.getElementById('authModalClose');
const loginBtn = document.getElementById('loginBtn');

// User Profile Dropdown Elements
const userProfileDropdown = document.getElementById('userProfileDropdown');
const userProfileBtn = document.getElementById('userProfileBtn');
const userDropdownMenu = document.getElementById('userDropdownMenu');
const userNameDisplay = document.getElementById('userNameDisplay');
const authButtons = document.getElementById('authButtons');
const profileLink = document.getElementById('profileLink');
const logoutLink = document.getElementById('logoutLink');

// Open auth modal for login (default to login tab)
loginBtn.addEventListener('click', () => {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Switch to login tab by default
    authTabs.forEach(tab => tab.classList.remove('active'));
    authTabs[0].classList.add('active');
    authFormContainers.forEach(container => container.classList.remove('active'));
    document.getElementById('loginForm').classList.add('active');
});

// Toggle user dropdown menu
userProfileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userProfileBtn.classList.toggle('active');
    userDropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userProfileDropdown.contains(e.target)) {
        userProfileBtn.classList.remove('active');
        userDropdownMenu.classList.remove('show');
    }
});

// Profile link click
profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Profile page coming soon!');
    userDropdownMenu.classList.remove('show');
    userProfileBtn.classList.remove('active');
});

// Logout link click
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('nextWebUser');
        sessionStorage.removeItem('nextWebUser');
        updateLoginState(false);
        userDropdownMenu.classList.remove('show');
        userProfileBtn.classList.remove('active');
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'logout-success-message';
        successMsg.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Logged out successfully</span>
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);
    }
});

// Close auth modal
function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
}

authModalClose.addEventListener('click', closeAuthModal);
authModalOverlay.addEventListener('click', closeAuthModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal.classList.contains('active')) {
        closeAuthModal();
    }
});

// Tab Switching
const authTabs = document.querySelectorAll('.auth-tab');
const authFormContainers = document.querySelectorAll('.auth-form-container');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Update active tab
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding form
        authFormContainers.forEach(container => {
            container.classList.remove('active');
            if (container.id === `${targetTab}Form`) {
                container.classList.add('active');
            }
        });
    });
});

// Password Toggle
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
            `;
        } else {
            input.type = 'password';
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="eye-icon">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
            `;
        }
    });
});

// Password Strength Checker
const signupPasswordInput = document.getElementById('signupPassword');
const passwordStrength = document.getElementById('passwordStrength');

if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', () => {
        const password = signupPasswordInput.value;
        const strengthFill = passwordStrength.querySelector('.strength-fill');
        const strengthText = passwordStrength.querySelector('.strength-text');
        
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        strengthFill.className = 'strength-fill';
        strengthText.className = 'strength-text';
        
        if (password.length === 0) {
            strengthText.textContent = '';
        } else if (strength <= 2) {
            strengthFill.classList.add('weak');
            strengthText.classList.add('weak');
            strengthText.textContent = 'Weak password';
        } else if (strength === 3) {
            strengthFill.classList.add('medium');
            strengthText.classList.add('medium');
            strengthText.textContent = 'Medium password';
        } else {
            strengthFill.classList.add('strong');
            strengthText.classList.add('strong');
            strengthText.textContent = 'Strong password';
        }
    });
}

// Login Form Validation
const loginFormElement = document.getElementById('loginFormElement');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');

function validateLoginEmail() {
    const emailError = document.getElementById('loginEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!loginEmailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        loginEmailInput.classList.add('error');
        loginEmailInput.classList.remove('success');
        return false;
    } else if (!emailRegex.test(loginEmailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        loginEmailInput.classList.add('error');
        loginEmailInput.classList.remove('success');
        return false;
    } else {
        emailError.textContent = '';
        loginEmailInput.classList.remove('error');
        loginEmailInput.classList.add('success');
        return true;
    }
}

function validateLoginPassword() {
    const passwordError = document.getElementById('loginPasswordError');
    
    if (!loginPasswordInput.value) {
        passwordError.textContent = 'Password is required';
        loginPasswordInput.classList.add('error');
        loginPasswordInput.classList.remove('success');
        return false;
    } else if (loginPasswordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        loginPasswordInput.classList.add('error');
        loginPasswordInput.classList.remove('success');
        return false;
    } else {
        passwordError.textContent = '';
        loginPasswordInput.classList.remove('error');
        loginPasswordInput.classList.add('success');
        return true;
    }
}

loginEmailInput.addEventListener('blur', validateLoginEmail);
loginPasswordInput.addEventListener('blur', validateLoginPassword);

loginEmailInput.addEventListener('input', () => {
    if (loginEmailInput.classList.contains('error')) {
        validateLoginEmail();
    }
});

loginPasswordInput.addEventListener('input', () => {
    if (loginPasswordInput.classList.contains('error')) {
        validateLoginPassword();
    }
});

loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();
    
    if (isEmailValid && isPasswordValid) {
        const submitBtn = loginFormElement.querySelector('.btn-auth');
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Demo credentials
            if (email === 'demo@nextweb.com' && password === 'demo123') {
                // Store user session
                const userData = {
                    email: email,
                    name: 'Demo User',
                    loggedIn: true,
                    timestamp: new Date().toISOString()
                };
                
                if (rememberMe) {
                    localStorage.setItem('nextWebUser', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('nextWebUser', JSON.stringify(userData));
                }
                
                // Success
                alert('Login successful! Welcome back.');
                closeAuthModal();
                loginFormElement.reset();
                loginEmailInput.classList.remove('success', 'error');
                loginPasswordInput.classList.remove('success', 'error');
                
                // Update UI to show logged in state
                updateLoginState(true, userData.name);
            } else {
                // Error
                const passwordError = document.getElementById('loginPasswordError');
                passwordError.textContent = 'Invalid email or password';
                loginPasswordInput.classList.add('error');
            }
            
            submitBtn.classList.remove('loading');
        }, 1500);
    }
});

// Signup Form Validation
const signupFormElement = document.getElementById('signupFormElement');
const signupNameInput = document.getElementById('signupName');
const signupEmailInput = document.getElementById('signupEmail');
const signupConfirmPasswordInput = document.getElementById('signupConfirmPassword');
const agreeTermsCheckbox = document.getElementById('agreeTerms');

function validateSignupName() {
    const nameError = document.getElementById('signupNameError');
    
    if (!signupNameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        signupNameInput.classList.add('error');
        signupNameInput.classList.remove('success');
        return false;
    } else if (signupNameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        signupNameInput.classList.add('error');
        signupNameInput.classList.remove('success');
        return false;
    } else {
        nameError.textContent = '';
        signupNameInput.classList.remove('error');
        signupNameInput.classList.add('success');
        return true;
    }
}

function validateSignupEmail() {
    const emailError = document.getElementById('signupEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!signupEmailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        signupEmailInput.classList.add('error');
        signupEmailInput.classList.remove('success');
        return false;
    } else if (!emailRegex.test(signupEmailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        signupEmailInput.classList.add('error');
        signupEmailInput.classList.remove('success');
        return false;
    } else {
        emailError.textContent = '';
        signupEmailInput.classList.remove('error');
        signupEmailInput.classList.add('success');
        return true;
    }
}

function validateSignupPassword() {
    const passwordError = document.getElementById('signupPasswordError');
    const password = signupPasswordInput.value;
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        signupPasswordInput.classList.add('error');
        signupPasswordInput.classList.remove('success');
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        signupPasswordInput.classList.add('error');
        signupPasswordInput.classList.remove('success');
        return false;
    } else {
        passwordError.textContent = '';
        signupPasswordInput.classList.remove('error');
        signupPasswordInput.classList.add('success');
        return true;
    }
}

function validateConfirmPassword() {
    const confirmPasswordError = document.getElementById('signupConfirmPasswordError');
    
    if (!signupConfirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Please confirm your password';
        signupConfirmPasswordInput.classList.add('error');
        signupConfirmPasswordInput.classList.remove('success');
        return false;
    } else if (signupConfirmPasswordInput.value !== signupPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        signupConfirmPasswordInput.classList.add('error');
        signupConfirmPasswordInput.classList.remove('success');
        return false;
    } else {
        confirmPasswordError.textContent = '';
        signupConfirmPasswordInput.classList.remove('error');
        signupConfirmPasswordInput.classList.add('success');
        return true;
    }
}

signupNameInput.addEventListener('blur', validateSignupName);
signupEmailInput.addEventListener('blur', validateSignupEmail);
signupPasswordInput.addEventListener('blur', validateSignupPassword);
signupConfirmPasswordInput.addEventListener('blur', validateConfirmPassword);

signupFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isNameValid = validateSignupName();
    const isEmailValid = validateSignupEmail();
    const isPasswordValid = validateSignupPassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsAgreed = agreeTermsCheckbox.checked;
    
    if (!isTermsAgreed) {
        alert('Please agree to the Terms & Conditions');
        return;
    }
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        const submitBtn = signupFormElement.querySelector('.btn-auth');
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            const userData = {
                name: signupNameInput.value,
                email: signupEmailInput.value,
                loggedIn: true,
                timestamp: new Date().toISOString()
            };
            
            // Store user session
            sessionStorage.setItem('nextWebUser', JSON.stringify(userData));
            
            // Success
            alert('Account created successfully! Welcome to Next Web.');
            closeAuthModal();
            signupFormElement.reset();
            signupNameInput.classList.remove('success', 'error');
            signupEmailInput.classList.remove('success', 'error');
            signupPasswordInput.classList.remove('success', 'error');
            signupConfirmPasswordInput.classList.remove('success', 'error');
            
            // Update UI to show logged in state
            updateLoginState(true, userData.name);
            
            submitBtn.classList.remove('loading');
        }, 1500);
    }
});

// Forgot Password
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginBtn = document.getElementById('backToLogin');
const forgotPasswordFormElement = document.getElementById('forgotPasswordFormElement');

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    authFormContainers.forEach(container => container.classList.remove('active'));
    document.getElementById('forgotPasswordForm').classList.add('active');
});

backToLoginBtn.addEventListener('click', () => {
    authFormContainers.forEach(container => container.classList.remove('active'));
    document.getElementById('loginForm').classList.add('active');
    authTabs.forEach(tab => tab.classList.remove('active'));
    authTabs[0].classList.add('active');
});

forgotPasswordFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resetEmailInput = document.getElementById('resetEmail');
    const resetEmailError = document.getElementById('resetEmailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(resetEmailInput.value.trim())) {
        resetEmailError.textContent = 'Please enter a valid email address';
        resetEmailInput.classList.add('error');
        return;
    }
    
    const submitBtn = forgotPasswordFormElement.querySelector('.btn-auth');
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        alert('Password reset link sent! Please check your email.');
        forgotPasswordFormElement.reset();
        resetEmailInput.classList.remove('success', 'error');
        submitBtn.classList.remove('loading');
        
        // Go back to login
        backToLoginBtn.click();
    }, 1500);
});

// Update Login State
function updateLoginState(isLoggedIn, userName = 'User') {
    // Desktop elements
    if (isLoggedIn) {
        // Hide auth buttons, show user profile dropdown
        authButtons.style.display = 'none';
        userProfileDropdown.style.display = 'block';
        userNameDisplay.textContent = userName;
    } else {
        // Show auth buttons, hide user profile dropdown
        authButtons.style.display = 'flex';
        userProfileDropdown.style.display = 'none';
    }
    
    // Mobile elements
    const mobileUserProfile = document.getElementById('mobileUserProfile');
    const mobileProfileIcon = document.getElementById('mobileProfileIcon');
    const mobileUserName = document.getElementById('mobileUserName');
    
    if (mobileUserProfile && mobileProfileIcon && mobileUserName) {
        if (isLoggedIn) {
            mobileUserProfile.style.display = 'flex';
            mobileProfileIcon.style.display = 'none';
            mobileUserName.textContent = userName;
        } else {
            mobileUserProfile.style.display = 'none';
            mobileProfileIcon.style.display = 'flex';
        }
    }
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('nextWebUser') || sessionStorage.getItem('nextWebUser');
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        updateLoginState(true, userData.name);
    }
});
