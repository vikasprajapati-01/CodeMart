"use client";

import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import "./Login.css";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button
        type="button"
        className="login-btn"
        aria-label="Sign in to your account"
      >
        <LogIn className="icon" />
        <span className="login-btn-text">Sign In</span>
      </button>
    </SignInButton>
  );
}

export default LoginButton;