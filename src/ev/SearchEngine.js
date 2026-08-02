// ============================================================
//  EV Search Engine — Keyword matching + Levenshtein fuzzy
// ============================================================
import { KB, FALLBACK } from "./KnowledgeBase";

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Check if string has Devanagari characters
function isHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

// Tokenise query into words
function tokenise(text) {
  return text.toLowerCase().replace(/[?,.!?]/g, " ").split(/\s+/).filter(Boolean);
}

// Score a KB entry against query tokens
function scoreEntry(entry, tokens) {
  let score = 0;
  for (const token of tokens) {
    if (token.length < 2) continue;
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      // Exact match = high score
      if (kwLower === token) { score += 10; continue; }
      // Contains match
      if (kwLower.includes(token) || token.includes(kwLower)) { score += 6; continue; }
      // Fuzzy match (Levenshtein) — only for longer tokens to avoid noise
      if (token.length >= 4) {
        const dist = levenshtein(token, kwLower);
        const maxLen = Math.max(token.length, kwLower.length);
        if (dist / maxLen < 0.35) { score += 4; continue; }
      }
    }
  }
  return score;
}

export function findAnswer(query) {
  if (!query || query.trim().length === 0) return null;

  const tokens = tokenise(query);
  const hindi = isHindi(query);

  // Score every KB entry
  let best = null, bestScore = 0;
  for (const entry of KB) {
    const s = scoreEntry(entry, tokens);
    if (s > bestScore) { bestScore = s; best = entry; }
  }

  // Threshold: must have at least score 4 to be a valid match
  if (!best || bestScore < 4) {
    return hindi ? FALLBACK.hin : FALLBACK.eng;
  }

  return hindi ? best.answerHin : best.answerEng;
}

// Determine language for TTS
export function detectLang(text) {
  return isHindi(text) ? "hi-IN" : "en-IN";
}
