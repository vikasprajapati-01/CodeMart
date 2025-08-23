"use client";

import { useQuery } from "convex/react";
import { Activity, Code2, Star, Timer, TrendingUp, Trophy, UserIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { UserResource } from "@clerk/types";

import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import "./ProfileHeader.css";

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      description: "Total code runs",
      metric: { label: "Last 24h", value: userStats?.last24Hours ?? 0, icon: Timer },
      accent: { from: "#3aafa9", to: "#2b7a78" },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      description: "Saved for later",
      metric: { label: "Most starred", value: userStats?.mostStarredLanguage ?? "N/A", icon: Trophy },
      accent: { from: "#7fdad6", to: "#3aafa9" },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      description: "Total languages",
      metric: { label: "Most used", value: userStats?.favoriteLanguage ?? "N/A", icon: TrendingUp },
      accent: { from: "#2b7a78", to: "#3aafa9" },
    },
  ] as const;

  return (
    <div className="ph-card">
      <div className="ph-header">
        <div className="ph-avatar-wrap">
          <div className="ph-avatar-glow" />
          <img
            src={user.imageUrl}
            alt="Profile"
            className="ph-avatar"
          />
          {userData.isPro && (
            <div className="ph-pro-badge" title="Pro Member">
              <Zap className="icon" style={{ width: 16, height: 16 }} />
            </div>
          )}
        </div>

        <div>
          <div className="ph-user-name-row">
            <h1 className="ph-user-name">{userData.name}</h1>
            {userData.isPro && <span className="ph-pro-pill">Pro Member</span>}
          </div>
          <p className="ph-user-email">
            <UserIcon className="icon" style={{ width: 16, height: 16 }} />
            {userData.email}
          </p>
        </div>
      </div>

      <div className="ph-stats-grid">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          const MetricIcon = stat.metric.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
              style={
                {
                  // Accent colors via CSS variables
                  ["--accent-from" as any]: stat.accent.from,
                  ["--accent-to" as any]: stat.accent.to,
                } as React.CSSProperties
              }
            >
              <div className="stat-glow" />
              <div className="stat-content">
                <div className="stat-top">
                  <div>
                    <div className="stat-desc">{stat.description}</div>
                    <div className="stat-value">
                      {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                  <div className="stat-icon-wrap">
                    <Icon className="stat-icon" />
                  </div>
                </div>

                <div className="stat-metric">
                  <MetricIcon className="metric-icon" />
                  <span className="metric-label">{stat.metric.label}:</span>
                  <span className="metric-value">{stat.metric.value}</span>
                </div>
              </div>

              <div className="stat-sheen" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileHeader;