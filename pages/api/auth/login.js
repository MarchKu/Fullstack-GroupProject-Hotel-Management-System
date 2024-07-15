import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function POST(req, res) {
  const user = { ...req.body };
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
    return res.status(401).json({
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
    "ae1f83fefc225dcde470245736067d411c8220ffbd4a45317ee8d18e3a0653e9",
    { expiresIn: 900000 }
  );

  return res.json({ message: "Login Successfully", token });
}
