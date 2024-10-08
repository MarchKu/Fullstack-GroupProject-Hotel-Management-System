import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { bookingID } = req.query;
      const updateTime = new Date();
      await connectionPool.query(
        `
      update booking
      set status = 'cancelled',
      updated_at = $1
      where booking_id = $2
      `,
        [updateTime, bookingID]
      );
      return res.status(200).json({ message: "Cancel successfully" });
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
