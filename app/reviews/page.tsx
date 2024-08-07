import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import UserReviews from "@/components/reviews/UserReviews";
import { getAllUserReviews } from "@/utils/actions";

async function ReviewsPage() {
  const reviews = await getAllUserReviews();
  return (
    <main>
      <SectionTitle title="Your Reviews" />
      <div className="mt-8">
        {reviews.length === 0 ? (
          <EmptyList text="You have not added any product reviews." />
        ) : (
          <UserReviews userReviews={reviews} />
        )}
      </div>
    </main>
  );
}
export default ReviewsPage;
