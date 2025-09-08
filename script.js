const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.book-details, .author-content, .testimonials-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const name = this.querySelector('input[type="text"]').value;
        const button = this.querySelector('button');
        
        if (email && email.includes('@') && name) {
            button.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
            button.style.background = '#4ecdc4';
            this.reset();
            
            showNotification('¡Gracias! Te notificaremos cuando el libro esté disponible.', 'success');
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-bell"></i> Suscribirme';
                button.style.background = '#ff6b6b';
            }, 3000);
        } else {
            button.innerHTML = '<i class="fas fa-exclamation"></i> Datos inválidos';
            button.style.background = '#e74c3c';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-bell"></i> Suscribirme';
                button.style.background = '#ff6b6b';
            }, 2000);
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            }
            
            .notification-success {
                border-left: 4px solid #28a745;
            }
            
            .notification-info {
                border-left: 4px solid #17a2b8;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }
            
            .notification-content i {
                color: #28a745;
                font-size: 1.2rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 0;
                font-size: 1rem;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const bookCover = document.querySelector('.book-cover');
    if (bookCover) {
        bookCover.addEventListener('mouseenter', () => {
            bookCover.style.transform = 'rotateY(10deg) rotateX(5deg) scale(1.05)';
        });
        
        bookCover.addEventListener('mouseleave', () => {
            bookCover.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const authorName = document.querySelector('.author-name');
    if (authorName) {
        const originalText = authorName.innerHTML;
        setTimeout(() => {
            typeWriter(authorName, originalText, 100);
        }, 1000);
    }
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    if (window.innerWidth <= 768 && testimonials.length > 1) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }
}

window.addEventListener('load', initTestimonialCarousel);
window.addEventListener('resize', initTestimonialCarousel);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('¡Código Konami activado! 🎉 ¡Disfruta de la página!', 'success');
        konamiCode = [];
        
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        const rainbowStyles = document.createElement('style');
        rainbowStyles.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyles);
    }
});

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// WhatsApp Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn && whatsappFloat) {
        // Add click tracking
        whatsappBtn.addEventListener('click', (e) => {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
            
            // Add a small animation on click
            whatsappBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                whatsappBtn.style.transform = '';
            }, 150);
        });
        
        // Show/hide button based on scroll position
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0.7';
            } else {
                // Scrolling up
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add entrance animation
        setTimeout(() => {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.transform = 'translateY(50px) scale(0.8)';
            whatsappFloat.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, 2000);
        
        // Add hover effects
        whatsappFloat.addEventListener('mouseenter', () => {
            whatsappFloat.style.transform = 'scale(1.05)';
        });
        
        whatsappFloat.addEventListener('mouseleave', () => {
            whatsappFloat.style.transform = 'scale(1)';
        });
    }
});

// WhatsApp message pre-fill functionality
function openWhatsApp(message = '') {
    const phoneNumber = '5493872284822';
    const defaultMessage = message || 'Hola! Me interesa saber más sobre el libro "TIERRALIBRE: LA OTRA CAUSA..." de Vinicio Fornari.';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}
