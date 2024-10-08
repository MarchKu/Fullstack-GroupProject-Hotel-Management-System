import connectionPool from "@/utils/connectionPool/db";

export default async function POST(req, res) {
  const fullName = req.body.full_name;
  const fullNameFormatted = `%${fullName}%`;
  try {
    if (fullName) {
      const countDataSize = await connectionPool.query(
        `
              SELECT COUNT(*)
              FROM rooms
              INNER JOIN room_types
              ON room_types.room_type_id = rooms.room_type_id
              INNER JOIN booking
              ON booking.room_id = rooms.room_id
              INNER JOIN user_profiles
              ON user_profiles.user_id = booking.user_id
              INNER JOIN bills
              ON booking.booking_id = bills.booking_id
              WHERE full_name ILIKE $1 AND booking.status = 'success'
              `,
        [fullNameFormatted]
      );
      const dataSize = countDataSize.rows[0].count;
      const result = await connectionPool.query(
        `
                SELECT *
                FROM rooms
                INNER JOIN room_types
                ON room_types.room_type_id = rooms.room_type_id
                INNER JOIN booking
                ON booking.room_id = rooms.room_id
                INNER JOIN user_profiles
                ON user_profiles.user_id = booking.user_id
                INNER JOIN bills
                ON booking.booking_id = bills.booking_id
                WHERE full_name ILIKE $1 AND booking.status = 'success'
              `,
        [fullNameFormatted]
      );
      return res.status(200).json({ data: result.rows, size: dataSize });
    } else {
      const countDataSize = await connectionPool.query(
        `
              SELECT COUNT(*)
              FROM rooms
              INNER JOIN room_types
              ON room_types.room_type_id = rooms.room_type_id
              INNER JOIN booking
              ON booking.room_id = rooms.room_id
              INNER JOIN user_profiles
              ON user_profiles.user_id = booking.user_id
              INNER JOIN bills
              ON booking.booking_id = bills.booking_id
              WHERE booking.status = 'success'
              `
      );
      const dataSize = countDataSize.rows[0].count;
      const result = await connectionPool.query(
        `
                SELECT *
                FROM rooms
                INNER JOIN room_types
                ON room_types.room_type_id = rooms.room_type_id
                INNER JOIN booking
                ON booking.room_id = rooms.room_id
                INNER JOIN user_profiles
                ON user_profiles.user_id = booking.user_id
                INNER JOIN bills
                ON booking.booking_id = bills.booking_id
                WHERE booking.status = 'success'
                ORDER BY check_in DESC
              `
      );
      return res.status(200).json({ data: result.rows, size: dataSize });
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Bad connection: Bad sever connection." });
  }
}
