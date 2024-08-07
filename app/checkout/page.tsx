"use client";

import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID");
  const cartID = searchParams.get("cartID");
  const fetchClientSecret = useCallback(async () => {
    //Create Checkout Session
    const response = await axios.post("/api/payment", {
      orderID,
      cartID,
    });
    return response.data.clientSecret;
  }, []);
  const options = { fetchClientSecret };
  return (
    <div id="checkout" className="rounded-lg p-4 pt-0 bg-[#697991]">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
export default CheckoutPage;
