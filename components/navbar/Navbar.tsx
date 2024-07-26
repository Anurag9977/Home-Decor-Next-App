import { Suspense } from "react";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <nav className="shadow dark:shadow-sm dark:shadow-slate-800">
      <Container className="py-6 flex flex-col gap-y-6 gap-x-4 sm:flex-row justify-between items-center">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex justify-between items-center gap-6">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
