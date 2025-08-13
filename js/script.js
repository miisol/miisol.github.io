// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenuToggle && mobileMenu) {
        // Touch-friendly toggle with better event handling
        const toggleMenu = () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when mobile menu is open
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        };

        // Click event for desktop
        mobileMenuToggle.addEventListener('click', toggleMenu);
        
        // Touch events for mobile
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        mobileMenuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = '';
            toggleMenu();
        });



        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                mobileMenuToggle.focus();
            }
        });
        
        // Prevent scroll on mobile when menu is open
        mobileMenu.addEventListener('touchmove', function(e) {
            if (this.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

// Smooth scroll for navigation links (both desktop and mobile)
document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Set active state on click
        setActiveNavLink(targetId);

        // Close mobile menu when a link is clicked
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Helper to set active class on nav links matching a target hash
function setActiveNavLink(hash) {
    const allLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    allLinks.forEach(a => a.classList.remove('active'));
    allLinks.forEach(a => {
        if (a.getAttribute('href') === hash) {
            a.classList.add('active');
        }
    });
}

// Observe sections to update active nav link on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sectionMap = [
        '#home',
        '#what-we-do',
        '#technologies',
        '#ai-platform',
        '#contact'
    ].map(hash => ({ hash, el: document.querySelector(hash) })).filter(s => s.el);

    if (sectionMap.length === 0) return;

    const scrollObserver = new IntersectionObserver((entries) => {
        // Pick the entry most in view
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = sectionMap.find(s => s.el === visible.target);
        if (match) {
            setActiveNavLink(match.hash);
        }
    }, {
        root: null,
        threshold: [0.5, 0.75, 1]
    });

    sectionMap.forEach(s => scrollObserver.observe(s.el));

    // Initialize based on current scroll position
    const init = sectionMap.find(s => {
        const r = s.el.getBoundingClientRect();
        return r.top <= window.innerHeight * 0.33 && r.bottom >= window.innerHeight * 0.33;
    }) || sectionMap[0];
    setActiveNavLink(init.hash);
});

// Handle connect button click
function handleConnect() {
    // Add your connection logic here
    alert('Let\'s connect! This would typically open a contact form or redirect to a contact page.');
}

// Toggle switch functionality
document.querySelectorAll('.toggle-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all options in the same toggle
        const toggleSwitch = this.parentElement;
        toggleSwitch.querySelectorAll('.toggle-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        this.classList.add('active');
    });
});

// Service card hover animations
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate statistics on scroll
const animateStats = () => {
    const statsSection = document.querySelector('.stats-section');
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Animate the numbers
        const projectsNumber = document.querySelector('.projects-number');
        const experienceNumber = document.querySelector('.stat-content h4');
        
        if (!projectsNumber.classList.contains('animated')) {
            projectsNumber.classList.add('animated');
            animateNumber(projectsNumber, 50, '+');
        }
    }
};

// Number animation function
function animateNumber(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Intersection Observer for animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .learn-more, .service-card, .stat-item, .design-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // Trigger animations after a short delay
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);

    // Add scroll listener for stats animation
    window.addEventListener('scroll', animateStats);

    // Technology Solutions Section Interaction (exact behavior from new/index.html)
    const techSectionList = document.querySelector('.tech-solutions-section ul');
    if (techSectionList) {
        const techItems = techSectionList.querySelectorAll('li');

        const setIndex = (event) => {
            const closest = event.target.closest('li');
            if (closest) {
                const index = [...techItems].indexOf(closest);
                const cols = new Array(techSectionList.children.length)
                    .fill()
                    .map((_, i) => {
                        techItems[i].dataset.active = (index === i).toString();
                        return index === i ? '10fr' : '1fr';
                    })
                    .join(' ');
                techSectionList.style.setProperty('grid-template-columns', cols);
            }
        };

        techSectionList.addEventListener('focus', setIndex, true);
        techSectionList.addEventListener('click', setIndex);
        techSectionList.addEventListener('pointermove', setIndex);

        const resync = () => {
            const w = Math.max(
                ...[...techItems].map((i) => i.offsetWidth)
            );
            techSectionList.style.setProperty('--article-width', w);
        };

        window.addEventListener('resize', resync);
        resync();
    }

    // Initialize Flip Cards
    initializeFlipCards();
    
    // Initialize Meshy Cards
    initializeMeshyCards();
    
    // Add touch support for learn-more button animation on mobile
    const learnMoreButton = document.querySelector('.learn-more');
    if (learnMoreButton) {
        let touchStartTime = 0;
        let touchEndTime = 0;
        
        // Touch events for mobile
        learnMoreButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            touchStartTime = Date.now();
            this.classList.add('touch-active');
        });
        
        learnMoreButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            touchEndTime = Date.now();
            
            // Only trigger animation if it's a quick tap (not a long press)
            if (touchEndTime - touchStartTime < 500) {
                this.classList.add('touch-active');
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 600);
            } else {
                this.classList.remove('touch-active');
            }
        });
        
        // Touch cancel event
        learnMoreButton.addEventListener('touchcancel', function(e) {
            e.preventDefault();
            this.classList.remove('touch-active');
        });
        
        // Mouse events for desktop
        learnMoreButton.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        learnMoreButton.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
        
        // Click event for additional mobile support
        learnMoreButton.addEventListener('click', function(e) {
            // Add a brief animation trigger for click
            this.classList.add('touch-active');
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    }
});

