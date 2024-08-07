"use client";

import { toggleFavouriteProduct } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { SubmitFavouriteButton } from "../form/Buttons";

function FavouriteToggleForm({
  favouriteID,
  productID,
}: {
  favouriteID: { id: string } | null;
  productID: string;
}) {
  const pathname = usePathname();
  const toggleFvouriteWithProductID = toggleFavouriteProduct.bind(null, {
    favouriteID,
    productID,
    pathname,
  });
  return (
    <FormContainer action={toggleFvouriteWithProductID}>
      <SubmitFavouriteButton isFavourite={favouriteID ? true : false} />
    </FormContainer>
  );
}
export default FavouriteToggleForm;
