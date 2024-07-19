import connectionPool from "@/utils/connectionPool/db";
import runMiddleware, {
  uploadFilesMulter,
} from "@/middleware/createRoomMulter";

import { uploadFile } from "../upload";

export default async function POST(req, res) {
  await runMiddleware(req, res, uploadFilesMulter);
  console.log("req.file: ", req.files);
  const room = {
    roomTypeId: parseInt(req.body.roomTypeId),
    roomSize: parseInt(req.body.roomSize),
    bedType: req.body.bedType,
    guest: parseInt(req.body.guest),
    pricePerNight: parseInt(req.body.pricePerNight),
    promotionPrice: parseInt(req.body.promotionPrice),
    roomDescription: req.body.roomDescription,
    amenity: req.body.amenity,
  };
  console.log("room: ", room);
  if (
    !room.roomTypeId ||
    !room.roomSize ||
    !room.bedType ||
    !room.guest ||
    !room.pricePerNight ||
    !room.roomDescription ||
    !req.files
  ) {
    return res.status(400).json({ message: "Missing data, please try again." });
  }
  let formatRoomAmentity;
  console.log(typeof room.amenity);
  console.log(room.amenity);
  if (typeof room.amenity === "string" && room.amenity !== "") {
    room.amenity = [room.amenity];
  } else if (room.amenity === "") {
    room.amenity = null
  }
  console.log("formatRoomAmentity: ", room.amenity);

  try {
    const query = `INSERT INTO rooms (room_type_id, room_size, bed_type, room_capacity, current_price, promotion_price, room_description, amenities)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                   RETURNING room_id`;

    const values = [
      room.roomTypeId,
      room.roomSize,
      room.bedType,
      room.guest,
      room.pricePerNight,
      room.promotionPrice,
      room.roomDescription,
      room.amenity,
    ];

    const roomData = await connectionPool.query(query, values);
    const roomId = roomData.rows[0].room_id;

    console.log("roomId", roomId);

    let mainImageUrl;
    const galleryImageUrls = [];

    if (roomId) {
      // Process main image
      if (req.files["mainImage"] && req.files["mainImage"][0]) {
        const mainImage = req.files["mainImage"][0];
        const { buffer, mimetype } = mainImage;

        const mainImageResult = await uploadFile(
          buffer,
          "admin_uploads",
          `room_images/main_images/${roomId}`,
          mimetype
        );

        if (mainImageResult.success) {
          mainImageUrl = mainImageResult.data.data.publicUrl;
          console.log("mainImageUrl: ", mainImageResult);
          await connectionPool.query(
            `UPDATE rooms SET main_image = $1 WHERE room_id = $2`,
            [mainImageUrl, roomId]
          );
        } else {
          return res.status(500).json({ error: "Error uploading main image" });
        }
      }

      // Process image gallery
      if (req.files["imageGallery"] && req.files["imageGallery"].length > 0) {
        const galleryImages = req.files["imageGallery"];

        for (let i = 0; i < galleryImages.length; i++) {
          const { buffer, mimetype } = galleryImages[i];

          const galleryImageResult = await uploadFile(
            buffer,
            "admin_uploads",
            `room_images/image_gallery/${roomId}/${i}`,
            mimetype
          );

          if (galleryImageResult.success) {
            galleryImageUrls.push(galleryImageResult.data.data.publicUrl);
          } else {
            return res
              .status(500)
              .json({ error: `Error uploading gallery image ${i}` });
          }
        }
        await connectionPool.query(
          `UPDATE rooms SET gallery_images = $1 WHERE room_id = $2`,
          [galleryImageUrls, roomId]
        );
      }
    }

    return res
      .status(201)
      .json({ message: "Registered Successfully", data: roomData.rows[0] });
  } catch (error) {
    console.error("Error:", error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
