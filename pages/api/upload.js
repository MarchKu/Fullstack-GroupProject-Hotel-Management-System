import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export async function uploadFile(file, bucketName, filePath, mimetype) {
  let { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "no-cache, no-store, must-revalidate",
      upsert: true,
      contentType: mimetype,
    });

  if (error) {
    console.error("Error uploading file:", error);
    return { success: false, error };
  } else {
    data = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return { success: true, data };
  }
}

export async function deleteFile(bucketName, filePath) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove(filePath);

  if (error) {
    console.error("Error deleting image:", error);
  } else {
    console.log("Image deleted successfully:", data);
  }
}
