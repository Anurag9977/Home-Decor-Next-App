"use server";

import db from "@/utils/db";
import { redirect } from "next/navigation";
import { InitialFormState } from "./types";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validatedFieldsWithZod,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

// HELPER FUNCTIONS START

async function getAuthUser() {
  const user = await currentUser();
  if (!user) return redirect("/");
  return user;
}

async function getAdminUser() {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) return redirect("/");
  return user;
}

function getError(error: unknown): { message: string } {
  if (error instanceof Error) return { message: error.message };
  return { message: "Something went wrong" };
}

// HELPER FUNCTIONS END

//PRODUCT ACTIONS/FUNCTIONS START

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

export async function createProductAction(
  prevState: InitialFormState,
  formData: FormData
): Promise<{ message: string }> {
  try {
    //Get Clerk User ID
    const user = await getAdminUser();
    //Get Form Data & Image File
    const rawFormData = Object.fromEntries(formData);
    const imageFile = formData.get("image");
    // Validate Form Fields with Zod
    const validatedFields = validatedFieldsWithZod(productSchema, rawFormData);
    //Validate Uploaded Image and upload in Supabase bucket
    const validatedImage = validatedFieldsWithZod(imageSchema, {
      image: imageFile,
    });
    const uploadedImagePath = await uploadImage(validatedImage.image);
    await db.product.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return getError(error);
  }
  redirect("/admin/products");
}

export async function getAdminProducts() {
  await getAdminUser();
  return await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteProduct({
  productID,
}: {
  productID: string;
}): Promise<{ message: string }> {
  await getAdminUser();
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id: productID,
      },
    });
    await deleteImage(deletedProduct.image);
    revalidatePath("/admin/products");
    return { message: "Product removed." };
  } catch (error) {
    return getError(error);
  }
}

