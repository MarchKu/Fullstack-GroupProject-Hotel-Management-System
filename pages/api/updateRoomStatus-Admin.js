import connectionPool from "@/utils/connectionPool/db";

export default async function PUT(req, res) {
  try {
    const updatedStatus = { ...req.body, updated_at: new Date() };
    await connectionPool.query(
      `
              update rooms
              set status = $2,
              updated_at = $3
              where room_id = $1
              `,
      [updatedStatus.room_id, updatedStatus.status, updatedStatus.updated_at]
    );
    return res.status(200).json({ message: "Updated status Successfully" });
  } catch (error) {
    console.log(error.message);
  }
}
