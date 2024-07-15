import connectionPool from "@/utils/connectionPool/db";
import hotelLogoMulter, {
  runHotelLogoMulter,
} from "@/middleware/hotelLogoMulter";
import { uploadLogo } from "@/pages/api/uploadHotelLogo";

export default async function POST(req, res) {
  await runHotelLogoMulter(req, res, hotelLogoMulter);

  const hotelProperties = { ...req.body };

  try {
    const hotelData = await connectionPool.query(
      `INSERT INTO hotel_properties (hotel_name, hotel_description, admin_id)
           values ($1, $2, $3)
           RETURNING hotel_property_id`,
      [
        hotelProperties.hotelName,
        hotelProperties.hotelDescription,
        hotelProperties.adminId,
      ]
    );

    const hotelPropertiesId = hotelData.rows[0].hotel_property_id;

    let upLoadResult;

    if (hotelPropertiesId) {
      const { buffer, mimetype } = req.file;

      upLoadResult = await uploadLogo(
        buffer,
        "admin_uploads",
        `hotel_images/${hotelProperties.hotelName}`,
        mimetype
      );
    }

    const imageUrl = upLoadResult.data.data.publicUrl;

    await connectionPool.query(
      ` 
            UPDATE hotel_properties
            SET hotel_logo = $1
            WHERE hotel_property_id = $2`,
      [imageUrl, hotelPropertiesId]
    );

    return res.status(201).json({ message: "Edit successfully" });
  } catch (error) {
    console.log(error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
