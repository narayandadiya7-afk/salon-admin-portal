import { useState, createContext, useContext } from "react";
import myJson from "../data/bi-lang.json";
var dictionaryList = { en: {}, fr: {}, hi: {} };

export const languageOptions = { en: "English", fr: "French", hi: "Hindi" };

myJson.forEach((element) => {
  dictionaryList.en = {
    ...dictionaryList.en,
    [element.key]: element.value.en,
  };
  dictionaryList.fr = {
    ...dictionaryList.fr,
    [element.key]: element.value.fr,
  };
  dictionaryList.hi = {
    ...dictionaryList.hi,
    [element.key]: element.value.hi,
  };
});

export const LanguageContext = createContext({
  userLanguage: "en",
  dictionary: dictionaryList.en,
  userLanguageChange: (selected: keyof typeof languageOptions) => {},
} as {
  userLanguage: string;
  dictionary: Record<string, string>;
  userLanguageChange: (selected: keyof typeof languageOptions) => void;
});

export function LanguageProvider({ children }: any) {
  const defaultLanguage =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("rcml-lang")
      : null;
  const [userLanguage, setUserLanguage] = useState<string>(
    defaultLanguage as any
  );

  const userLanguageChange = (selected: keyof typeof languageOptions) => {
    const newLanguage = languageOptions[selected] ? selected : "";
    setUserLanguage(newLanguage);
  };

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage as keyof typeof dictionaryList],
    userLanguageChange: userLanguageChange,
  };
  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}
function Text({ tid, def }: { tid: string; def: string }): string {
  const languageContext = useContext(LanguageContext);

  // Check if languageContext or languageContext.dictionary is undefined
  if (!languageContext || !languageContext.dictionary) {
    return def; // Return default text wrapped in a JSX element
  }

  // Ensure tid is a valid key of the dictionary
  const text =
    languageContext.dictionary[tid as keyof typeof languageContext.dictionary];

  // Return text if found, otherwise return default text
  return text !== undefined ? text : def; // Wrap the text in a JSX element
}

export default Text;
