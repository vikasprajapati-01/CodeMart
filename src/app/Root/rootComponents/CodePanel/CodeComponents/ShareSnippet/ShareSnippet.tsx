import { useCodeEditorStore } from "@/store/codeEditorStore";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import { X, Crown } from "lucide-react";
import toast from "react-hot-toast";
import "./ShareSnippet.css";

function ShareSnippet({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);
  const snippetStats = useQuery(api.snippets.getUserSnippetStats);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user can create more snippets
    if (snippetStats && !snippetStats.canCreateMore) {
      toast.error("You've reached the limit of 3 snippets for free users. Upgrade to Pro for unlimited snippets!");
      return;
    }

    setIsSharing(true);

    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      console.log("Error creating snippet:", error);
      if (error instanceof Error && error.message.includes("Free users can only save up to 3")) {
        toast.error("You've reached the limit of 3 snippets for free users. Upgrade to Pro for unlimited snippets!");
      } else {
        toast.error("Error creating snippet");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <div>
            <h2 className="dialog-title">Save Snippet</h2>
            {snippetStats && !snippetStats.isPro && (
              <p className="snippet-limit-text">
                {snippetStats.remainingSlots === 0 ? (
                  <span style={{ color: '#ef4444' }}>
                    <Crown size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Limit reached (3/3) - Upgrade to Pro for unlimited snippets
                  </span>
                ) : (
                  <span style={{ color: '#6b7280' }}>
                    {snippetStats.snippetCount}/3 snippets used - {snippetStats.remainingSlots} remaining
                  </span>
                )}
              </p>
            )}
            {snippetStats && snippetStats.isPro && (
              <p className="snippet-limit-text" style={{ color: '#10b981' }}>
                <Crown size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Pro User - Unlimited snippets
              </p>
            )}
          </div>
          <button onClick={onClose} className="close-button">
            <X className="close-icon" />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter snippet title"
              required
            />
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing || (snippetStats ? !snippetStats.canCreateMore : false)}
              className="submit-button"
              style={{
                opacity: (snippetStats && !snippetStats.canCreateMore) ? 0.5 : 1,
                cursor: (snippetStats && !snippetStats.canCreateMore) ? 'not-allowed' : 'pointer'
              }}
            >
              {isSharing ? "Saving..." : 
               (snippetStats && !snippetStats.canCreateMore) ? "Limit Reached" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareSnippet;