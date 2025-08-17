"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import CommentComp from "./CommentComp/CommentComp";
import CommentForm from "./CommentForm/CommentForm";
import "./Comments.css";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await addComment({ snippetId, content: content.trim() });
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment({ commentId });
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="comments-container">
      <div className="comments-header">
        <h2 className="comments-title">
          <MessageSquare className="icon" />
          Comments ({comments.length})
        </h2>
      </div>

      <div className="comments-body">
        {user ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="signin-prompt">
            <p className="signin-prompt-text">Sign in to post a comment</p>
            <SignInButton mode="modal">
              <button className="signin-button">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="comments-list">
          {comments.map((comment) => (
            <CommentComp
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;