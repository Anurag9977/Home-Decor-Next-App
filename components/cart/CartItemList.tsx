import { Prisma } from "@prisma/client";
import SingleCartItem from "./CartItem";

type CartItemWithProductProps = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

function CartItemList({
  cartItems,
}: {
  cartItems: CartItemWithProductProps[];
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const {
          id,
          amount,
          product: { id: productID, name, company, image, price },
        } = cartItem;
        const cartItemProps = {
          productInfo: {
            productID,
            name,
            company,
            image,
            price,
          },
          id,
          amount,
        };
        return (
          <SingleCartItem
            key={id}
            productInfo={cartItemProps.productInfo}
            id={id}
            amount={cartItemProps.amount}
          />
        );
      })}
    </div>
  );
}
export default CartItemList;
