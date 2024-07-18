import connectionPool from "@/utils/connectionPool/db";
import runMiddleware, {
  uploadFilesMulter,
} from "@/middleware/createRoomMulter";

import { uploadFile } from "../upload";

export default async function POST(req, res) {
  try {
    await runMiddleware(req, res, uploadFilesMulter);

    console.log("req.body", req.body);

    const room = {
      roomTypeId: parseInt(req.body.roomTypeId),
      roomSize: parseInt(req.body.roomSize),
      bedType: req.body.bedType,
      guest: parseInt(req.body.guest),
      pricePerNight: parseInt(req.body.pricePerNight),
      promotionPrice: parseInt(req.body.promotionPrice),
      roomDescription: req.body.roomDescription,
    };

    console.log("room object", room);

    const query = `INSERT INTO rooms (room_type_id, room_size, bed_type, room_capacity, current_price, promotion_price, room_description)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)
                   RETURNING room_id`;

    const values = [
      room.roomTypeId,
      room.roomSize,
      room.bedType,
      room.guest,
      room.pricePerNight,
      room.promotionPrice,
      room.roomDescription,
    ];

    console.log("Executing query:", query);
    console.log("With values:", values);

    const roomData = await connectionPool.query(query, values);

    console.log("roomData", roomData);

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