// Flip Card Component Class
class CardFlip {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.isFlipped = false;
        
        // Default options
        this.options = {
            title: options.title || 'Service Title',
            subtitle: options.subtitle || 'Service description here',
            description: options.description || 'Detailed service description will go here.',
            features: options.features || [
                'Feature 1',
                'Feature 2',
                'Feature 3',
                'Feature 4'
            ],
            ...options
        };

        this.init();
    }

    init() {
        this.updateContent();
        this.generateCodeLines();
        this.generateFeatures();
        this.bindEvents();
    }

    updateContent() {
        // Update front card content
        const frontTitle = this.container.querySelector('.title');
        const frontSubtitle = this.container.querySelector('.subtitle');
        
        if (frontTitle) frontTitle.textContent = this.options.title;
        if (frontSubtitle) frontSubtitle.textContent = this.options.subtitle;
        
        // Update back card content
        const backTitle = this.container.querySelector('.back-title');
        const backDescription = this.container.querySelector('.description');
        
        if (backTitle) backTitle.style.display = 'none'; // Hide duplicate title
        if (backDescription) backDescription.textContent = this.options.description;
    }

    generateCodeLines() {
        const codeContainer = this.container.querySelector('.code-container');
        
        if (codeContainer) {
            // Generate 6 animated code lines
            for (let i = 0; i < 6; i++) {
                const codeLine = document.createElement('div');
                codeLine.className = 'code-line';
                codeLine.style.width = `${60 + Math.random() * 40}%`;
                codeLine.style.animationDelay = `${i * 0.2}s`;
                codeLine.style.marginLeft = `${Math.random() * 20}%`;
                
                // Insert before rocket icon
                const rocketIcon = codeContainer.querySelector('.rocket-icon');
                if (rocketIcon) {
                    codeContainer.insertBefore(codeLine, rocketIcon);
                }
            }
        }
    }

    generateFeatures() {
        const featuresList = this.container.querySelector('.features-list');
        if (!featuresList) return;
        
        const icons = [
            // Check icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>',
            // Star icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>',
            // Code icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>',
            // Chip icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>',
            // Cog icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>',
            // Database icon
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>'
        ];

        // Only show first 4 features to fit in the card space
        const displayFeatures = this.options.features.slice(0, 4);
        
        displayFeatures.forEach((feature, index) => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.style.transitionDelay = `${index * 100 + 200}ms`;
            
            featureItem.innerHTML = `
                <div class="feature-icon-container">
                    <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${icons[index % icons.length]}
                    </svg>
                </div>
                <span class="feature-text">${feature}</span>
            `;
            
            featuresList.appendChild(featureItem);
        });
    }

    bindEvents() {
        if (!this.container) {
            return;
        }
        
        // Desktop hover
        this.container.addEventListener('mouseenter', () => this.flip(true));
        this.container.addEventListener('mouseleave', () => this.flip(false));

        // Mobile/touch and general click: toggle flip on tap/click
        const toggleFlip = (e) => {
            // Avoid unintended text selection or following links inside
            e.preventDefault();
            this.flip(!this.isFlipped);
        };

        // Use pointer events when available, fallback to click
        this.container.addEventListener('click', toggleFlip);
        this.container.addEventListener('touchstart', toggleFlip, { passive: false });
    }

    flip(shouldFlip) {
        this.isFlipped = shouldFlip;
        
        if (shouldFlip) {
            this.container.classList.add('flipped');
        } else {
            this.container.classList.remove('flipped');
        }
    }

    // Public method to update content
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.updateContent();
        
        // Regenerate features if they changed
        if (newOptions.features) {
            const featuresList = this.container.querySelector('.features-list');
            if (featuresList) {
                featuresList.innerHTML = '';
                this.generateFeatures();
            }
        }
    }
}

