"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { ChevronRight, Clock, Code, ListVideo, Loader2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import ProfileCodeBlock from "./profileComp/ProfileCodeBlock/ProfileCodeBlock";
import ProfileHeader from "./profileComp/ProfileHeader/ProfileHeader";
import ProfileLoad from "./profileComp/ProfileLoad/ProfileLoad";
import { api } from "../../../convex/_generated/api";
import Navbar from "@/components/Navbar/Navbar";
import StarBtn from "@/components/StarBtn/StarBtn";
import "./Profile.css";

const TABS = [
  { id: "executions", label: "Code Executions", icon: ListVideo },
  { id: "starred", label: "Starred Snippets", icon: Star },
] as const;

type TabId = (typeof TABS)[number]["id"];

function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("executions");

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });

  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    { userId: user?.id ?? "" },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  if (!user && isLoaded) return null;

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        {/* Profile Header */}
        {userStats && userData && (
          <ProfileHeader userStats={userStats} userData={userData} user={user!} />
        )}
        {(userStats === undefined || !isLoaded) && <ProfileLoad />}

        <div className="profile-card">
          {/* Tabs */}
          <div className="tabs-header">
            <div className="tabs-list">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn ${active ? "active" : ""}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="tab-active-bg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="icon" />
                    <span className="tab-label">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="tab-content"
            >
              {activeTab === "executions" && (
                <div className="space-y-6">
                  {executions?.map((execution) => (
                    <div key={execution._id} className="exec-card">
                      <div className="exec-header">
                        <div className="exec-header-left">
                          <div className="lang-img-wrap">
                            <Image
                              src={`/${execution.language}.png`}
                              alt={`${execution.language} logo`}
                              className="lang-img"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="exec-meta">
                            <div className="exec-topline">
                              <span>{execution.language.toUpperCase()}</span>
                              <span className="exec-topline-dot">•</span>
                              <span className="text-sm" style={{ color: "#def2f1", opacity: 0.7 }}>
                                {new Date(execution._creationTime).toLocaleString()}
                              </span>
                            </div>
                            <div className="exec-subline">
                              <span
                                className={`status-badge ${
                                  execution.error ? "error" : "success"
                                }`}
                              >
                                {execution.error ? "Error" : "Success"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="exec-body">
                        <ProfileCodeBlock code={execution.code} language={execution.language} />

                        {(execution.output || execution.error) && (
                          <div
                            className={`exec-output ${
                              execution.error ? "error" : "success"
                            }`}
                          >
                            <h4 className="exec-output-title">Output</h4>
                            <pre style={{ margin: 0 }}>
                              {execution.error || execution.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoadingExecutions ? (
                    <div className="center-state">
                      <Loader2
                        className="mx-auto"
                        style={{
                          width: 48,
                          height: 48,
                          color: "rgba(222,242,241,0.6)",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      <h3 className="center-title">Loading code executions...</h3>
                    </div>
                  ) : (
                    executions.length === 0 && (
                      <div className="center-state">
                        <Code
                          className="mx-auto"
                          style={{ width: 48, height: 48, color: "rgba(222,242,241,0.6)" }}
                        />
                        <h3 className="center-title">No code executions yet</h3>
                        <p className="center-subtitle">
                          Start coding to see your execution history!
                        </p>
                      </div>
                    )
                  )}

                  {/* Load More Button */}
                  {executionStatus === "CanLoadMore" && (
                    <div className="load-more">
                      <button onClick={handleLoadMore} className="load-more-btn">
                        Load More
                        <ChevronRight className="icon" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "starred" && (
                <div className="starred-grid">
                  {starredSnippets?.map((snippet) => (
                    <div key={snippet._id} className="snippet-card">
                      <Link href={`/snippets/${snippet._id}`}>
                        <div className="snippet-inner">
                          <div className="snippet-header">
                            <div className="snippet-header-left">
                              <div className="lang-img-wrap">
                                <Image
                                  src={`/${snippet.language}.png`}
                                  alt={`${snippet.language} logo`}
                                  className="lang-img"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <span className="lang-pill">{snippet.language}</span>
                            </div>

                            <div
                              className="snippet-star-btn-wrap"
                              onClick={(e) => e.preventDefault()}
                            >
                              <StarBtn snippetId={snippet._id} />
                            </div>
                          </div>

                          <h2 className="snippet-title">{snippet.title}</h2>
                          <div className="snippet-meta">
                            <div className="snippet-meta-left">
                              <Clock className="icon" />
                              <span>
                                {new Date(snippet._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                            <ChevronRight className="icon" />
                          </div>
                        </div>

                        <div className="snippet-code-wrap">
                          <div className="snippet-code">
                            <pre>{snippet.code}</pre>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="empty-starred">
                      <Star
                        className="mx-auto"
                        style={{ width: 48, height: 48, color: "rgba(222,242,241,0.6)" }}
                      />
                      <h3 className="center-title">No starred snippets yet</h3>
                      <p className="center-subtitle">
                        Start exploring and star the snippets you find useful!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;