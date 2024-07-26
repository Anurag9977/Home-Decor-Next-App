import { fetchFeaturedProducts } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <section className="mt-20">
      <SectionTitle title="featured products" />
      <div className="my-8">
        <ProductsGrid products={featuredProducts} />
      </div>
    </section>
  );
}
export default FeaturedProducts;
