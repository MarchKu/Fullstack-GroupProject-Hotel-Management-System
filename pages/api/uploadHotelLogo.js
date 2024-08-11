import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export async function uploadLogo(file, bucketName, filePath, mimetype) {
  let { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: mimetype,
    });

  if (error) {
    console.log("error: ", error);
    return { success: true, error };
  } else {
    data = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return { success: true, data };
  }
}

export async function deleteLogo(bucketName, filePath) {
  let { data, error } = await supabase.storage
    .from(bucketName)
    .remove(filePath);

  if (error) {
    console.log("error: ", error);
  } else {
    console.log("success: ", data);
  }
}
