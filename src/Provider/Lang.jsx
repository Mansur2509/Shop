import { useContext, useState, useEffect, createContext } from "react";

const LangContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ru" : "en"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
  }),
    [lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};
export const useLang = () => useContext(LangContext);
