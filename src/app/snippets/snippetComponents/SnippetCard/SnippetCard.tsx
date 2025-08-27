"use client";

import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarBtn from "@/components/StarBtn/StarBtn";
import "./SnippetCard.css";

interface Props {
  snippet: Snippet;
}

function SnippetCard({ snippet }: Props) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast.success("Snippet deleted");
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteBtnClass = isDeleting
    ? "delete-button deleting"
    : "delete-button";

  return (
    <motion.div
      layout
      className="snippet-card-wrapper"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/${snippet._id}`} className="snippet-card-link">
        <div className="snippet-card">
          <div className="snippet-card-inner">
            <div className="snippet-card-header">
              <div className="header-left">
                <div className="lang-icon-outer">
                  <div className="lang-icon-glow" aria-hidden="true" />
                  <div className="lang-icon-box">
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="lang-image"
                      width={24}
                      height={24}
                      priority={false}
                    />
                  </div>
                </div>
                <div className="lang-meta">
                  <span className="lang-pill">{snippet.language}</span>
                  <div className="date-row">
                    <Clock className="icon" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div
                className="header-actions"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <StarBtn snippetId={snippet._id} />
                {user?.id === snippet.userId && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={deleteBtnClass}
                    aria-label="Delete snippet"
                  >
                    {isDeleting ? (
                      <div className="delete-spinner" />
                    ) : (
                      <Trash2 className="delete-icon" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="snippet-content">
              <div className="title-block">
                <h2 className="snippet-title">{snippet.title}</h2>
                <div className="author-row">
                  <div className="author-chip">
                    <User className="icon" />
                    <span className="author-name" title={snippet.userName}>
                      {snippet.userName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="code-preview-wrapper">
                <div className="code-preview-overlay" aria-hidden="true" />
                <pre className="code-block">{snippet.code}</pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;