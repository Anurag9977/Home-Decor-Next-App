import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageUpdateContainer from "@/components/form/ImageUpdateContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  editProduct,
  fetchSingleProduct,
  updateProductImage,
} from "@/utils/actions";

async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct({ productID: params.id });
  const { name, company, description, price, image, featured } = product;
  const editProductWithID = editProduct.bind(null, { productID: params.id });
  const updateImageWithID = updateProductImage.bind(null, {
    productID: params.id,
    oldImageURL: image,
  });
  return (
    <main>
      <h1 className="text-xl font-medium tracking-wide">Edit Product</h1>
      <section className="mt-4 border border-muted py-4 px-8 rounded-lg">
        <div className="mb-6">
          <ImageUpdateContainer
            imageSource={image}
            altName={name}
            action={updateImageWithID}
          />
        </div>
        <FormContainer action={editProductWithID}>
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
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            <PriceInput defaultValue={price} />
            <CheckboxInput name="featured" defaultChecked={featured} />
          </div>
          <div className="mt-6">
            <SubmitButton text="edit product" />
          </div>
        </FormContainer>
      </section>
    </main>
  );
}
export default EditProductPage;
