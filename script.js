// ============================================================
// CONFIGURATION — Update these values with your own API keys
// ============================================================
const CONFIG = {
    // formsubmit.co — Contact form email (already configured in HTML)
    CONTACT_EMAIL: 'muhammadabdal15140@gmail.com',

    // Web3Forms — Free email notifications for reviews
    // Get your free key at: https://web3forms.com/
    WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY',  // ← Replace this

    // JSONBin.io — Free global cloud storage for reviews
    // Steps: 1) Go to https://jsonbin.io  2) Sign up free  3) Create a Bin with []  4) Copy the BIN ID & API KEY below
    JSONBIN_BIN_ID: 'YOUR_JSONBIN_BIN_ID',        // ← Replace this (looks like: 65abc1234def567890)
    JSONBIN_API_KEY: 'YOUR_JSONBIN_API_KEY',       // ← Replace this (looks like: $2a$10$...)

    // Notification sound (optional)
    NOTIFICATION_ICON: 'new_logo.png'
};

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
const Toast = {
    container: null,

    init() {
        if (this.container) return;
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    },

    show(message, type = 'success', duration = 4000) {
        this.init();

        const colors = {
            success: { bg: 'linear-gradient(135deg, #10b981, #059669)', icon: '✅' },
            error:   { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', icon: '❌' },
            info:    { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', icon: 'ℹ️' },
            warning: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '⚠️' }
        };

        const { bg, icon } = colors[type] || colors.success;

        const toast = document.createElement('div');
        toast.style.cssText = `
            background: ${bg};
            color: #fff;
            padding: 1rem 1.25rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 360px;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            pointer-events: all;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            cursor: pointer;
        `;
        toast.innerHTML = `<span style="font-size:1.2rem">${icon}</span><span>${message}</span>`;
        toast.addEventListener('click', () => this.dismiss(toast));

        this.container.appendChild(toast);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.transform = 'translateX(0)';
            });
        });

        setTimeout(() => this.dismiss(toast), duration);
    },

    dismiss(toast) {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 400);
    }
};

// ============================================================
// BROWSER PUSH NOTIFICATION REQUEST
// ============================================================
const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
        await Notification.requestPermission();
    }
};

const sendBrowserNotification = (title, body) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    new Notification(title, {
        body,
        icon: CONFIG.NOTIFICATION_ICON,
        badge: CONFIG.NOTIFICATION_ICON,
        vibrate: [200, 100, 200]
    });
};

// ============================================================
// MAIN INIT (Nav, Scroll, Mobile Menu)
// ============================================================
const initMain = () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile Nav Toggle
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fa-spin { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(styleSheet);

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            navLinks.forEach((link, index) => {
                link.style.animation = link.style.animation
                    ? ''
                    : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        });

        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(li => li.style.animation = '');
            }
        });

        navLinks.forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(l => l.style.animation = '');
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

