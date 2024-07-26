import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid lg:grid-cols-2 gap-20">
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl tracking-wide leading-tight font-semibold">
          Design Your <span className="text-primary">Comfort Zone</span>
        </h1>
        <h2 className="tracking-wide leading-9 text-lg">
          Home Decor offers a diverse selection of products, from cozy armchairs
          to sleek desks, all designed to cultivate inspiring spaces. Driven by
          the desire to simplify furnishing.
        </h2>
        <Button asChild className="w-max tracking-wider text-base">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
