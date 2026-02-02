# Gemini AI Chatbot Setup Guide

## 🎉 Your AI Agent is Ready!

I've successfully integrated **Google Gemini AI** into your chatbot. The AI is now powered by Google's advanced language model and will provide intelligent, context-aware responses about your services, expertise, and projects.

## 🔑 Getting Your FREE Gemini API Key

Follow these simple steps:

1. **Visit Google AI Studio**
   - Go to: https://aistudio.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key" button
   - Choose "Create API key in new project" (or select existing project)
   - Copy your API key (it starts with `AIza...`)

3. **Add API Key to Your Code**
   - Open `script.js` file
   - Find line 100: `const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
   - Save the file

Example:

```javascript
const GEMINI_API_KEY = "AIzaSyD_xxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

## ✨ What's New?

### 1. **AI-Powered Conversations**

- Real responses from Google Gemini AI
- Context-aware (remembers conversation history)
- Trained about your services and expertise

### 2. **Enhanced Features**

- Typing indicator (three bouncing dots)
- "Thinking..." status when processing
- Markdown formatting support (**bold**, _italic_)
- Error handling with helpful messages

### 3. **Smart Knowledge Base**

The AI knows about:

- Your services (Web Development, AI Automation, Data Science)
- Pricing ($60 portfolios, $150 business sites, $400 e-commerce)
- Contact info (muhammadabdal15140@gmail.com)
- Notable projects and skills
- Social media profiles

## 🧪 Testing Your AI Chatbot

Once you add your API key:

1. Open your website in a browser
2. Click the robot icon (💬) in the bottom right corner
3. Try these test questions:
   - "What services do you offer?"
   - "How much for a portfolio website?"
   - "Tell me about your AI automation expertise"
   - "How can I contact you?"
   - "What projects have you worked on?"

## 🛡️ Security Best Practices

### For Development:

✅ **Current setup is fine** - API key in JavaScript is acceptable for testing

### For Production (when deploying):

⚠️ **Important**: Never expose API keys in client-side code for production!

**Recommended approach:**

1. Create a backend API (Node.js/Express, Python/Flask, etc.)
2. Store API key in environment variables on your server
3. Call your backend from the chatbot
4. Your backend forwards requests to Gemini API

**Quick Example** (Node.js backend):

```javascript
// server.js
app.post("/api/chat", async (req, res) => {
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  res.json(await response.json());
});
```

Then update your frontend to call `/api/chat` instead of Gemini directly.

## 📊 Free Tier Limits

Google Gemini offers generous free limits:

- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

Perfect for a portfolio website! If you exceed limits, you'll get helpful error messages.

## 🎨 Customization

### Change AI Personality

Edit the `systemContext` variable in `script.js` (line 106) to adjust how the AI responds.

### Adjust Response Length

Modify `maxOutputTokens` (line 178) - currently set to 200 tokens (~150 words)

### Temperature Setting

Change `temperature` (line 175) - currently 0.7 (balanced creativity)

- Lower (0.2-0.5): More focused, consistent
- Higher (0.8-1.0): More creative, varied

## 🐛 Troubleshooting

### "Please configure your Gemini API key"

→ You need to add your API key to `script.js`

### API Errors

→ Check browser console (F12) for details
→ Verify API key is correct
→ Ensure you haven't exceeded free tier limits

### No Response

→ Check internet connection
→ Open browser DevTools (F12) → Console tab to see errors

## 🚀 Next Steps

1. ✅ Get your Gemini API key
2. ✅ Add it to `script.js`
3. ✅ Test the chatbot
4. ✅ Customize the system context if needed
5. ✅ Deploy your website!

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your API key is correct
3. Make sure you're not exceeding rate limits

---

**Enjoy your new AI-powered chatbot! 🤖✨**
