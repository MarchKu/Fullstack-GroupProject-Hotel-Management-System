import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  try {
    const result = await connectionPool.query(`
            SELECT *
            FROM hotel_properties
            ORDER BY created_at DESC
            `);
    return res.status(200).json({ message: "success", data: result.rows[0] });
  } catch (error) {
    console.log(error.message);
  }
}