// ============================================================
// CHATBOT
// ============================================================
const initChatBot = () => {
    const knowledge = {
        name: "Muhammad Abdal",
        email: "muhammadabdal15140@gmail.com",
        whatsapp: "+923419007352",
        fiverr: "https://www.fiverr.com/abdalkhan1514",
        github: "https://github.com/Abdal-AI",
        linkedin: "https://www.linkedin.com/in/muhammad-abdal-619451299/",
        kaggle: "https://www.kaggle.com/muhammadabdal123",
        services: {
            portfolio:  { name: "Portfolio Website",        price: "$60",  features: "5-Page Responsive Site, Contact Form, Social Links, Basic SEO" },
            business:   { name: "Business Website",         price: "$100", features: "Up to 10 Pages, Booking System, Live Chat, Google Analytics" },
            ecommerce:  { name: "E-commerce Store",         price: "$200", features: "WooCommerce Setup, 50 Products, Payment Gateway, Discounts" },
            data:       { name: "Data Cleaning & Analysis", price: "$80",  features: "Python/Pandas, Data Formatting, Exploratory Analysis" },
            automation: { name: "n8n Workflow Automation",  price: "$120", features: "1 Complex Workflow, API Integrations, Error Handling" },
            dashboard:  { name: "Interactive Dashboard",    price: "$150", features: "Power BI or Streamlit, 5 Visualizations, Interactive Filters" }
        },
        skills: ["WordPress", "Python", "n8n Automation", "Data Science", "Machine Learning", "Power BI", "WooCommerce", "Elementor Pro"],
        projects: ["Luxe Cosmetics E-commerce", "Face Recognition System", "Sales Dashboard", "CRM Sync Workflow", "Titanic Survival Prediction"]
    };

    const getResponse = (input) => {
        const msg = input.toLowerCase().trim();
        if (/^(hi|hello|hey|hola|greetings|good morning|good afternoon|good evening)/.test(msg))
            return `👋 Hello! I'm Abdal's assistant. I can help you with:\n\n• **Services & Pricing**\n• **Contact Information**\n• **Projects & Portfolio**\n• **Skills & Expertise**\n\nWhat would you like to know?`;
        if (/price|pricing|cost|how much|rate|charge|package|service/i.test(msg)) {
            if (/portfolio/i.test(msg))   return `📁 **Portfolio Website - ${knowledge.services.portfolio.price}**\n\nIncludes: ${knowledge.services.portfolio.features}\n\nPerfect for freelancers and creatives!\n\n👉 [Order Now](contact.html)`;
            if (/business/i.test(msg))    return `🏢 **Business Website - ${knowledge.services.business.price}**\n\nIncludes: ${knowledge.services.business.features}\n\nIdeal for growing businesses!\n\n👉 [Order Now](contact.html)`;
            if (/ecommerce|e-commerce|shop|store/i.test(msg)) return `🛒 **E-commerce Store - ${knowledge.services.ecommerce.price}**\n\nIncludes: ${knowledge.services.ecommerce.features}\n\nStart selling online today!\n\n👉 [Order Now](contact.html)`;
            if (/data|cleaning|analysis/i.test(msg)) return `📊 **Data Cleaning & Analysis - ${knowledge.services.data.price}**\n\nIncludes: ${knowledge.services.data.features}\n\nTurn raw data into insights!\n\n👉 [Order Now](contact.html)`;
            if (/automation|n8n|workflow/i.test(msg)) return `⚙️ **n8n Workflow Automation - ${knowledge.services.automation.price}**\n\nIncludes: ${knowledge.services.automation.features}\n\nAutomate your busy work!\n\n👉 [Order Now](contact.html)`;
            if (/dashboard|power bi|visualization/i.test(msg)) return `📈 **Interactive Dashboard - ${knowledge.services.dashboard.price}**\n\nIncludes: ${knowledge.services.dashboard.features}\n\nVisualize your metrics!\n\n👉 [Order Now](contact.html)`;
            return `💰 **Service Pricing:**\n\n• Portfolio Website: **$60**\n• Business Website: **$100**\n• E-commerce Store: **$200**\n• Data Cleaning: **$80**\n• n8n Automation: **$120**\n• Dashboard: **$150**\n\nAsk about any specific service for details!`;
        }
        if (/contact|email|reach|hire|message|whatsapp|phone|call/i.test(msg))
            return `📬 **Contact Abdal:**\n\n📧 Email: ${knowledge.email}\n📱 WhatsApp: ${knowledge.whatsapp}\n💼 Fiverr: [Order a Gig](${knowledge.fiverr})\n\nOr use the [Contact Form](contact.html) to send a message directly!`;
        if (/skill|expertise|technology|tech|stack|know|experience|specialize/i.test(msg))
            return `🛠️ **Abdal's Skills:**\n\n${knowledge.skills.map(s => `• ${s}`).join('\n')}\n\nSpecializing in Web Development, AI/ML, and Business Automation!`;
        if (/project|portfolio|work|done|example|case study/i.test(msg))
            return `🎯 **Featured Projects:**\n\n${knowledge.projects.map(p => `• ${p}`).join('\n')}\n\nView all projects: [Portfolio](portfolio.html)`;
        if (/about|who|tell me|introduce|yourself/i.test(msg))
            return `👨‍💻 **About ${knowledge.name}:**\n\nI'm a Web Developer, Data Scientist, and Automation Expert. I help businesses build stunning websites, analyze data for insights, and automate repetitive tasks.\n\n🏆 Top 1% on Kaggle\n⭐ 5.0 Rating on Fiverr\n💻 500+ GitHub Contributions`;
        if (/wordpress|wp|theme|elementor/i.test(msg))
            return `🌐 **WordPress Development:**\n\nI build custom WordPress sites using Elementor Pro with:\n• Custom themes & designs\n• WooCommerce integration\n• Speed optimization (95+ PageSpeed)\n• SEO-friendly structure\n\nStarting at **$60** for portfolio sites!`;
        if (/ai|python|machine learning|ml|data science|artificial intelligence/i.test(msg))
            return `🤖 **AI & Data Science:**\n\nI work with Python for:\n• Machine Learning models\n• Data analysis & visualization\n• Face recognition systems\n• Predictive analytics\n• Automation scripts\n\nCheck my [Kaggle Profile](${knowledge.kaggle})!`;
        if (/automat|n8n|workflow|integrate|api/i.test(msg))
            return `⚙️ **Workflow Automation:**\n\nUsing n8n, I can automate:\n• Email notifications\n• CRM integrations (HubSpot, Salesforce)\n• Social media posting\n• Data syncing between apps\n• Custom API workflows\n\nStarting at **$120**!`;
        if (/github|linkedin|twitter|kaggle|social/i.test(msg))
            return `🔗 **Social Links:**\n\n• GitHub: [Abdal-AI](${knowledge.github})\n• LinkedIn: [Muhammad Abdal](${knowledge.linkedin})\n• Kaggle: [Profile](${knowledge.kaggle})\n• Twitter: [@abdalkhan1514](https://x.com/abdalkhan1514)`;
        if (/thank|thanks|thx|appreciate/i.test(msg))
            return `😊 You're welcome! Is there anything else I can help you with?`;
        if (/bye|goodbye|see you|later|exit|quit/i.test(msg))
            return `👋 Goodbye! Thanks for visiting. Feel free to come back anytime!`;
        if (/fiverr|gig|order|freelanc/i.test(msg))
            return `💼 **Order on Fiverr:**\n\nYou can hire me directly on Fiverr!\n\n👉 [Visit My Fiverr Profile](${knowledge.fiverr})\n\n⭐ 5.0 Rating • Fast Delivery • 24/7 Support`;
        if (/help|what can you|how does|how do/i.test(msg))
            return `🤖 **I can help you with:**\n\n• "What services do you offer?"\n• "How much does a website cost?"\n• "How can I contact you?"\n• "Tell me about your projects"\n• "What are your skills?"\n\nJust ask me anything!`;
        return `🤔 I'm not sure I understand. Try asking about:\n\n• **Services** - "What services do you offer?"\n• **Pricing** - "How much does a website cost?"\n• **Contact** - "How can I reach you?"\n• **Projects** - "Show me your work"\n\nOr visit the [Contact Page](contact.html) to message Abdal directly!`;
    };

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

    const toggleBtn  = document.getElementById('toggleChat');
    const closeBtn   = document.getElementById('closeChat');
    const chatWindow = document.getElementById('chatWindow');
    const input      = document.getElementById('chatInput');
    const sendBtn    = document.getElementById('sendMessage');
    const messages   = document.getElementById('chatMessages');

    const toggleChat = () => chatWindow.classList.toggle('active');
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--accent);">$1</a>')
            .replace(/\n/g, '<br>');
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => addMessage(getResponse(text), 'bot'), 300);
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatBot);
} else {
    initChatBot();
}

