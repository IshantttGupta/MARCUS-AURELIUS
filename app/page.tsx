"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "I am consumed by anger at someone who wronged me. What counsel do you offer?",
  "How do I find meaning when my work feels pointless?",
  "I fear death. How did you make peace with mortality?",
  "The world feels chaotic and beyond my control. Where do I find peace?",
  "What is the single most important Stoic practice you would recommend?",
];

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

// ── ROMAN GEOMETRIC LINES (Landing) ──────────────────────────────────────
function RomanLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    import("animejs").then(({ animate, svg, stagger }) => {
      if (!svgRef.current) return;
      const drawables = svg.createDrawable(".roman-line");
      const anim = animate(drawables, {
        draw: ["0 0", "0 1", "1 1"],
        ease: "inOutQuad",
        duration: 2200,
        delay: stagger(120),
        loop: true,
      });
      cleanup = () => anim.pause();
    });

    return () => cleanup?.();
  }, []);

  return (
    <svg ref={svgRef} className="roman-svg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect className="roman-line" x="20" y="20" width="560" height="360" fill="none" stroke="#b8902a" strokeWidth="1" />
      <rect className="roman-line" x="36" y="36" width="528" height="328" fill="none" stroke="#b8902a" strokeWidth="0.5" opacity="0.5" />
      <path className="roman-line" d="M20,60 L20,20 L60,20" fill="none" stroke="#d4a843" strokeWidth="2.5" />
      <path className="roman-line" d="M20,52 L20,20 L52,20" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
      <path className="roman-line" d="M540,20 L580,20 L580,60" fill="none" stroke="#d4a843" strokeWidth="2.5" />
      <path className="roman-line" d="M548,20 L580,20 L580,52" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
      <path className="roman-line" d="M20,340 L20,380 L60,380" fill="none" stroke="#d4a843" strokeWidth="2.5" />
      <path className="roman-line" d="M20,348 L20,380 L52,380" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
      <path className="roman-line" d="M540,380 L580,380 L580,340" fill="none" stroke="#d4a843" strokeWidth="2.5" />
      <path className="roman-line" d="M548,380 L580,380 L580,348" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
      <path className="roman-line" d="M80,90 L255,90" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <path className="roman-line" d="M255,90 L275,70 L300,85 L325,70 L345,90" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <path className="roman-line" d="M345,90 L520,90" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <path className="roman-line" d="M80,310 L255,310" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <path className="roman-line" d="M255,310 L275,330 L300,315 L325,330 L345,310" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <path className="roman-line" d="M345,310 L520,310" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.7" />
      <line className="roman-line" x1="70" y1="100" x2="70" y2="300" stroke="#b8902a" strokeWidth="0.5" opacity="0.4" />
      <line className="roman-line" x1="530" y1="100" x2="530" y2="300" stroke="#b8902a" strokeWidth="0.5" opacity="0.4" />
      <path className="roman-line" d="M300,168 L322,200 L300,232 L278,200 Z" fill="none" stroke="#b8902a" strokeWidth="0.7" opacity="0.3" />
      <path className="roman-line" d="M240,200 L185,200" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.4" />
      <path className="roman-line" d="M185,200 Q168,188 152,196 Q170,184 166,168 Q174,190 190,184 Q180,196 185,200" fill="none" stroke="#b8902a" strokeWidth="1" opacity="0.6" />
      <path className="roman-line" d="M185,200 Q162,202 154,218 Q168,198 168,220 Q172,200 190,202 Q183,210 185,200" fill="none" stroke="#b8902a" strokeWidth="1" opacity="0.6" />
      <path className="roman-line" d="M360,200 L415,200" fill="none" stroke="#b8902a" strokeWidth="0.8" opacity="0.4" />
      <path className="roman-line" d="M415,200 Q432,188 448,196 Q430,184 434,168 Q426,190 410,184 Q420,196 415,200" fill="none" stroke="#b8902a" strokeWidth="1" opacity="0.6" />
      <path className="roman-line" d="M415,200 Q438,202 446,218 Q432,198 432,220 Q428,200 410,202 Q417,210 415,200" fill="none" stroke="#b8902a" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// ── GOLD PARTICLES (Chat) ─────────────────────────────────────────────────
function GoldParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anims: Array<{ pause: () => void }> = [];

    import("animejs").then(({ animate, utils, engine }) => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      // particle shapes: dot, diamond, cross — all gold-themed
      const shapes = ["dot", "diamond", "spark"];

      for (let i = 0; i < 55; i++) {
        const el = document.createElement("div");
        const shape = shapes[i % shapes.length];
        el.classList.add("particle", `particle--${shape}`);
        container.appendChild(el);

        const anim = animate(el, {
          x: utils.random(-48, 48, 1) + "vw",
          y: utils.random(-44, 44, 1) + "vh",
          scale: [{ from: utils.random(0, 0.3, 2), to: utils.random(0.6, 1.2, 2) }, { to: 0 }],
          opacity: [{ from: 0, to: utils.random(0.25, 0.55, 2) }, { to: 0 }],
          rotate: utils.random(0, 360, 1),
          loop: true,
          duration: utils.random(3000, 7000, 0),
          delay: utils.random(0, 3000, 0),
          ease: "inOutSine",
        });

        anims.push(anim);
      }

      // expose engine pause/resume on the container element for cleanup
      (container as HTMLDivElement & { _engine: typeof engine })._engine = engine;
    });

    return () => {
      anims.forEach((a) => a.pause());
      anims = [];
      // remove all particle children
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="particles-container" aria-hidden="true" />;
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [view, setView] = useState<"landing" | "chat">("landing");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  };

  const handleSend = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoading) return;

      setError(null);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      const userMsg: Message = { id: Date.now().toString(), role: "user", content };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsLoading(true);
      setStreamingText("");

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("The Emperor is momentarily indisposed.");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Response stream unavailable.");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setStreamingText(accumulated);
        }

        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: "assistant", content: accumulated },
        ]);
        setStreamingText("");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Marcus has withdrawn to his private chambers. Try again in a moment.");
        }
      } finally {
        setIsLoading(false);
        textareaRef.current?.focus();
      }
    },
    [input, isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    if (view === "landing") setView("chat");
    setTimeout(() => handleSend(prompt), 100);
  };

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <>
        <div className="marble-bg" />
        <div className="roman-lines-wrap">
          <RomanLines />
        </div>

        {/* Marcus portrait — landing */}
        <div className="marcus-portrait-wrap">
          <img
            className="marcus-portrait"
            src="/Marcus.png"
            alt="Marcus Aurelius"
            draggable={false}
          />
        </div>

        <div className="landing">
          <p className="landing-eyebrow">Audentia · Sapientia · Virtus</p>
          <h1 className="landing-title">MAR<span>CVS</span></h1>
          <div className="laurel-divider">⸻ ❧ ⸻</div>
          <p className="landing-subtitle">
            Emperor of Rome. Philosopher-King. Author of the Meditations.
            Seek counsel — he is listening.
          </p>
          <p className="landing-dates">MARCUS AURELIUS ANTONINUS · 121 AD – 180 AD</p>
          <button className="begin-btn" onClick={() => setView("chat")}>Seek Counsel</button>
          <p className="landing-quote">&ldquo;Confine yourself to the present.&rdquo;</p>
        </div>
      </>
    );
  }

  // ── CHAT ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="marble-bg" />

      {/* Marcus Aurelius portrait — faded behind chat */}
      <div className="marcus-portrait-wrap">
        <img
          className="marcus-portrait"
          src="/Marcus.png"
          alt="Marcus Aurelius"
          draggable={false}
        />
      </div>

      {/* Gold floating particles — behind everything in chat */}
      <GoldParticles />

      <div className="chat-layout">
        <header className="chat-header">
          <div className="header-identity">
            <div className="header-avatar">M</div>
            <div>
              <div className="header-name">MARCUS AURELIUS</div>
              <div className="header-title">Emperor of Rome · Stoic Philosopher</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="header-status">
              <div className="status-dot" />
              PRESENT
            </div>
            <button className="back-btn" onClick={() => setView("landing")}>← Return</button>
          </div>
        </header>

        <div className="messages-container">
          {messages.length === 0 && !isLoading ? (
            <div className="empty-state">
              <p className="empty-heading">The Emperor Awaits Your Counsel</p>
              <p className="empty-sub">
                Ask of grief, anger, purpose, or mortality — or simply begin
                with one of these questions from the ages.
              </p>
              <div className="starter-prompts">
                {STARTER_PROMPTS.map((prompt) => (
                  <button key={prompt} className="starter-prompt" onClick={() => handleStarterPrompt(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.role === "assistant" ? "marcus" : "user"}`}>
                  <div className="message-avatar">{msg.role === "assistant" ? "M" : "✦"}</div>
                  <div className="message-body">
                    <span className="message-sender">{msg.role === "assistant" ? "Marcus Aurelius" : "You"}</span>
                    <div className="message-bubble" dangerouslySetInnerHTML={{ __html: `<p>${parseMarkdown(msg.content)}</p>` }} />
                  </div>
                </div>
              ))}

              {streamingText && (
                <div className="message marcus">
                  <div className="message-avatar">M</div>
                  <div className="message-body">
                    <span className="message-sender">Marcus Aurelius</span>
                    <div className="message-bubble" dangerouslySetInnerHTML={{ __html: `<p>${parseMarkdown(streamingText)}</p>` }} />
                  </div>
                </div>
              )}

              {isLoading && !streamingText && (
                <div className="message marcus">
                  <div className="message-avatar">M</div>
                  <div className="message-body">
                    <span className="message-sender">Marcus Aurelius</span>
                    <div className="message-bubble">
                      <div className="typing-indicator">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {error && <div className="error-banner"><span>⚠</span>{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
              placeholder="Speak to the Emperor…"
              rows={1}
              disabled={isLoading}
            />
            <button className="send-btn" onClick={() => handleSend()} disabled={!input.trim() || isLoading}>
              <SendIcon />
            </button>
          </div>
          <div className="input-footer">
            <span>Shift+Enter for new line</span>
            <span>{messages.filter((m) => m.role === "user").length} exchanges</span>
          </div>
        </div>
      </div>
    </>
  );
}