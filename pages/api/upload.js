import { createClient } from "@supabase/supabase-js";
import nextConnect from 'next-connect';

const supabase = createClient(
  "https://mxhmryetxradarukkhgs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14aG1yeWV0eHJhZGFydWtraGdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDA4ODQ3NiwiZXhwIjoyMDM1NjY0NDc2fQ.jhE_kNx2Ifa_CFOnjBzjJRrAa9n8csz-YMjASSAW8nE"
);

export async function uploadFile(file, bucketName, filePath, mimetype) {
  let { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
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
