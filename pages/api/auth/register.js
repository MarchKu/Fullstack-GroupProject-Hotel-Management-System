import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";
import multerMiddleware, {
  runMiddleware,
} from "../../../middleware/multerMiddleware";
import { uploadFile } from "../upload";
import { Knock } from "@knocklabs/node";

const knockClient = new Knock(
  "sk_test_kseOJ5ZEM06R-g9oRoRQQMf-UBylVWu5wvyFigek1vU"
);

export default async function POST(req, res) {
  await runMiddleware(req, res, multerMiddleware);

  const user = { ...req.body };

  if (
    !user.username ||
    !user.password ||
    !user.email ||
    !user.full_name ||
    !user.id_number ||
    !user.date_of_birth ||
    !user.country ||
    !req.file
  ) {
    return res.status(401).json({ message: "Missing data, please try again." });
  }

  const checkUsername = await connectionPool.query(
    `
    SELECT *
    FROM users
    INNER JOIN user_profiles
    ON user_profiles.user_id = users.user_id
    WHERE username = $1
    `,
    [user.username]
  );
  const checkEmail = await connectionPool.query(
    `
    SELECT *
    FROM users
    INNER JOIN user_profiles
    ON user_profiles.user_id = users.user_id
    WHERE email = $1
    `,
    [user.email]
  );
  const checkIdNumber = await connectionPool.query(
    `
    SELECT *
    FROM users
    INNER JOIN user_profiles
    ON user_profiles.user_id = users.user_id
    WHERE id_number = $1
    `,
    [user.id_number]
  );

  if (checkUsername.rows[0]) {
    return res
      .status(409)
      .json({ message: "User with this username already exists" });
  }
  if (checkEmail.rows[0]) {
    return res
      .status(409)
      .json({ message: "This email is linked to another account." });
  }
  if (checkIdNumber.rows[0]) {
    return res
      .status(409)
      .json({ message: "This ID number is not available." });
  }

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
  } catch (error) {
    console.log(error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
