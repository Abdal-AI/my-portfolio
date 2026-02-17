// Initialize Main Logic
const initMain = () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Nav Toggle
    const styles = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle Nav
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close menu when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                });
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}

// Simple Chatbot (No API Required)
const initChatBot = () => {
    // Knowledge base about Abdal
    const knowledge = {
        name: "Muhammad Abdal",
        email: "muhammadabdal15140@gmail.com",
        whatsapp: "+923419007352",
        fiverr: "https://www.fiverr.com/abdalkhan1514",
        github: "https://github.com/Abdal-AI",
        linkedin: "https://www.linkedin.com/in/muhammad-abdal-619451299/",
        kaggle: "https://www.kaggle.com/muhammadabdal123",
        services: {
            portfolio: { name: "Portfolio Website", price: "$60", features: "5-Page Responsive Site, Contact Form, Social Links, Basic SEO" },
            business: { name: "Business Website", price: "$100", features: "Up to 10 Pages, Booking System, Live Chat, Google Analytics" },
            ecommerce: { name: "E-commerce Store", price: "$200", features: "WooCommerce Setup, 50 Products, Payment Gateway, Discounts" },
            data: { name: "Data Cleaning & Analysis", price: "$80", features: "Python/Pandas, Data Formatting, Exploratory Analysis" },
            automation: { name: "n8n Workflow Automation", price: "$120", features: "1 Complex Workflow, API Integrations, Error Handling" },
            dashboard: { name: "Interactive Dashboard", price: "$150", features: "Power BI or Streamlit, 5 Visualizations, Interactive Filters" }
        },
        skills: ["WordPress", "Python", "n8n Automation", "Data Science", "Machine Learning", "Power BI", "WooCommerce", "Elementor Pro"],
        projects: ["Luxe Cosmetics E-commerce", "Face Recognition System", "Sales Dashboard", "CRM Sync Workflow", "Titanic Survival Prediction"]
    };

    // Response patterns
    const getResponse = (input) => {
        const msg = input.toLowerCase().trim();
        
        // Greetings
        if (/^(hi|hello|hey|hola|greetings|good morning|good afternoon|good evening)/.test(msg)) {
            return `👋 Hello! I'm Abdal's assistant. I can help you with:\n\n• **Services & Pricing**\n• **Contact Information**\n• **Projects & Portfolio**\n• **Skills & Expertise**\n\nWhat would you like to know?`;
        }
        
        // Pricing / Services
        if (/price|pricing|cost|how much|rate|charge|package|service/i.test(msg)) {
            if (/portfolio/i.test(msg)) {
                return `📁 **Portfolio Website - ${knowledge.services.portfolio.price}**\n\nIncludes: ${knowledge.services.portfolio.features}\n\nPerfect for freelancers and creatives!\n\n👉 [Order Now](contact.html)`;
            }
            if (/business/i.test(msg)) {
                return `🏢 **Business Website - ${knowledge.services.business.price}**\n\nIncludes: ${knowledge.services.business.features}\n\nIdeal for growing businesses!\n\n👉 [Order Now](contact.html)`;
            }
            if (/ecommerce|e-commerce|shop|store/i.test(msg)) {
                return `🛒 **E-commerce Store - ${knowledge.services.ecommerce.price}**\n\nIncludes: ${knowledge.services.ecommerce.features}\n\nStart selling online today!\n\n👉 [Order Now](contact.html)`;
            }
            if (/data|cleaning|analysis/i.test(msg)) {
                return `📊 **Data Cleaning & Analysis - ${knowledge.services.data.price}**\n\nIncludes: ${knowledge.services.data.features}\n\nTurn raw data into insights!\n\n👉 [Order Now](contact.html)`;
            }
            if (/automation|n8n|workflow/i.test(msg)) {
                return `⚙️ **n8n Workflow Automation - ${knowledge.services.automation.price}**\n\nIncludes: ${knowledge.services.automation.features}\n\nAutomate your busy work!\n\n👉 [Order Now](contact.html)`;
            }
            if (/dashboard|power bi|visualization/i.test(msg)) {
                return `📈 **Interactive Dashboard - ${knowledge.services.dashboard.price}**\n\nIncludes: ${knowledge.services.dashboard.features}\n\nVisualize your metrics!\n\n👉 [Order Now](contact.html)`;
            }
            // General pricing
            return `💰 **Service Pricing:**\n\n• Portfolio Website: **$60**\n• Business Website: **$100**\n• E-commerce Store: **$200**\n• Data Cleaning: **$80**\n• n8n Automation: **$120**\n• Dashboard: **$150**\n\nAsk about any specific service for details!`;
        }
        
        // Contact
        if (/contact|email|reach|hire|message|whatsapp|phone|call/i.test(msg)) {
            return `📬 **Contact Abdal:**\n\n📧 Email: ${knowledge.email}\n📱 WhatsApp: ${knowledge.whatsapp}\n💼 Fiverr: [Order a Gig](${knowledge.fiverr})\n\nOr use the [Contact Form](contact.html) to send a message directly!`;
        }
        
        // Skills
        if (/skill|expertise|technology|tech|stack|know|experience|specialize/i.test(msg)) {
            return `🛠️ **Abdal's Skills:**\n\n${knowledge.skills.map(s => `• ${s}`).join('\n')}\n\nSpecializing in Web Development, AI/ML, and Business Automation!`;
        }
        
        // Projects / Portfolio
        if (/project|portfolio|work|done|example|case study/i.test(msg)) {
            return `🎯 **Featured Projects:**\n\n${knowledge.projects.map(p => `• ${p}`).join('\n')}\n\nView all projects: [Portfolio](portfolio.html)`;
        }
        
        // About
        if (/about|who|tell me|introduce|yourself/i.test(msg)) {
            return `👨‍💻 **About ${knowledge.name}:**\n\nI'm a Web Developer, Data Scientist, and Automation Expert. I help businesses build stunning websites, analyze data for insights, and automate repetitive tasks.\n\n🏆 Top 1% on Kaggle\n⭐ 5.0 Rating on Fiverr\n💻 500+ GitHub Contributions`;
        }
        
        // WordPress
        if (/wordpress|wp|theme|elementor/i.test(msg)) {
            return `🌐 **WordPress Development:**\n\nI build custom WordPress sites using Elementor Pro with:\n• Custom themes & designs\n• WooCommerce integration\n• Speed optimization (95+ PageSpeed)\n• SEO-friendly structure\n\nStarting at **$60** for portfolio sites!`;
        }
        
        // AI / Python
        if (/ai|python|machine learning|ml|data science|artificial intelligence/i.test(msg)) {
            return `🤖 **AI & Data Science:**\n\nI work with Python for:\n• Machine Learning models\n• Data analysis & visualization\n• Face recognition systems\n• Predictive analytics\n• Automation scripts\n\nCheck my [Kaggle Profile](${knowledge.kaggle})!`;
        }
        
        // Automation
        if (/automat|n8n|workflow|integrate|api/i.test(msg)) {
            return `⚙️ **Workflow Automation:**\n\nUsing n8n, I can automate:\n• Email notifications\n• CRM integrations (HubSpot, Salesforce)\n• Social media posting\n• Data syncing between apps\n• Custom API workflows\n\nStarting at **$120**!`;
        }
        
        // Social links
        if (/github|linkedin|twitter|kaggle|social/i.test(msg)) {
            return `🔗 **Social Links:**\n\n• GitHub: [Abdal-AI](${knowledge.github})\n• LinkedIn: [Muhammad Abdal](${knowledge.linkedin})\n• Kaggle: [Profile](${knowledge.kaggle})\n• Twitter: [@abdalkhan1514](https://x.com/abdalkhan1514)`;
        }
        
        // Thanks
        if (/thank|thanks|thx|appreciate/i.test(msg)) {
            return `😊 You're welcome! Is there anything else I can help you with? Feel free to ask about services, pricing, or how to get in touch!`;
        }
        
        // Goodbye
        if (/bye|goodbye|see you|later|exit|quit/i.test(msg)) {
            return `👋 Goodbye! Thanks for visiting. Feel free to come back anytime or [contact Abdal](contact.html) directly!`;
        }
        
        // Fiverr
        if (/fiverr|gig|order|freelanc/i.test(msg)) {
            return `💼 **Order on Fiverr:**\n\nYou can hire me directly on Fiverr with secure payments and guaranteed delivery!\n\n👉 [Visit My Fiverr Profile](${knowledge.fiverr})\n\n⭐ 5.0 Rating • Fast Delivery • 24/7 Support`;
        }
        
        // Help
        if (/help|what can you|how does|how do/i.test(msg)) {
            return `🤖 **I can help you with:**\n\n• "What services do you offer?"\n• "How much does a website cost?"\n• "How can I contact you?"\n• "Tell me about your projects"\n• "What are your skills?"\n\nJust ask me anything!`;
        }
        
        // Default response
        return `🤔 I'm not sure I understand. Try asking about:\n\n• **Services** - "What services do you offer?"\n• **Pricing** - "How much does a website cost?"\n• **Contact** - "How can I reach you?"\n• **Projects** - "Show me your work"\n\nOr visit the [Contact Page](contact.html) to message Abdal directly!`;
    };

    // Inject HTML
    const chatHTML = `
    <div class="chat-widget">
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <div>
                    <h3>Assistant</h3>
                    <p style="font-size: 0.75rem; color: var(--accent); margin: 0;" id="chatStatus">Online</p>
                </div>
                <button class="chat-close" id="closeChat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    👋 Hi! I'm Abdal's assistant. Ask me about services, pricing, or how to get in touch!
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" class="chat-input" id="chatInput" placeholder="Ask about services, pricing...">
                <button class="chat-send" id="sendMessage"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <button class="chat-toggle" id="toggleChat">
            <i class="fas fa-comments"></i>
        </button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Elements
    const toggleBtn = document.getElementById('toggleChat');
    const closeBtn = document.getElementById('closeChat');
    const chatWindow = document.getElementById('chatWindow');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const messages = document.getElementById('chatMessages');

    // Toggle Chat
    const toggleChat = () => chatWindow.classList.toggle('active');
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Add Message to UI
    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--accent);">$1</a>')
            .replace(/\n/g, '<br>');
        
        div.innerHTML = formattedText;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    // Send Message Logic
    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Simulate brief "typing" delay
        setTimeout(() => {
            const response = getResponse(text);
            addMessage(response, 'bot');
        }, 300);
    };

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
};

// Initialize after DOM Content Loaded (extending the existing event)
// Note: Since we are appending this to the file, we can just run it or hook it.
// The previous code block closed the DOMContentLoaded event.
// We should check if document is already loaded or just run it if defer is used (it is).
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatBot);
} else {
    initChatBot();
}

// Contact Form Logic (AJAX)
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Show loading state
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success - Replace form with success message
                form.innerHTML = `
                    <div style="text-align: center; padding: 2rem; animation: navLinkFade 0.5s ease forwards;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: #1dbf73; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 1rem;">Message Sent!</h3>
                        <p style="color: var(--text-secondary);">Thanks for reaching out. I'll get back to you shortly.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1.5rem; border: none;">Send Another</button>
                    </div>
                `;
            } else {
                // Error from server
                return response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Server Error: " + (data.message || "Unknown error"));
                    }
                }).catch(() => {
                    // processing as text if json fails
                    return response.text().then(text => {
                        console.error("Server Error Response:", text);
                         alert("Server Error (" + response.status + "): " + response.statusText + "\n\nPlease check the console or try again later.");
                    });
                });
            }
        })
        .catch(error => {
            alert("Oops! There was a problem connecting to the server. Please check your internet connection.");
            console.error(error);
        })
        .finally(() => {
            // Restore button if form still exists (it won't on success, but will on error)
            if (form.contains(btn)) {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        });
    });
};

// Initialize Contact Form
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}

// ============================
// REVIEW SYSTEM
// ============================

const initReviewSystem = () => {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return; // Only run on pages with review form

    const starRating = document.getElementById('starRating');
    const ratingInput = document.getElementById('rating');
    const reviewsGrid = document.getElementById('reviewsGrid');

    // Star Rating System
    let selectedRating = 5; // Default 5 stars
    const stars = starRating.querySelectorAll('.fa-star');

    // Initialize all stars as active (5 stars default)
    stars.forEach(star => star.classList.add('active'));

    // Hover effect
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Reset to selected rating on mouse leave
    starRating.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
            if (i < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    // Click to select rating
    stars.forEach((star) => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            ratingInput.value = selectedRating;
            
            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Load and Display Reviews
    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('portfolioReviews') || '[]');
        
        if (reviews.length === 0) {
            reviewsGrid.innerHTML = `
                <div class="glass-card review-card" style="text-align: center; padding: 3rem 2rem;">
                    <i class="fas fa-comments" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="color: var(--text-secondary);">No reviews yet. Be the first to leave a review!</p>
                </div>
            `;
            return;
        }

        // Sort reviews by date (newest first)
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        reviewsGrid.innerHTML = reviews.map((review, index) => {
            const starsHTML = Array(5).fill(0).map((_, i) => 
                `<i class="fas fa-star" style="color: ${i < review.rating ? 'var(--accent)' : '#334155'}; font-size: 0.9rem;"></i>`
            ).join('');

            const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            const avatarColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
            const avatarColor = avatarColors[index % avatarColors.length];

            return `
                <div class="glass-card review-card" style="animation: navLinkFade 0.5s ease forwards ${index * 0.1}s; opacity: 0;">
                    <div class="review-header">
                        <div class="review-avatar" style="background: ${avatarColor};">
                            ${initials}
                        </div>
                        <div class="review-info">
                            <h4 style="margin: 0; font-size: 1rem;">${review.name}</h4>
                            ${review.role ? `<p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">${review.role}</p>` : ''}
                            <div class="review-stars" style="margin-top: 0.25rem;">
                                ${starsHTML}
                            </div>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <p class="review-date">${formatDate(review.date)}</p>
                </div>
            `;
        }).join('');
    };

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Handle Form Submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reviewerName').value.trim();
        const role = document.getElementById('reviewerRole').value.trim();
        const rating = parseInt(ratingInput.value);
        const text = document.getElementById('reviewText').value.trim();

        if (!name || !text || rating < 1 || rating > 5) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Create review object
        const review = {
            id: Date.now(),
            name: name,
            role: role,
            rating: rating,
            text: text,
            date: new Date().toISOString()
        };

        // Save to localStorage
        const reviews = JSON.parse(localStorage.getItem('portfolioReviews') || '[]');
        reviews.push(review);
        localStorage.setItem('portfolioReviews', JSON.stringify(reviews));

        // Show success message
        const formCard = reviewForm.closest('.glass-card');
        const originalHTML = formCard.innerHTML;
        
        formCard.innerHTML = `
            <div style="text-align: center; padding: 2rem; animation: navLinkFade 0.5s ease forwards;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Your review has been submitted successfully.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="border: none;">
                    <i class="fas fa-plus" style="margin-right: 0.5rem;"></i>
                    Add Another Review
                </button>
            </div>
        `;

        // Reload reviews
        loadReviews();

        // Scroll to reviews section
        setTimeout(() => {
            document.getElementById('reviewsDisplay').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    });

    // Initial load
    loadReviews();
};

// Initialize Review System
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewSystem);
} else {
    initReviewSystem();
}
