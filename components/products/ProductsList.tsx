import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import React from "react";
import Link from "next/link";
import FavouriteToggleButton from "./FavouriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <section>
      {products.map((product) => {
        const { id, name, company, description, price, image } = product;
        return (
          <React.Fragment key={id}>
            <article className="md:h-28 flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <Link href={`products/${id}`} className="h-full">
                <section className="h-full flex flex-col md:flex-row gap-4 group">
                  <div className="relative h-40 md:h-auto w-full md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      className="object-cover rounded-lg border-4 border-transparent group-hover:border-primary duration-300"
                    />
                  </div>
                  <div>
                    <h1 className="tracking-wide text-lg capitalize">{name}</h1>
                    <h2 className="tracking-wider text-md uppercase mt-1">
                      {company}
                    </h2>
                    <p className="mt-2 tracking-wide text-xs text-muted-foreground leading-relaxed">
                      {description.substring(0, 100)}...
                    </p>
                  </div>
                </section>
              </Link>
              <section className="w-full md:w-max md:h-full flex flex-row md:flex-col justify-between items-center md:items-end">
                <h1 className="text-lg tracking-wide">{formatPrice(price)}</h1>
                <FavouriteToggleButton productID={id} />
              </section>
            </article>
            <Separator className="my-4" />
          </React.Fragment>
        );
      })}
    </section>
  );
}
export default ProductsList;
