// ============================================================
//  EV Voice Engine — Dynamic TTS for Hindi & English
//  speakEV(text, lang)  →  reads text in the correct language
//  Sanitization: strips emojis, dashes, question marks
//  Number fix: converts every digit to spoken word
// ============================================================

// ── VOICE SELECTORS ─────────────────────────────────────────

/**
 * getBestHindiVoice
 * Priority 1 → Google Hindi (best on Chrome/Android)
 * Priority 2 → Any available Hindi voice (iOS "Lekha", "Microsoft Swara")
 * Priority 3 → Absolute fallback — first system voice
 */
export const getBestHindiVoice = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();

  const googleHindi = voices.find(
    (v) => (v.lang.includes("hi") || v.lang === "hi-IN") && v.name.includes("Google")
  );
  if (googleHindi) return googleHindi;

  const anyHindi = voices.find(
    (v) => v.lang.includes("hi") || v.lang === "hi-IN"
  );
  if (anyHindi) return anyHindi;

  return voices[0] || null;
};

/**
 * getBestEnglishVoice
 * Priority 1 → Google Indian English (en-IN)
 * Priority 2 → Any en-IN voice
 * Priority 3 → Any English voice
 * Priority 4 → First available voice
 */
export const getBestEnglishVoice = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();

  const googleEnIN = voices.find(
    (v) => v.lang === "en-IN" && v.name.includes("Google")
  );
  if (googleEnIN) return googleEnIN;

  const anyEnIN = voices.find((v) => v.lang === "en-IN");
  if (anyEnIN) return anyEnIN;

  const anyEn = voices.find((v) => v.lang.startsWith("en"));
  if (anyEn) return anyEn;

  return voices[0] || null;
};

// ── SANITIZATION ─────────────────────────────────────────────

// Emoji regex — covers the vast majority of emoji unicode ranges
const EMOJI_REGEX = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA9F}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}-\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]/gu;

// NOTE: No digit word maps needed — smaller numbers (1988, 350, etc.)
// are left intact for natural TTS reading. Only phone numbers are handled.

/**
 * cleanTextForSpeech
 * Strips emojis, question marks, dashes, replacement chars.
 * 10-digit phone numbers are split digit-by-digit (e.g. "9454826921" → "9 4 5 4 8 2 6 9 2 1").
 * All other numbers (years, counts, class numbers) are left intact for natural TTS reading.
 * @param {string} raw  - raw message text
 * @param {string} lang - 'hi' | 'en'
 * @returns {string} cleaned, speakable text
 */
const cleanTextForSpeech = (raw, lang = "hi") => {
  if (!raw) return "";

  let cleaned = raw
    // 1. Strip emojis
    .replace(EMOJI_REGEX, "")
    // 2. Strip lone ? marks (prevents "Prashnavachak Chinh")
    .replace(/\?/g, "")
    // 3. Replace ALL dash types (-, –, —) with natural spoken connectors.
    //    Prevents TTS from reading them as "minus".
    //    E.g. "LKG – 5" → "LKG से 5" (hi) / "LKG to 5" (en).
    .replace(/[-\u2013\u2014]/g, lang === "en" ? " to " : " से ")
    // 4. Strip Unicode replacement characters
    .replace(/[\uFFFD\u25A1]/g, "")
    // 5. Replace newlines with pause (comma)
    .replace(/\n/g, ", ")
    // 6. Strip ✅ ★ • type decorative punctuation
    .replace(/[✅★•✨🏆🥇👑🎖️⭐🚀📌💪🌟]/g, "")
    // 7. Only split 10-digit phone numbers into spaced digits so TTS reads them digit-by-digit.
    //    Smaller numbers like "1988", "350", "Class 5" are left untouched for natural reading.
    .replace(/\b\d{10}\b/g, (match) => match.split("").join(" "))
    // 8. Fix time reading: strip :00 so "8:00" → "8" (prevents TTS auto-appending "baje" again).
    //    E.g. "8:00 बजे" → "8 बजे" (not "आठ बजे बजे").
    .replace(/:00/g, "")
    // 9. Collapse any accidental double "बजे बजे" → "बजे" (safety net).
    .replace(/बजे\s*बजे/g, "बजे")
    // 10. Collapse multiple spaces/commas
    .replace(/[,\s]{2,}/g, ", ")
    // 11. Trim
    .trim();

  return cleaned;
};

/**
 * isMeaningfulText — guards against speaking empty/punctuation-only strings
 */
const isMeaningfulText = (text) => {
  const stripped = text.replace(/[\s,।,.।\p{P}]/gu, "");
  return stripped.length > 0;
};

// ── PUBLIC API ────────────────────────────────────────────────

/**
 * speakEV(text, lang)
 * The primary TTS function.
 * @param {string} text  - text to speak (may contain emojis, markdown)
 * @param {string} lang  - 'hi' (default) or 'en'
 * @param {Function} [onEnd] - optional callback when speech ends
 */
export const speakEV = (text, lang = "hi", onEnd) => {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();

  const isHindi = lang === "hi" || lang === "hi-IN" || lang.startsWith("hi");

  const cleanText = cleanTextForSpeech(text, isHindi ? "hi" : "en");

  if (!cleanText || !isMeaningfulText(cleanText)) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);

  if (isHindi) {
    const hindiVoice = getBestHindiVoice();
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = hindiVoice.lang;
    } else {
      utterance.lang = "hi-IN";
    }
  } else {
    const engVoice = getBestEnglishVoice();
    if (engVoice) {
      utterance.voice = engVoice;
      utterance.lang = engVoice.lang;
    } else {
      utterance.lang = "en-IN";
    }
  }

  utterance.rate  = 0.9;
  utterance.pitch = isHindi ? 1.05 : 1.0;
  utterance.volume = 1;

  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

/**
 * speakText — backward-compatible wrapper
 * @param {string} text
 * @param {string} lang - 'hi-IN' | 'en-IN' | 'hi' | 'en'
 * @param {Function} [onEnd]
 */
export function speakText(text, lang = "hi-IN", onEnd) {
  const isHindi = lang === "hi-IN" || lang === "hi" || lang.startsWith("hi");
  speakEV(text, isHindi ? "hi" : "en", onEnd);
}

/**
 * stopSpeech — cancels any ongoing TTS utterance
 */
export function stopSpeech() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// ── SPEECH RECOGNITION (STT) ──────────────────────────────────

/**
 * createRecognition — creates and configures a SpeechRecognition instance
 */
export function createRecognition({ onResult, onListeningChange, onError }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.continuous      = false;
  rec.interimResults  = true;
  rec.maxAlternatives = 1;
  rec.lang            = "hi-IN";

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

// ── CAPABILITY CHECKS ─────────────────────────────────────────

export const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

export const isTTSSupported = () =>
  typeof window !== "undefined" && !!window.speechSynthesis;
