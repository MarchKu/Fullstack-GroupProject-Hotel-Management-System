import connectionPool from "@/utils/connectionPool/db";

export default async function POST(req, res) {
  const bookingData = { ...req.body };

  try {
    const bookingDataResult = await connectionPool.query(
      `INSERT INTO booking (check_in, check_out, amount_booking, user_id, room_id, night)
               values ($1, $2, $3, $4, $5, $6) RETURNING booking_id`,
      [
        bookingData.check_in,
        bookingData.check_out,
        bookingData.amount_booking,
        bookingData.user_id,
        bookingData.room_id,
        bookingData.night,
      ]
    );

    const bookingId = bookingDataResult.rows[0].booking_id;

    if (bookingId) {
      await connectionPool.query(
        `INSERT INTO bills (user_id, booking_id, payment_method, standard_request, special_request, additional_request, promotion_discount, total_price) values ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          bookingData.user_id,
          bookingId,
          bookingData.payment_method,
          bookingData.standard_request,
          bookingData.special_request,
          bookingData.additional_request,
          bookingData.promotion,
          bookingData.total_price,
        ]
      );
    }

    return res
      .status(201)
      .json({ message: "Booking successfully", bookingDataResult });
  } catch (error) {
    console.log(error.message);
  }
}
