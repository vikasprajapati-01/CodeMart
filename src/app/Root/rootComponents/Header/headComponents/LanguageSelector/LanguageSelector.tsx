"use client";

import './LanguageSelector.css';
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Lock, TicketCheck } from "lucide-react";
import Image from "next/image";

import { useCodeEditorStore } from "@/store/codeEditorStore";
import { LANGUAGE_CONFIG } from "@/app/Root/constants";
import useMounted from "@/hooks.ts";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useMounted();

    const { language, setLanguage } = useCodeEditorStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLanguageObj = LANGUAGE_CONFIG[language];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (langId: string) => {
        if (!hasAccess && (langId !== "javascript" && langId !== "python" && langId !== "java" && langId !== "cpp")) return;

        setLanguage(langId);
        setIsOpen(false);
    };

    if (!mounted) return null;

     return (
        <div className="language-selector" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`language-selector-button ${!hasAccess && language !== "javascript" && language !== "python" && language !== "java" && language !== "cpp" ? "disabled" : ""}`}
            >
                <div className="button-decoration" aria-hidden="true" />

                <div className="language-icon-container">
                <Image
                    src={currentLanguageObj.logoPath}
                    alt="programming language logo"
                    width={24}
                    height={24}
                    className="language-icon"
                />
                </div>

                <span className="language-label">
                    {currentLanguageObj.label}
                </span>

                <ChevronDownIcon className={`chevron-icon ${isOpen ? "rotated" : ""}`} />
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
                        <p className="dropdown-header-text">Select Language</p>
                    </div>

                    <div className="language-list">
                        {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                            const isLocked = !hasAccess && (lang.id !== "javascript" && lang.id !== "python" && lang.id !== "java" && lang.id !== "cpp");
                            const isSelected = language === lang.id;

                            return (
                            <motion.div
                                key={lang.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="language-option-container"
                            >
                                <button
                                className={`language-option-button ${isSelected ? "selected" : ""}`}
                                onClick={() => handleLanguageSelect(lang.id)}
                                disabled={isLocked}
                                >
                                    <div className="option-decoration" />

                                    <div className={`option-icon-container ${isSelected ? "selected" : ""}`}>
                                        <div className="option-icon-decoration" />
                                        <Image
                                        width={24}
                                        height={24}
                                        src={lang.logoPath}
                                        alt={`${lang.label} logo`}
                                        className="language-icon"
                                        />
                                    </div>

                                    <span className="option-label">
                                        {lang.label}
                                    </span>

                                    {isSelected && (
                                        <motion.div
                                        className="selected-border"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                        />
                                    )}

                                    {isLocked ? (
                                        <Lock className="lock-icon" />
                                    ) : (
                                        isSelected && (
                                        <TicketCheck className="sparkle-icon" />
                                        )
                                    )}
                                </button>
                            </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
  );
}

export default LanguageSelector;