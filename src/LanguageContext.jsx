import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("mps_lang") || "en"
  );

  const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"));

  // SEO & Accessibility: keep <html lang="..."> in sync with Google crawlers & screen readers
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("mps_lang", lang);
  }, [lang]);

  // Translation helper — falls back: current lang → English → raw key
  const t = (key) =>
    translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
