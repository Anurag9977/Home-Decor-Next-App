import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";
import { faker } from "@faker-js/faker";

function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });
  return (
    <main>
      <h1 className="text-xl font-medium tracking-wide">Create Product</h1>
      <section className="mt-4 border border-muted py-4 px-8 rounded-lg">
        <FormContainer action={createProductAction}>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
            <FormInput name="name" type="text" defaultValue={name} />
            <FormInput name="company" type="text" defaultValue={company} />
          </div>
          <div className="my-4 md:my-6">
            <TextAreaInput
              name="description"
              placeholder="Enter product description"
              defaultValue={description}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 md:gap-y-6">
            <PriceInput />
            <ImageInput name="image" label="product image" />
            <CheckboxInput name="featured" />
          </div>
          <div className="mt-6">
            <SubmitButton text="create product" />
          </div>
        </FormContainer>
      </section>
    </main>
  );
}
export default CreateProductPage;
