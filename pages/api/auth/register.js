import connectionPool from "@/utils/connectionPool/db";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  const user = { ...req.body };

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
        user.profile_picture,
      ]
    );

    return res.status(201).json({ message: "Regisgered Successfully" });
  } catch (error) {
    console.log(error.message);
  }
}
