# 🏫 Model Primary School, Bharsare (मॉडल प्राइमरी स्कूल)

> **Official website for Model Primary School, Bharsare, Bhadaiyan, Sultanpur, Uttar Pradesh.**  
> *Government-recognised English-medium primary school (LKG to Class 5) led by State Teacher Awardee Smt. Vandana Yadav.*

Live Site: **[https://www.modelprimaryschool.in/](https://www.modelprimaryschool.in/)**

---

## 🌟 Key Features

- 🏫 **Modern Responsive UI/UX**: Custom design system built with smooth animations (GSAP, Lenis), mobile-first Tailwind CSS, and vibrant visual cards.
- 🌐 **Bilingual Support (Hindi & English)**: Full multi-language state management allowing parents and visitors to toggle seamlessly between Hindi and English.
- 🤖 **Interactive EV Chatbot**: 100% menu-driven voice & text assistant equipped with custom Text-to-Speech (TTS) sanitization for natural Hindi/English pronunciation (phone digit splitting, time formatting, dash replacement, clickable HTML links).
- ✉️ **Vercel Serverless Contact Form**: Direct email delivery using Node.js `nodemailer` running on a Vercel Serverless API (`/api/contact.js`) with Gmail SMTP integration.
- 📍 **Interactive Google Maps**: Embedded map pinned to exact GPS coordinates (`26.134750°N, 82.142278°E`) with custom school pin location.
- 🎯 **Advanced SEO & GEO (Generative Engine Optimization)**:
  - Full JSON-LD `@graph` schema markup (`EducationalOrganization`, `Person` for Principal, `FAQPage`, `WebSite`, `BreadcrumbList`).
  - Machine-readable NAP (Name, Address, Phone) summary block optimized for AI engines (ChatGPT Search, Perplexity, Google AI Overviews).
  - Open Graph & Twitter Card social metadata.
  - Dynamically generated `sitemap.xml` and `robots.txt` explicitly permitting AI search bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Googlebot`).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React Icons, Swiper.js
- **Animations & Smooth Scroll**: GSAP, ScrollTrigger, Lenis
- **Backend API**: Vercel Serverless Functions (`/api/contact.js`), Nodemailer
- **Audio / Voice**: Web Speech API (`SpeechSynthesis`) with custom VoiceEngine sanitization
- **Deployment**: Vercel (Canonical domain: `www.modelprimaryschool.in`)

---

## 📁 Project Structure

```text
school-app/
├── api/
│   └── contact.js          # Vercel Serverless Function (Nodemailer SMTP email handler)
├── public/
│   ├── favicon.svg         # School crest favicon
│   ├── robots.txt          # Search engine & AI crawler permissions
│   ├── sitemap.xml         # XML Sitemap for all 6 routes
│   └── assets/             # Campus, activities & awards image assets
├── src/
│   ├── ev/
│   │   ├── EVChatbot.jsx   # Interactive Voice/Text AI Chatbot component
│   │   ├── KnowledgeBase.js# Bilingual chatbot Q&A knowledge tree ({ display, speak })
│   │   └── VoiceEngine.js  # TTS sanitization engine (number, time, dash processing)
│   ├── App.jsx             # Main Router & Layout wrapper
│   ├── School.jsx          # Home, About, Academics, Gallery, Admissions, Contact pages
│   ├── index.css           # Design tokens, custom utility classes & pencil styling
│   └── main.jsx            # React entry point
├── .env                    # Environment variables (SMTP credentials - Git ignored)
├── vercel.json             # Vercel rewrite & routing configuration
├── vite.config.js          # Vite build configuration
└── package.json            # Dependencies & scripts
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Imsujal16/Model-Primary-School.git
   cd Model-Primary-School/school-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup (`.env`)
Create a `.env` file in the `school-app` root directory:
```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_TO=psbharsare@gmail.com
```

### Running Locally
- **Frontend Dev Server**:
  ```bash
  npm run dev
  ```
- **Vercel Local Dev (Frontend + Serverless `/api/contact`)**:
  ```bash
  npx vercel dev
  ```

### Production Build
```bash
npm run build
```

---

## 📄 License & Attribution

© **Model Primary School, Bharsare**. All rights reserved.  
*Primary Education & School Management — Sultanpur, Uttar Pradesh, India.*
