"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import { Clock, Code, MessageSquare, User } from "lucide-react";

import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/Root/constants";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import SnippetLoading from "./SnippetComp/SnippetLoading/SnippetLoading";
import Navbar from "@/components/Navbar/Navbar";
import CopyButton from "./SnippetComp/CopyBtn/CopyBtn";
import Comments from "./SnippetComp/Comments/Comments";

import "./SnippetDetailPage.css";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if (snippet === undefined) return <SnippetLoading />;

  return (
    <div className="snippet-page">
      <Navbar />

      <main className="snippet-main">
        <div className="snippet-content">
          <div className="snippet-header">
            <div className="snippet-header-top">
              <div className="snippet-header-left">
                <div className="snippet-lang-icon">
                  <img
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                  />
                </div>
                <div className="snippet-header-info">
                  <h1>{snippet.title}</h1>
                  <div className="snippet-meta">
                    <div className="snippet-meta-item">
                      <User className="icon" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="snippet-meta-item">
                      <Clock className="icon" />
                      <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                    </div>
                    <div className="snippet-meta-item">
                      <MessageSquare className="icon" />
                      <span>{comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="snippet-lang-pill">
                {snippet.language}
              </div>
            </div>
          </div>

          <div className="snippet-editor">
            <div className="snippet-editor-header">
              <div className="snippet-editor-label">
                <Code className="icon" />
                <span>Source Code</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <div className="snippet-editor-content">
              <Editor
                height="600px"
                language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                value={snippet.code}
                theme="vs-dark"
                beforeMount={defineMonacoThemes}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                  renderWhitespace: "selection",
                  fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontLigatures: true,
                }}
              />
            </div>
          </div>
          <Comments snippetId={snippet._id} />

        </div>
      </main>
    </div>
  );
}

export default SnippetDetailPage;