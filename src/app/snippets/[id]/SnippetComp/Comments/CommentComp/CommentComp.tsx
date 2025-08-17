"use client";

import { Trash2Icon, UserIcon } from "lucide-react";
import { Id } from "../../../../../../../convex/_generated/dataModel";

import CommentContent from "../CommentContent/CommentContent";
import "./CommentComp.css";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  isDeleting: boolean;
  currentUserId?: string;
}

function CommentComp({ comment, currentUserId, isDeleting, onDelete }: CommentProps) {
  const isOwnComment = comment.userId === currentUserId;

  return (
    <div className="comment-wrapper">
      <div className="comment-card">
        <div className="comment-header">
          <div className="comment-user-info">
            <div className="comment-avatar">
              <UserIcon className="icon" />
            </div>
            <div className="comment-meta">
              <span className="comment-username" title={comment.userName}>
                {comment.userName}
              </span>
              <span className="comment-date">
                {new Date(comment._creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          {isOwnComment && (
            <button
              onClick={() => onDelete(comment._id)}
              disabled={isDeleting}
              className="comment-delete-btn"
              title="Delete comment"
              aria-label="Delete comment"
            >
              <Trash2Icon className="icon" />
            </button>
          )}
        </div>

        <CommentContent content={comment.content} />
      </div>
    </div>
  );
}

export default CommentComp;