import { deleteUserReview } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";

function DeleteReviewButton({ reviewID }: { reviewID: string }) {
  const deleteReviewWithID = deleteUserReview.bind(null, { reviewID });
  return (
    <FormContainer action={deleteReviewWithID}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
export default DeleteReviewButton;
