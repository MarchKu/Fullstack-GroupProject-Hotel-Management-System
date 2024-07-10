import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  try {
    const result = await connectionPool.query(`
            SELECT *
            FROM room_types
            INNER JOIN rooms
            ON rooms.room_type_id = room_types.room_type_id
            `);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
}
