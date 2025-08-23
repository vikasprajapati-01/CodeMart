"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./ProfileCodeBlock.css";

interface CodeBlockProps {
  code: string;
  language: string;
}

const MAX_LINES = 6;

const ProfileCodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = useMemo(() => code.split("\n"), [code]);

  const displayCode = useMemo(
    () => (isExpanded ? code : lines.slice(0, MAX_LINES).join("\n")),
    [isExpanded, code, lines]
  );

  const canToggle = lines.length > MAX_LINES;
  const displayLanguage = (language || "plaintext").toLowerCase();

  return (
    <div className="code-block">
      <SyntaxHighlighter
        language={displayLanguage}
        style={atomOneDark}
        customStyle={{
          padding: "1rem",
          background: "transparent",
          margin: 0,
        }}
        wrapLongLines
      >
        {displayCode}
      </SyntaxHighlighter>

      {!isExpanded && canToggle && <div className="code-block-fade" />}

      {canToggle && (
        <button
          type="button"
          className="code-block-toggle"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="icon" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="icon" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ProfileCodeBlock;