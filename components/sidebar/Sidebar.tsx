"use client";

import { adminLinks } from "@/utils/links";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();
  return (
    <>
      {adminLinks.map((link, index) => {
        const buttonVariant = pathName === link.href ? "default" : "ghost";
        return (
          <Button
            asChild
            key={index}
            variant={buttonVariant}
            className="justify-start capitalize tracking-wide"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </>
  );
}
export default Sidebar;
