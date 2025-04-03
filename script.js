document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.classList.add('cursor');
    cursorFollower.classList.add('cursor-follower');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to cursor follower for nice effect
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Make cursor larger when hovering over links and buttons
    const hoverElements = document.querySelectorAll('a, button, .btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.border = '1px solid var(--primary-color)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.border = '1px solid var(--primary-light)';
        });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Sticky navigation
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling down
        if (scrollTop > 0) {
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.top = '-100px';
        } else {
            navbar.style.top = '0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('#navbar ul');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        // Change toggle icon
        if (menuToggle.innerHTML === '<i class="fas fa-bars"></i>') {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#navbar') && !e.target.closest('.menu-toggle')) {
            navList.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navList.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active link highlighting while scrolling
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillValue = skillBar.getAttribute('data-skill-value');
                
                skillBar.style.width = skillValue + '%';
                
                // Stop observing after animation
                observer.unobserve(skillBar);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });
    
    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
    
    // Animate timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Form validation and animation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Handle label animation
            input.addEventListener('focus', function() {
                this.setAttribute('data-focused', 'true');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.removeAttribute('data-focused');
                }
            });
        });
        
        // Form submission with validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error class
                    setTimeout(() => {
                        input.classList.remove('error');
                    }, 1000);
                }
            });
            
            if (isValid) {
                // Add success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success');
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Here you would normally send the form data to a server
                console.log('Form submitted successfully');
            }
        });
    }
    
    // Particles background for hero section
    const particles = document.querySelector('.particles');
    
    if (particles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position, size and animation duration
            const size = Math.random() * 5 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 10 + 5 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particles.appendChild(particle);
        }
    }
    
    // Add the missing CSS for particles and animations
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: var(--primary-light);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: float 10s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(15px);
            }
            50% {
                transform: translateY(15px) translateX(-15px);
            }
            75% {
                transform: translateY(-15px) translateX(-30px);
            }
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            animation: shake 0.5s linear;
            border-color: #ff6b6b !important;
        }
        
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
        }
        
        .form-success {
            background-color: var(--success-color);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Glitch effect animation
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });
    
    // Initialize any data attributes needed for skill bars
    document.querySelectorAll('.skill-level').forEach(skill => {
        if (!skill.getAttribute('data-skill-value')) {
            // Extract width percentage from inline style if exists
            const styleWidth = skill.style.width;
            if (styleWidth) {
                const value = parseInt(styleWidth);
                skill.setAttribute('data-skill-value', value);
                // Reset width to 0 for animation
                skill.style.width = '0%';
            } else {
                // Default value if none specified
                skill.setAttribute('data-skill-value', '75');
                skill.style.width = '0%';
            }
        }
    });
});
