import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  const searchData = { ...req.query };
  try {
    const result = await connectionPool.query(
      `SELECT 
        r.room_id, r.room_size, r.bed_type, r.room_capacity, r.current_price, r.promotion_price, 
        r.room_description, r.main_image, r.gallery_images, r.amenities, rt.type_name
       FROM rooms r
       INNER JOIN room_types rt
        ON r.room_type_id = rt.room_type_id
       WHERE r.room_id NOT IN (SELECT b.room_id
                               FROM booking b
                               WHERE (
                               b.check_in < $2 AND
                               b.check_out > $1) 
                              ) AND r.room_capacity >= $3
       ORDER BY r.room_id ASC`,
      [searchData.check_in, searchData.check_out, searchData.guests]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
}
