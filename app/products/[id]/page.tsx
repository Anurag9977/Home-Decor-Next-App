import LoadingReviewsContainer from "@/components/global/LoadingReviewsContainer";
import SectionTitle from "@/components/global/SectionTitle";
import FavouriteToggleButton from "@/components/products/FavouriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import { Button } from "@/components/ui/button";
import { fetchSingleProduct, getExistingReview } from "@/utils/actions";
import { formatPrice } from "@/utils/formatPrice";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Suspense } from "react";
import ProductReviews from "@/components/reviews/ProductReviews";
import CreateReview from "@/components/reviews/CreateReview";

async function SingleProduct({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const product = await fetchSingleProduct({ productID: params.id });
  const isNotExistingReview =
    userId && !(await getExistingReview({ productID: params.id }));
  const { name, company, description, price, image } = product;
  return (
    <main>
      <BreadCrumbs name={name} />
      <section className="my-10 grid lg:grid-cols-2 gap-x-16 gap-y-8">
        <div className="relative h-96 w-full">
          <Image
            src={image}
            alt={name}
            priority
            fill
            sizes="(max-width : '768px') 100vw, (max-width : '1200px') 50vw, 33vw"
            className="block w-full object-cover rounded-lg"
          />
        </div>
        <div>
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl capitalize font-semibold tracking-wide">
              {name}
            </h1>
            <div className="flex items-center gap-x-2">
              <FavouriteToggleButton productID={params.id} />
              <ShareButton
                productID={params.id}
                name={name}
                company={company}
                description={description}
              />
            </div>
          </div>
          <h2 className="uppercase tracking-wider my-1">{company}</h2>
          <ProductRating productID={params.id} />
          <Button
            variant="secondary"
            className="my-4 text-xl tracking-wider font-semibold cursor-default"
          >
            {formatPrice(price)}
          </Button>
          <p className="text-sm text-justify leading-7">{description}</p>
          <AddToCart productID={params.id} />
        </div>
      </section>
      <section>
        <SectionTitle title="Product Reviews" />
        <Suspense
          fallback={
            <div className="mt-8">
              <LoadingReviewsContainer />
            </div>
          }
        >
          <ProductReviews productID={params.id} />
        </Suspense>
        {isNotExistingReview && (
          <div className="mt-8">
            <CreateReview productID={params.id} />
          </div>
        )}
      </section>
    </main>
  );
}
export default SingleProduct;
