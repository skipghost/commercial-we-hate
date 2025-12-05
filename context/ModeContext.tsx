"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

import { Mode } from "@/types/enums";

interface ModeContextType {
  mode: Mode | null;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within ModeProvider");
  return context;
};

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode | null>(Mode.HATE);

  useEffect(() => {
    const storedMode = Cookies.get("mode") as Mode;
    setMode(storedMode ?? Mode.HATE);
  }, []);

  useEffect(() => {
    if (!mode) return;
    document.documentElement.setAttribute("data-mode", mode.toLowerCase());
    Cookies.set("mode", mode, { expires: 365 });
  }, [mode]);

  const toggleMode = () => {
    if (!mode) return;
    setMode((prev) => (prev === Mode.LOVE ? Mode.HATE : Mode.LOVE));
  };

  return <ModeContext.Provider value={{ mode: mode ?? null, toggleMode }}>{children}</ModeContext.Provider>;
};

