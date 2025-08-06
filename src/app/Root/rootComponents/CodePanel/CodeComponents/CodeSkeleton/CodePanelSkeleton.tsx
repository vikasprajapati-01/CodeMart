import { Terminal } from "lucide-react";

import "./CodePanelSkeleton.css";

export function CodePanelSkeleton() {
  return (
    <div className="editor-skeleton-container">
      <div className="editor-skeleton-bg" />
      <div className="editor-skeleton-main">
        <div className="editor-skeleton-area">
          <div className="editor-skeleton-area-bg" />
          <div className="editor-skeleton-content">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="code-line">
                <div className="line-number" />
                <div
                  className="code-content"
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="editor-skeleton-bottom">
          <div className="bottom-bar" />
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="output-skeleton-container">
      <div className="output-skeleton-header">
        <div className="output-header-left">
          <div className="output-terminal-icon">
            <Terminal className="terminal-icon" />
          </div>
          <div className="output-title" />
        </div>
      </div>

      <div className="output-area-container">
        <div className="output-area-bg" />
        <div className="output-area">
          <div className="output-content">
            <div className="output-center">
              <div className="output-icon" />
              <div className="output-text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditorViewSkeleton() {
  return (
    <div className="editor-view-skeleton">
      <div className="skeleton-space">
        <CodePanelSkeleton />
      </div>
      <OutputPanelSkeleton />
    </div>
  );
}