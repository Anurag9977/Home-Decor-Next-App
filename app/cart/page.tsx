import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";
import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CartPage() {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const cart = await fetchOrCreateCart({ userID: userId });
  const { cartItems, currentCart } = await updateCart(cart);

  if (currentCart.numOfItems === 0)
    return (
      <EmptyList text="You do not have any items in your cart currently." />
    );

  return (
    <main>
      <SectionTitle title="shopping cart" />
      <section className="mt-8 grid lg:grid-cols-[2fr_1fr] lg:gap-x-8 xl:gap-x-16 gap-y-8">
        <CartItemList cartItems={cartItems} />
        <CartTotals cart={currentCart} />
      </section>
    </main>
  );
}
export default CartPage;
