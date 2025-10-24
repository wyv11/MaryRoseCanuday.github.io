document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initTypewriterEffect();
    initScrollReveal();
    initSmoothScroll();
    initFormValidation();
    initActiveNavLink();
});

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
        
        darkModeToggle.style.animation = 'none';
        setTimeout(() => {
            darkModeToggle.style.animation = '';
        }, 10);
    });
}

function updateDarkModeIcon(theme) {
    const icon = document.querySelector('#darkModeToggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initTypewriterEffect() {
    const text = "Dreams big, naps bigger. 💤";
    const typewriterElement = document.getElementById('typewriterText');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            nameError.textContent = 'Please enter your name';
            nameInput.style.borderColor = '#ef4444';
            return false;
        } else if (nameValue.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#ef4444';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#10b981';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            emailError.textContent = 'Please enter your email';
            emailInput.style.borderColor = '#ef4444';
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#ef4444';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#10b981';
            return true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            messageError.textContent = 'Please enter a message';
            messageInput.style.borderColor = '#ef4444';
            return false;
        } else if (messageValue.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#ef4444';
            return false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = '#10b981';
            return true;
        }
    }
    
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
            validateName();
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '') {
            validateEmail();
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            validateMessage();
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            formSuccess.classList.add('show');
            
            setTimeout(() => {
                form.reset();
                nameInput.style.borderColor = 'var(--border-color)';
                emailInput.style.borderColor = 'var(--border-color)';
                messageInput.style.borderColor = 'var(--border-color)';
            }, 500);
            
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
            
            console.log('Form submitted successfully!');
            console.log({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .lightbox-close:hover {
                transform: scale(1.2);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.head.removeChild(style);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
            }
        });
    });
});
