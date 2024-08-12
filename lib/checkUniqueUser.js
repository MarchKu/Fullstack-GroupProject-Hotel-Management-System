import axios from "axios";
export async function checkUniqueUser(field, value) {
  try {
    const response = await axios.get(
      "https://neatly-hotel.vercel.app/api/check-unique-user",
      {
        params: { field, value },
      }
    );
    return response.data.isUnique;
  } catch (error) {
    console.error("There was an error!", error.response?.data || error.message);
    return false;
  }
}