// ============================================================
// CONTACT FORM — formsubmit.co + Toast + Browser Notification
// ============================================================
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Ask for notification permission on contact page
    requestNotificationPermission();

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:0.5rem"></i>Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        const formData = new FormData(form);
        // Ensure JSON accept header for formsubmit.co
        formData.append('_captcha', 'false');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Replace form with success card
                form.innerHTML = `
                    <div style="text-align: center; padding: 2rem; animation: fadeInUp 0.5s ease forwards;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 1rem; display:block;"></i>
                        <h3 style="margin-bottom: 0.75rem;">Message Sent! 🎉</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Thanks for reaching out! I'll reply to your email within 24 hours.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="border: none;">
                            <i class="fas fa-plus" style="margin-right: 0.5rem;"></i>Send Another
                        </button>
                    </div>
                `;
                Toast.show('✅ Message sent! I\'ll reply within 24 hours.', 'success', 5000);
                sendBrowserNotification('Message Sent!', 'Abdal will reply to your email within 24 hours.');
            } else {
                const data = await response.json().catch(() => ({}));
                const msg = data?.errors?.map(e => e.message).join(', ') || data.message || 'Server error. Please try again.';
                Toast.show(msg, 'error');
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        } catch (err) {
            console.error(err);
            Toast.show('Connection error. Please check your internet.', 'error');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}

