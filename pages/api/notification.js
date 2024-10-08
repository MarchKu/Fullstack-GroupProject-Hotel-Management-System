import { Knock } from "@knocklabs/node";
import connectionPool from "@/utils/connectionPool/db";
import { addDays } from "date-fns";
import { dateFormatter } from "@/hooks/useDateFormatter";
import "dotenv/config";

const knockClient = new Knock(process.env.KNOCK_SK);

export default async function POST(req, res) {
  const currentDate = new Date();
  const tomorrow = addDays(currentDate, 1);

  try {
    const checkBooking = await connectionPool.query(
      `SELECT * FROM booking WHERE user_id = $1 AND check_in = $2 AND status = 'success' ORDER BY created_at DESC`,
      [req.body.user_id, tomorrow]
    );

    if (checkBooking.rows[0]) {
      const roomId = checkBooking.rows[0].room_id;
      const roomType = await connectionPool.query(
        `SELECT room_types.type_name
         FROM rooms 
         INNER JOIN room_types
         ON rooms.room_type_id = room_types.room_type_id WHERE room_id = $1`,
        [roomId]
      );
      if (checkBooking.rows[0].notify_status == null) {
        await knockClient.workflows.trigger("check-in-alert", {
          recipients: [req.body.id],
          data: {
            date: `${dateFormatter(tomorrow)}`,
            roomType: roomType.rows[0].type_name,
          },
        });
        await connectionPool.query(
          `UPDATE booking SET notify_status = true WHERE user_id = $1 AND check_in = $2`,
          [req.body.user_id, tomorrow]
        );
      }
      return res.status(200).json({ message: "Notification sent" });
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Bad connection: Bad sever connection." });
  }
}
