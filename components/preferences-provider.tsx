"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  languageLabels,
  Language,
  ThemeTone,
  translateText
} from "@/lib/i18n";

type PreferencesContextValue = {
  mounted: boolean;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeTone;
  setTheme: (theme: ThemeTone) => void;
  t: (value: string) => string;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "zh-HK" || value === "zh-CN";
}

function normalizeLanguage(value: string | null): Language | null {
  if (value === "zh-TW") return "zh-HK";
  return isLanguage(value) ? value : null;
}

function isTheme(value: string | null): value is ThemeTone {
  return value === "dark" || value === "light";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<ThemeTone>("dark");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedLanguage = normalizeLanguage(window.localStorage.getItem("7gg-language"));
      const storedTheme = window.localStorage.getItem("7gg-theme");
      if (storedLanguage) setLanguageState(storedLanguage);
      if (isTheme(storedTheme)) setThemeState(storedTheme);
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    if (mounted) window.localStorage.setItem("7gg-language", language);
  }, [language, mounted]);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (mounted) window.localStorage.setItem("7gg-theme", theme);
  }, [theme, mounted]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeTone) => {
    setThemeState(nextTheme);
  }, []);

  const value = useMemo(
    () => ({
      mounted,
      language,
      setLanguage,
      theme,
      setTheme,
      t: (text: string) => translateText(text, language)
    }),
    [language, mounted, setLanguage, setTheme, theme]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function T({ k }: { k: string }) {
  const { t } = usePreferences();
  return <>{t(k)}</>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, mounted, setLanguage } = usePreferences();
  const displayLanguage = mounted ? language : "en";

  return (
    <div className="flex items-center gap-2" data-no-auto-translate suppressHydrationWarning>
      <div className="flex rounded-xl border border-gold-500/30 bg-[color:var(--control)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {(Object.keys(languageLabels) as Language[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
              displayLanguage === item
                ? "bg-gold-500 text-black"
                : "text-slateText-primary/80 hover:bg-[color:var(--control-hover)] hover:text-slateText-primary"
            }`}
          >
            {compact
              ? item === "en"
                ? "EN"
                : item === "zh-HK"
                  ? "繁"
                  : "简"
              : languageLabels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ThemeSwitcher() {
  const { mounted, theme, setTheme, t } = usePreferences();
  const displayTheme = mounted ? theme : "dark";
  const options: ThemeTone[] = ["dark", "light"];

  return (
    <div className="flex rounded-xl border border-gold-500/30 bg-[color:var(--control)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" data-no-auto-translate suppressHydrationWarning>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setTheme(option)}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
            displayTheme === option
              ? "bg-gold-500 text-black"
              : "text-slateText-primary/80 hover:bg-[color:var(--control-hover)] hover:text-slateText-primary"
          }`}
        >
          {t(option === "dark" ? "Dark" : "Light")}
        </button>
      ))}
    </div>
  );
}

export function PreferenceControls({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2" data-no-auto-translate suppressHydrationWarning>
      <LanguageSwitcher compact={compact} />
      <ThemeSwitcher />
    </div>
  );
}

export const LanguageProvider = PreferencesProvider;
export const ThemeProvider = PreferencesProvider;
