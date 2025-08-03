import './Header.css';

import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import Link from "next/link";
import { Building2, Code2, Crown } from "lucide-react";

import { SignedIn } from "@clerk/nextjs";

import { api } from "../../../../../convex/_generated/api";
import HeaderProfileButton from './headComponents/HeaderProfile/HeaderProfileButton';
import RunButton from './headComponents/RunButton/RunButton';
import LanguageSelector from './headComponents/LanguageSelector/LanguageSelector';
import ThemeSelector from './headComponents/ThemeSelector/ThemeSelector';

async function Header() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
    });

    // console.log("Convex User:", convexUser);
    // console.log("Current User:", user);

  return (
    <div className="header-container">
      <div className="header-bar">
        <div className="header-left">
          <Link href="/" className="logo-link">
            <div className="logo-container">
              <Building2 className="logo-icon" />
            </div>

            <div className="logo-text-container">
              <span className="logo-title">
                CodeCraft
              </span>
            </div>
          </Link>

          <nav className="navigation">
            <Link href="/snippets" className="nav-link">
              <div className="nav-link-bg" />
              <Code2 className="nav-icon" />
              <span className="nav-text">
                Snippets
              </span>
            </Link>
          </nav>
        </div>

        <div className="header-right">
          <div className="header-controls">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && (
            <Link href="/pricing" className="pro-link">
              <Crown className="pro-icon" />
              <span className="pro-text">
                Pro
              </span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="profile-container">
            <HeaderProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;