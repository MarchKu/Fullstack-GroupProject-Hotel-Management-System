import connectionPool from "@/utils/connectionPool/db";
import POST from "./create-payment-intent";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const bookingData = { ...req.body };

    try {
      const bookingDataResult = await connectionPool.query(
        `INSERT INTO booking (check_in, check_out, amount_booking, user_id, room_id, night, status)
                 values ($1, $2, $3, $4, $5, $6, $7) RETURNING booking_id`,
        [
          bookingData.check_in,
          bookingData.check_out,
          bookingData.amount_booking,
          bookingData.user_id,
          bookingData.room_id,
          bookingData.number_of_night,
          bookingData.status,
        ]
      );

      const bookingId = bookingDataResult.rows[0].booking_id;

      if (bookingId) {
        await connectionPool.query(
          `INSERT INTO bills (user_id, booking_id, total_price) 
          values ($1, $2, $3)`,
          [bookingData.user_id, bookingId, bookingData.total_price]
        );
      }

      return res
        .status(201)
        .json({ message: "Booking successfully", bookingId });
    } catch (error) {
      console.log(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const { bookingID } = req.query;
      const result = await connectionPool.query(
        `
        select  b.booking_id, b.check_in, b.check_out, b.amount_booking, b.night, b.status, b.room_id, 
        r.room_size, r.bed_type, r.room_capacity, r.current_price, r.promotion_price, rt.type_name,
        bl.bill_id, bl.standard_request, bl.special_request, bl.additional_request, bl.total_price, bl.promotion_discount 
        from booking b
        inner join rooms r
        on b.room_id = r.room_id
        inner join room_types rt
        on r.room_type_id = rt.room_type_id
        inner join bills bl
        on b.booking_id = bl.booking_id 
        where b.booking_id = $1
      `,
        [bookingID]
      );
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else if (req.method === "PATCH") {
    try {
      const updateBooking = { ...req.body, updated_at: new Date() };
      if (updateBooking.status === "Request Completed") {
        await connectionPool.query(
          `
          UPDATE bills
          SET
            standard_request = $2,
            special_request = $3,
            additional_request = $4,
            total_price = $5
        
          WHERE
            booking_id = $1;
          `,
          [
            updateBooking.booking_id,
            updateBooking.standard_request,
            updateBooking.special_request,
            updateBooking.additional_request,
            updateBooking.total_price,
          ]
        );

        await connectionPool.query(
          `
          UPDATE booking
          SET
            status = $2
          WHERE
            booking_id = $1;
          `,
          [updateBooking.booking_id, updateBooking.status]
        );
      } else if (
        updateBooking.payment_method === "Cash" &&
        updateBooking.status === "success"
      ) {
        await connectionPool.query(
          `
          UPDATE bills
          SET
            total_price = $2,
            promotion_discount = $3,
            payment_method = $4
           
           
          WHERE
            booking_id = $1;
          `,
          [
            updateBooking.booking_id,
            updateBooking.total_price,
            updateBooking.promotion_discount,
            updateBooking.payment_method,
          ]
        );
        await connectionPool.query(
          `
          UPDATE booking
          SET
            status = $2
          WHERE
            booking_id = $1;
          `,
          [updateBooking.booking_id, updateBooking.status]
        );
      } else if (
        updateBooking.payment_method === "Credit Card" &&
        updateBooking.status === "pending"
      ) {
        await connectionPool.query(
          `
          UPDATE bills
          SET
            total_price = $2,
            promotion_discount = $3,
            payment_method = $4

          WHERE
            booking_id = $1;
          `,
          [
            updateBooking.booking_id,
            updateBooking.total_price,
            updateBooking.promotion_discount,
            updateBooking.payment_method,
          ]
        );
        await connectionPool.query(
          `
          UPDATE booking
          SET
            status = $2
          WHERE
            booking_id = $1;
          `,
          [updateBooking.booking_id, updateBooking.status]
        );
      } else if (
        updateBooking.payment_method === "Credit Card" &&
        updateBooking.status === "success"
      ) {
        await connectionPool.query(
          `
          UPDATE booking
          SET
            status = $2
          WHERE
            booking_id = $1;
          `,
          [updateBooking.booking_id, updateBooking.status]
        );
      }

      return res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      console.log(error.message);
      // return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
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
}

// standard_request: [...standardRequest],
//       special_request: [...specialRequest],
//       additional_request: additionalRequests,
//       total_price: totalPrice,
