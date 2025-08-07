"use client";

import { useState } from "react";
import { useCodeEditorStore } from "@/store/codeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";

import RunningCode from "./RunningCode/RunningCode";
import "./OutputPanel.css";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="output-panel-container">
      <div className="output-header">
        <div className="output-header-left">
          <div className="terminal-icon-container">
            <Terminal className="terminal-icon" />
          </div>
          <span className="output-label">Output</span>
        </div>

        {hasContent && (
          <button onClick={handleCopy} className="copy-button">
            {isCopied ? (
              <>
                <CheckCircle className="copy-icon" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="copy-icon" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="output-area-wrapper">
        <div className="output-area">
          {isRunning ? (
            <RunningCode />
          ) : error ? (
            <div className="error-content">
              <AlertTriangle className="error-icon" />
              <div className="error-details">
                <div className="error-title">Execution Error</div>
                <pre className="error-message">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="success-content">
              <div className="success-header">
                <CheckCircle className="success-icon" />
                <span className="success-title">Execution Successful</span>
              </div>
              <pre className="success-output">{output}</pre>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon-container">
                <Clock className="empty-state-icon" />
              </div>
              <p className="empty-state-text">Run your code to see the output here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;