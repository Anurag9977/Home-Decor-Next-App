import Stripe from "stripe";
import db from "@/utils/db";
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionID = searchParams.get("session_id") as string;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID);
    const orderID = session.metadata?.orderID;
    const cartID = session.metadata?.cartID;
    const findOrder = await db.order.findUnique({
      where: {
        id: orderID,
      },
    });
    const findCart = await db.cart.findUnique({
      where: {
        id: cartID,
      },
    });
    if (session.status === "complete") {
      if (findOrder) {
        await db.order.update({
          where: {
            id: orderID,
          },
          data: {
            isPaid: true,
          },
        });
      }

      if (findCart) {
        await db.cart.delete({
          where: {
            id: cartID,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/confirm-payment");
}
