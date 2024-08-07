import { deleteCartItem } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";

function DeleteCartItemButton({ cartItemID }: { cartItemID: string }) {
  const deleteCartItemWithID = deleteCartItem.bind(null, { cartItemID });
  return (
    <FormContainer action={deleteCartItemWithID}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
export default DeleteCartItemButton;
