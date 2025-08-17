"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "../../CopyBtn/CopyBtn";
import "./CodeBlock.css";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const trimmedCode = code
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  const displayLanguage = language || "plaintext";

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <div className="code-block-lang-info">
          <img 
            src={`/${displayLanguage}.png`} 
            alt={`${displayLanguage} icon`} 
            className="code-block-lang-icon"
            onError={(e) => {
              // Fallback to a generic code icon if language icon doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="code-block-lang-text">{displayLanguage}</span>
        </div>
        <CopyButton code={trimmedCode} />
      </div>

      <div className="code-block-content">
        <SyntaxHighlighter
          language={displayLanguage}
          style={atomOneDark}
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            color: "rgba(222, 242, 241, 0.4)",
            borderRight: "1px solid rgba(43, 122, 120, 0.3)",
            paddingRight: "0.75rem",
            marginRight: "0.75rem",
            textAlign: "right",
            userSelect: "none",
          }}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;