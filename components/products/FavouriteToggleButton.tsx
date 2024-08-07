import { isFavouriteProduct } from "@/utils/actions";
import { SubmitFavouriteButton } from "../form/Buttons";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { GoHeart } from "react-icons/go";
import FavouriteToggleForm from "./FavouriteToggleForm";

async function FavouriteToggleButton({ productID }: { productID: string }) {
  const { userId } = auth();
  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="bg-background"
        >
          <GoHeart className="text-lg" />
        </Button>
      </SignInButton>
    );
  const favouriteProductID = await isFavouriteProduct({ productID: productID });
  return (
    <FavouriteToggleForm
      favouriteID={favouriteProductID}
      productID={productID}
    />
  );
}
export default FavouriteToggleButton;
