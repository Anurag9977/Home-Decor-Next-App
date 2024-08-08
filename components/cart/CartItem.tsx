"use client";

import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import DeleteCartItemButton from "./DeleteCartItemButton";
import SelectCartItemInput from "./SelectCartItemInput";

type CartItemProps = {
  productInfo: {
    productID: string;
    name: string;
    company: string;
    image: string;
    price: number;
  };
  id: string;
  amount: number;
};

function SingleCartItem({ productInfo, id, amount }: CartItemProps) {
  return (
    <article className="grid grid-cols-[2fr_1fr_1fr] gap-3 md:gap-4 border border-muted rounded-lg p-2 md:p-4 mb-4">
      <div className="flex gap-3 md:gap-4">
        <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden">
          <Image
            src={productInfo.image}
            alt={productInfo.name}
            fill
            sizes="(max-width : 768px) 100vw, (max-width:1024px) 50vw, 33vw"
            priority
            className="block w-full object-cover hover:scale-105 duration-300"
          />
        </div>
        <div>
          <Link href={`/products/${productInfo.productID}`}>
            <h1 className="text-sm lg:text-base tracking-wide hover:underline">
              {productInfo.name}
            </h1>
          </Link>
          <h2 className="mt-1 uppercase text-xs tracking-wider">
            {productInfo.company}
          </h2>
        </div>
      </div>
      <div className="h-max flex gap-2 lg:gap-4 items-start justify-self-end">
        <div className="w-16 lg:w-20">
          <SelectCartItemInput
            id={id}
            name="amount"
            placeholder={amount.toString()}
            items={Array.from({ length: 10 }, (_, index) =>
              (index + 1).toString()
            )}
          />
        </div>
        <div className="mt-2 self-end">
          <DeleteCartItemButton cartItemID={id} />
        </div>
      </div>
      <h1 className="justify-self-end tracking-wide text-sm lg:text-base">
        {formatPrice(productInfo.price)}
      </h1>
    </article>
  );
}
export default SingleCartItem;
