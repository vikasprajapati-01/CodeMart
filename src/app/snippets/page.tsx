"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./snippetComponents/SnippetSkeleton/SnippetSkeleton";
import Navbar from "@/components/Navbar/Navbar";

import { AnimatePresence, motion } from "framer-motion";
import { Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./snippetComponents/SnippetCard/SnippetCard";
import "./Snippets.css";

function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  if (snippets === undefined) {
    return (
      <div className="page-min-height">
        <Navbar />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      snippet.title.toLowerCase().includes(q) ||
      snippet.language.toLowerCase().includes(q) ||
      snippet.userName.toLowerCase().includes(q);

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="snippets-page">
      <Navbar />

      <div className="snippets-container">
        <div className="hero">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge"
          >
            <BookOpen className="icon" />
            Community Code Library
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-title"
          >
            Discover & Share Code Snippets
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        <div className="filters">
          <div className="search-group">
            <div className="search-glow" />
            <div className="search-row">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="search-input"
              />
            </div>
          </div>

          <div className="filters-bar">
            <div className="langs-label">
              <Tag className="icon" />
              <span className="text">Languages:</span>
            </div>

            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                className={`lang-chip ${selectedLanguage === lang ? "selected" : ""}`}
              >
                <div className="inner">
                  <img src={`/${lang}.png`} alt={lang} className="icon-img" />
                  <span className="label">{lang}</span>
                </div>
              </button>
            ))}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="clear-filter"
              >
                <X className="icon" />
                Clear
              </button>
            )}

            <div className="results-and-view">
              <span className="results-count">
                {filteredSnippets.length} snippets found
              </span>

              <div className="view-toggle">
                <button
                  onClick={() => setView("grid")}
                  className={`view-btn ${view === "grid" ? "active" : ""}`}
                  aria-label="Grid view"
                >
                  <Grid className="icon" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`view-btn ${view === "list" ? "active" : ""}`}
                  aria-label="List view"
                >
                  <Layers className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className={`snippets-grid ${view === "grid" ? "grid-view" : "list-view"}`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-state"
          >
            <div className="text-center">
              <div className="empty-icon-box">
                <Code className="empty-icon" />
              </div>
              <h3 className="empty-title">No snippets found</h3>
              <p className="empty-text">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="clear-all-btn"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SnippetsPage;