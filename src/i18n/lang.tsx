import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONTENT, type Content, type Lang } from './content';

const KEY = 'lang';

function initialLang(): Lang {
  const saved = localStorage.getItem(KEY);
  if (saved === 'en' || saved === 'id') return saved;
  return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en';
}

const LangContext = createContext<{ lang: Lang; t: Content; toggle: () => void }>({
  lang: 'en',
  t: CONTENT.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(KEY, lang);
  }, [lang]);
  const toggle = () => setLang((l) => (l === 'en' ? 'id' : 'en'));
  return <LangContext.Provider value={{ lang, t: CONTENT[lang], toggle }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
