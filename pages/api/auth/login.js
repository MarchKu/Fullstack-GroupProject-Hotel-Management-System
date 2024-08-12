import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function POST(req, res) {
  const user = { ...req.body };
  try {
    const getUserData = await connectionPool.query(
      `SELECT *
     FROM users
     INNER JOIN user_profiles
     ON user_profiles.user_id = users.user_id WHERE username = $1
     OR email = $1`,
      [user.username]
    );

    if (!getUserData.rows[0]) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userData = getUserData.rows[0];

    const isValidPassword = await bcrypt.compare(
      user.password,
      userData.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        fullName: userData.full_name,
        profilePicture: userData.profile_picture,
        username: userData.username,
        userId: userData.user_id,
      },
      process.env.SECRET_KEY,
      { expiresIn: 900000 }
    );

    return res.status(200).json({ message: "Login Successfully", token });
  } catch {
    return res
      .status(500)
      .json({ message: "Bad connection: Bad sever connection." });
  }
}
