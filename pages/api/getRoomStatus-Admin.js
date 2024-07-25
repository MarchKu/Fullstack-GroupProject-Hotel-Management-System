import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  const {
    page = 1,
    limit = 10,
    room_id,
    bed_type,
    type_name,
    status,
    search = "",
  } = req.query;

  const current = (page - 1) * limit;

  try {
    const query = `
      SELECT *
      FROM room_types
      INNER JOIN rooms ON room_types.room_type_id = rooms.room_type_id
      WHERE
        ($1::text IS NULL OR rooms.room_id::text = $1) AND
        ($2::text IS NULL OR rooms.bed_type ILIKE $2) AND
        ($3::text IS NULL OR room_types.type_name ILIKE $3) AND
        ($4::text IS NULL OR rooms.status ILIKE $4) AND
        (rooms.room_id::text ILIKE $5 OR rooms.bed_type ILIKE $5 OR room_types.type_name ILIKE $5 OR rooms.room_size ILIKE $5)
      ORDER BY rooms.room_id ASC
      LIMIT $6 OFFSET $7
    `;

    const params = [
      room_id || null,
      bed_type ? `%${bed_type}%` : null,
      type_name ? `%${type_name}%` : null,
      status ? `%${status}%` : null,
      `%${search}%`,
      limit,
      current,
    ];

    const result = await connectionPool.query(query, params);
    const totalCountQuery = `
    SELECT COUNT(*) AS total
    FROM room_types
    INNER JOIN rooms ON room_types.room_type_id = rooms.room_type_id
    WHERE
      ($1::text IS NULL OR rooms.room_id::text = $1) AND
      ($2::text IS NULL OR rooms.bed_type ILIKE $2) AND
      ($3::text IS NULL OR room_types.type_name ILIKE $3) AND
      ($4::text IS NULL OR rooms.status ILIKE $4) AND
      (rooms.room_id::text ILIKE $5 OR rooms.bed_type ILIKE $5 OR room_types.type_name ILIKE $5 OR rooms.room_size ILIKE $5)
  `;

    const totalCountParams = [
      room_id || null,
      bed_type ? `%${bed_type}%` : null,
      type_name ? `%${type_name}%` : null,
      status ? `%${status}%` : null,
      `%${search}%`,
    ];

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
