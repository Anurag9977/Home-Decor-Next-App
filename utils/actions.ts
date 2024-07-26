import db from "@/utils/db";
import { redirect } from "next/navigation";

export async function fetchFeaturedProducts() {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return products;
}

export async function fetchAllProducts({ search = "" }: { search: string }) {
  return await db.product.findMany({
    where: {
      OR: [
        {
          name: { contains: search, mode: "insensitive" },
        },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchSingleProduct({ productID }: { productID: string }) {
  const findProduct = await db.product.findUnique({
    where: {
      id: productID,
    },
  });
  if (!findProduct) {
    return redirect("/");
  }
  return findProduct;
}
