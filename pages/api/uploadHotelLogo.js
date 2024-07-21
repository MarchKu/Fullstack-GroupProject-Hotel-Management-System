import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mxhmryetxradarukkhgs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14aG1yeWV0eHJhZGFydWtraGdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDA4ODQ3NiwiZXhwIjoyMDM1NjY0NDc2fQ.jhE_kNx2Ifa_CFOnjBzjJRrAa9n8csz-YMjASSAW8nE";

const supabase = createClient(supabaseUrl, supabaseKey);

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
