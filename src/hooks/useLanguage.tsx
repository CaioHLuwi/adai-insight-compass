
import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en' | 'es' | 'ru' | 'de';

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const initialState: LanguageProviderState = {
  language: 'pt',
  setLanguage: () => null,
  toggleLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = 'pt', // Changed default to Portuguese
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('app-language') as Language) || defaultLanguage
  );

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem('app-language', language);
      setLanguage(language);
    },
    toggleLanguage: () => {
      const languages: Language[] = ['pt', 'en', 'es', 'ru', 'de']; // Portuguese first
      const currentIndex = languages.indexOf(language);
      const nextIndex = (currentIndex + 1) % languages.length;
      const newLanguage = languages[nextIndex];
      localStorage.setItem('app-language', newLanguage);
      setLanguage(newLanguage);
    },
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider');

  return context;
};
