import { faker } from "@faker-js/faker";
import { createReview } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import SelectInput from "../form/SelectInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";

function ReviewForm({ productID }: { productID: string }) {
  const ratings = Array.from({ length: 5 }, (_, index) =>
    (index + 1).toString()
  );
  const description = faker.lorem.sentence({ min: 5, max: 20 });
  const createReviewWithID = createReview.bind(null, { productID });
  return (
    <div className="border border-muted py-4 px-8 rounded-lg">
      <FormContainer action={createReviewWithID}>
        <div className="mb-4 w-64">
          <SelectInput
            name="rating"
            placeholder="select product rating"
            items={ratings}
          />
        </div>
        <TextAreaInput
          name="comment"
          label="feedback"
          placeholder="Describe your experience..."
          defaultValue={description}
        />
        <div className="mt-6">
          <SubmitButton text="post review" />
        </div>
      </FormContainer>
    </div>
  );
}
export default ReviewForm;
