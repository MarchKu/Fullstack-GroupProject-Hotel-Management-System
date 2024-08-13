import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";
import multerMiddleware, {
  runMiddleware,
} from "../../../middleware/multerMiddleware";
import { uploadFile } from "../upload";
import { Knock } from "@knocklabs/node";
import "dotenv/config";

const knockClient = new Knock(process.env.KNOCK_SK);

export default async function POST(req, res) {
  await runMiddleware(req, res, multerMiddleware);

  const user = { ...req.body };

  try {
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    const userData = await connectionPool.query(
      `INSERT INTO users (username, password, email)
           values ($1, $2, $3)
           RETURNING user_id`,
      [user.username, user.password, user.email]
    );

    const userId = userData.rows[0].user_id;

    let upLoadResult;

    if (userId) {
      const { buffer, mimetype } = req.file;

      upLoadResult = await uploadFile(
        buffer,
        "user_uploads",
        `profile_pictures/${userId}`,
        mimetype
      );
    }

    const imageUrl = upLoadResult.data.data.publicUrl;

    await connectionPool.query(
      ` 
            INSERT INTO user_profiles (user_id, full_name, id_number, date_of_birth, country, profile_picture)
            values ($1, $2, $3, $4, $5, $6)
            RETURNING user_profile_id`,
      [
        userId,
        user.full_name,
        user.id_number,
        user.date_of_birth,
        user.country,
        imageUrl,
      ]
    );

    const knockId = `user-${userId}`;
    await knockClient.users.identify(knockId, {
      name: user.username,
      avatar: imageUrl,
    });
    await knockClient.workflows.trigger("greeting-message", {
      recipients: [knockId],
    });
    return res.status(201).json({ message: "Regisgered Successfully" });
  } catch {
    return res
      .status(500)
      .json({ message: "Bad connection: Bad sever connection." });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
