"use client";
import { SignedOut, SignIn, UserButton } from "@clerk/nextjs";
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
        <SignIn />
      </SignedOut>
    </>
  );
}
export default HeaderProfileButton;