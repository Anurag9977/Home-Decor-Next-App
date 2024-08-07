import { deleteProduct } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";

function DeleteProductButton({ productID }: { productID: string }) {
  const deleteProductWithID = deleteProduct.bind(null, { productID });
  return (
    <FormContainer action={deleteProductWithID}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
export default DeleteProductButton;
