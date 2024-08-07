import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const bucketName = "home-decor-bucket";
const imageFolder = "productImages";
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export async function uploadImage(file: File): Promise<string> {
  const currentTimeStamp = Date.now();
  const filePath = `/productImages/${currentTimeStamp}_${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
    });
  if (error) {
    throw new Error(error.message);
  }
  return supabase.storage.from(bucketName).getPublicUrl(data.path).data
    .publicUrl;
}

export async function deleteImage(imageURL: string) {
  const imageFileName = imageURL.split("/").pop();
  if (!imageFileName) throw new Error("Invalid image URL.");
  await supabase.storage
    .from(bucketName)
    .remove([`${imageFolder}/${imageFileName}`]);
}
