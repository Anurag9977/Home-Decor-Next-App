import Link from "next/link";
import { RiShoppingCartLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { getNumOfItemsInCart } from "@/utils/actions";
async function CartButton() {
  const numOfItemsInCart = await getNumOfItemsInCart();
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="relative flex justify-center items-center"
    >
      <Link href="/cart">
        <RiShoppingCartLine className="h-[1.2rem] w-[1.2rem]" />
        <span className="absolute flex justify-center items-center text-xs h-5 w-5 -top-3 -right-3 font-semibold text-white bg-primary  rounded-full">
          {numOfItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