// Initialize all flip cards
function initializeFlipCards() {
    // Default configurations for each card
    const cardConfigs = [
        {
            id: 'cardFlip1',
            title: 'AI & Machine Learning',
            subtitle: 'Intelligent automation and predictive analytics',
            description: 'Advanced AI systems with LLMs, agentic frameworks, and modern standards for intelligent automation.',
            features: ['LangGraph & AutoGen', 'MCP & A2A', 'LLM Integration', 'Agentic AI']
        },
        {
            id: 'cardFlip2',
            title: 'Cloud-Native Systems',
            subtitle: 'Scalable microservices and container orchestration',
            description: 'Modern cloud architectures with Kubernetes, containerization, and CNCF-compliant solutions.',
            features: ['Public Cloud', 'Private Cloud', 'Hybrid Cloud', 'Kubernetes', 'Containerization', 'CNCF']
        },
        {
            id: 'cardFlip3',
            title: 'Modern Development',
            subtitle: 'Full-stack development with cutting-edge technologies',
            description: 'API-first architecture, microservices, and serverless computing for high-performance applications.',
            features: ['Python', 'Node.js', 'Next.js', 'React', 'Supabase', 'Vercel']
        },
        {
            id: 'cardFlip4',
            title: 'DevOps & SecOps',
            subtitle: 'Automated CI/CD pipelines and security integration',
            description: 'Automated pipelines, Infrastructure as Code, and GitOps workflows for secure deployments.',
            features: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'ArgoCD', 'Helm', 'Ansible']
        },
        {
            id: 'cardFlip5',
            title: 'Monitoring & Security',
            subtitle: 'Comprehensive observability and security solutions',
            description: 'Enterprise observability, security monitoring, and compliance frameworks for production systems.',
            features: ['Prometheus', 'Grafana', 'ELK Stack', 'SonarQube', 'Vault', 'Istio']
        },
        {
            id: 'cardFlip6',
            title: 'Green IT & Sustainability',
            subtitle: 'Sustainable technology and energy-efficient solutions',
            description: 'Carbon-efficient computing, sustainable architecture, and ESG compliance for responsible technology.',
            features: ['Carbon Monitoring', 'Energy Efficiency', 'Sustainable Design', 'ESG Compliance']
        }
    ];

    // Initialize each card
    cardConfigs.forEach(config => {
        const element = document.getElementById(config.id);
        if (element) {
            new CardFlip(config.id, {
                title: config.title,
                subtitle: config.subtitle,
                description: config.description,
                features: config.features
            });
        }
    });
}

// Initialize Meshy Cards for AI Discovery Platform
function initializeMeshyCards() {
    const meshyCards = document.querySelectorAll('.meshy-card');
    
    if (meshyCards.length === 0) return;
    
    // Add click handlers for meshy cards
    meshyCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const titles = ['Solution Discovery', 'Proof of Concept', 'Rapid Implementation'];
            const title = titles[index] || 'AI Solution';
            
            // Add ripple effect
            createRippleEffect(card, event);
            
            // You can add more click handling logic here
            console.log(`Clicked on ${title} card`);
        });

        // Add hover effect enhancements
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize intersection observer for scroll animations
    const meshyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    meshyCards.forEach(card => {
        meshyObserver.observe(card);
    });

    // Initialize category items hover effects
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            createRippleEffect(item, event);
            console.log(`Clicked on category: ${item.textContent}`);
        });
    });

    // Initialize platform access button
    const platformBtn = document.querySelector('.platform-access-btn');
    if (platformBtn) {
        platformBtn.addEventListener('click', function() {
            createRippleEffect(platformBtn, event);
            // Add your platform access logic here
            console.log('Platform access requested');
        });
    }
}

