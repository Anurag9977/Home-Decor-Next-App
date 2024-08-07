import { Button } from "@/components/ui/button";
import Link from "next/link";
async function ConfirmPaymentPage() {
  return (
    <section id="success">
      <h1 className="text-xl md:text-3xl tracking-wider font-semibold">
        PAYMENT SUCCESSFUL! ✅
      </h1>
      <p className="my-4 md:text-lg">Thank you for shopping with us!</p>
      <div className="mt-8 flex gap-4">
        <Button type="button" variant="default" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button type="button" variant="default" asChild>
          <Link href="/products">Keep Shopping</Link>
        </Button>
        <Button type="button" variant="default" asChild>
          <Link href="/orders">Your Orders</Link>
        </Button>
      </div>
    </section>
  );
}
export default ConfirmPaymentPage;
