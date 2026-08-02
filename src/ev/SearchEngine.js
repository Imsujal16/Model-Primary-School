// ============================================================
//  SearchEngine.js — Legacy file (kept for backward compatibility)
//  The new menu-driven EVChatbot no longer uses this.
//  Safe to ignore.
// ============================================================

export function findAnswer() {
  return "";
}

export function detectLang(text) {
  return /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-IN";
}
