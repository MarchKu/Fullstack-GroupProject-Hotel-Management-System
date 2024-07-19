import connectionPool from "@/utils/connectionPool/db";
export default async function GET(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const current = (page - 1) * limit;
  try {
    const result = await connectionPool.query(
      `
              SELECT *
              FROM room_types
              INNER JOIN rooms
              ON room_types.room_type_id = rooms.room_type_id
              ORDER BY room_id ASC
              LIMIT $1 OFFSET $2 
      `,
      [limit, current]
    );

    const totalResault = await connectionPool.query(
      `SELECT COUNT(*) AS total FROM rooms`
    );
    const total = totalResault.rows[0].total;
    console.log({ rooms: result.rows, total });
    return res.status(200).json({ rooms: result.rows, total });
  } catch (error) {
    console.log(error.message);
  }
}
