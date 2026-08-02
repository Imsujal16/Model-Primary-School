// ============================================================
//  EV Voice Engine
//  SpeechRecognition (STT) + SpeechSynthesis (TTS)
// ============================================================

// -- TEXT-TO-SPEECH ------------------------------------------
let _voices = [];
const loadVoices = () => { _voices = window.speechSynthesis.getVoices(); };
if (typeof window !== "undefined") {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice(lang) {
  if (_voices.length === 0) _voices = window.speechSynthesis.getVoices();
  const isHindi = lang === "hi-IN";

  if (isHindi) {
    // Priority list for humanoid Hindi female voices
    const preferred = ["Google ??????", "Microsoft Swara", "Lekha", "??????", "Hindi"];
    for (const name of preferred) {
      const v = _voices.find(v => v.name.includes(name) && v.lang.startsWith("hi"));
      if (v) return v;
    }
    // Fallback: any Hindi voice
    return _voices.find(v => v.lang.startsWith("hi")) || null;
  }

  // English (India) preferred
  const preferred = ["Google ?????? Female", "Microsoft Heera", "Priya", "Ravi", "Veena"];
  for (const name of preferred) {
    const v = _voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  return _voices.find(v => v.lang === "en-IN") || _voices.find(v => v.lang.startsWith("en")) || null;
}

export function speakText(text, lang = "hi-IN", onEnd) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel(); // stop any current speech

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.88;
  utter.pitch = 1.05;
  utter.volume = 1;

  const voice = pickVoice(lang);
  if (voice) utter.voice = voice;

  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

export function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

// -- SPEECH-TO-TEXT -------------------------------------------
export function createRecognition({ onResult, onListeningChange, onError }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.continuous = false;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  // Default to Hindi; will dynamically switch if needed
  rec.lang = "hi-IN";

  rec.onstart = () => onListeningChange(true);
  rec.onend = () => onListeningChange(false);
  rec.onerror = (e) => {
    onListeningChange(false);
    if (onError) onError(e.error);
  };
  rec.onresult = (e) => {
    let interim = "";
    let final = "";
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
