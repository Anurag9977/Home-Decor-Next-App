import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { Button } from "@/components/ui/button";
import { fetchSingleProduct } from "@/utils/actions";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

async function SingleProduct({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct({ productID: params.id });
  const { name, company, description, price, image } = product;
  return (
    <main>
      <BreadCrumbs name={name} />
      <section className="mt-10 grid md:grid-cols-2 gap-x-16 gap-y-8">
        <div className="relative h-96 w-full">
          <Image
            src={image}
            alt={name}
            priority
            fill
            sizes="(max-width : '768px') 100vw, (max-width : '1200px') 50vw, 33vw"
            className="block w-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl capitalize font-semibold tracking-wide">
            {name}
          </h1>
          <h2 className="uppercase tracking-wider my-1">{company}</h2>
          <ProductRating />
          <Button
            variant="secondary"
            className="my-4 text-xl tracking-wider font-semibold cursor-default"
          >
            {formatPrice(price)}
          </Button>
          <p className="text-sm text-justify leading-7">{description}</p>
          <AddToCart />
        </div>
      </section>
    </main>
  );
}
export default SingleProduct;