// ============================================================
// REVIEW SYSTEM — JSONBin.io (global storage) + Web3Forms (email)
// ============================================================
const initReviewSystem = () => {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;

    const starRating  = document.getElementById('starRating');
    const ratingInput = document.getElementById('rating');
    const reviewsGrid = document.getElementById('reviewsGrid');

    // Ask notification permission
    requestNotificationPermission();

    // ── Star Rating ──────────────────────────────────────────
    let selectedRating = 5;
    const stars = starRating.querySelectorAll('.fa-star');
    stars.forEach(s => s.classList.add('active'));

    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => s.classList.toggle('active', i <= index));
        });
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            ratingInput.value = selectedRating;
            stars.forEach((s, i) => s.classList.toggle('active', i < selectedRating));
        });
    });

    starRating.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => s.classList.toggle('active', i < selectedRating));
    });

    // ── JSONBin Helpers ──────────────────────────────────────
    const JSONBIN_URL  = `https://api.jsonbin.io/v3/b/${CONFIG.JSONBIN_BIN_ID}`;
    const JSONBIN_HEADERS = {
        'Content-Type': 'application/json',
        'X-Master-Key': CONFIG.JSONBIN_API_KEY
    };

    const useCloud = () =>
        CONFIG.JSONBIN_BIN_ID !== 'YOUR_JSONBIN_BIN_ID' &&
        CONFIG.JSONBIN_API_KEY !== 'YOUR_JSONBIN_API_KEY';

    const fetchReviewsFromCloud = async () => {
        const res = await fetch(JSONBIN_URL, { headers: JSONBIN_HEADERS });
        if (!res.ok) throw new Error('JSONBin fetch failed: ' + res.status);
        const json = await res.json();
        return Array.isArray(json.record) ? json.record : [];
    };

    const saveReviewsToCloud = async (reviews) => {
        const res = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: JSONBIN_HEADERS,
            body: JSON.stringify(reviews)
        });
        if (!res.ok) throw new Error('JSONBin save failed: ' + res.status);
    };

    // ── Email Notification via Web3Forms ────────────────────
    const sendEmailNotification = async (review) => {
        if (CONFIG.WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') return; // skip if not set up

        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: CONFIG.WEB3FORMS_KEY,
                subject: `⭐ New ${review.rating}-Star Review from ${review.name}`,
                from_name: 'Portfolio Review System',
                name: review.name,
                email: CONFIG.CONTACT_EMAIL,
                message: `
New review received on your portfolio!

👤 Name:    ${review.name}
🏢 Role:    ${review.role || 'N/A'}
⭐ Rating:  ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)} (${review.rating}/5)
📅 Date:    ${new Date(review.date).toLocaleString()}

💬 Review:
${review.text}

---
This review is now live on your portfolio website.
                `.trim()
            })
        });
    };

    // ── Demo reviews (fallback when no cloud configured) ────
    const getDemoReviews = () => [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "CEO at TechStart",
            rating: 5,
            text: "Exceptional work! Abdal built our e-commerce site and it's been running flawlessly. His attention to detail and quick turnaround time exceeded our expectations.",
            date: new Date(Date.now() - 7  * 86400000).toISOString()
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Marketing Director",
            rating: 5,
            text: "The WordPress site looks amazing and loads super fast. Great communication throughout the project. Highly recommend!",
            date: new Date(Date.now() - 14 * 86400000).toISOString()
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Small Business Owner",
            rating: 5,
            text: "Abdal helped automate our workflow with n8n. Saved us hours of manual work every week. Professional and knowledgeable!",
            date: new Date(Date.now() - 21 * 86400000).toISOString()
        }
    ];

    // ── Fetch reviews: ALWAYS combines real reviews + demo reviews ─
    const STORAGE_KEY = 'portfolioReviews_real'; // separate key so we never mix with old data

    const fetchReviews = async () => {
        const demos = getDemoReviews();

        if (useCloud()) {
            try {
                const cloudReviews = await fetchReviewsFromCloud();
                // Combine: real cloud reviews (newest first) + demo reviews
                return [...cloudReviews, ...demos];
            } catch (err) {
                console.warn('Cloud fetch failed, falling back to localStorage:', err);
            }
        }

        // localStorage: combine real reviews + demo reviews
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return [...local, ...demos];
    };

    // ── Helpers ──────────────────────────────────────────────
    const escapeHtml = (text) => {
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr), now = new Date();
        const days = Math.ceil(Math.abs(now - d) / 86400000);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7)  return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // ── Render reviews ───────────────────────────────────────
    const renderCard = (review, idx) => {
        const avatarColors = ['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981','#06b6d4'];
        const initials  = review.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        const color     = avatarColors[idx % avatarColors.length];
        const starsHTML = Array(5).fill(0).map((_, i) =>
            `<i class="fas fa-star" style="color:${i < review.rating ? 'var(--accent)' : '#334155'}; font-size:0.9rem;"></i>`
        ).join('');
        const isNew  = review._isNew === true;
        // Use animation-delay for stagger — CSS @keyframes handles opacity:1 via 'forwards'
        const delay  = `animation-delay: ${idx * 0.08}s`;
        const border = isNew ? 'border-color: var(--accent); box-shadow: 0 0 0 2px rgba(56,189,248,0.3);' : '';

        return `
            <div class="glass-card review-card review-fade-in"
                 style="${delay}; ${border}"
                 data-new="${isNew}">
                <div class="review-header">
                    <div class="review-avatar" style="background:${color};">${initials}</div>
                    <div class="review-info">
                        <h4 style="margin:0; font-size:1rem;">
                            ${escapeHtml(review.name)}
                            ${isNew ? '<span style="background:var(--accent);color:#0f172a;font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:20px;margin-left:0.5rem;font-weight:700;vertical-align:middle;">NEW</span>' : ''}
                        </h4>
                        ${review.role ? `<p style="margin:0; color:var(--text-secondary); font-size:0.85rem;">${escapeHtml(review.role)}</p>` : ''}
                        <div style="margin-top:0.25rem;">${starsHTML}</div>
                    </div>
                </div>
                <p class="review-text">${escapeHtml(review.text)}</p>
                <p class="review-date">${formatDate(review.date)}</p>
            </div>`;
    };

    const loadReviews = async (showAll = false) => {
        // Show spinner
        reviewsGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size:2rem; color:var(--accent);"></i>
                <p style="margin-top:0.75rem; color:var(--text-secondary);">Loading reviews...</p>
            </div>`;

        try {
            const reviews = await fetchReviews();

            if (!reviews.length) {
                reviewsGrid.innerHTML = `
                    <div class="glass-card review-card" style="grid-column:1/-1; text-align:center; padding:3rem 2rem;">
                        <i class="fas fa-comments" style="font-size:3rem; color:var(--accent); margin-bottom:1rem; opacity:0.5;"></i>
                        <p style="color:var(--text-secondary);">No reviews yet. Be the first!</p>
                    </div>`;
                return;
            }

            // Sort newest first
            reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

            const LIMIT   = 3;
            const visible = showAll ? reviews : reviews.slice(0, LIMIT);
            const hasMore = reviews.length > LIMIT;

            // Render cards — CSS @keyframes handles fade-in automatically
            reviewsGrid.innerHTML = visible.map((r, i) => renderCard(r, i)).join('');

            // Show More / Show Less button
            if (hasMore) {
                const btnWrap = document.createElement('div');
                btnWrap.style.cssText = 'grid-column:1/-1; text-align:center; margin-top:2rem;';
                if (!showAll) {
                    btnWrap.innerHTML = `
                        <button id="reviewToggleBtn" class="btn btn-primary" style="border:none; min-width:200px;">
                            <i class="fas fa-chevron-down" style="margin-right:0.5rem;"></i>
                            Show All Reviews (${reviews.length})
                        </button>`;
                    reviewsGrid.appendChild(btnWrap);
                    document.getElementById('reviewToggleBtn').addEventListener('click', () => loadReviews(true));
                } else {
                    btnWrap.innerHTML = `
                        <button id="reviewToggleBtn" class="btn btn-outline" style="border:2px solid var(--accent); min-width:200px;">
                            <i class="fas fa-chevron-up" style="margin-right:0.5rem;"></i>
                            Show Less
                        </button>`;
                    reviewsGrid.appendChild(btnWrap);
                    document.getElementById('reviewToggleBtn').addEventListener('click', () => {
                        loadReviews(false);
                        document.getElementById('reviewsDisplay').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                }
            }
        } catch (err) {
            console.error('Error loading reviews:', err);
            reviewsGrid.innerHTML = `
                <div class="glass-card review-card" style="text-align:center; padding:2rem;">
                    <p style="color:var(--text-secondary);">Could not load reviews. Please refresh.</p>
                </div>`;
        }
    };

    // ── Save a new review ────────────────────────────────────
    const saveReview = async (review) => {
        // 1. Fire email notification (non-blocking)
        sendEmailNotification(review).catch(err => console.warn('Email notify failed:', err));

        // 2. Save to cloud (JSONBin) if configured
        if (useCloud()) {
            try {
                const existing = await fetchReviewsFromCloud();
                // Just append — demo reviews are never stored in cloud
                await saveReviewsToCloud([...existing, review]);
                return true;
            } catch (err) {
                console.warn('Cloud save failed, saving locally instead:', err);
            }
        }

        // 3. localStorage fallback — save ONLY real reviews (demos are always added dynamically)
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        local.push(review);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
        return true;
    };

    // ── Form submission ──────────────────────────────────────
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn       = reviewForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled    = true;
        submitBtn.innerHTML   = '<i class="fas fa-spinner fa-spin" style="margin-right:0.5rem;"></i>Submitting...';

        const name   = document.getElementById('reviewerName').value.trim();
        const role   = document.getElementById('reviewerRole').value.trim();
        const rating = parseInt(ratingInput.value);
        const text   = document.getElementById('reviewText').value.trim();

        if (!name || !text || rating < 1 || rating > 5) {
            Toast.show('Please fill in all required fields.', 'warning');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            return;
        }

        const review = {
            id:     Date.now(),
            name,
            role,
            rating,
            text,
            date: new Date().toISOString()
        };

        try {
            // Mark as new so it shows a "NEW" badge
            review._isNew = true;
            await saveReview(review);

            // Replace form with success card
            const formCard = reviewForm.closest('.glass-card');
            formCard.innerHTML = `
                <div style="text-align:center; padding:2rem;">
                    <i class="fas fa-check-circle" style="font-size:4rem; color:#10b981; margin-bottom:1rem; display:block;"></i>
                    <h3 style="margin-bottom:0.5rem;">Thank You, ${escapeHtml(name)}! 🎉</h3>
                    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">
                        Your ${rating}-star review is now shown in <strong>What Clients Say</strong> below!
                    </p>
                    <button onclick="location.reload()" class="btn btn-primary" style="border:none;">
                        <i class="fas fa-plus" style="margin-right:0.5rem;"></i>Add Another Review
                    </button>
                </div>`;

            Toast.show(`Thank you, ${name}! Your review is live below! 🌟`, 'success', 5000);
            sendBrowserNotification('Review Submitted!', `Your ${rating}-star review is now live!`);

            // Reload the reviews grid — review will appear at top with NEW badge
            await loadReviews();

            // Scroll smoothly to the reviews section
            setTimeout(() => {
                document.getElementById('reviewsDisplay')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        } catch (err) {
            console.error('Review save error:', err);
            Toast.show('Error submitting review. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });

    // Initial load
    loadReviews();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewSystem);
} else {
    initReviewSystem();
}

// ============================================================
// PAYMENT — Copy-to-Clipboard for EasyPaisa / UBL Account Numbers
// ============================================================
function copyToClipboard(text, textElId, iconElId) {
    // Fallback for older mobile browsers
    const fallback = () => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch(e) {}
        document.body.removeChild(ta);
    };

    const done = () => {
        // Update icon to checkmark
        const icon = document.getElementById(iconElId);
        if (icon) {
            icon.className = 'fas fa-check';
            icon.style.color = '#22c55e';
            setTimeout(() => {
                icon.className = 'fas fa-copy';
                icon.style.color = '';
            }, 2000);
        }
        Toast.show('✅ Copied to clipboard!', 'success', 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
        done();
    } else {
        fallback();
        done();
    }
}
