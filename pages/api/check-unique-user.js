import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mxhmryetxradarukkhgs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14aG1yeWV0eHJhZGFydWtraGdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDA4ODQ3NiwiZXhwIjoyMDM1NjY0NDc2fQ.jhE_kNx2Ifa_CFOnjBzjJRrAa9n8csz-YMjASSAW8nE"
);

export default async function usersHandler(req, res) {
  const { field, value } = req.query;
  if (!field || !value) {
    return res.status(400).json({ message: "Field and value are required" });
  }

  try {
    const { data, error } = await supabase
      .from("users")

      .select("*")

      .eq(field, value);

    if (error) {
      throw error;
    }

    const isUnique = data.length === 0;
    return res.status(200).json({ isUnique });
  } catch (error) {
    console.error("Database query failed", error);
    return res.status(500).json({ message: "Database query failed" });
  }
}
