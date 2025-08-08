"use client";

import { useCodeEditorStore, getExecutionResult } from "@/store/codeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import "./RunButton.css";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="run-button"
    >
      <div className="run-button-background" />

      <div className="run-button-content">
        {isRunning ? (
          <>
            <div className="loading-icon-container">
              <Loader2 className="loading-icon" />
              <div className="loading-blur" />
            </div>
            <span className="loading-text">Executing...</span>
          </>
        ) : (
          <>
            <div className="play-icon-container">
              <Play className="play-icon" />
            </div>
            <span className="run-text">Run Code</span>
          </>
        )}
      </div>
    </motion.button>
  );
}

export default RunButton;