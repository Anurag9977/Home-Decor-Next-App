import { formatPrice } from "@/utils/formatPrice";
import { Separator } from "../ui/separator";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { createOrder } from "@/utils/actions";
import { Cart } from "@prisma/client";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, tax, shipping, orderTotal } = cart;
  return (
    <section>
      <article className="h-max p-4 rounded-lg border border-muted">
        <div className="flex justify-between text-sm lg:text-base capitalize tracking-wide">
          <h2>sub total</h2>
          <h2>{formatPrice(cartTotal)}</h2>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-sm lg:text-base capitalize tracking-wide">
          <h2>tax</h2>
          <h2>{formatPrice(tax)}</h2>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-sm lg:text-base capitalize tracking-wide">
          <h2>shipping</h2>
          <h2>{formatPrice(shipping)}</h2>
        </div>
        <Separator className="my-2" />
        <div className="mt-4 flex flex-wrap justify-between capitalize tracking-wider text-base lg:text-lg font-semibold">
          <h1>order total</h1>
          <h1>{formatPrice(orderTotal)}</h1>
        </div>
        <Separator className="mt-2" />
      </article>
      <div className="mt-8">
        <FormContainer action={createOrder}>
          <SubmitButton
            text="place order"
            className="w-full uppercase tracking-wider"
          />
        </FormContainer>
      </div>
    </section>
  );
}
export default CartTotals;