export async function editProduct(
  { productID }: { productID: string },
  prevState: InitialFormState,
  formData: FormData
): Promise<{ message: string }> {
  await getAdminUser();
  try {
    // Get Form Data
    const rawData = Object.fromEntries(formData);
    //Validate the fields with Zod
    const validatedFields = validatedFieldsWithZod(productSchema, rawData);
    await db.product.update({
      where: {
        id: productID,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productID}`);
    return { message: "Product updated successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function updateProductImage(
  { productID, oldImageURL }: { productID: string; oldImageURL: string },
  prevState: InitialFormState,
  formData: FormData
): Promise<{ message: string }> {
  await getAdminUser();
  try {
    //Get Image from Form data
    const imageFile = formData.get("image");
    //Validate Image with Zod
    const validatedImage = validatedFieldsWithZod(imageSchema, {
      image: imageFile,
    });
    //Upload Image in Supabase bucket and get file path
    const imageFilePath = await uploadImage(validatedImage.image);
    //Delete the old Image from the Supabase bucket
    await deleteImage(oldImageURL);
    await db.product.update({
      where: {
        id: productID,
      },
      data: {
        image: imageFilePath,
      },
    });
    revalidatePath(`/admin/products/${productID}`);
    return { message: "Product image updated." };
  } catch (error) {
    return getError(error);
  }
}

//PRODUCT ACTIONS/FUNCTIONS END

//FAVOURITES ACTIONS/FUNCTIONS START

export async function isFavouriteProduct({ productID }: { productID: string }) {
  const user = await getAuthUser();
  const favouriteProduct = await db.favourite.findFirst({
    where: {
      clerkId: user.id,
      productId: productID,
    },
    select: {
      id: true,
    },
  });
  return favouriteProduct;
}

export async function toggleFavouriteProduct({
  favouriteID,
  productID,
  pathname,
}: {
  favouriteID: { id: string } | null;
  productID: string;
  pathname: string;
}): Promise<{ message: string }> {
  const user = await getAuthUser();
  try {
    if (favouriteID) {
      await db.favourite.delete({
        where: {
          id: favouriteID.id,
        },
      });
    } else {
      await db.favourite.create({
        data: {
          clerkId: user.id,
          productId: productID,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favouriteID
        ? "Product removed from favourites."
        : "Product added to favourites.",
    };
  } catch (error) {
    return getError(error);
  }
}

export async function getFavouriteProducts() {
  const user = await getAuthUser();
  return await db.favourite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
}

//FAVOURITES ACTIONS/FUNCTIONS END

//REVIEWS ACTIONS/FUNCTIONS START

export async function createReview(
  { productID }: { productID: string },
  prevState: InitialFormState,
  formData: FormData
): Promise<{ message: string }> {
  try {
    //Get Clerk User Details
    const user = await getAuthUser();
    const { id, fullName, username, imageUrl } = user;
    //Get Raw Form Data
    const rawData = Object.fromEntries(formData);
    //Validate fieds with Zod
    const validatedFields = validatedFieldsWithZod(reviewSchema, rawData);
    await db.review.create({
      data: {
        clerkId: id,
        authorName: fullName || username || "User",
        authorImageURL: imageUrl,
        productId: productID,
        ...validatedFields,
      },
    });
    revalidatePath(`/products/${productID}`);
    return { message: "Review posted successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function getProductReviews({ productID }: { productID: string }) {
  return await db.review.findMany({
    where: {
      productId: productID,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductRatings({ productID }: { productID: string }) {
  const ratings = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId: productID,
    },
  });
  return {
    averageRating: ratings[0]?._avg.rating?.toFixed(1) ?? 0,
    totalRatings: ratings[0]?._count.rating ?? 0,
  };
}

export async function getAllUserReviews() {
  const user = await getAuthUser();
  return await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
}

export async function deleteUserReview({ reviewID }: { reviewID: string }) {
  try {
    const user = await getAuthUser();
    await db.review.delete({
      where: {
        id: reviewID,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review deleted successfully." };
  } catch (error) {
    return getError(error);
  }
}

export async function getExistingReview({ productID }: { productID: string }) {
  const user = await getAuthUser();
  return await db.review.findFirst({
    where: {
      clerkId: user.id,
      productId: productID,
    },
  });
}

//REVIEWS ACTIONS/FUNCTIONS END

//CART ACTIONS/FUNCTIONS START

export async function getNumOfItemsInCart() {
  const { userId } = auth();
  const numOfItems = await db.cart.findFirst({
    where: {
      clerkId: userId || "",
    },
    select: {
      numOfItems: true,
    },
  });
  return numOfItems?.numOfItems || 0;
}

//CART HELPER FUNCTIONS START

export async function fetchOrCreateCart({
  userID,
  errorIfNotFound = false,
}: {
  userID: string;
  errorIfNotFound?: boolean;
}) {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userID,
    },
  });
  if (!cart && errorIfNotFound) throw new Error("Cart not found.");
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userID,
      },
    });
  }
  return cart;
}

export async function updateCart(cart: Cart) {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let numOfItems = 0;
  let cartTotal = 0;
  for (const item of cartItems) {
    numOfItems += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;
  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numOfItems,
      cartTotal,
      shipping,
      tax,
      orderTotal,
    },
  });
  return { cartItems, currentCart };
}

//CART HELPER FUNCTIONS END

export async function editOrCreateCartItem({
  productID,
  cartID,
  amount,
}: {
  productID: string;
  cartID: string;
  amount: number;
}) {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId: productID,
      cartId: cartID,
    },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: {
        productId: productID,
        cartId: cartID,
        amount,
      },
    });
  }
}

export async function addProductToCart(
  { productID }: { productID: string },
  prevState: InitialFormState,
  formData: FormData
) {
  try {
    const user = await getAuthUser();
    const amount = formData.get("amount");
    if (!amount) throw new Error("Please enter product amount.");
    await fetchSingleProduct({ productID });
    const cart = await fetchOrCreateCart({ userID: user.id });
    await editOrCreateCartItem({
      productID,
      cartID: cart.id,
      amount: Number(amount),
    });
    await updateCart(cart);
  } catch (error) {
    return getError(error);
  }
  redirect("/cart");
}

export async function deleteCartItem({ cartItemID }: { cartItemID: string }) {
  try {
    const user = await getAuthUser();
    const cart = await fetchOrCreateCart({
      userID: user.id,
      errorIfNotFound: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemID,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart item removed." };
  } catch (error) {
    return getError(error);
  }
}

export async function editCartItem({
  cartItemID,
  amount,
}: {
  cartItemID: string;
  amount: number;
}) {
  try {
    const user = await getAuthUser();
    const cart = await fetchOrCreateCart({
      userID: user.id,
      errorIfNotFound: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemID,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Product quantity updated." };
  } catch (error) {
    return getError(error);
  }
}

//CART ACTIONS/FUNCTIONS END

//ORDERS ACTIONS/FUNCTIONS START

export async function createOrder() {
  let orderID = "";
  let cartID = "";
  try {
    const user = await getAuthUser();
    const cart = await fetchOrCreateCart({
      userID: user.id,
      errorIfNotFound: true,
    });
    await db.order.deleteMany({
      where: {
        isPaid: false,
      },
    });
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        orderTotal: cart.orderTotal,
        products: cart.numOfItems,
        tax: cart.tax,
        shipping: cart.shipping,
      },
    });
    orderID = order.id;
    cartID = cart.id;
  } catch (error) {
    return getError(error);
  }
  redirect(`/checkout?orderID=${orderID}&cartID=${cartID}`);
}

export async function getUserOrders() {
  const user = await getAuthUser();
  return await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminOrders() {
  await getAdminUser();
  return await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

//ORDERS ACTIONS/FUNCTIONS END
