"use client";

import { useAuth } from "@clerk/nextjs";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Star } from "lucide-react";
import "./StarBtn.css";

function StarBtn({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();

  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);

  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId });
  };

  const active = Boolean(isStarred);

  return (
    <button
      className={`star-btn ${active ? "active" : ""}`}
      onClick={handleStar}
      aria-pressed={active}
      aria-disabled={!isSignedIn}
      title={isSignedIn ? (active ? "Unstar snippet" : "Star snippet") : "Sign in to star"}
    >
      <Star className="star-icon" />
      <span className={`star-count ${active ? "active" : ""}`}>{starCount ?? 0}</span>
    </button>
  );
}

export default StarBtn;