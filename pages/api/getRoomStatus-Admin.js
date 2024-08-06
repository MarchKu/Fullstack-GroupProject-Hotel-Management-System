import connectionPool from "@/utils/connectionPool/db";
export default async function GET(req, res) {
  const { page = 1, limit = 10, search = "" } = req.query;

  const current = (page - 1) * limit;

  try {
    const query = `
       SELECT *
      FROM room_types
      INNER JOIN rooms ON room_types.room_type_id = rooms.room_type_id
      WHERE
        rooms.room_id::text ILIKE $1 OR
        rooms.bed_type ILIKE $1 OR
        room_types.type_name ILIKE $1 OR
        CAST(rooms.room_size AS TEXT) ILIKE $1 OR
        rooms.status ILIKE $1
      ORDER BY rooms.room_id ASC
      LIMIT $2 OFFSET $3
    `;

    const params = [`%${search}%`, limit, current];

    const result = await connectionPool.query(query, params);

    const totalCountQuery = `
      SELECT COUNT(*) AS total
      FROM room_types
      INNER JOIN rooms ON room_types.room_type_id = rooms.room_type_id
      WHERE
        rooms.room_id::text ILIKE $1 OR
        rooms.bed_type ILIKE $1 OR
        room_types.type_name ILIKE $1 OR
        CAST(rooms.room_size AS TEXT) ILIKE $1 OR
        rooms.status ILIKE $1
    `;

    const totalCountParams = [`%${search}%`];

    const totalResult = await connectionPool.query(
      totalCountQuery,
      totalCountParams
    );
    const total = totalResult.rows[0].total;

    return res.status(200).json({ rooms: result.rows, total });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}
