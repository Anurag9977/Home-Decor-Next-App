import { fetchAllProducts } from "@/utils/actions";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import EmptyList from "../global/EmptyList";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoGridOutline } from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { Separator } from "../ui/separator";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const searchTerm = search ? `&search=${search}` : "";
  const products = await fetchAllProducts({ search });
  return (
    <section>
      {products.length > 0 && (
        <>
          <div className="flex justify-between items-end">
            <h1 className="tracking-wider text-lg font-semibold">
              {products.length} Product{products.length > 1 && "s"}
            </h1>
            <div className="flex gap-4">
              <Button
                asChild
                variant={layout === "grid" ? "default" : "ghost"}
                size="icon"
              >
                <Link href={`/products?layout=grid${searchTerm}`}>
                  <IoGridOutline className="text-lg" />
                </Link>
              </Button>
              <Button
                asChild
                variant={layout === "list" ? "default" : "ghost"}
                size="icon"
              >
                <Link href={`/products?layout=list${searchTerm}`}>
                  <LuLayoutList className="text-lg" />
                </Link>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      )}
      {products.length === 0 ? (
        <EmptyList
          text="Sorry, No products matched your search...."
          className="text-2xl tracking-wide"
        />
      ) : layout === "grid" ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products} />
      )}
    </section>
  );
}
export default ProductsContainer;
