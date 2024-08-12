import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default async function idNumberHandler(req, res) {
  const { field, value } = req.query;
  if (!field || !value) {
    return res.status(400).json({ message: "Field and value are required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_profiles")

      .select("*")

      .eq(field, value);

    if (error) {
      throw error;
    }

    const isUnique = data.length === 0;
    return res.status(200).json({ isUnique });
  } catch (error) {
    console.error("Database query failed", error);
    return res
      .status(500)
      .json({ message: "Database query failed", error: error.message });
  }
}
