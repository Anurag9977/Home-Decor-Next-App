import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import FavouriteToggleButton from "./FavouriteToggleButton";
import { rubik } from "@/utils/fonts";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid md:grid-cols-2  lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const { id, name, image, price } = product;
        return (
          <article key={id} className="relative">
            <Link href={`/products/${id}`}>
              <div className="relative h-56">
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width : 768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover w-full rounded-lg hover:scale-105 duration-300"
                />
              </div>
              <div className="mt-2 flex justify-between">
                <h2 className="capitalize tracking-wide">{name}</h2>
                <p className={`${rubik.className} text-lg tracking-wide`}>
                  {formatPrice(price)}
                </p>
              </div>
            </Link>
            <div className="absolute top-3 right-3">
              <FavouriteToggleButton />
            </div>
          </article>
        );
      })}
    </section>
  );
}
export default ProductsGrid;
