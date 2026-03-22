# MARCVS — A Stoic Chatbot

> *"You have power over your mind, not outside events. Realize this, and you will find strength."*

A purpose-built chatbot where you converse directly with **Marcus Aurelius** — Roman Emperor (161–180 AD), general, and Stoic philosopher.

---

## Why This Topic

Marcus Aurelius wrote the *Meditations* as a private journal — never intended for publication. It's arguably the most intimate document of philosophical struggle ever written: a man who commanded an empire, fought wars, and buried children, yet returned every morning to remind himself how to be better.

Stoicism has a rare quality among philosophies: it's **immediately practical**. The gap between "reading about it" and "using it right now" is near zero. That makes it perfect for a conversational format — Marcus isn't lecturing, he's counselling.

The design reflects this: dark, aged, textured — like speaking across centuries. Not a product, but an audience with a person.

---

## Deployed Link 

https://marcus-aurelius-jdgc.vercel.app/

---

## What's Built

- **Next.js 14** (App Router, TypeScript)
- **Claude gemini-1.5-flash** via Gemini API with streaming
- **Custom Marcus persona** — a rich system prompt drawing from the *Meditations*, Stoic doctrine, and historical context
- Streaming responses with real-time text rendering
- Landing/hero screen with dramatic first impression
- Empty state with 5 contextual starter prompts
- Typing indicator, error states, responsive design
- Roman aesthetic: Cinzel + Crimson Pro typography, gold accents, marble texture

---

## Running Locally

```bash
# 1. Clone and install
git clone https://github.com/yourusername/marcus-stoic-chatbot
cd marcus-stoic-chatbot
npm install

# 2. Set your API key
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard:
# GEMINI_API_KEY = your_key_here
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) and add `GEMINI_API_KEY` in Project Settings → Environment Variables.

---

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Streaming API route (Anthropic SDK)
│   ├── globals.css          # All styles (Roman aesthetic system)
│   ├── layout.tsx           # Root layout + fonts
│   └── page.tsx             # Landing + Chat views
├── .env.example
└── README.md
```

---

## Design Decisions

| Decision | Reasoning |
|---|---|
| Speak *as* Marcus, not *about* Stoicism | Makes it feel purpose-built, not a Q&A bot |
| Landing screen before chat | Establishes context and gravitas before a word is typed |
| Starter prompts in empty state | Reduces blank-page paralysis; each prompt is emotionally resonant |
| Streaming responses | Feels like thought forming, not a database lookup |
| Dark marble aesthetic | Ancient without being kitsch; the contrast signals depth |
| Cinzel + Crimson Pro | Roman-inscriptional paired with scholarly serif — no generic sans-serif |

---

*Built for Thinkly Labs Software Engineering Assignment · March 2026*
