# MARCVS — Converse with the Emperor

> *"You have power over your mind, not outside events. Realize this, and you will find strength."*
> — Marcus Aurelius, Meditations

**Live Demo → [marcus-aurelius-jdgc.vercel.app](https://marcus-aurelius-c46l.vercel.app/)**

**GitHub → [github.com/IshantttGupta/MARCUS-AURELIUS](https://github.com/IshantttGupta/MARCUS-AURELIUS)**

---

## Deployed Link

https://marcus-aurelius-c46l.vercel.app/

---

## What I Built

A purpose-built chatbot where you converse directly with **Marcus Aurelius** — Roman Emperor (161–180 AD) and Stoic philosopher. Not a generic Q&A wrapper about Stoicism, but a full embodiment: Marcus speaks in first person, draws from his own actual writings, and responds as if you are seeking private counsel from the Emperor himself.

The knowledge base is the **Meditations** — the actual text — embedded directly into the model's system prompt. When Marcus responds, he quotes and paraphrases his own real words, not a summarized version of them.

---

## Why This Topic

Marcus Aurelius wrote the Meditations as a **private journal** — never intended for publication. It is arguably the most intimate document of philosophical struggle ever written: a man who commanded an empire, fought wars on the frontier, and buried children, yet returned every morning to remind himself how to be better.

Stoicism has a rare quality among philosophies: it is **immediately practical**. The gap between reading about it and using it right now is near zero. That makes it perfect for a conversational format — Marcus isn't lecturing, he's counselling. Every question a user might bring — anger, grief, fear of death, meaninglessness — has a direct answer Marcus can give from lived experience.

The design reflects this: dark, aged, atmospheric — like speaking across centuries. Not a product, but an audience with a person.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| AI Model | Gemini 2.5 Flash via Google Generative AI SDK |
| Animation | AnimeJS v4 — SVG line draw on landing + gold particle system in chat |
| Fonts | Cinzel (Roman inscriptional) + Crimson Pro (scholarly serif) |
| Deployment | Vercel |

---

## Features

**The Experience**
- Dramatic landing page with animated Roman geometric SVG lines drawing themselves in on loop
- Marcus Aurelius portrait faded into the background on both landing and chat — ghostly, atmospheric
- Gold particle system (dots, diamonds, sparks) floating through the chat background

**The Chatbot**
- Meditations text embedded directly in the system prompt
- Streaming responses — text appears word by word, like thought forming
- Marcus speaks entirely in character — first person, never breaks

**UI States**
- Landing / hero with staggered fade animations
- Empty state with 5 contextual starter prompts — editorial layout, not a button grid
- Typing indicator while Marcus composes his response
- Error state with thematic copy ("Marcus has withdrawn to his private chambers")
- Fully responsive

---

## Running Locally
```bash
git clone https://github.com/IshantttGupta/MARCUS-AURELIUS.git
cd MARCUS-AURELIUS
npm install
```

Create `.env.local` in the root:
```
GEMINI_API_KEY=your_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com) → Get API Key.
```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

---

## Project Structure
```
├── app/
│   ├── api/chat/route.ts   # Streaming API — Gemini SDK + Marcus system prompt
│   ├── globals.css         # Full Roman design system
│   ├── layout.tsx          # Root layout + Cinzel/Crimson Pro fonts
│   └── page.tsx            # Landing + Chat views, AnimeJS animations
├── public/
│   └── Marcus.png          # Portrait used as background
└── README.md
```

---

## Design Decisions

| Decision | Reasoning |
|---|---|
| Speak *as* Marcus, not *about* Stoicism | Makes it feel purpose-built, not a Wikipedia wrapper |
| Meditations text in system prompt | Marcus quotes his own actual words, not a summarized persona |
| Landing screen before chat | Establishes gravitas before a word is typed |
| Starter prompts in empty state | Reduces blank-page paralysis; each prompt is emotionally resonant |
| Streaming responses | Feels like thought forming, not a database lookup |
| AnimeJS SVG line draw on landing | Roman geometric motif that animates in — sets the tone immediately |
| Gold particles in chat | Atmospheric depth without distracting from the conversation |
| Cinzel + Crimson Pro fonts | Roman-inscriptional display paired with scholarly serif — no generic sans-serif |
| Dark marble aesthetic | Ancient without being kitsch; signals depth over decoration |
| Portrait as background | Ghostly presence of Marcus behind every message — immersive |

---

*Built for Thinkly Labs Software Engineering Assignment · March 2026*
