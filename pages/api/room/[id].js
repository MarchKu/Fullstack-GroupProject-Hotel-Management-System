import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  const { id } = req.query;
  try {
    const result = await connectionPool.query(
      `select * from rooms  INNER JOIN room_types 
on rooms.room_type_id = room_types.room_type_id where room_id = $1`,
      [id]
    );
    return result.rows[0]
      ? res.status(200).json(result.rows)
      : res.status(404).json({ message: "Invalid request data not found" });
  } catch {
    return res   
      .status(500)
      .json({ message: "Cannot get room data due to server connection" });
  }
}
