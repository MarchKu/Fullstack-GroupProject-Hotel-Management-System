import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { bill_id } = req.query;
    const result = await connectionPool.query(
      `SELECT * FROM bills 
      INNER JOIN booking ON bills.booking_id = booking.booking_id
      INNER JOIN rooms ON booking.room_id = rooms.room_id
      INNER JOIN room_types ON rooms.room_type_id = room_types.room_type_id
      WHERE bill_id = $1`,
      [bill_id]
    );
    return res.status(200).json(result.rows[0]);
  }
  res.status(200).json({ name: "John Doe" });
}
