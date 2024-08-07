"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "../ui/use-toast";

function handleSignOut() {
  toast({ description: "Logging out..." });
}
function SignOutLink() {
  return (
    <SignOutButton>
      <Link href="/" onClick={handleSignOut} className="w-full tracking-wide">
        Log Out
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
