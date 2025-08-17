"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";
import CommentContent from "../CommentContent/CommentContent";
import "./CommentForm.css";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment = comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await onSubmit(comment);
    setComment("");
    setIsPreview(false);
  };

  const isDisabled = isSubmitting || !comment.trim();

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-form-card">
        <div className="comment-form-header">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`preview-toggle ${isPreview ? "active" : ""}`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        <div className="comment-form-body">
          {isPreview ? (
            <div className="comment-preview">
              <CommentContent content={comment} />
            </div>
          ) : (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add comments here...To write a code block, use triple backticks: ```language name(next line) Your code here```"
              className="comment-textarea"
              rows={5}
            />
          )}
        </div>

        <div className="comment-form-footer">
          <div className="comment-form-help">
            <div className="comment-form-help-row">
              {/* <CodeIcon className="icon" /> */}
              <span>• You can preview your comment before posting</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isDisabled}
            className="comment-submit-btn"
          >
            {isSubmitting ? (
              <>
                <div className="comment-submit-spinner" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="icon" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;