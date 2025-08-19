// Design Card JavaScript functionality
class DesignCard {
    constructor() {
        this.sections = [
            { 
                text: "Discover", 
                bgImage: "assets/images/discover.jpg",
                color: "from-blue-600 to-blue-800"
            },
            { 
                text: "Design", 
                bgImage: "assets/images/design.jpg",
                color: "from-purple-600 to-purple-800"
            },
            { 
                text: "Develop", 
                bgImage: "assets/images/develop.jpg",
                color: "from-green-600 to-green-800"
            },
            { 
                text: "Deploy", 
                bgImage: "assets/images/deploy.jpg",
                color: "from-orange-600 to-orange-800"
            }
        ];
        
        this.hoveredSection = null;
        this.mousePosition = { x: 50, y: 50 }; // Use percentage for responsiveness
        
        this.init();
    }
    
    init() {
        this.cardElement = document.getElementById('designCard');
        this.dynamicBackground = document.getElementById('dynamicBackground');
        this.iceGlassOverlay = document.getElementById('iceGlassOverlay');
        this.sectionElements = document.querySelectorAll('#designCard .section');
        
        if (this.cardElement) {
            this.attachEventListeners();
            this.preloadImages();
        }
    }
    
    preloadImages() {
        // Preload all background images for smooth transitions
        this.sections.forEach(section => {
            const img = new Image();
            img.src = section.bgImage;
        });
    }
    
    attachEventListeners() {
        // Mouse move tracking for ice glass effect
        this.cardElement.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        // Section hover events
        this.sectionElements.forEach((section, index) => {
            section.addEventListener('mouseenter', () => {
                this.handleSectionHover(index);
            });
            
            section.addEventListener('mouseleave', () => {
                this.handleSectionLeave(index);
            });
        });
        
        // Card leave event to reset everything
        this.cardElement.addEventListener('mouseleave', () => {
            this.resetCard();
        });
    }
    
    handleMouseMove(e) {
        const rect = this.cardElement.getBoundingClientRect();
        this.mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        this.updateIceGlassEffect();
    }
    
    updateIceGlassEffect() {
        const { x, y } = this.mousePosition;
        if (this.iceGlassOverlay) {
            this.iceGlassOverlay.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.05) 40%, 
                transparent 70%)`;
        }
    }
    
    handleSectionHover(index) {
        this.hoveredSection = index;
        
        // Update dynamic background
        if (this.dynamicBackground) {
            this.dynamicBackground.style.backgroundImage = `url(${this.sections[index].bgImage})`;
            this.dynamicBackground.classList.add('active');
        }
        
        // Add hover class to current section
        this.sectionElements[index].classList.add('hovered');
        
        // Trigger ice sliding effect
        const iceEffect = this.sectionElements[index].querySelector('.ice-sliding-effect');
        if (iceEffect) {
            iceEffect.style.transform = 'translateX(100%)';
            iceEffect.style.transitionDelay = '0.1s';
        }
    }
    
    handleSectionLeave(index) {
        // Reset ice sliding effect
        const iceEffect = this.sectionElements[index].querySelector('.ice-sliding-effect');
        if (iceEffect) {
            iceEffect.style.transform = 'translateX(-100%)';
            iceEffect.style.transitionDelay = '0s';
        }
        
        // Remove hover class
        this.sectionElements[index].classList.remove('hovered');
        
        // Small delay before potentially hiding dynamic background
        setTimeout(() => {
            if (this.hoveredSection === index) {
                this.hoveredSection = null;
                if (this.dynamicBackground) {
                    this.dynamicBackground.classList.remove('active');
                }
            }
        }, 50);
    }
    
    resetCard() {
        this.hoveredSection = null;
        if (this.dynamicBackground) {
            this.dynamicBackground.classList.remove('active');
        }
        
        // Reset all sections
        this.sectionElements.forEach((section, index) => {
            section.classList.remove('hovered');
            const iceEffect = section.querySelector('.ice-sliding-effect');
            if (iceEffect) {
                iceEffect.style.transform = 'translateX(-100%)';
                iceEffect.style.transitionDelay = '0s';
            }
        });
        
        // Reset mouse position to center (using card dimensions)
        if (this.cardElement) {
            const rect = this.cardElement.getBoundingClientRect();
            this.mousePosition = { x: rect.width / 2, y: rect.height / 2 };
            this.updateIceGlassEffect();
        }
    }
}

// Additional utility functions for enhanced effects
function addRippleEffectToCard(element, e) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize the design card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DesignCard();
    
    // Add click ripple effect to sections
    const designCardSections = document.querySelectorAll('#designCard .section');
    designCardSections.forEach(section => {
        section.addEventListener('click', (e) => {
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            addRippleEffectToCard(section, e);
        });
    });
});
