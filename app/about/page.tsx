import { Dancing_Script, Rubik } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });
const rubik = Rubik({ subsets: ["latin"] });

function AboutPage() {
  return (
    <main className="flex flex-col gap-8 text-center">
      <h1 className={`${rubik.className} text-6xl tracking-wide`}>
        Our <span className="text-primary">Story</span>
      </h1>
      <p className="text-lg leading-loose tracking-wider">
        Two decades ago, our story with{" "}
        <span
          className={`${dancingScript.className} text-2xl font-semibold text-primary`}
        >
          Home Decor
        </span>{" "}
        {`began with a simple mission: to bring the best-in-class furniture to
        your home and office. Back then, furniture shopping felt like a chore -
        impersonal stores with generic options. We envisioned a different
        experience, a place where you could discover unique pieces that
        reflected your style and created inspiring spaces. That's the fire that
        ignited our journey, and it's still what fuels us today.`}
      </p>
    </main>
  );
}
export default AboutPage;
