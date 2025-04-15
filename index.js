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

    // Initialize the slider
    initHeroSlider();
});

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

    document.addEventListener('DOMContentLoaded', function() {
        // Chatbot elements
        const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
        const chatbotContainer = document.getElementById('chatbot-container');
        const closeChatbotBtn = document.getElementById('close-chatbot');
        const chatbotMessages = document.getElementById('chatbot-messages');
        const chatbotInputField = document.getElementById('chatbot-input-field');
        const chatbotSendBtn = document.getElementById('chatbot-send-btn');
        const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');
        const notificationBadge = document.querySelector('.notification-badge');
        const endChatBtn = document.getElementById('end-chat-btn');

        // Toggle chatbot visibility
        function toggleChatbot() {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                notificationBadge.style.display = 'none';
            }
        }

        // Add message to chat
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = getCurrentTime();
            
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(timeDiv);
            
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            typingDiv.id = 'typing-indicator';
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Hide typing indicator
        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Get current time in HH:MM format
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        // Generate response to any question
        function generateResponse(userMessage) {
            // Convert to lowercase for easier matching
            const lowerMessage = userMessage.toLowerCase();
            
            // Greetings
            if (/hello|hi|hey|greetings|good morning|good afternoon|good evening/i.test(lowerMessage)) {
                const now = new Date();
                const hours = now.getHours();
                let greeting = "Hello";
                
                if (hours < 12) {
                    greeting = "Good morning";
                } else if (hours < 18) {
                    greeting = "Good afternoon";
                } else {
                    greeting = "Good evening";
                }
                
                return `${greeting}! How can I assist you with Complete Analytics today?`;
            }
            
            // Thanks
            if (/thank|thanks|appreciate|grateful/i.test(lowerMessage)) {
                return "You're very welcome! Is there anything else I can help you with?";
            }
            
            // Courses
            if (/course|class|training|program|learn|educat|workshop|bootcamp/i.test(lowerMessage)) {
                if (/full stack|web development|front end|back end/i.test(lowerMessage)) {
                    return getCourseDetails('full stack development');
                }
                if (/data science|data analysis|machine learning|ml|data/i.test(lowerMessage)) {
                    return getCourseDetails('data science');
                }
                if (/digital marketing|seo|sem|social media|marketing/i.test(lowerMessage)) {
                    return getCourseDetails('digital marketing');
                }
                if (/cloud|aws|azure|google cloud|devops/i.test(lowerMessage)) {
                    return getCourseDetails('cloud computing');
                }
                if (/cyber|security|hacking|ethical hack|penetration/i.test(lowerMessage)) {
                    return getCourseDetails('cybersecurity');
                }
                if (/python/i.test(lowerMessage)) {
                    return getCourseDetails('python programming');
                }
                if (/machine learning|ml/i.test(lowerMessage)) {
                    return getCourseDetails('machine learning');
                }
                if (/artificial intelligence|ai/i.test(lowerMessage)) {
                    return getCourseDetails('artificial intelligence');
                }
                return getAllCourses();
            }
            
            // Batches
            if (/batch|start|when does|schedule|date|timing|time|duration/i.test(lowerMessage)) {
                if (/full stack|web development/i.test(lowerMessage)) {
                    return getBatchDetails('full stack development');
                }
                if (/data science|machine learning|ml/i.test(lowerMessage)) {
                    return getBatchDetails('data science');
                }
                if (/digital marketing|seo|sem/i.test(lowerMessage)) {
                    return getBatchDetails('digital marketing');
                }
                if (/cloud|aws|azure|google cloud/i.test(lowerMessage)) {
                    return getBatchDetails('cloud computing');
                }
                if (/cyber|security|hacking/i.test(lowerMessage)) {
                    return getBatchDetails('cybersecurity');
                }
                if (/python/i.test(lowerMessage)) {
                    return getBatchDetails('python programming');
                }
                if (/machine learning|ml/i.test(lowerMessage)) {
                    return getBatchDetails('machine learning');
                }
                if (/artificial intelligence|ai/i.test(lowerMessage)) {
                    return getBatchDetails('artificial intelligence');
                }
                return getAllBatches();
            }
            
            // Placements
            if (/placement|job|career|hiring|company|recruit|employ|opportunit|mnc|salary|package/i.test(lowerMessage)) {
                if (/company|companies|hire|hiring|partner/i.test(lowerMessage)) {
                    return getHiringCompanies();
                }
                if (/process|procedure|how|steps/i.test(lowerMessage)) {
                    return getPlacementProcess();
                }
                if (/stat|number|rate|percentage|success|ratio/i.test(lowerMessage)) {
                    return getPlacementStats();
                }
                if (/salary|package|highest|average/i.test(lowerMessage)) {
                    return getSalaryDetails();
                }
                return getPlacementOverview();
            }
            
            // Projects
            if (/project|implementation|custom software|solution|consulting/i.test(lowerMessage)) {
                return getProjectServices();
            }
            
            // Products
            if (/product|saas|app development|software|application|tool/i.test(lowerMessage)) {
                return getProductServices();
            }
            
            // AI Services
            if (/ai|artificial intelligence|machine learning|ml|model|algorithm/i.test(lowerMessage)) {
                return getAIServices();
            }
            
            // Company
            if (/about|company|who are you|background|history|mission|vision|values/i.test(lowerMessage)) {
                return getCompanyInfo();
            }
            
            // Contact
            if (/contact|reach|call|email|phone|address|location|office|where/i.test(lowerMessage)) {
                return getContactInfo();
            }
            
            // Pricing
            if (/price|cost|fee|how much|rate|payment|installment|discount/i.test(lowerMessage)) {
                return getPricingInfo();
            }
            
            // Enrollment
            if (/enroll|register|join|sign up|admission|apply|application/i.test(lowerMessage)) {
                return getEnrollmentInfo();
            }
            
            // Jobs
            if (/job|career|work|employment|hire|hiring|vacancy|position/i.test(lowerMessage)) {
                return getJobOpportunities();
            }
            
            // FAQ
            if (/faq|question|help|support|problem|issue|trouble/i.test(lowerMessage)) {
                return getFAQ();
            }
            
            // End chat
            if (/end chat|goodbye|bye|exit|close|stop/i.test(lowerMessage)) {
                return endChat();
            }
            
            // Default response for anything else
            return "I'm happy to answer your question! Here's what I know about Complete Analytics:\n\n" +
                   "• We offer 8 different technical courses\n" +
                   "• Provide project and product development services\n" +
                   "• Have AI implementation expertise\n" +
                   "• Located in Bangalore with online options\n" +
                   "• 95% placement rate with top companies\n\n" +
                   "Could you tell me more specifically what you'd like to know?";
        }

        // Detailed response functions
        function getAllCourses() {
            return `📚 Our Courses\n\n` +
                   `1. Full Stack Development (6 months, ₹25,000)\n` +
                   `2. Data Science (8 months, ₹26,000)\n` +
                   `3. Digital Marketing (4 months, ₹15,000)\n` +
                   `4. Cloud Computing (5 months, ₹25,000)\n` +
                   `5. Cybersecurity (7 months, ₹30,000)\n` +
                   `6. Python Programming (3 months, ₹23,000)\n` +
                   `7. Machine Learning (6 months, ₹35,000)\n` +
                   `8. Artificial Intelligence (7 months, ₹30,000)\n\n` +
                   `Ask about any course for more details!`;
        }

        function getCourseDetails(courseName) {
            const courses = {
                'full stack development': {
                    title: "Full Stack Development",
                    duration: "6 months",
                    price: "₹25,000",
                    features: "HTML/CSS, JavaScript, Node.js, React, MongoDB",
                    description: "Learn front-end and back-end development with hands-on projects to build complete web applications.",
                    syllabus: [
                        "Month 1: HTML/CSS Basics",
                        "Month 2: JavaScript Fundamentals",
                        "Month 3: React.js for Frontend",
                        "Month 4: Node.js for Backend",
                        "Month 5: Database Management",
                        "Month 6: Capstone Project"
                    ],
                    requirements: "Basic programming knowledge",
                    nextBatch: "1st November (Offline)"
                },
                // Other courses similarly...
            };
            
            const course = courses[courseName.toLowerCase()];
            if (!course) return "I don't have details about that course. Please ask about one of our main courses.";
            
            return `📘 ${course.title}\n\n` +
                   `⏳ Duration: ${course.duration}\n` +
                   `💰 Price: ${course.price}\n\n` +
                   `📝 Description:\n${course.description}\n\n` +
                   `🔧 Key Features:\n${course.features}\n\n` +
                   `📅 Next Batch: ${course.nextBatch}\n\n` +
                   `📋 Syllabus:\n${course.syllabus.join('\n')}\n\n` +
                   `🎯 Requirements: ${course.requirements}`;
        }

        function getAllBatches() {
            return `📅 Upcoming Batches\n\n` +
                   `1. Full Stack Development: 1st November (Offline)\n` +
                   `2. Data Science: 5th November (Offline)\n` +
                   `3. Digital Marketing: 10th November (Offline)\n` +
                   `4. Cloud Computing: 15th November (Offline)\n` +
                   `5. Cybersecurity: 20th November (Offline)\n` +
                   `6. Python Programming: 25th November (Offline)\n` +
                   `7. Machine Learning: 30th November (Offline)\n` +
                   `8. Artificial Intelligence: 5th December (Online)\n\n` +
                   `Ask about any batch for more details!`;
        }

        function getBatchDetails(courseName) {
            const batches = {
                'full stack development': {
                    nextBatch: "1st November (Offline)",
                    timing: "Weekdays: 6PM-8PM | Weekends: 10AM-1PM",
                    duration: "6 months",
                    seats: "15 seats available"
                },
                // Other batches similarly...
            };
            
            const batch = batches[courseName.toLowerCase()];
            if (!batch) return "I don't have batch details for that course. Please ask about one of our main courses.";
            
            return `📅 ${courseName} Batch Details\n\n` +
                   `📅 Next Batch: ${batch.nextBatch}\n` +
                   `⏰ Timing: ${batch.timing}\n` +
                   `⏳ Duration: ${batch.duration}\n` +
                   `🪑 Availability: ${batch.seats}\n\n` +
                   `Would you like help with enrollment?`;
        }

        // Placement related functions
        function getPlacementOverview() {
            return `🎯 Placement Overview\n\n` +
                   `At Complete Analytics, we have:\n\n` +
                   `• 95% Placement Rate\n` +
                   `• 1000+ Placements Completed\n` +
                   `• Highest Package: ₹8,00,000\n` +
                   `• Average Package: ₹5,50,000\n` +
                   `• 300+ Hiring Partners\n\n` +
                   `Would you like details about:\n` +
                   `• Our placement process\n` +
                   `• Hiring companies\n` +
                   `• Placement statistics\n` +
                   `• Salary packages`;
        }

        function getPlacementProcess() {
            return `🔄 Our Placement Process\n\n` +
                   `1. Resume Building\n` +
                   `   - We help you create a professional resume tailored to your skills\n\n` +
                   `2. Mock Interviews\n` +
                   `   - Practice interviews with industry experts to boost your confidence\n\n` +
                   `3. Skill Development\n` +
                   `   - Workshops to enhance your technical and soft skills\n\n` +
                   `4. Final Placements\n` +
                   `   - Get placed in top companies with our 100% placement assistance\n\n` +
                   `Our dedicated placement team works closely with students to ensure successful placements.`;
        }

        function getHiringCompanies() {
            return `🏢 Hiring Companies\n\n` +
                   `Our students have been placed in top companies including:\n\n` +
                   `• Google\n` +
                   `• Amazon\n` +
                   `• Microsoft\n` +
                   `• Infosys\n` +
                   `• TCS\n` +
                   `• Wipro\n` +
                   `• Accenture\n` +
                   `• IBM\n` +
                   `• Capgemini\n` +
                   `• Cognizant\n` +
                   `• HCL\n` +
                   `• Deloitte\n` +
                   `• Oracle\n` +
                   `• Intel\n` +
                   `• Adobe\n\n` +
                   `We have 300+ hiring partners who regularly recruit from our institute.`;
        }

        function getPlacementStats() {
            return `📊 Placement Statistics\n\n` +
                   `• 95% Placement Rate\n` +
                   `• 1000+ Placements Completed\n` +
                   `• 300+ Hiring Partners\n` +
                   `• 200+ Opportunities Every Month\n` +
                   `• 10+ Drives Every Day\n` +
                   `• 300+ Avg Students Placed Every Month\n\n` +
                   `Our placement record speaks for itself!`;
        }

        function getSalaryDetails() {
            return `💰 Salary Packages\n\n` +
                   `Our students have received:\n\n` +
                   `• Highest Package: ₹8,00,000\n` +
                   `• Average Package: ₹5,50,000\n` +
                   `• Minimum Package: ₹3,50,000\n\n` +
                   `Salaries vary based on:\n` +
                   `• Course completed\n` +
                   `• Skills acquired\n` +
                   `• Company hiring\n` +
                   `• Location of job`;
        }

        function getProjectServices() {
            return `🛠 Project Services\n\n` +
                   `We provide end-to-end project implementation:\n\n` +
                   `• Custom Software Development\n` +
                   `• Data Analytics Solutions\n` +
                   `• AI/ML Implementation\n` +
                   `• Cloud Migration\n` +
                   `• Cybersecurity Solutions\n` +
                   `• IoT Development\n\n` +
                   `Starting from ₹1,00,000\n\n` +
                   `Contact projects@completeanalytics.com or call +91 9886096090`;
        }

        function getAIServices() {
            return `🤖 AI Services\n\n` +
                   `We offer comprehensive AI solutions:\n\n` +
                   `• AI Strategy Consulting\n` +
                   `• Machine Learning Models\n` +
                   `• Natural Language Processing\n` +
                   `• Computer Vision\n` +
                   `• Predictive Analytics\n` +
                   `• Chatbots & Virtual Assistants\n\n` +
                   `Starting from ₹2,50,000\n\n` +
                   `Contact ai@completeanalytics.com or call +91 9886096090`;
        }

        function getCompanyInfo() {
            return `🏢 About Us\n\n` +
                   `Complete Analytics is a leading training and technology services provider since 2015.\n\n` +
                   `• 8+ Years Experience\n` +
                   `• 200+ Clients\n` +
                   `• 97% Satisfaction\n` +
                   `• 50+ Certified Trainers\n\n` +
                   `Our mission is to empower individuals and businesses with cutting-edge technical skills and solutions.`;
        }

        function getContactInfo() {
            return `📞 Contact Us\n\n` +
                   `📍 123 Tech Park, Bangalore\n` +
                   `📞 +91 9886096090\n` +
                   `📧 info@completeanalytics.com\n\n` +
                   `🕒 Mon-Fri: 9AM-6PM\n` +
                   `Sat: 10AM-4PM\n\n` +
                   `Departments:\n` +
                   `• Courses: courses@completeanalytics.com\n` +
                   `• Projects: projects@completeanalytics.com\n` +
                   `• AI Services: ai@completeanalytics.com\n` +
                   `• Placements: placements@completeanalytics.com`;
        }

        function endChat() {
            // Clear all messages except the first bot message and quick questions
            const messages = document.querySelectorAll('.message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
            
            return "Thank you for chatting with the Complete Analytics AI Assistant! Feel free to reopen this chat anytime if you have more questions.";
        }

        // Handle user message
        function handleUserMessage() {
            const userMessage = chatbotInputField.value.trim();
            if (userMessage === '') return;

            addMessage(userMessage, true);
            chatbotInputField.value = '';
            
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(userMessage);
                addMessage(response);
            }, 1500);
        }

        // Event listeners
        chatbotToggleBtn.addEventListener('click', toggleChatbot);
        closeChatbotBtn.addEventListener('click', toggleChatbot);
        chatbotSendBtn.addEventListener('click', handleUserMessage);
        chatbotInputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleUserMessage();
        });
        quickQuestionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatbotInputField.value = question;
                handleUserMessage();
            });
        });
        endChatBtn.addEventListener('click', function() {
            addMessage("User ended the chat", true);
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                const response = endChat();
                addMessage(response);
            }, 1000);
        });

        // Show notification after 10 seconds if inactive
        setTimeout(() => {
            if (!chatbotContainer.classList.contains('active')) {
                notificationBadge.style.display = 'block';
            }
        }, 10000);
    });


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
        
        let testimonialInterval = setInterval(moveSlider, 2000);
        
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(moveSlider, 2000);
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

   
