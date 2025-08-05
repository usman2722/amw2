// Fire Safety Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Back to Top Button Click Functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        console.log('Back to top button found:', backToTopButton);
        
        // Initial check for back to top button
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'flex';
            console.log('Initial: Showing back to top button');
        }
        
        // Enhanced click event listener
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Back to top button clicked!');
            
            // Try multiple scroll methods for better compatibility
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log('Smooth scroll initiated');
            } catch (error) {
                console.log('Smooth scroll failed, using instant scroll');
                window.scrollTo(0, 0);
            }
        });
        
        // Also add onclick attribute as backup
        backToTopButton.onclick = function(e) {
            e.preventDefault();
            console.log('Back to top onclick triggered');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        
    } else {
        console.log('Back to top button NOT found!');
    }
    
    // Mobile Navbar Toggle Fix
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Ensure proper Bootstrap toggle functionality
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                navbarCollapse.classList.remove('show');
            } else {
                navbarCollapse.classList.add('show');
            }
        });
        
        // Close menu when clicking on nav links (mobile only)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) { // Only on mobile
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 992) { // Only on mobile
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    
    // Mobile Dropdown Management - Prevent hover on mobile, only allow click
    function initMobileDropdownManagement() {
        const isMobile = window.innerWidth <= 768;
        const facilityManagementDropdown = document.querySelector('.nav-item.dropdown');
        
        if (facilityManagementDropdown) {
            const dropdownMenu = facilityManagementDropdown.querySelector('.dropdown-menu');
            const dropdownToggle = facilityManagementDropdown.querySelector('.nav-link');
            const navbarCollapseElement3 = document.querySelector('.navbar-collapse');
            
            if (isMobile) {
                // Remove hover events on mobile
                facilityManagementDropdown.removeEventListener('mouseenter', showDropdown);
                facilityManagementDropdown.removeEventListener('mouseleave', hideDropdown);
                
                // Add click event for mobile
                dropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Prevent Bootstrap from closing the mobile menu
                    if (navbarCollapseElement3) {
                        navbarCollapseElement3.classList.add('show');
                        navbarCollapseElement3.style.display = 'block';
                    }
                    
                    // Toggle dropdown visibility
                    if (dropdownMenu.classList.contains('show')) {
                        hideDropdown();
                    } else {
                        showDropdown();
                    }
                });
                
                // Handle submenu toggles on mobile
                const submenuToggles = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
                submenuToggles.forEach(toggle => {
                    toggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const submenu = this.nextElementSibling;
                        const isExpanded = this.getAttribute('aria-expanded') === 'true';
                        
                        console.log('Submenu toggle clicked:', this.textContent);
                        console.log('Current expanded state:', isExpanded);
                        console.log('Submenu element:', submenu);
                        
                        // Close other submenus
                        submenuToggles.forEach(otherToggle => {
                            if (otherToggle !== this) {
                                otherToggle.setAttribute('aria-expanded', 'false');
                                const otherSubmenu = otherToggle.nextElementSibling;
                                if (otherSubmenu) {
                                    otherSubmenu.classList.remove('show');
                                    console.log('Closed other submenu:', otherToggle.textContent);
                                }
                            }
                        });
                        
                        // Toggle current submenu
                        this.setAttribute('aria-expanded', !isExpanded);
                        if (submenu) {
                            if (isExpanded) {
                                submenu.classList.remove('show');
                                console.log('Submenu closed:', this.textContent);
                            } else {
                                submenu.classList.add('show');
                                console.log('Submenu opened:', this.textContent);
                            }
                        } else {
                            console.error('Submenu element not found for:', this.textContent);
                        }
                    });
                });
                
                // Prevent mobile menu from closing when clicking dropdown items
                dropdownMenu.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!facilityManagementDropdown.contains(e.target)) {
                        hideDropdown();
                    }
                });
                
                // Handle submenu toggles on mobile (Hard FM and Soft FM)
                const submenuToggles2 = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
                console.log('Found submenu toggles:', submenuToggles2.length);
                
                submenuToggles2.forEach((toggle, index) => {
                    console.log(`Setting up toggle ${index}:`, toggle.textContent.trim());
                    
                    toggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('Submenu toggle clicked:', this.textContent.trim());
                        
                        // Find the next sibling that is a submenu
                        let submenu = this.nextElementSibling;
                        while (submenu && !submenu.classList.contains('submenu')) {
                            submenu = submenu.nextElementSibling;
                        }
                        
                        console.log('Found submenu:', submenu);
                        
                        if (submenu && submenu.classList.contains('submenu')) {
                            const isVisible = submenu.style.display === 'block' || submenu.classList.contains('show');
                            console.log('Submenu visibility:', isVisible);
                            
                            if (isVisible) {
                                submenu.style.display = 'none';
                                submenu.classList.remove('show');
                                this.setAttribute('aria-expanded', 'false');
                                console.log('Hiding submenu');
                            } else {
                                submenu.style.display = 'block';
                                submenu.classList.add('show');
                                this.setAttribute('aria-expanded', 'true');
                                console.log('Showing submenu');
                            }
                        }
                    });
                });
                
                // Override Bootstrap's mobile menu close behavior
                const newToggler = document.querySelector('.navbar-toggler');
                if (newToggler) {
                    // Remove any existing event listeners to prevent conflicts
                    const clonedToggler = newToggler.cloneNode(true);
                    newToggler.parentNode.replaceChild(clonedToggler, newToggler);
                    
                    clonedToggler.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const navbarCollapseElement = document.querySelector('.navbar-collapse');
                        if (navbarCollapseElement) {
                            if (navbarCollapseElement.classList.contains('show')) {
                                // Close the mobile menu
                                navbarCollapseElement.classList.remove('show');
                                navbarCollapseElement.style.display = 'none';
                                
                                // Also close any open dropdowns
                                const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
                                openDropdowns.forEach(dropdown => {
                                    dropdown.classList.remove('show');
                                    dropdown.style.display = 'none';
                                    dropdown.style.opacity = '0';
                                    dropdown.style.visibility = 'hidden';
                                });
                                
                                // Close any open submenus
                                const openSubmenus = document.querySelectorAll('.submenu[style*="display: block"]');
                                openSubmenus.forEach(submenu => {
                                    submenu.style.display = 'none';
                                });
                                
                                // Reset aria-expanded attributes
                                const expandedToggles = document.querySelectorAll('[aria-expanded="true"]');
                                expandedToggles.forEach(toggle => {
                                    toggle.setAttribute('aria-expanded', 'false');
                                });
                                
                                // Trigger Bootstrap's collapse event
                                const collapseEvent = new Event('hidden.bs.collapse');
                                navbarCollapseElement.dispatchEvent(collapseEvent);
                            } else {
                                // Open the mobile menu
                                navbarCollapseElement.classList.add('show');
                                navbarCollapseElement.style.display = 'block';
                                
                                // Trigger Bootstrap's show event
                                const showEvent = new Event('shown.bs.collapse');
                                navbarCollapseElement.dispatchEvent(showEvent);
                            }
                        }
                    });
                }
                
            } else {
                // Desktop behavior - restore hover functionality
                facilityManagementDropdown.addEventListener('mouseenter', showDropdown);
                facilityManagementDropdown.addEventListener('mouseleave', hideDropdown);
                
                // Remove click event on desktop
                dropdownToggle.removeEventListener('click', function() {});
            }
        }
        
        function showDropdown() {
            if (dropdownMenu) {
                dropdownMenu.classList.add('show');
                dropdownMenu.style.display = 'block';
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'none';
            }
        }
        
        function hideDropdown() {
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
            }
        }
    }
    
    // Initialize mobile dropdown management
    initMobileDropdownManagement();
    
    // Initialize submenu functionality for all screen sizes
    function initSubmenuFunctionality() {
        const submenuToggles3 = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
        
        submenuToggles3.forEach(toggle => {
            // Remove any existing event listeners
            toggle.removeEventListener('click', handleSubmenuToggle);
            
            // Add new event listener
            toggle.addEventListener('click', handleSubmenuToggle);
        });
    }
    
    function handleSubmenuToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const submenu = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        console.log('Submenu toggle clicked:', this.textContent);
        console.log('Current expanded state:', isExpanded);
        console.log('Submenu element:', submenu);
        
        // Close other submenus
        const allSubmenuToggles = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
        allSubmenuToggles.forEach(otherToggle => {
            if (otherToggle !== this) {
                otherToggle.setAttribute('aria-expanded', 'false');
                const otherSubmenu = otherToggle.nextElementSibling;
                if (otherSubmenu) {
                    otherSubmenu.classList.remove('show');
                    console.log('Closed other submenu:', otherToggle.textContent);
                }
            }
        });
        
        // Toggle current submenu
        this.setAttribute('aria-expanded', !isExpanded);
        if (submenu) {
            if (isExpanded) {
                submenu.classList.remove('show');
                console.log('Submenu closed:', this.textContent);
            } else {
                submenu.classList.add('show');
                console.log('Submenu opened:', this.textContent);
            }
        } else {
            console.error('Submenu element not found for:', this.textContent);
        }
    }
    
    // Initialize submenu functionality
    initSubmenuFunctionality();
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        initMobileDropdownManagement();
    });


    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll-Triggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes based on element type
                const element = entry.target;
                
                if (element.classList.contains('card')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('stagger-item')) {
                    element.classList.add('animate');
                } else {
                    element.classList.add('fade-in-up');
                }
                
                // Add staggered animation for service cards
                if (element.closest('.row')) {
                    const cards = element.closest('.row').querySelectorAll('.card, .service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .service-card, .icon-box, .service-icon, .certification-icon, .team-avatar, .stagger-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Card hover effects are now handled by CSS only to avoid conflicts with icon hover effects
    
    // Icon Hover Effects - Enhanced with CSS classes instead of inline styles
    const icons = document.querySelectorAll('.icon-box, .service-icon, .certification-icon, .team-avatar');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add hover class for enhanced effects
            this.classList.add('icon-hover');
        });
        
        icon.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('icon-hover');
        });
    });

    // Enhanced Dropdown Menu Functionality
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    
    dropdownSubmenus.forEach(submenu => {
        const toggle = submenu.querySelector('.dropdown-toggle');
        const submenuList = submenu.querySelector('.submenu');
        
        if (toggle && submenuList) {
            // For mobile devices, add click functionality
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle submenu visibility
                    const isVisible = submenuList.style.display === 'block';
                    submenuList.style.display = isVisible ? 'none' : 'block';
                    
                    // Rotate arrow
                    const arrow = this.querySelector('::after') || this;
                    if (isVisible) {
                        arrow.style.transform = 'rotate(0deg)';
                    } else {
                        arrow.style.transform = 'rotate(180deg)';
                    }
                }
            });
            
            // Close submenu when clicking outside
            document.addEventListener('click', function(e) {
                if (!submenu.contains(e.target) && window.innerWidth <= 768) {
                    submenuList.style.display = 'none';
                    const arrow = toggle.querySelector('::after') || toggle;
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        }
    });

        // Close all dropdowns when navbar is collapsed on mobile
    const navbarTogglerElement = document.querySelector('.navbar-toggler');
    const navbarCollapseElement2 = document.querySelector('.navbar-collapse');
    
    if (navbarTogglerElement && navbarCollapseElement2) {
        navbarTogglerElement.addEventListener('click', function() {
            // Close all submenus when navbar is toggled
            const allSubmenus = document.querySelectorAll('.submenu');
            allSubmenus.forEach(submenu => {
                submenu.style.display = 'none';
            });
            
            // Reset all arrows
            const allToggles = document.querySelectorAll('.dropdown-toggle');
            allToggles.forEach(toggle => {
                const arrow = toggle.querySelector('::after') || toggle;
                arrow.style.transform = 'rotate(0deg)';
            });
        });
    }
    
    // Contact Form Validation with Enhanced Animations
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remove previous validation classes
            this.classList.remove('was-validated');
            
            // Validate form
            if (this.checkValidity()) {
                // Form is valid - show success message with animation
                showFormSuccess();
                
                // Reset form
                this.reset();
                this.classList.remove('was-validated');
            } else {
                // Form is invalid - show validation errors
                this.classList.add('was-validated');
                
                // Add shake animation to invalid fields
                const invalidFields = this.querySelectorAll(':invalid');
                invalidFields.forEach(field => {
                    field.classList.add('shake');
                    setTimeout(() => {
                        field.classList.remove('shake');
                    }, 600);
                });
            }
        });
        
        // Real-time validation for email field
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                validateEmail(this);
            });
        }
        
        // Real-time validation for phone field
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', function() {
                validatePhone(this);
            });
        }
        
        // Enhanced form field focus effects
        const formFields = contactForm.querySelectorAll('.form-control, .form-select');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    // Email validation function
    function validateEmail(emailField) {
        const email = emailField.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailField.setCustomValidity('Please enter a valid email address');
        } else {
            emailField.setCustomValidity('');
        }
    }
    
    // Phone validation function
    function validatePhone(phoneField) {
        const phone = phoneField.value.replace(/\D/g, ''); // Remove non-digits
        const phoneRegex = /^\d{10}$/;
        
        if (phone && !phoneRegex.test(phone)) {
            phoneField.setCustomValidity('Please enter a valid 10-digit phone number');
        } else {
            phoneField.setCustomValidity('');
        }
    }
    
    // Show form success message with enhanced animation
    function showFormSuccess() {
        // Create success alert with animation
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success alert-dismissible fade show slide-in-down';
        successAlert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you within 24 hours.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert alert before the form
        contactForm.parentNode.insertBefore(successAlert, contactForm);
        
        // Add celebration animation
        addCelebrationEffect();
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (successAlert.parentNode) {
                successAlert.remove();
            }
        }, 5000);
    }
    
    // Celebration effect for form submission
    function addCelebrationEffect() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = `
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        `;
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }
    

    
    // Emergency contact highlighting with pulse animation
    const emergencyLinks = document.querySelectorAll('a[href*="999-8888"]');
    
    emergencyLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Service type selection enhancement with smooth transitions
    const serviceTypeSelect = document.getElementById('serviceType');
    
    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const messageField = document.getElementById('message');
            
            if (selectedValue && messageField) {
                const serviceMessages = {
                    'fire-extinguisher': 'Please describe your fire extinguisher needs (installation, maintenance, inspection, etc.)',
                    'fire-alarm': 'Please describe your fire alarm system requirements (new installation, upgrades, monitoring, etc.)',
                    'sprinkler': 'Please describe your sprinkler system needs (design, installation, maintenance, etc.)',
                    'training': 'Please describe your training requirements (number of employees, type of training, etc.)',
                    'maintenance': 'Please describe your maintenance needs (frequency, type of equipment, etc.)',
                    'emergency': 'Please describe the emergency situation and your immediate needs',
                    'consultation': 'Please describe what you would like to discuss during the consultation'
                };
                
                if (serviceMessages[selectedValue]) {
                    messageField.style.opacity = '0.7';
                    messageField.placeholder = serviceMessages[selectedValue];
                    setTimeout(() => {
                        messageField.style.opacity = '1';
                    }, 300);
                }
            }
        });
    }
    
    // Urgent request checkbox enhancement with visual feedback
    const urgentCheckbox = document.getElementById('urgent');
    
    if (urgentCheckbox) {
        urgentCheckbox.addEventListener('change', function() {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            if (this.checked) {
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Send Urgent Request';
                submitButton.classList.add('btn-warning');
                submitButton.classList.remove('btn-danger');
                submitButton.style.animation = 'pulse 2s infinite';
            } else {
                submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                submitButton.classList.remove('btn-warning');
                submitButton.classList.add('btn-danger');
                submitButton.style.animation = '';
            }
        });
    }
    
    // Counter Animation for Statistics
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Loading Animation for Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('btn-close')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<div class="loading-spinner me-2"></div>Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Enhanced Mobile Menu Animation
    const mobileNavbarToggler = document.querySelector('.navbar-toggler');
    const mobileNavbarCollapse = document.querySelector('.navbar-collapse');
    
    if (mobileNavbarToggler && mobileNavbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = mobileNavbarCollapse.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(mobileNavbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
    
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.6s ease-in-out;
        }
        
        .navbar-scrolled {
            background-color: rgba(52, 58, 64, 0.9) !important;
            backdrop-filter: blur(15px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .btn-warning {
            background-color: #ffc107;
            border-color: #ffc107;
            color: #000;
        }
        
        .btn-warning:hover {
            background-color: #e0a800;
            border-color: #d39e00;
            color: #000;
        }
        
        .celebration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--primary-red);
            animation: confettiFall 3s linear infinite;
        }
        
        .confetti:nth-child(1) { left: 10%; animation-delay: 0s; }
        .confetti:nth-child(2) { left: 30%; animation-delay: 0.5s; }
        .confetti:nth-child(3) { left: 50%; animation-delay: 1s; }
        .confetti:nth-child(4) { left: 70%; animation-delay: 1.5s; }
        .confetti:nth-child(5) { left: 90%; animation-delay: 2s; }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .focused .form-label {
            color: var(--primary-red);
            transform: translateY(-5px);
        }
        
        .slide-in-down {
            animation: slideInDown 0.5s ease-out;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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

    // Data Visualization Animations
    function animateStatistics() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateStat();
        });
    }

    // Animate bar charts
    function animateBarCharts() {
        const barFills = document.querySelectorAll('.bar-fill');
        
        barFills.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    }

    // Animate pie chart segments
    function animatePieChart() {
        const pieSegments = document.querySelectorAll('.pie-segment');
        
        pieSegments.forEach((segment, index) => {
            segment.style.opacity = '0';
            segment.style.transform = 'scale(0)';
            
            setTimeout(() => {
                segment.style.transition = 'all 0.8s ease';
                segment.style.opacity = '1';
                segment.style.transform = 'scale(1)';
            }, index * 200);
        });
    }

    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }

    // Intersection Observer for data visualization animations
    const dataVizObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                if (section.classList.contains('bg-white') || section.classList.contains('bg-danger')) {
                    // Animate statistics
                    setTimeout(() => animateStatistics(), 200);
                    
                    // Animate charts
                    setTimeout(() => animateBarCharts(), 1000);
                    setTimeout(() => animatePieChart(), 1500);
                    setTimeout(() => animateTimeline(), 2000);
                }
                
                dataVizObserver.unobserve(section);
            }
        });
    }, { threshold: 0.3 });

    // Observe data visualization sections
    const dataVizSections = document.querySelectorAll('.bg-white, .bg-danger');
    dataVizSections.forEach(section => {
        dataVizObserver.observe(section);
    });

    // Interactive chart hover effects
    function addChartInteractivity() {
        const barItems = document.querySelectorAll('.bar-item');
        const legendItems = document.querySelectorAll('.legend-item');
        
        // Bar chart hover effects
        barItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Legend hover effects
        legendItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Initialize chart interactivity
    addChartInteractivity();

    // Add tooltip functionality for charts
    function addChartTooltips() {
        const chartElements = document.querySelectorAll('.bar-item, .legend-item, .pie-segment');
        
        chartElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'chart-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                // Get tooltip content based on element type
                let content = '';
                if (this.classList.contains('bar-item')) {
                    const label = this.querySelector('.bar-label').textContent;
                    const value = this.querySelector('.bar-value').textContent;
                    content = `${label}: ${value}`;
                } else if (this.classList.contains('legend-item')) {
                    content = this.textContent;
                }
                
                tooltip.textContent = content;
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                this.tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.tooltip) {
                    this.tooltip.remove();
                    this.tooltip = null;
                }
            });
        });
    }

    // Initialize chart tooltips
    addChartTooltips();

    // Add CSS for chart tooltips
    const chartTooltipStyle = document.createElement('style');
    chartTooltipStyle.textContent = `
        .chart-tooltip {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .stat-card:hover .stat-number {
            transform: scale(1.1);
            color: var(--primary-red);
        }
        
        .bar-fill:hover {
            filter: brightness(1.2);
        }
        
        .timeline-content:hover .timeline-marker {
            transform: scale(1.2);
            box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
        }
    `;
    document.head.appendChild(chartTooltipStyle);
    
    console.log('FireSafe Pro website with enhanced animations loaded successfully!');
}); 