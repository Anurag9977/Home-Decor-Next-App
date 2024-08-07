import { links } from "@/utils/links";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GrTextAlignLeft } from "react-icons/gr";
import Link from "next/link";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLink from "./SignOutLink";
import { auth } from "@clerk/nextjs/server";

function LinksDropdown() {
  const user = auth();
  const isAdminUser = user.userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <GrTextAlignLeft className="h-[1.2rem] w-[1.2rem]" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align="start" className="w-40">
        <SignedIn>
          {links.map((link, index) => {
            if (!isAdminUser && link.label === "dashboard") return null;
            return (
              <DropdownMenuItem key={index}>
                <Link
                  href={link.href}
                  className="capitalize w-full tracking-wide"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left tracking-wide">Log In</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left tracking-wide">
                Register
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
