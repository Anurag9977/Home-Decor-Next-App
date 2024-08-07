import LoadingProductsContainer from "@/components/global/LoadingProductsContainer";
import SectionTitle from "@/components/global/SectionTitle";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

function HomePage() {
  return (
    <main>
      <Hero />
      <section className="mt-20">
        <SectionTitle title="featured products" />
        <Suspense
          fallback={
            <div className="mt-8">
              <LoadingProductsContainer />
            </div>
          }
        >
          <FeaturedProducts />
        </Suspense>
      </section>
    </main>
  );
}
export default HomePage;
