// ============================================================
//  EV Voice Engine
//  SpeechRecognition (STT) + SpeechSynthesis (TTS)
// ============================================================

// ── TEXT-TO-SPEECH ──────────────────────────────────────────

/**
 * getBestHindiVoice
 * Priority 1 → Google Hindi (best humanoid voice on Chrome/Android)
 * Priority 2 → Any available Hindi voice (iOS "Lekha" / system voice)
 * Priority 3 → Fallback to first available system voice
 */
export const getBestHindiVoice = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();

  // 1. Google Hindi — most humanoid on Chrome & Android
  const googleHindi = voices.find(
    (v) => (v.lang.includes("hi") || v.lang === "hi-IN") && v.name.includes("Google")
  );
  if (googleHindi) return googleHindi;

  // 2. Any Hindi voice (covers iOS "Lekha", "Microsoft Swara", system voices)
  const anyHindi = voices.find(
    (v) => v.lang.includes("hi") || v.lang === "hi-IN"
  );
  if (anyHindi) return anyHindi;

  // 3. Absolute fallback — first system voice
  return voices[0] || null;
};

/**
 * speakEV — speaks text with EV's warm, human-like Hindi tone.
 * rate 0.9  = slightly relaxed, natural speed
 * pitch 1.05 = soft female tone threshold
 */
export const speakEV = (text, onEnd) => {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

  // Cancel anything currently being spoken
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const hindiVoice = getBestHindiVoice();

  if (hindiVoice) {
    utterance.voice = hindiVoice;
    utterance.lang  = hindiVoice.lang;
  } else {
    utterance.lang = "hi-IN";
  }

  // EV's human-like tone settings
  utterance.rate   = 0.9;   // aaram se bolegi — natural speed
  utterance.pitch  = 1.05;  // soft female tone threshold
  utterance.volume = 1;

  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

/**
 * speakText — backward-compatible wrapper around speakEV.
 * lang param is kept for call-sites that pass 'hi-IN' or 'en-IN';
 * for English we still pick a sensible voice.
 */
export function speakText(text, lang = "hi-IN", onEnd) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

  const isHindi = lang === "hi-IN" || lang.startsWith("hi");

  if (isHindi) {
    speakEV(text, onEnd);
    return;
  }

  // English path — pick an Indian-English voice if available
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const engVoice =
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;
  if (engVoice) utterance.voice = engVoice;
  utterance.lang   = lang;
  utterance.rate   = 0.92;
  utterance.pitch  = 1.0;
  utterance.volume = 1;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// ── SPEECH-TO-TEXT ───────────────────────────────────────────
export function createRecognition({ onResult, onListeningChange, onError }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.continuous      = false;
  rec.interimResults  = true;
  rec.maxAlternatives = 1;
  rec.lang            = "hi-IN"; // captures Hindi by default

  rec.onstart  = () => onListeningChange(true);
  rec.onend    = () => onListeningChange(false);
  rec.onerror  = (e) => {
    onListeningChange(false);
    if (onError) onError(e.error);
  };
  rec.onresult = (e) => {
    let interim = "";
    let final   = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else interim += t;
    }
    onResult(final || interim, !!final);
  };

  return rec;
}

export const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

export const isTTSSupported = () =>
  typeof window !== "undefined" && !!window.speechSynthesis;

