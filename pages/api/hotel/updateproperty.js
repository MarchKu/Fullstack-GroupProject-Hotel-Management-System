import connectionPool from "@/utils/connectionPool/db";

export default async function PUT(req, res) {
  const hotelProperties = { ...req.body };

  try {
    await connectionPool.query(
      `UPDATE hotel_properties
              SET hotel_name = $1,
                  hotel_description = $2,
                  admin_username = $3
              WHERE hotel_property_id = $4`,
      [
        hotelProperties.hotelName,
        hotelProperties.hotelDescription,
        hotelProperties.adminUsername,
        hotelProperties.id,
      ]
    );

    return res.status(200).json({ message: "Edit successfully" });
  } catch (error) {
    console.log(error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
