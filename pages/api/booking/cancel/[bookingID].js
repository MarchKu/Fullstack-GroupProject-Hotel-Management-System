import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { bookingID } = req.query;
      await connectionPool.query(`delete from booking where booking_id = $1`, [
        bookingID,
      ]);
      return res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  if (req.method === "GET") {
    try {
      const { bookingID } = req.query;
      const result = await connectionPool.query(
        `
      select * from booking
inner join bills
on bills.booking_id = booking.booking_id
inner join rooms
on booking.room_id = rooms.room_id
inner join room_types
on rooms.room_type_id = room_types.room_type_id
where booking.booking_id = $1
      `,
        [bookingID]
      );
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
