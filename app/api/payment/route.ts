import Stripe from "stripe";
import { type NextRequest } from "next/server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const headers = req.headers;
  const origin = headers.get("origin");
  const { orderID, cartID } = await req.json();
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const order = await db.order.findUnique({
    where: {
      id: orderID,
    },
  });

  const cart = await db.cart.findUnique({
    where: {
      id: cartID,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found.",
    });
  }

  const lineItems = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "inr",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100,
      },
      tax_rates: [process.env.STRIPE_TAX_RATE_ID as string],
    };
  });

  try {
    //Create Checkout session using params
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderID, cartID },
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: user.emailAddresses[0].emailAddress,
      shipping_address_collection: {
        allowed_countries: ["IN", "US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Ground shipping",
            type: "fixed_amount",
            fixed_amount: {
              amount: 500,
              currency: "inr",
            },
          },
        },
      ],
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return Response.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
