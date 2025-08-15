"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import "./CopyBtn.css";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      type="button"
      className="copy-button"
      aria-label={copied ? "Code copied!" : "Copy code to clipboard"}
    >
      {copied ? (
        <Check className="copy-icon copied" />
      ) : (
        <Copy className="copy-icon" />
      )}
    </button>
  );
}

export default CopyButton;