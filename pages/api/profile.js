import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
  try {
    const result = await connectionPool.query(`
            SELECT *
            FROM users
            INNER JOIN user_profiles
            ON user_profiles.user_id = users.user_id
            `);
    console.log(result.rows);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
}