// Create ripple effect for buttons and cards
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple animation CSS if not already present
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
			contactForm.addEventListener('submit', function(e) {
				const isFormspree = this.action && this.action.includes('formspree.io');
				if (isFormspree) {
					return; // allow normal submission to Formspree
				}
				e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
				const company = formData.get('company');
				const requirements = formData.get('requirements');
            
            // Basic validation
            if (!fullName || !email || !requirements) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            showFormSuccess();
            
            // Reset form
            this.reset();
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form success message
function showFormSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Change button text and style
    submitBtn.querySelector('span').textContent = 'Message Sent!';
    submitBtn.style.background = '#10b981';
    submitBtn.disabled = true;
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}

// Smooth scroll for footer links (ignore disabled)
document.querySelectorAll('.footer-column a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.classList.contains('disabled-link')) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Card Swap Component - Vanilla JS version with GSAP
class CardSwap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn(`CardSwap: Container with ID "${containerId}" not found`);
            return;
        }

        // Default options
        this.options = {
            width: 400,
            height: 300,
            cardDistance: 60,
            verticalDistance: 70,
            delay: 5000,
            pauseOnHover: true,
            skewAmount: 6,
            easing: 'elastic',
            ...options
        };

        // Animation configuration
        this.config = this.options.easing === 'elastic' ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
        } : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
        };

        this.cards = Array.from(this.container.querySelectorAll('.tech-card'));
        this.order = Array.from({ length: this.cards.length }, (_, i) => i);
        this.timeline = null;
        this.interval = null;
        this.isPaused = false;

        this.init();
    }

    init() {
        if (this.cards.length < 2) {
            console.warn('CardSwap: At least 2 cards required for swapping animation');
            return;
        }

        // Set container dimensions
        this.container.style.width = `${this.options.width}px`;
        this.container.style.height = `${this.options.height}px`;

        // Initialize card positions
        this.cards.forEach((card, i) => {
            this.placeCard(card, this.makeSlot(i));
        });

        // Start animation cycle
        this.startAnimation();

        // Note: Mouse interactions disabled to prevent animation disruption
    }

    makeSlot(index) {
        const total = this.cards.length;
        return {
            x: index * this.options.cardDistance,
            y: -index * this.options.verticalDistance,
            z: -index * this.options.cardDistance * 1.5,
            zIndex: total - index
        };
    }

    placeCard(card, slot) {
        gsap.set(card, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            xPercent: -50,
            yPercent: -50,
            skewY: this.options.skewAmount,
            transformOrigin: "center center",
            zIndex: slot.zIndex,
            force3D: true
        });
    }

    swap() {
        if (this.order.length < 2 || this.isPaused) return;

        const [front, ...rest] = this.order;
        const frontCard = this.cards[front];
        const tl = gsap.timeline();
        this.timeline = tl;

        // Drop the front card
        tl.to(frontCard, {
            y: "+=500",
            duration: this.config.durDrop,
            ease: this.config.ease
        });

        // Promote remaining cards
        tl.addLabel("promote", `-=${this.config.durDrop * this.config.promoteOverlap}`);
        rest.forEach((cardIndex, i) => {
            const card = this.cards[cardIndex];
            const slot = this.makeSlot(i);
            tl.set(card, { zIndex: slot.zIndex }, "promote");
            tl.to(card, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: this.config.durMove,
                ease: this.config.ease
            }, `promote+=${i * 0.15}`);
        });

        // Return front card to back
        const backSlot = this.makeSlot(this.cards.length - 1);
        tl.addLabel("return", `promote+=${this.config.durMove * this.config.returnDelay}`);
        tl.call(() => {
            gsap.set(frontCard, { zIndex: backSlot.zIndex });
        }, undefined, "return");
        tl.set(frontCard, { x: backSlot.x, z: backSlot.z }, "return");
        tl.to(frontCard, {
            y: backSlot.y,
            duration: this.config.durReturn,
            ease: this.config.ease
        }, "return");

        // Update order
        tl.call(() => {
            this.order = [...rest, front];
        });
    }

    startAnimation() {
        // Initial swap
        setTimeout(() => this.swap(), 1000);
        
        // Set up interval
        this.interval = setInterval(() => {
            this.swap();
        }, this.options.delay);
    }

    setupHoverEvents() {
        const pauseAnimation = () => {
            this.isPaused = true;
            if (this.timeline) {
                this.timeline.pause();
            }
            if (this.interval) {
                clearInterval(this.interval);
            }
        };

        const resumeAnimation = () => {
            this.isPaused = false;
            if (this.timeline) {
                this.timeline.play();
            }
            this.interval = setInterval(() => {
                this.swap();
            }, this.options.delay);
        };

        this.container.addEventListener('mouseenter', pauseAnimation);
        this.container.addEventListener('mouseleave', resumeAnimation);
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.timeline) {
            this.timeline.kill();
        }
    }
}

// Initialize Card Swap on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CardSwap if container exists
    const cardSwapContainer = document.getElementById('cardSwapContainer');
    if (cardSwapContainer) {
        // Get responsive values based on screen size
        const isMobile = window.innerWidth <= 480;
        const isTablet = window.innerWidth <= 768;
        
        let width, height, cardDistance, verticalDistance;
        
        if (isMobile) {
            width = Math.min(window.innerWidth * 0.82, 240);
            height = width * 1.33; // 3:4 aspect ratio (shorter)
            cardDistance = 30;
            verticalDistance = 35;
        } else if (isTablet) {
            width = Math.min(window.innerWidth * 0.85, 280);
            height = width * 1.25; // 4:5 aspect ratio (shorter)
            cardDistance = 40;
            verticalDistance = 45;
        } else {
            width = 450;
            height = 350;
            cardDistance = 60;
            verticalDistance = 70;
        }
        
        const cardSwapInstance = new CardSwap('cardSwapContainer', {
            width: width,
            height: height,
            cardDistance: cardDistance,
            verticalDistance: verticalDistance,
            delay: 5000,
            pauseOnHover: false,
            skewAmount: isMobile ? 3 : 6,
            easing: 'elastic'
        });

        // Handle window resize for responsive behavior
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                location.reload(); // Simple solution: reload on resize for proper recalculation
            }, 250);
        });
    }
});
