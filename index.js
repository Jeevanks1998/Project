document.addEventListener('DOMContentLoaded', function() {
    // ========== Hero Slider ==========
    const heroSlides = document.querySelectorAll('.slide-container');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentHeroSlide = 0;
    let heroSliderInterval;

    function initHeroSlider() {
        if (heroSlides.length === 0) return;
        
        // Initialize first slide
        showHeroSlide(currentHeroSlide);
        startHeroSlider();
        
        // Dot navigation
        sliderDots.forEach((dot, index) => {
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', function() {
                currentHeroSlide = parseInt(this.getAttribute('data-index'));
                showHeroSlide(currentHeroSlide);
                resetHeroSliderInterval();
            });
        });
        
        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            
            hero.addEventListener('mouseleave', startHeroSlider);
        }
    }

    function showHeroSlide(index) {
        // Validate index
        if (index < 0 || index >= heroSlides.length) return;
        
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show selected slide
        heroSlides[index].classList.add('active');
        
        // Update dots
        sliderDots.forEach(dot => {
            dot.classList.remove('active');
        });
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
        
        // Reset animation for text elements
        const texts = heroSlides[index].querySelectorAll('h1, p');
        texts.forEach(text => {
            text.style.transition = 'none';
            text.style.transform = 'translateY(20px)';
            text.style.opacity = '0';
            setTimeout(() => {
                text.style.transition = '';
                text.style.transform = 'translateY(0)';
                text.style.opacity = '1';
            }, 50);
        });
    }

    function startHeroSlider() {
        if (heroSlides.length <= 1) return;
        clearInterval(heroSliderInterval);
        heroSliderInterval = setInterval(() => {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }, 5000);
    }

    function pauseHeroSlider() {
        clearInterval(heroSliderInterval);
    }

    function resetHeroSliderInterval() {
        pauseHeroSlider();
        startHeroSlider();
    }

    // ========== Mobile Menu ==========
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('nav ul'); // Changed to target nav ul

    function initMobileMenu() {
        if (!menuToggle || !menu) return;
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // ========== Chatbot ==========
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputField = document.getElementById('chatbot-input-field');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

    function initChatbot() {
        if (!chatbotToggleBtn || !chatbotContainer) return;
        
        // Toggle chatbot visibility
        chatbotToggleBtn.addEventListener('click', toggleChatbot);
        if (closeChatbotBtn) closeChatbotBtn.addEventListener('click', toggleChatbot);
        
        // Send message functionality
        if (chatbotSendBtn && chatbotInputField) {
            chatbotSendBtn.addEventListener('click', sendChatbotMessage);
            chatbotInputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendChatbotMessage();
            });
        }
        
        // Quick question buttons
        if (quickQuestionBtns.length > 0) {
            quickQuestionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const question = btn.textContent.trim();
                    if (chatbotInputField) {
                        chatbotInputField.value = question;
                        sendChatbotMessage();
                    }
                });
            });
        }
    }

    function toggleChatbot() {
        if (!chatbotContainer) return;
        chatbotContainer.classList.toggle('active');
    }

    function sendChatbotMessage() {
        if (!chatbotInputField || !chatbotMessages) return;
        
        const userMessage = chatbotInputField.value.trim();
        if (userMessage === '') return;

        // Add user message
        addChatbotMessage(userMessage, 'user-message');
        chatbotInputField.value = '';
        
        // Simulate bot response after delay
        setTimeout(() => {
            const botResponse = generateBotResponse(userMessage);
            addChatbotMessage(botResponse, 'bot-message');
        }, 1000);
    }

    function addChatbotMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = text;
        if (chatbotMessages) {
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        const responses = {
            'course': "We offer courses in Full Stack Development, Data Science, Digital Marketing, Cloud Computing, Cybersecurity, Python, Machine Learning, and Artificial Intelligence.",
            'register': "You can register by clicking the 'Register Now' button on our website or visiting the registration page.",
            'fee': "Course fees vary. For example, Full Stack Development costs ₹25,000, and Data Science costs ₹26,000. Please check the course details for more information.",
            'placement': "We provide 100% placement assistance with a 95% placement rate. Our hiring partners include Google, Amazon, Microsoft, and more.",
            'contact': "You can contact us via the contact form on our website or call us at +91-1234567890."
        };
        
        for (const [keyword, response] of Object.entries(responses)) {
            if (lowerCaseMessage.includes(keyword)) {
                return response;
            }
        }
        
        return "I'm sorry, I didn't understand that. Could you please rephrase your question?";
    }

    // ========== Testimonial Slider ==========
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialTrack = document.querySelector('.testimonial-slider .slider-track');
    const testimonials = document.querySelectorAll('.testimonial');

    function initTestimonialSlider() {
        if (!testimonialTrack || testimonials.length === 0) return;
        
        const testimonialWidth = testimonials[0].offsetWidth + 20;
        let currentTestimonial = 0;
        
        // Clone first few testimonials for infinite effect
        const clones = [];
        for (let i = 0; i < 3; i++) {
            const clone = testimonials[i].cloneNode(true);
            clone.classList.add('clone');
            testimonialTrack.appendChild(clone);
            clones.push(clone);
        }
        
        function moveSlider() {
            currentTestimonial++;
            testimonialTrack.style.transition = 'transform 0.5s ease';
            testimonialTrack.style.transform = `translateX(-${currentTestimonial * testimonialWidth}px)`;
            
            // Reset to start for infinite effect
            if (currentTestimonial >= testimonials.length) {
                setTimeout(() => {
                    testimonialTrack.style.transition = 'none';
                    currentTestimonial = 0;
                    testimonialTrack.style.transform = 'translateX(0)';
                }, 500);
            }
        }
        
        let testimonialInterval = setInterval(moveSlider, 3000);
        
        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(moveSlider, 3000);
        });
    }

    // ========== Initialize All Components ==========
    initHeroSlider();
    initMobileMenu();
    initChatbot();
    initTestimonialSlider();

    // Window resize handler
    window.addEventListener('resize', function() {
        // Reinitialize sliders on resize
        initTestimonialSlider();
    });
});

// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('doubts-popup');
    const closeBtn = document.getElementById('close-doubts-popup');
    const openChatBtn = document.getElementById('open-chatbot');
    
    // Function to show popup
    function showPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to hide popup
    function hidePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close button event
    closeBtn.addEventListener('click', hidePopup);
    
    // Overlay click event
    popup.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('popup-overlay')) {
            hidePopup();
        }
    });
    
    // Chat button event (example)
    openChatBtn.addEventListener('click', function() {
        hidePopup();
        // Add your chatbot opening logic here
        console.log('Opening chatbot...');
    });
    
    // Example: Show popup after 2 seconds
    setTimeout(showPopup, 2000);
    
    // Example: Show popup when user tries to leave
    window.addEventListener('mouseout', function(e) {
        if (e.clientY < 0) {
            showPopup();
        }
    });
});
