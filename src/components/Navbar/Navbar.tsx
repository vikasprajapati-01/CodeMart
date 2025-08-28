"use client";

import HeaderProfileButton from "@/app/Root/rootComponents/Header/headComponents/HeaderProfile/HeaderProfileButton";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <div className="nav-surface-gradient" />
      <div className="nav-container">
        <div className="nav-bar">
          <div className="left-group">
            <Link href="/" className="logo-link">
              <div className="logo-hover-glow" aria-hidden="true" />
              <div className="logo-box">
                <Blocks className="logo-icon" />
              </div>
              <div className="logo-text-wrap">
                <span className="logo-title">CodeCraft</span>
              </div>
            </Link>

            <Link href="/" className="nav-link">
              <div className="nav-link-bg" />
              <span className="nav-link-text">
                Home
              </span>
            </Link>

            <Link href="/snippets" className="nav-link">
              <div className="nav-link-bg" aria-hidden="true" />
              <Code2 className="nav-link-icon" />
              <span className="nav-link-text">Snippets</span>
            </Link>
          </div>

          <div className="right-group">
            <SignedOut>
              <Link href="/pricing" className="pro-btn">
                <Sparkles className="pro-icon" />
                <span className="pro-text">Pro</span>
              </Link>
            </SignedOut>

            <HeaderProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;