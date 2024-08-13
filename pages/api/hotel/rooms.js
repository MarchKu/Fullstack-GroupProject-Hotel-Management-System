import connectionPool from "@/utils/connectionPool/db";
import runMiddleware, {
  uploadFilesMulter,
} from "@/middleware/createRoomMulter";
import bodyParser from "body-parser";

import { uploadFile } from "../upload";
import { error } from "toastr";
console.log("Before handler");
export default async function handler(req, res) {
  if (req.method === "POST") {
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
      return res
        .status(400)
        .json({ message: "Missing data, please try again." });
    }
    let formatRoomAmentity;
    console.log(typeof room.amenity);
    console.log(room.amenity);
    if (typeof room.amenity === "string" && room.amenity !== "") {
      room.amenity = [room.amenity];
    } else if (room.amenity === "") {
      room.amenity = null;
    }
    console.log("formatRoomAmentity: ", room.amenity);

    try {
      const query = `INSERT INTO rooms (room_type_id, room_size, bed_type, room_capacity, current_price, promotion_price, room_description, amenities, status)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Vacant')
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
            return res
              .status(500)
              .json({ error: "Error uploading main image" });
          }
        }

        // Process image gallery
        if (req.files["imageGallery"] && req.files["imageGallery"].length > 0) {
          const galleryImages = req.files["imageGallery"];

          const uploadPromises = galleryImages.map((image, index) => {
            const { buffer, mimetype } = image;
            return uploadFile(
              buffer,
              "admin_uploads",
              `room_images/image_gallery/${roomId}/${index}`,
              mimetype
            ).then((galleryImageResult) => {
              if (galleryImageResult.success) {
                return galleryImageResult.data.data.publicUrl;
              } else {
                throw new Error(`Error uploading gallery image ${index}`);
              }
            });
          });

          try {
            const uploadedGalleryImagesUrls = await Promise.all(uploadPromises);
            await connectionPool.query(
              `UPDATE rooms SET gallery_images = $1 WHERE room_id = $2`,
              [uploadedGalleryImagesUrls, roomId]
            );
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
        }
      }

      return res
        .status(201)
        .json({ message: "Registered Successfully", data: roomData.rows[0] });
    } catch (error) {
      console.error("Error processing request: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    await runMiddleware(req, res, uploadFilesMulter);
    console.log("req.body: ", req.body);
    if (typeof req.body.amenity === "string" && req.body.amenity !== "") {
      req.body.amenity = [req.body.amenity];
    } else if (req.body.amenity === "") {
      req.body.amenity = null;
    }
    console.log("req.body.promotionPrice: ", req.body.promotionPrice);
    if (req.body.promotionPrice === "0") {
      req.body.promotionPrice = null;
    }
    try {
      const query = `UPDATE rooms SET room_type_id = $1, room_size = $2, bed_type = $3, room_capacity = $4, current_price = $5, promotion_price = $6, room_description = $7, amenities = $8, main_image = $9, gallery_images = $10 WHERE room_id = $11`;
      const values = [
        req.body.roomTypeId,
        req.body.roomSize,
        req.body.bedType,
        req.body.guest,
        req.body.pricePerNight,
        req.body.promotionPrice,
        req.body.roomDescription,
        req.body.amenity,
        req.body.mainImage,
        req.body.imageGallery,
        req.body.roomId,
      ];
      const updateResult = await connectionPool.query(query, values);
      console.log("updateResult: ", updateResult);
      return res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
      console.log("Error:", error.message, error.stack);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await connectionPool.query(
        `DELETE FROM rooms WHERE room_id = $1`,
        [req.query.id]
      );
      return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
      return json.status(500).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const result = await connectionPool.query(`
            SELECT *
            FROM rooms
            INNER JOIN room_types
            ON rooms.room_type_id = room_types.room_type_id
            `);
      console.log(result.rows);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("Other case");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
