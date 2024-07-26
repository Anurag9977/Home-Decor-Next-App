import { dancingScript } from "@/utils/fonts";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className={`${dancingScript.className} text-primary text-3xl tracking-wide`}
    >
      Home Decor
    </Link>
  );
}
export default Logo;
