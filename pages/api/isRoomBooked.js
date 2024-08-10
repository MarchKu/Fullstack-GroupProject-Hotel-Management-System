import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  const searchData = { ...req.query };
  try {
    const result = await connectionPool.query(
      `SELECT 
       EXISTS (
        SELECT 1
        FROM booking
        WHERE room_id = $1
        AND status = 'success'
        AND (
            (check_in < $3 AND check_out > $2)
        )
    ) AS is_booked;`,
      [searchData.room_id, searchData.check_in, searchData.check_out]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
}
