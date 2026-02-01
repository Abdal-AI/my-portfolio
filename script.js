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
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
        
        // Close menu when a link is clicked
        const closeMenu = () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((link, index) => {
                link.style.animation = '';
            });
        };
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
            link.addEventListener('touchstart', closeMenu); // Add touch support
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}

// Chatbot Logic
const initChatBot = () => {
    // Inject HTML
    const chatHTML = `
    <div class="chat-widget">
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <div>
                    <h3>AI Assistant</h3>
                    <p style="font-size: 0.75rem; color: var(--accent); margin: 0;">Online</p>
                </div>
                <button class="chat-close" id="closeChat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    Hello! I'm Abdal's AI Assistant. How can I help you today?
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" class="chat-input" id="chatInput" placeholder="Type a message...">
                <button class="chat-send" id="sendMessage"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <button class="chat-toggle" id="toggleChat">
            <i class="fas fa-robot"></i>
        </button>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Elements
    const toggleBtn = document.getElementById('toggleChat');
    const closeBtn = document.getElementById('closeChat');
    const window = document.getElementById('chatWindow');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const messages = document.getElementById('chatMessages');

    // Toggle Chat
    const toggleChat = () => window.classList.toggle('active');
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Send Message Logic
    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user');
        input.value = '';

        // Simulate AI Thinking
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 1000);
    };

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const getBotResponse = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('price') || lower.includes('cost')) return "My pricing starts at $60 for a portfolio site. Check the Services page for full packages!";
        if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) return "You can reach me at muhammadabdal15140@gmail.com or use the Contact form.";
        if (lower.includes('service') || lower.includes('do')) return "I offer Web Development, AI Automation, and Data Analysis. What do you need?";
        if (lower.includes('hello') || lower.includes('hi')) return "Hi there! Ready to build something amazing?";
        return "Thanks for your message! I'm a demo agent, but Abdal will get back to you personally if you use the Contact page.";
    };

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
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
