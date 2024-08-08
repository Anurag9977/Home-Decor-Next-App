import { fetchFeaturedProducts } from "@/utils/actions";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <>
      <div className="mt-8">
        <ProductsGrid products={featuredProducts} />
      </div>
    </>
  );
}
export default FeaturedProducts;
