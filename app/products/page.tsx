import ProductsContainer from "@/components/products/ProductsContainer";

function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; layout?: string };
}) {
  const productsLayout = searchParams.layout || "grid";
  const searchText = searchParams.search || "";
  return (
    <main>
      <ProductsContainer layout={productsLayout} search={searchText} />
    </main>
  );
}
export default ProductsPage;
