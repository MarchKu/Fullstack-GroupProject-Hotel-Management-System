import connectionPool from "@/utils/connectionPool/db";

export default async function POST(req, res) {
  try {
    const { bookingID } = req.query;
    await connectionPool.query(
      `delete from booking where booking_id = $1 and (status = 'Booking Initiated' or status = 'Request Completed')`,
      [bookingID]
    );
    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
