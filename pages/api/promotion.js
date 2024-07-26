import connectionPool from "@/utils/connectionPool/db";

export default async function POST(req, res) {
  const codeData = req.body;

  try {
    const result = await connectionPool.query(
      `SELECT * FROM promotions WHERE code = $1 AND is_active = TRUE AND expiration_date >= NOW()`,
      [codeData.code]
    );

    if (result.rows.length > 0) {
      const promotion = result.rows[0];
      return res
        .status(200)
        .json({ valid: true, discount: promotion.discount_value });
    } else {
      return res.status(400).json({
        valid: false,
        message: "Invalid or expired promotion code.",
      });
    }
  } catch (error) {
    console.error("Error validating promotion code:", error);
    return res
      .status(500)
      .json({ valid: false, message: "Internal Server Error" });
  }
}
