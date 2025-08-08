"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";

import { useCodeEditorStore } from "@/store/codeEditorStore";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../../constants";
import useMounted from "@/hooks.ts";
import { CodePanelSkeleton } from "./CodeComponents/CodeSkeleton/CodePanelSkeleton";
import ShareSnippet from "./CodeComponents/ShareSnippet/ShareSnippet";

import "./CodePanel.css";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 32);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="editor-panel-container">
      <div className="editor-panel-main">
        <div className="editor-header">
          <div className="editor-header-left">
            <div className="language-icon-container">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </div>
            <div>
              <h2 className="editor-title">{ language }</h2>
              {/* <p className="editor-subtitle">Write and execute your code</p> */}
            </div>
          </div>
          <div className="editor-controls">
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="refresh-button"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="refresh-icon" />
            </motion.button>
            
            <div className="font-size-control">
              <TypeIcon className="font-size-icon" />
              <div className="font-size-controls">
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="font-size-slider"
                />
                <span className="font-size-display">
                  {fontSize}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="share-button"
            >
              <ShareIcon className="share-icon" />
              <span className="share-text">Share</span>
            </motion.button>
          </div>
        </div>

        <div className="editor-container">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          )}

          {!clerk.loaded && <CodePanelSkeleton />}
        </div>
      </div>
      {isShareDialogOpen && <ShareSnippet onClose={() => setIsShareDialogOpen(false)} />}
    </div>
  );
}

export default EditorPanel;