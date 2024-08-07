import { z, ZodSchema } from "zod";

// Product Schema
export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name should be atleast 2 characters." })
    .max(100, {
      message: "Product name should not have more than 100 characters.",
    }),
  company: z
    .string()
    .min(2, { message: "Company should be atleast 2 characters." })
    .max(100, {
      message: "Company should not have more than 100 characters.",
    }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Product description should be between 10 & 1000 words.",
    }
  ),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price cannot be a negative number." }),
  featured: z.coerce.boolean(),
});

//Image Schema
export const imageSchema = z.object({
  image: getImageSchemaType(),
});

//Review Schema
export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Minimum rating should be 1" })
    .max(5, { message: "Maximum rating should be 5" }),
  comment: z.string().refine(
    (comment) => {
      const wordCount = comment.split(" ").length;
      return wordCount >= 1 && wordCount <= 1000;
    },
    {
      message: "Review comment should be between 2 to 1000 words",
    }
  ),
});

function getImageSchemaType() {
  return z
    .instanceof(File)
    .refine(
      (file) => {
        const allowedFileSize = 1024 * 1024;
        return file && file.size < allowedFileSize;
      },
      { message: "Image file should be less than 1MB." }
    )
    .refine(
      (file) => {
        const allowedFileType = "image/";
        return file.type.startsWith(allowedFileType);
      },
      { message: "Please upload a valid image file." }
    );
}

export function validatedFieldsWithZod<T>(
  schema: ZodSchema<T>,
  rawData: unknown
): T {
  const validatedFields = schema.safeParse(rawData);
  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((err) => err.message)
      .join(", ");
    throw new Error(errorMessages);
  }
  return validatedFields.data;
}
