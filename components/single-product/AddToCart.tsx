import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import FormContainer from "../form/FormContainer";
import SelectInput from "../form/SelectInput";
import { SubmitButton } from "../form/Buttons";
import { addProductToCart } from "@/utils/actions";

function AddToCart({ productID }: { productID: string }) {
  const { userId } = auth();
  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button className="uppercase tracking-wider my-4">Add to cart</Button>
      </SignInButton>
    );
  }

  const addProductToCartWithID = addProductToCart.bind(null, { productID });
  return (
    <FormContainer action={addProductToCartWithID}>
      <div className="mt-2 flex items-end gap-4">
        <div className="w-40">
          <SelectInput
            name="amount"
            placeholder="enter amount"
            items={Array.from({ length: 10 }, (_, index) =>
              (index + 1).toString()
            )}
          />
        </div>
        <SubmitButton text="ADD TO CART" />
      </div>
    </FormContainer>
  );
}
export default AddToCart;
