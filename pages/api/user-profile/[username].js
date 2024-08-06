import connectionPool from "@/utils/connectionPool/db";
import multerMiddleware, { runMiddleware } from "@/middleware/multerMiddleware";
import { uploadFile } from "../upload";
import cors from "@/lib/cors";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, since we're handling FormData
  },
};

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await runMiddleware(req, res, multerMiddleware);

      const { username } = req.query;
      const userInput = { ...req.body };
      const updatedData = { ...userInput, updated_at: new Date() };
      const now = new Date();

      const userInfo = await connectionPool.query(
        `
      SELECT users.user_id,
      username,
      user_profile_id,
      full_name,
      email,
      id_number,
      date_of_birth,
      country,
      profile_picture 
      FROM users
      inner join user_profiles
      on user_profiles.user_id = users.user_id
      where username = $1
      `,
        [username]
      );
      if (!userInfo.rows[0]) {
        return res
          .status(404)
          .json({ message: "Invalid request cannot find user" });
      }
      const userId = userInfo.rows[0].user_id;
      let upLoadResult;
      if (username) {
        const { buffer, mimetype } = req.file;

        upLoadResult = await uploadFile(
          buffer,
          "user_uploads",
          `profile_pictures/${username}${now}`,
          mimetype
        );

        const imageUrl = upLoadResult.data.data.publicUrl;

        await connectionPool.query(
          `
      UPDATE user_profiles
    SET full_name = $1,
    id_number = $2,
    date_of_birth = $3,
    country = $4,
    profile_picture = $5,
    updated_at = $6
    where user_id = $7
    `,
          [
            updatedData.full_name,
            updatedData.id_number,
            updatedData.date_of_birth,
            updatedData.country,
            imageUrl,
            updatedData.updated_at,
            userId,
          ]
        );

        await connectionPool.query(
          `
      UPDATE users
    SET email = $1,
    updated_at = $2
    where username = $3
    `,
          [updatedData.email, updatedData.updated_at, username]
        );
        return res.status(200).json({ message: "Update sucessfuly" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === "GET") {
    try {
      const { username } = req.query;
      const userInfo = await connectionPool.query(
        `
      SELECT users.user_id,
      username,
      user_profile_id,
      full_name,
      email,
      id_number,
      date_of_birth,
      country,
      profile_picture 
      FROM users
      inner join user_profiles
      on user_profiles.user_id = users.user_id
      where username = $1 
      `,
        [username]
      );

      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

      return res.status(200).json(userInfo.rows[0]);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default cors(handler);
