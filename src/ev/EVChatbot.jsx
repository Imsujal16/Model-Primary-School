import { useState, useEffect, useRef, useCallback } from "react";
import { speakEV, stopSpeech, isTTSSupported } from "./VoiceEngine";
import { flowData, GREETING } from "./KnowledgeBase";

// ============================================================
//  ICONS
// ============================================================
function IconBot() {
  return (
    <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
      <rect x="2" y="2" width="32" height="32" rx="16" fill="var(--maroon)" />
      <rect x="9" y="12" width="18" height="14" rx="4" fill="var(--gold)" />
      <rect x="13" y="8" width="10" height="6" rx="3" fill="var(--maroon-dark)" />
      <circle cx="13.5" cy="19" r="2" fill="var(--maroon-dark)" />
      <circle cx="22.5" cy="19" r="2" fill="var(--maroon-dark)" />
      <rect x="15" y="22" width="6" height="2" rx="1" fill="var(--maroon-dark)" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconVolume() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconMute() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

// ============================================================
//  TYPING DOTS
// ============================================================
function TypingDots() {
  return (
    <div style={{ display:"flex", gap:4, padding:"10px 14px", background:"var(--cream2)", borderRadius:"18px 18px 18px 4px", width:"fit-content" }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="va-dot-bounce"
          style={{ width:7, height:7, borderRadius:"50%", background:"var(--maroon)", display:"block", animationDelay:`${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

// ============================================================
//  CHAT BUBBLE
// ============================================================
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className="va-fadeup"
      style={{
        display:"flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 8,
      }}
    >
      {!isUser && (
        <div style={{ marginRight:8, marginTop:2, flexShrink:0 }}>
          <IconBot />
        </div>
      )}
      <div
        style={{
          maxWidth:"82%",
          padding:"10px 15px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? "var(--maroon)" : "var(--cream2)",
          color: isUser ? "#fff" : "var(--ink)",
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily:"'Noto Sans Devanagari', 'Nunito', sans-serif",
          wordBreak:"break-word",
          boxShadow: isUser
            ? "0 2px 10px rgba(122,35,49,0.22)"
            : "0 2px 8px rgba(58,42,30,0.08)",
        }}
      >
        {isUser
          ? <span>{msg.display}</span>
          : <div className="ev-bubble-html" dangerouslySetInnerHTML={{ __html: msg.display }} />
        }
        <div style={{ fontSize:10, marginTop:4, opacity:0.5, textAlign:"right" }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  OPTION BUTTON
// ============================================================
function OptionButton({ label, onClick }) {
  return (
    <button
      className="ev-option-btn"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ============================================================
//  LANGUAGE TOGGLE
// ============================================================
function LangToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="ev-lang-toggle"
      aria-label={lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
      title={lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
    >
      <span className={`ev-lang-pill${lang === "en" ? " active" : ""}`}>EN</span>
      <span
        className={`ev-lang-pill${lang === "hi" ? " active" : ""}`}
        style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif" }}
      >
        हि
      </span>
    </button>
  );
}

// ============================================================
//  MAIN CHATBOT COMPONENT
// ============================================================
export default function EVChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState("ROOT");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [unread, setUnread] = useState(0);
  const [lang, setLang] = useState("hi"); // 'hi' | 'en'
  const [isMuted, setIsMuted] = useState(false);

  const messagesEndRef = useRef(null);

  const now = () =>
    new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });

  const addMessage = useCallback((role, display, speak) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      role,
      display,
      speak: speak !== undefined ? speak : display,
      time: now()
    }]);
  }, []);

  // ── Safe Speak Helper ──────────────────────────────────────
  const safeSpeak = useCallback((text, speakLang) => {
    if (!isMuted && isTTSSupported()) {
      speakEV(text, speakLang || lang);
    }
  }, [isMuted, lang]);

  // ── Toggle Mute ───────────────────────────────────────────
  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (nextMuted) {
        stopSpeech();
      }
      return nextMuted;
    });
  }, []);

  // ── Auto-scroll ────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Voice preload (Chrome loads voices async) ──────────────
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => stopSpeech();
  }, []);

  // ── Greeting on first open ─────────────────────────────────
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const greetObj = GREETING[lang] || GREETING.hi;
        const greetDisplay = typeof greetObj === "object" ? greetObj.display : greetObj;
        const greetSpeak  = typeof greetObj === "object" ? greetObj.speak  : greetObj;
        addMessage("bot", greetDisplay, greetSpeak);
        setUnread(0);
        safeSpeak(greetSpeak, lang);
      }, 900);
    }
    if (open) setUnread(0);
  }, [open, hasGreeted, addMessage, lang, safeSpeak]);

  // ── Navigate to a node ────────────────────────────────────
  const navigateTo = useCallback((nodeId, userLabel) => {
    stopSpeech();

    // Push user's choice as a message
    if (userLabel) {
      addMessage("user", userLabel, userLabel);
    }

    setIsTyping(true);

    setTimeout(() => {
      const node = flowData[nodeId];
      if (!node) return;

      setCurrentNodeId(nodeId);
      setIsTyping(false);

      const textObj = node.text[lang] || node.text.hi;
      const display = typeof textObj === "object" ? textObj.display : textObj;
      const speak   = typeof textObj === "object" ? textObj.speak   : textObj;
      addMessage("bot", display, speak);

      safeSpeak(speak, lang);
    }, 600 + Math.random() * 300);
  }, [lang, addMessage, safeSpeak]);

  // ── Language toggle: switch lang, re-render current node ──
  const handleLangToggle = useCallback(() => {
    const newLang = lang === "hi" ? "en" : "hi";
    setLang(newLang);
    stopSpeech();

    // Re-speak the current node in new language
    setTimeout(() => {
      const node = flowData[currentNodeId];
      if (node) {
        const textObj = node.text[newLang] || node.text.hi;
        const display = typeof textObj === "object" ? textObj.display : textObj;
        const speak   = typeof textObj === "object" ? textObj.speak   : textObj;
        // Add a "language changed" system message
        addMessage("bot",
          newLang === "en" ? "🌐 Switched to English!" : "🌐 हिंदी में बदल दिया!"
        );
        setTimeout(() => {
          addMessage("bot", display, speak);
          safeSpeak(speak, newLang);
        }, 400);
      }
    }, 100);
  }, [lang, currentNodeId, addMessage, safeSpeak]);

  // ── Handle FAB click ──────────────────────────────────────
  const handleFABClick = () => {
    setOpen(o => !o);
  };

  // ── Current node options ──────────────────────────────────
  const currentNode = flowData[currentNodeId];
  const options = currentNode?.options || [];

  // ============================================================
  //  RENDER
  // ============================================================
  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        /* HTML BUBBLE CONTENT (dangerouslySetInnerHTML) */
        .ev-bubble-html b { font-weight: 700; }
        .ev-bubble-html a {
          text-decoration: underline;
          transition: opacity 0.15s;
          word-break: break-all;
        }
        .ev-bubble-html a:hover { opacity: 0.72; }

        /* FAB */
        .ev-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--maroon);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(122,35,49,0.45), 0 2px 8px rgba(0,0,0,0.18);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          outline: none;
        }
        .ev-fab:hover { transform: scale(1.1); box-shadow: 0 12px 36px rgba(122,35,49,0.55); }
        .ev-fab:active { transform: scale(0.95); }

        .ev-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--gold);
          color: var(--maroon-dark);
          font-size: 11px;
          font-weight: 800;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Quicksand', 'Noto Sans Devanagari', sans-serif;
          border: 2px solid #fff;
        }

        /* WINDOW */
        .ev-window {
          position: fixed;
          bottom: 96px;
          right: 24px;
          z-index: 9999;
          width: min(390px, calc(100vw - 32px));
          max-height: min(600px, calc(100vh - 140px));
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 24px 64px rgba(58,42,30,0.22), 0 4px 16px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: ev-popup 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes ev-popup {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* HEADER */
        .ev-header {
          background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%);
          padding: 14px 14px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .ev-header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.3);
        }
        .ev-header-info { flex: 1; min-width: 0; }
        .ev-header-name {
          font-family: 'Quicksand', 'Noto Sans Devanagari', sans-serif;
          font-weight: 800;
          font-size: 14.5px;
          color: #fff;
          line-height: 1.2;
        }
        .ev-header-sub {
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          font-size: 10.5px;
          color: rgba(251,217,138,0.85);
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* MUTE BUTTON */
        .ev-mute-btn {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.15s;
          flex-shrink: 0;
        }
        .ev-mute-btn:hover { background: rgba(255,255,255,0.28); transform: scale(1.05); }
        .ev-mute-btn.muted {
          background: #ef4444;
          border-color: #f87171;
          color: #fff;
        }

        /* LANG TOGGLE */
        .ev-lang-toggle {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 999px;
          display: flex;
          align-items: center;
          padding: 2px;
          cursor: pointer;
          flex-shrink: 0;
          gap: 2px;
          transition: background 0.18s;
        }
        .ev-lang-toggle:hover { background: rgba(255,255,255,0.25); }
        .ev-lang-pill {
          font-family: 'Quicksand', 'Noto Sans Devanagari', sans-serif;
          font-weight: 800;
          font-size: 10px;
          padding: 3px 7px;
          border-radius: 999px;
          color: rgba(255,255,255,0.7);
          transition: all 0.18s;
          line-height: 1;
        }
        .ev-lang-pill.active {
          background: var(--gold);
          color: var(--maroon-dark);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        /* CLOSE BTN */
        .ev-close-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.18s;
          flex-shrink: 0;
        }
        .ev-close-btn:hover { background: rgba(255,255,255,0.28); }

        /* PENCIL STRIPE */
        .ev-pencil-stripe {
          height: 4px;
          background-image: repeating-linear-gradient(45deg, var(--gold) 0 7px, var(--maroon) 7px 14px);
          flex-shrink: 0;
        }

        /* MESSAGES */
        .ev-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px 8px;
          background: #f9f4ed;
          scroll-behavior: smooth;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }
        .ev-messages::-webkit-scrollbar { width: 4px; }
        .ev-messages::-webkit-scrollbar-thumb { background: var(--cream3); border-radius: 4px; }

        /* FOOTER */
        .ev-footer {
          background: #fff;
          border-top: 1px solid var(--cream3);
          flex-shrink: 0;
          padding: 10px 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: min(240px, 45vh);
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }
        .ev-footer::-webkit-scrollbar { width: 5px; }
        .ev-footer::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .ev-footer::-webkit-scrollbar-thumb { background: var(--maroon-light); border-radius: 4px; }

        /* HOME QUICK-NAV */
        .ev-home-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 2px 2px;
        }
        .ev-home-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--maroon);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 5px 10px;
          font-family: 'Quicksand', 'Noto Sans Devanagari', sans-serif;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.18s, transform 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ev-home-btn:hover { background: var(--maroon-dark); transform: translateY(-1px); }
        .ev-footer-label {
          font-family: 'Nunito', 'Noto Sans Devanagari', sans-serif;
          font-size: 10px;
          color: rgba(58,42,30,0.45);
          flex: 1;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* OPTION BUTTONS */
        .ev-options-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ev-option-btn {
          width: 100%;
          text-align: left;
          background: var(--cream);
          border: 1.5px solid var(--cream3);
          border-radius: 14px;
          padding: 9px 14px;
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, transform 0.12s, box-shadow 0.15s;
          line-height: 1.45;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .ev-option-btn:hover {
          background: var(--cream2);
          border-color: var(--maroon);
          color: var(--maroon-dark);
          transform: translateX(3px);
          box-shadow: 0 2px 10px rgba(122,35,49,0.12);
        }
        .ev-option-btn:active { transform: scale(0.98); }

        /* EMPTY STATE */
        .ev-empty-state {
          text-align: center;
          padding: 22px 16px;
          color: rgba(58,42,30,0.4);
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          font-size: 13px;
        }

        /* RESPONSIVE */
        @media (max-width: 440px) {
          .ev-window { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
          .ev-fab { bottom: 16px; right: 16px; }
        }
      `}</style>

      {/* ── FLOATING ACTION BUTTON ── */}
      <button
        className="ev-fab"
        onClick={handleFABClick}
        aria-label="Chat with EVI"
        title="Chat with EVI — School Assistant"
      >
        {open ? <IconClose /> : <IconChat />}
        {!open && unread > 0 && (
          <div className="ev-badge">{unread}</div>
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div className="ev-window" data-lenis-prevent role="dialog" aria-label="EVI Chat Assistant">

          {/* ── Header ── */}
          <div className="ev-header">
            <div className="ev-header-avatar">
              <IconBot />
            </div>
            <div className="ev-header-info">
              <div className="ev-header-name">
                EVI &nbsp;•&nbsp;{" "}
                <span style={{ fontSize:11, fontWeight:600, opacity:0.8, fontFamily:"'Noto Sans Devanagari',sans-serif" }}>
                  AI असिस्टेंट
                </span>
              </div>
              <div className="ev-header-sub">मॉडल प्राइमरी स्कूल, भरसरे</div>
            </div>

            {/* Mute Button */}
            <button
              className={`ev-mute-btn${isMuted ? " muted" : ""}`}
              onClick={handleToggleMute}
              aria-label={isMuted ? "Unmute voice" : "Mute voice"}
              title={isMuted ? "आवाज़ चालू करें (Unmute)" : "आवाज़ बंद करें (Mute)"}
            >
              {isMuted ? <IconMute /> : <IconVolume />}
            </button>

            {/* Language Toggle */}
            <LangToggle lang={lang} onToggle={handleLangToggle} />

            {/* Close */}
            <button className="ev-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <IconClose />
            </button>
          </div>

          {/* ── Pencil stripe ── */}
          <div className="ev-pencil-stripe" />

          {/* ── Messages ── */}
          <div className="ev-messages" data-lenis-prevent>
            {messages.length === 0 && !isTyping && (
              <div className="ev-empty-state">
                <div style={{ fontSize:32, marginBottom:8 }}>🙏</div>
                <div>{lang === "hi" ? "EVI से कुछ भी पूछें..." : "Ask EVI anything..."}</div>
                <div style={{ fontSize:11, marginTop:4, fontFamily:"'Nunito',sans-serif", opacity:0.7 }}>
                  {lang === "hi" ? "नीचे दिए बटन से शुरू करें" : "Tap a button below to start"}
                </div>
              </div>
            )}
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
            {isTyping && (
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                <div style={{ marginRight:8, marginTop:2 }}><IconBot /></div>
                <TypingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Footer: Options ── */}
          <div className="ev-footer" data-lenis-prevent>
            {/* Quick Home Nav row (when not on ROOT) */}
            {currentNodeId !== "ROOT" && (
              <div className="ev-home-nav">
                <button
                  className="ev-home-btn"
                  onClick={() => navigateTo("ROOT", null)}
                >
                  <IconHome />
                  {lang === "hi" ? "मुख्य मेनू" : "Main Menu"}
                </button>
                <span className="ev-footer-label">
                  {lang === "hi" ? "या नीचे से चुनें ↓" : "or choose below ↓"}
                </span>
              </div>
            )}

            {/* Option Buttons */}
            {!isTyping && options.length > 0 && (
              <div className="ev-options-grid">
                {options.map((opt, idx) => (
                  <OptionButton
                    key={idx}
                    label={opt.label[lang] || opt.label.hi}
                    onClick={() => navigateTo(opt.next, opt.label[lang] || opt.label.hi)}
                  />
                ))}
              </div>
            )}

            {isTyping && (
              <div style={{ textAlign:"center", padding:"6px 0", fontSize:11, color:"rgba(58,42,30,0.4)", fontFamily:"'Nunito',sans-serif" }}>
                {lang === "hi" ? "EVI टाइप कर रही है..." : "EVI is typing..."}
              </div>
            )}
          </div>

        </div>
      )}
    </>
  );
}
