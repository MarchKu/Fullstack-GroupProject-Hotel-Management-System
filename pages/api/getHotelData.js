import connectionPool from "@/utils/connectionPool/db";
import cors from "@/lib/cors";

async function GET(req, res) {
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
export default cors(GET);
