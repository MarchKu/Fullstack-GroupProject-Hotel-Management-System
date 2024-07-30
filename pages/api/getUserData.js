import connectionPool from "@/utils/connectionPool/db";

export default async function GET(req, res) {
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
