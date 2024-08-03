import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { bill_id } = req.query;
    const result = await connectionPool.query(
      `SELECT * FROM bills where bill_id = $1`,
      [bill_id]
    );
    return res.status(200).json(result.rows[0]);
  }
  res.status(200).json({ name: "John Doe" });
}
