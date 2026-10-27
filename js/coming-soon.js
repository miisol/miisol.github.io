// Coming soon page behaviour

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Check if the page was accessed from Cloud DevOps AI Agent section
function checkSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    
    if (source === 'cloud-devops-agent') {
        // Hide default content and show hero section
        document.getElementById('default-content').style.display = 'none';
        document.getElementById('hero-content').classList.add('active');
        
        // Update page title
        document.title = 'Cloud DevOps AI Agent - Intelligent DevOps Automation';
        
        // Initialize logo cloud features
        setTimeout(() => {
            initSparkles();
            addSparklesInteraction();
            addLogoCloudEffects();
            handleSparklesResize();
        }, 100);
    } else {
        // Show default content and hide hero section
        document.getElementById('default-content').style.display = 'flex';
        document.getElementById('hero-content').classList.remove('active');
    }
}

// Add scroll animations
function addScrollAnimations() {
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-props, .capabilities');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Sparkles animation system for logo cloud
class SparklesSystem {
    constructor(containerId, particleCount = 100) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.particles = [];
        this.particleCount = particleCount;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize sparkles system
function initSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
        new SparklesSystem('sparkles', 80);
    }
}

// Add mouse interaction for sparkles
function addSparklesInteraction() {
    const sparkles = document.getElementById('sparkles');
    if (!sparkles) return;

    document.addEventListener('mousemove', (e) => {
        const rect = sparkles.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        sparkles.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(5, 114, 171, 0.1), transparent 50%)`;
    });
}

// Add hover effects to logo cloud logos
function addLogoCloudEffects() {
    document.querySelectorAll('.cloud-provider-icon').forEach(logo => {
        // Set initial stable state to prevent flickering
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'brightness(1)';
        
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.1)';
            logo.style.filter = 'brightness(1.3)';
            logo.style.opacity = '1';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
            logo.style.filter = 'brightness(1)';
            logo.style.opacity = '0.8';
        });
    });
}

// Handle responsive sparkles
function handleSparklesResize() {
    window.addEventListener('resize', () => {
        // Recreate sparkles system on resize for better performance
        const existingParticles = document.querySelectorAll('.particle');
        existingParticles.forEach(p => p.remove());
        
        // Re-initialize with smaller particle count on mobile
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 50 : 80;
        new SparklesSystem('sparkles', particleCount);
    });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Button actions (inline onclick handlers are blocked by the CSP)
    document.querySelectorAll('[data-action="back"]').forEach((button) => {
        button.addEventListener('click', () => window.history.back());
    });
    document.querySelectorAll('[data-scroll-to]').forEach((button) => {
        button.addEventListener('click', () => scrollToSection(button.dataset.scrollTo));
    });

    checkSource();
    addScrollAnimations();
    
    // Initialize logo cloud features only when hero content is active
    const heroContent = document.getElementById('hero-content');
    if (heroContent && heroContent.classList.contains('active')) {
        initSparkles();
        addSparklesInteraction();
        addLogoCloudEffects();
        handleSparklesResize();
    }
});
