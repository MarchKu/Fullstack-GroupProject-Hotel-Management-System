import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";
import multerMiddleware, {
  runMiddleware,
} from "../../../middleware/middleware";
import { uploadFile } from "../upload";

export default async function POST(req, res) {
  await runMiddleware(req, res, multerMiddleware);

  const user = { ...req.body };

  const { buffer, mimetype } = req.file;

  const result = await uploadFile(
    buffer,
    "user_uploads",
    `profile_pictures/${user.username}`,
    mimetype
  );

  const imageUrl = result.data.data.publicUrl;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const result = await connectionPool.query(
      `INSERT INTO users (username, password, email)
           values ($1, $2, $3)
           RETURNING user_id`,
      [user.username, user.password, user.email]
    );

    const userId = result.rows[0].user_id;

    await connectionPool.query(
      ` 
            INSERT INTO user_profiles (user_id, full_name, id_number, date_of_birth, country, profile_picture)
            values ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        user.full_name,
        user.id_number,
        user.date_of_birth,
        user.country,
        imageUrl,
      ]
    );

    if (user.card_number && user.card_owner) {
      await connectionPool.query(
        ` 
              INSERT INTO user_credit_cards (user_id, card_number, card_owner)
              values ($1, $2, $3)`,
        [userId, user.card_number, user.card_owner]
      );
    }

    return res.status(201).json({ message: "Regisgered Successfully" });
  } catch (error) {
    console.log(error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
