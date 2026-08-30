import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('app_lang');
    if (saved && ['pl', 'uk', 'en'].includes(saved)) {
      return saved;
    }
    const browserLang = navigator.language?.slice(0, 2);
    if (browserLang === 'uk' || browserLang === 'ru') return 'uk';
    if (browserLang === 'pl') return 'pl';
    if (browserLang === 'en') return 'en';
    return 'pl';
  });

  const setLang = (newLang) => {
    if (['pl', 'uk', 'en'].includes(newLang)) {
      setLangState(newLang);
      localStorage.setItem('app_lang', newLang);
      document.documentElement.lang = newLang === 'uk' ? 'uk' : newLang === 'en' ? 'en' : 'pl';
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'uk' ? 'uk' : lang === 'en' ? 'en' : 'pl';
  }, [lang]);

  const t = translations[lang] || translations.pl;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
