import { useState, useEffect, useRef, useCallback } from "react";
import { findAnswer, detectLang } from "./SearchEngine";
import { speakText, speakEV, stopSpeech, createRecognition, isSpeechSupported, isTTSSupported } from "./VoiceEngine";
import { GREETING } from "./KnowledgeBase";

// -- ICONS ----------------------------------------------------
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

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
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

// -- TYPING INDICATOR ----------------------------------------
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

// -- CHAT BUBBLE ---------------------------------------------
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
          maxWidth:"75%",
          padding:"10px 15px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? "var(--maroon)" : "var(--cream2)",
          color: isUser ? "#fff" : "var(--ink)",
          fontSize: 13.5,
          lineHeight: 1.65,
          fontFamily:"'Noto Sans Devanagari', 'Nunito', sans-serif",
          whiteSpace:"pre-wrap",
          wordBreak:"break-word",
          boxShadow: isUser
            ? "0 2px 10px rgba(122,35,49,0.22)"
            : "0 2px 8px rgba(58,42,30,0.08)",
        }}
      >
        {msg.text}
        <div style={{ fontSize:10.5, marginTop:4, opacity:0.55, textAlign:"right" }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

// -- MAIN CHATBOT COMPONENT -----------------------------------
export default function EVChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recRef = useRef(null);

  const now = () =>
    new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });

  const addMessage = useCallback((role, text) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), role, text, time: now() }]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Greeting on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const greetText = GREETING.hin;
        addMessage("bot", greetText);
        setUnread(0);
        // speakEV uses getBestHindiVoice internally for best humanoid voice
        if (isTTSSupported()) speakEV(greetText);
      }, 900);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, hasGreeted, addMessage]);

  // Init speech recognition
  useEffect(() => {
    if (!isSpeechSupported()) return;
    recRef.current = createRecognition({
      onResult: (transcript, isFinal) => {
        setInput(transcript);
        if (isFinal && transcript.trim()) {
          handleSend(transcript.trim());
        }
      },
      onListeningChange: setIsListening,
      onError: (err) => {
        console.warn("STT error:", err);
        setIsListening(false);
      },
    });
    return () => stopSpeech();
  }, []);

  // ── Voice preload listener (Chrome loads voices asynchronously) ──
  // Must be set in useEffect so the app is ready the moment browser
  // finishes loading the voice list.
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices(); // triggers internal cache update
    };

    loadVoices(); // try to populate immediately (Safari/Firefox)

    // Chrome fires onvoiceschanged once voices are async-loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSend = useCallback((text) => {
    const query = (text || input).trim();
    if (!query) return;

    addMessage("user", query);
    setInput("");
    setIsTyping(true);
    stopSpeech();

    setTimeout(() => {
      const answer = findAnswer(query);
      const lang = detectLang(query);
      setIsTyping(false);
      addMessage("bot", answer);

      if (!open) setUnread(prev => prev + 1);

      if (isTTSSupported()) {
        speakText(answer, lang);
      }
    }, 650 + Math.random() * 400);
  }, [input, addMessage, open]);

  const handleMic = useCallback(() => {
    const rec = recRef.current;
    if (!rec) return;
    if (isListening) {
      rec.stop();
    } else {
      stopSpeech();
      setInput("");
      try { rec.start(); } catch (e) { console.warn(e); }
    }
  }, [isListening]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // -- FAB BUTTON -------------------------------------------
  return (
    <>
      {/* Styles */}
      <style>{`
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

        .ev-window {
          position: fixed;
          bottom: 96px;
          right: 24px;
          z-index: 9999;
          width: min(380px, calc(100vw - 32px));
          max-height: min(560px, calc(100vh - 140px));
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 24px 64px rgba(58,42,30,0.2), 0 4px 16px rgba(0,0,0,0.1);
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

        .ev-header {
          background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%);
          padding: 16px 18px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .ev-header-avatar {
          width: 44px;
          height: 44px;
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
          font-size: 16px;
          color: #fff;
          line-height: 1.2;
        }
        .ev-header-sub {
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          font-size: 11.5px;
          color: rgba(251,217,138,0.85);
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ev-close-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.18s;
        }
        .ev-close-btn:hover { background: rgba(255,255,255,0.28); }

        .ev-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px 8px;
          background: #f9f4ed;
          scroll-behavior: smooth;
        }
        .ev-messages::-webkit-scrollbar { width: 4px; }
        .ev-messages::-webkit-scrollbar-thumb { background: var(--cream3); border-radius: 4px; }

        .ev-pencil-stripe {
          height: 4px;
          background-image: repeating-linear-gradient(45deg, var(--gold) 0 7px, var(--maroon) 7px 14px);
          flex-shrink: 0;
        }

        .ev-input-bar {
          padding: 10px 12px;
          background: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid var(--cream3);
          flex-shrink: 0;
        }

        .ev-input {
          flex: 1;
          border: 1.5px solid var(--cream3);
          border-radius: 24px;
          padding: 9px 16px;
          font-size: 14px;
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          color: var(--ink);
          background: var(--cream);
          outline: none;
          transition: border-color 0.18s;
          resize: none;
          line-height: 1.4;
        }
        .ev-input:focus { border-color: var(--maroon); }
        .ev-input::placeholder { color: rgba(58,42,30,0.4); }

        .ev-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--maroon);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.18s, transform 0.18s;
        }
        .ev-send-btn:hover { background: var(--maroon-dark); }
        .ev-send-btn:active { transform: scale(0.92); }
        .ev-send-btn:disabled { opacity: 0.45; cursor: default; }

        .ev-mic-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gold);
          color: var(--maroon-dark);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.18s, transform 0.18s;
          box-shadow: 0 2px 8px rgba(240,168,40,0.35);
        }
        .ev-mic-btn:hover { background: var(--gold-dark); color: #fff; }
        .ev-mic-btn.listening {
          background: #ef4444;
          color: #fff;
        }
        .ev-mic-btn.listening { animation: va-pulse 1.1s ease-in-out infinite; }

        .ev-no-voice {
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          color: rgba(58,42,30,0.45);
          text-align: center;
          padding: 4px 0 2px;
        }

        .ev-empty-state {
          text-align: center;
          padding: 24px 16px;
          color: rgba(58,42,30,0.4);
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          font-size: 13px;
        }

        .ev-listening-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          font-family: 'Noto Sans Devanagari', 'Nunito', sans-serif;
          color: #ef4444;
          font-weight: 700;
          margin: 0 14px 8px;
          width: fit-content;
        }
        .ev-listening-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: va-pulse 1s ease-in-out infinite;
          flex-shrink: 0;
        }

        @media (max-width: 440px) {
          .ev-window { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
          .ev-fab { bottom: 16px; right: 16px; }
        }
      `}</style>

      {/* FLOATING ACTION BUTTON */}
      <button
        className="ev-fab"
        onClick={() => setOpen(o => !o)}
        aria-label="Chat with EVI"
        title="Chat with EVI — School Assistant"
      >
        {open ? <IconClose /> : <IconChat />}
        {!open && unread > 0 && (
          <div className="ev-badge">{unread}</div>
        )}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="ev-window" role="dialog" aria-label="EVI Chat Assistant">
          {/* Header */}
          <div className="ev-header">
            <div className="ev-header-avatar">
              <IconBot />
            </div>
            <div className="ev-header-info">
              <div className="ev-header-name">EVI &nbsp;•&nbsp; <span style={{fontSize:12,fontWeight:600,opacity:0.8,fontFamily:"'Noto Sans Devanagari',sans-serif"}}>AI असिस्टेंट</span></div>
              <div className="ev-header-sub">मॉडल प्राइमरी स्कूल, भरसरे</div>
            </div>
            <button className="ev-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              <IconClose />
            </button>
          </div>

          {/* Pencil stripe */}
          <div className="ev-pencil-stripe" />

          {/* Messages */}
          <div className="ev-messages">
            {messages.length === 0 && !isTyping && (
              <div className="ev-empty-state">
                <div style={{fontSize:32, marginBottom:8}}>🙏</div>
                <div>EVI से कुछ भी पूछें...</div>
                <div style={{fontSize:12, marginTop:4, fontFamily:"'Nunito',sans-serif"}}>Ask anything in Hindi or English</div>
              </div>
            )}
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
            {isTyping && (
              <div style={{display:"flex", alignItems:"flex-start", gap:8, marginBottom:8}}>
                <div style={{marginRight:8,marginTop:2}}><IconBot /></div>
                <TypingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Listening chip */}
          {isListening && (
            <div className="ev-listening-chip">
              <div className="ev-listening-dot" />
              सुन रही हूँ… (Listening…)
            </div>
          )}

          {/* Input Bar */}
          <div className="ev-input-bar">
            <textarea
              ref={inputRef}
              className="ev-input"
              placeholder="यहाँ टाइप करें… / Type here…"
              value={input}
              rows={1}
              onChange={e => {
                setInput(e.target.value);
                // Auto-resize
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
              }}
              onKeyDown={handleKeyDown}
            />

            {/* Send button (only when text present) */}
            {input.trim().length > 0 && (
              <button
                className="ev-send-btn"
                onClick={() => handleSend()}
                aria-label="Send message"
              >
                <IconSend />
              </button>
            )}

            {/* Mic button */}
            {isSpeechSupported() && (
              <button
                className={`ev-mic-btn${isListening ? " listening" : ""}`}
                onClick={handleMic}
                aria-label={isListening ? "Stop listening" : "Speak to EVI"}
                title={isListening ? "टैप करके बंद करें" : "बोलकर पूछें"}
              >
                <IconMic />
              </button>
            )}
          </div>

          {!isSpeechSupported() && (
            <div className="ev-no-voice">🎤 Voice not supported in this browser</div>
          )}
        </div>
      )}
    </>
  );
}
