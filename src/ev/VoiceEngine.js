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
 * cleanTextForSpeech
 * Strips corrupted/unrecognised characters before passing text to TTS,
 * preventing the engine from reading out "प्रश्नवाचक चिन्ह" (question mark)
 * for every ??? sequence that results from encoding bugs.
 *
 * Rules applied (in order):
 *  1. Remove sequences of 2+ consecutive question marks (???, ????, …)
 *  2. Remove lone ? characters that are not part of valid Hindi/English punctuation
 *  3. Strip common replacement-character artifacts (U+FFFD and U+25A1)
 *  4. Collapse multiple spaces / blank lines left behind
 *  5. Trim leading/trailing whitespace
 */
const cleanTextForSpeech = (raw) => {
  if (!raw) return "";

  let cleaned = raw
    // 0. MAGIC JUGAD: Automatically split any consecutive 10-digit numbers into individual digits
    // Example: "9454826921" -> "9 4 5 4 8 2 6 9 2 1"
    .replace(/(\d{10})/g, (match) => match.split("").join(" "))
    // 1. Strip ALL '?' marks so TTS never reads out "Prashnavachak Chinh"
    .replace(/\?/g, "")
    // 2. Remove Unicode replacement characters & empty-box glyphs
    .replace(/[\uFFFD\u25A1]/g, "")
    // 3. Collapse multiple spaces / blank lines left behind
    .replace(/[\s]{2,}/g, " ")
    // 4. Trim
    .trim();

  return cleaned;
};

/**
 * isMeaningfulText — returns false when the text is empty or contains
 * ONLY question marks, whitespace, or punctuation (nothing speakable).
 */
const isMeaningfulText = (text) => {
  // Remove all punctuation, spaces, question marks; if nothing remains → meaningless
  const stripped = text.replace(/[\s\p{P}\?]/gu, "");
  return stripped.length > 0;
};

/**
 * speakEV — speaks text with EV's warm, human-like Hindi tone.
 * rate 0.9  = slightly relaxed, natural speed
 * pitch 1.05 = soft female tone threshold
 */
export const speakEV = (text, onEnd) => {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

  // ── Sanitize: strip encoding garbage before speaking ──
  const cleaned = cleanTextForSpeech(text);

  // Guard: if nothing meaningful remains, don't speak (avoids "प्रश्नवाचक चिन्ह")
  if (!cleaned || !isMeaningfulText(cleaned)) return;

  // Cancel anything currently being spoken
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleaned);
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

  // English path — sanitize first, then pick an Indian-English voice
  const cleanedEng = cleanTextForSpeech(text);
  if (!cleanedEng || !isMeaningfulText(cleanedEng)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanedEng);
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

