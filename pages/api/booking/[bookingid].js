import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  const bookingId = req.query.bookingid;
  if (req.method === "GET") {
    try {
      const result = await connectionPool.query(
        `
        SELECT *, booking.created_at
                FROM rooms
                INNER JOIN room_types
                ON room_types.room_type_id = rooms.room_type_id
                INNER JOIN booking
                ON booking.room_id = rooms.room_id
                INNER JOIN bills
                ON bills.booking_id = booking.booking_id
                INNER JOIN user_profiles
                ON user_profiles.user_id = booking.user_id
                WHERE booking.booking_id = $1
              `,
        [bookingId]
      );
      if (!result.rows[0]) {
        return res.status(404).json({ message: "Booking ID not found" });
      } else {
        return res.status(200).json(result.rows);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const result = await connectionPool.query(
        `
        SELECT *, booking.created_at
                FROM rooms
                INNER JOIN room_types
                ON room_types.room_type_id = rooms.room_type_id
                INNER JOIN booking
                ON booking.room_id = rooms.room_id
                INNER JOIN bills
                ON bills.booking_id = booking.booking_id
                INNER JOIN user_profiles
                ON user_profiles.user_id = booking.user_id
                WHERE booking.booking_id = $1
              `,
        [bookingId]
      );
      if (!result.rows[0]) {
        return res.status(404).json({ message: "Booking ID not found" });
      } else {
        return res.status(200).json(result.rows);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.json({ message: "This requested method is not available" });
  }
}
