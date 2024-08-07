import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getFavouriteProducts } from "@/utils/actions";

async function FavouritesPage() {
  const favourites = await getFavouriteProducts();
  const favouriteProducts = favourites.map((favourite) => favourite?.product);
  return (
    <main>
      <SectionTitle title="Favourites" />
      <div className="mt-8">
        {favouriteProducts.length === 0 ? (
          <EmptyList text="You have not added any favourite products." />
        ) : (
          <ProductsGrid products={favouriteProducts} />
        )}
      </div>
    </main>
  );
}
export default FavouritesPage;
