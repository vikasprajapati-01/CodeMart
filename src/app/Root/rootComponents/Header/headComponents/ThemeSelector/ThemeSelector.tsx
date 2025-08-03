"use client";

import { useCodeEditorStore } from "@/store/codeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "@/app/Root/constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "@/hooks.ts";
import "./ThemeSelector.css";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="theme-selector-container" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="theme-select-button"
      >
        {/* hover state bg decorator */}
        <div className="button-hover-bg" />

        <Palette className="button-icon" />

        <span className="button-text">
          {currentTheme?.label}
        </span>

        {/* color indicator */}
        <div
          className="color-indicator"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="dropdown-menu"
          >
            <div className="dropdown-header">
              <p className="dropdown-header-text">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`theme-option ${theme === t.id ? "option-active" : "option-inactive"}`}
                onClick={() => setTheme(t.id)}
              >
                {/* bg gradient */}
                <div className="option-bg-gradient" />

                {/* icon */}
                <div className={`option-icon-container ${theme === t.id ? "option-icon-active" : "option-icon-inactive"}`}>
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>
                
                {/* label */}
                <span className="option-label">
                  {t.label}
                </span>

                {/* color indicator */}
                <div
                  className="option-color-indicator"
                  style={{ background: t.color }}
                />

                {/* active theme border */}
                {theme === t.id && (
                  <motion.div
                    className="active-theme-border"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;