# 🌿 GrassQuest

### AI-powered outdoor missions that help you spend less time on screens and more time outside.

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange)](https://hacktoberfest.com/)
[![Gemma](https://img.shields.io/badge/AI-Gemma-blue)](https://ai.google.dev/gemma)
[![Ollama](https://img.shields.io/badge/AI-Ollama-black)](https://ollama.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)

> 🌿 **Touch Grass. Generate less screen time. Experience more real life.**

GrassQuest is an open-weight AI-powered outdoor mission generator built for **Hacktoberfest 2026 Week 1: Touch Grass**.

Instead of using AI to keep people on their screens, GrassQuest uses AI to give people a reason to **put their phones away and go outside**.

---

## 🚀 Live Demo

👉 **[Try GrassQuest](https://grass-quest-oxjak7diy-laytontozvireva-stars-projects.vercel.app/)**

## 💻 Source Code

👉 **[View GrassQuest on GitHub](https://github.com/laytontozvireva-star/-GrassQuest.git)**

---

# 🎯 The Idea

Modern applications are designed to keep people engaged with their screens.

GrassQuest takes the opposite approach.

The user gives the application three preferences:

- ⏱️ How much time they have
- 🌳 What type of activity they want
- ⚡ Their energy level

GrassQuest then generates a short outdoor mission using **Gemma**, an open-weight AI model running through **Ollama**.

The user reads the mission and then leaves the screen behind.

### The experience

**Choose → Generate → Go Outside → Complete → Reflect**

The screen is intentionally only a small part of the experience.

---

# 🤖 Open-Weight AI

GrassQuest uses **Gemma through Ollama** to generate personalized outdoor missions.

The AI is not simply an extra chatbot feature. It is part of the core mission-generation workflow.

The application sends the user's preferences to the backend, which creates a structured prompt for Gemma.

Gemma generates a mission containing:

- Mission title
- Duration
- Five activity steps
- Safety reminder

The application then validates the generated response before showing it to the user.

### Why open-weight AI?

Using an open-weight model gives GrassQuest more control over:

- 🧩 Prompt design
- 💻 Local inference
- 🔄 Model experimentation
- 🛠️ Application behavior
- 🔐 Privacy-focused future development
- 💰 Reduced dependence on paid closed APIs

This approach fits the Hacktoberfest 2026 focus on building with open-source AI and open-weight models.

---

# 🌿 Example Mission

A user might choose:

```text
Time: 30 minutes
Activity: Nature
Energy: Relaxed
```

GrassQuest can generate an outdoor mission such as:

```text
🌳 Nature Observation Walk

Duration: 30 minutes

1. Put your phone away.
2. Walk slowly through a familiar outdoor area.
3. Notice three different sounds.
4. Observe three interesting natural details.
5. Pause and reflect before returning.

Safety:
Stay in a familiar safe area and avoid roads.
```

The objective is not to keep the user interacting with the application.

The objective is to get them **outside**.

---

# 🛡️ Safety System

AI-generated content needs validation, especially when it encourages physical activities.

GrassQuest includes a backend safety validation layer.

The application checks generated missions for potentially unsafe instructions, including:

- ❌ Climbing
- ❌ Swimming
- ❌ Crossing roads
- ❌ Entering private property
- ❌ Touching wildlife
- ❌ Touching unknown plants
- ❌ Eating wild plants

If an unsafe instruction is detected, GrassQuest rejects the generated mission and provides a predefined safe fallback mission.

This creates an additional safety layer between the AI model and the user.

---

# 🔌 AI Fallback System

GrassQuest is designed to remain useful even when the AI model is unavailable.

### Normal AI flow

```text
User Preferences
       ↓
GrassQuest Backend
       ↓
Gemma + Ollama
       ↓
Safety Validation
       ↓
Outdoor Mission
```

### Fallback flow

```text
User Preferences
       ↓
GrassQuest Backend
       ↓
Safe Mission Engine
       ↓
Outdoor Mission
```

This means the application's core experience does not completely depend on the AI service being available.

---

# 📖 Outdoor Journal

After completing a mission, users can write a short reflection.

GrassQuest stores reflections locally in the browser using `localStorage`.

The journal allows users to look back at their completed adventures.

### Mission lifecycle

```text
Choose preferences
        ↓
Generate mission
        ↓
Start adventure
        ↓
Put phone away
        ↓
Go outside
        ↓
Complete mission
        ↓
Write reflection
        ↓
View journal
```

---

# ✨ Features

- 🌿 AI-generated outdoor missions
- 🤖 Gemma + Ollama integration
- ⏱️ Multiple mission durations
- 🌳 Multiple outdoor activity types
- ⚡ Energy-level selection
- 🛡️ AI safety validation
- 🔌 Safe fallback missions
- 🗺️ Adventure Plan interface
- ✅ Mission completion flow
- 📖 Personal outdoor journal
- 💾 Local browser storage
- 📱 Responsive design
- 🎨 Tailwind CSS interface

---

# 🧑‍💻 Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive design |
| Node.js | Backend runtime |
| Express | REST API |
| Gemma | Open-weight AI model |
| Ollama | Local AI inference |
| localStorage | Journal/reflection storage |
| Git | Version control |
| GitHub | Open-source repository |
| Vercel | Frontend deployment |

---

# 📁 Project Structure

```text
GrassQuest/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── server/
│   └── server.js
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

---

# ⚙️ Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/laytontozvireva-star/-GrassQuest.git
```

```bash
cd -GrassQuest
```

## 2. Install dependencies

```bash
npm install
```

## 3. Install Ollama

Install Ollama from:

https://ollama.com/

Then download the Gemma model used by GrassQuest:

```bash
ollama pull gemma3:1b
```

Make sure Ollama is running.

## 4. Start the backend

Open a terminal:

```bash
node server/server.js
```

The API runs on:

```text
http://localhost:5001
```

## 5. Start the React application

Open another terminal:

```bash
npm start
```

The application will normally open at:

```text
http://localhost:3000
```

---

# 🔐 Safety & Privacy

GrassQuest is designed around simple, safe outdoor activities.

The application does not require users to create an account for the journal functionality.

Reflections are stored using browser `localStorage`.

The project also validates AI-generated missions before presenting them to the user.

> **Important:** GrassQuest provides general outdoor activity suggestions. Users should always consider their surroundings, weather, physical ability, and local safety conditions.

---

# 🎓 What I Learned

Building GrassQuest taught me that adding AI to an application involves much more than writing a prompt.

I learned about:

- AI prompt engineering
- Structured AI responses
- JSON parsing
- AI safety validation
- Fallback systems
- React state management
- REST APIs
- Express backend development
- Local AI inference
- Browser local storage
- Responsive UI design
- Git and GitHub
- Deployment

The biggest lesson was:

> **AI should support the experience, not become the experience.**

---

# 🏆 Hacktoberfest 2026

GrassQuest was created for the **Hacktoberfest Open-Source AI Challenge — Week 1: Touch Grass**.

The project is especially relevant to the challenge because its purpose is to use open-weight AI to encourage people to spend time outside.

It also demonstrates a practical use of **Gemma** in an application rather than using AI simply as a conversational interface.

Hacktoberfest 2026 is centered around meaningful building and experimentation with open-source AI and open-weight models.

### Challenge Categories

🌿 **Touch Grass**

🤖 **Best Use of Gemma**

---

# 🔮 Future Improvements

Possible future versions could include:

- 📍 Location-aware missions
- 🌦️ Weather-aware recommendations
- 🐦 Birding and nature missions
- 🗺️ Outdoor route suggestions
- 📱 Progressive Web App support
- 📊 Outdoor activity statistics
- 🔄 Support for additional open-weight models
- 🔐 More local-first functionality
- 🌎 Community-created outdoor missions

---

# 🤝 Contributing

Contributions and ideas are welcome.

If you have an idea for improving GrassQuest:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the application
5. Submit a pull request

---

# 📄 License

This project is open source. Add your preferred license here if you decide to publish the repository under a specific license.

---

# 🌱 Final Thought

GrassQuest started with one simple question:

> **Can we use AI to help people spend less time using technology?**

Instead of asking:

**"What should I watch next?"**

GrassQuest asks:

**"What can I do outside right now?"**

🌿 **Generate less screen time. Experience more real life.**

---

## 🔗 Links

🌐 **Live Demo:**  
https://grass-quest-oxjak7diy-laytontozvireva-stars-projects.vercel.app/

💻 **GitHub:**  
https://github.com/laytontozvireva-star/-GrassQuest.git

🏆 **Hacktoberfest 2026:**  
https://hacktoberfest.com/