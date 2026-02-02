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
        
        // Close menu when a link is clicked - attach to actual <a> tags
        navLinks.forEach(li => {
            const link = li.querySelector('a');
            if (link) {
                // Regular click event
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    // Close menu immediately
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    // Force navigation on mobile if default doesn't work
                    if (href && !e.defaultPrevented) {
                        // Small delay to let menu close animation start
                        setTimeout(() => {
                            window.location.href = href;
                        }, 50);
                    }
                });
                
                // Add touchend as backup for mobile
                link.addEventListener('touchend', (e) => {
                    const href = link.getAttribute('href');
                    if (href) {
                        e.preventDefault(); // Prevent double-firing
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        window.location.href = href;
                    }
                }, { passive: false });
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}

// Chatbot Logic with Gemini API Integration
const initChatBot = () => {
    // ⚠️ IMPORTANT: Replace with your actual Gemini API key
    // Get your free key at: https://aistudio.google.com/app/apikey
    const GEMINI_API_KEY = 'AIzaSyBwFbdKLE4U8Hw7BAnSELTMyk5b6saqJ5Q';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // Conversation history for context
    let conversationHistory = [];
    
    // System context about Abdal
    const systemContext = `You are an AI assistant for Muhammad Abdal's professional portfolio website. 
    
About Muhammad Abdal:
- Expert in Web Development (WordPress, custom sites)
- Specializes in AI Automation using n8n
- Data Scientist with expertise in Python, ML, and analysis
- Contact: muhammadabdal15140@gmail.com
- Services offered: 
  * Web Development (Portfolio sites starting at $60, Business sites at $150, E-commerce at $400)
  * AI Automation workflows with n8n
  * Data Analysis and Machine Learning projects
- Notable projects: Library Management System, Titanic Survival Prediction, E-commerce platforms
- Social: GitHub (Abdal-AI), LinkedIn, Kaggle

Be helpful, professional, and concise. If asked about services or pricing, provide accurate information. 
If asked to contact him, direct users to the contact form or email. Keep responses friendly and under 3 sentences when possible.`;

    // Inject HTML
    const chatHTML = `
    <div class="chat-widget">
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <div>
                    <h3>AI Assistant</h3>
                    <p style="font-size: 0.75rem; color: var(--accent); margin: 0;" id="chatStatus">Powered by Gemini</p>
                </div>
                <button class="chat-close" id="closeChat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    👋 Hello! I'm Abdal's AI Assistant powered by Google Gemini. I can answer questions about his services, projects, and expertise. How can I help you today?
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
    const chatWindow = document.getElementById('chatWindow');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const messages = document.getElementById('chatMessages');
    const statusText = document.getElementById('chatStatus');

    // Toggle Chat
    const toggleChat = () => chatWindow.classList.toggle('active');
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Add typing indicator
    const showTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    };

    const hideTypingIndicator = () => {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    };

    // Add Message to UI
    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        // Support markdown-like formatting
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        div.innerHTML = formattedText;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    // Get AI Response from Gemini
    const getGeminiResponse = async (userMessage) => {
        try {
            // Add user message to history
            conversationHistory.push({
                role: 'user',
                parts: [{ text: userMessage }]
            });

            // Prepare the request
            const requestBody = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: systemContext }]
                    },
                    ...conversationHistory
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 200,
                }
            };

            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                
                // Add AI response to history
                conversationHistory.push({
                    role: 'model',
                    parts: [{ text: aiResponse }]
                });

                // Keep history manageable (last 10 exchanges)
                if (conversationHistory.length > 20) {
                    conversationHistory = conversationHistory.slice(-20);
                }

                return aiResponse;
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('Gemini API Error:', error);
            
            // Fallback to basic responses if API fails
            if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
                return "⚠️ Please configure your Gemini API key to enable AI responses. Get your free API key at https://aistudio.google.com/app/apikey";
            }
            
            return "I'm having trouble connecting right now. Please try again or use the Contact form to reach Abdal directly at muhammadabdal15140@gmail.com";
        }
    };

    // Send Message Logic
    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // Disable input while processing
        input.disabled = true;
        sendBtn.disabled = true;

        // Add User Message
        addMessage(text, 'user');
        input.value = '';

        // Show typing indicator
        showTypingIndicator();
        statusText.textContent = 'Thinking...';

        // Get AI Response
        const response = await getGeminiResponse(text);
        
        // Hide typing indicator and add response
        hideTypingIndicator();
        addMessage(response, 'bot');
        
        // Re-enable input
        input.disabled = false;
        sendBtn.disabled = false;
        statusText.textContent = 'Powered by Gemini';
        input.focus();
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
