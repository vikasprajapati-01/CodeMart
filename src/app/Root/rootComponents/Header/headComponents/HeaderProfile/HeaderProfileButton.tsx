"use client";
import { SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileButton() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="signin-button">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
export default HeaderProfileButton;