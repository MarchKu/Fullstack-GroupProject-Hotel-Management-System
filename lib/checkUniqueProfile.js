import axios from "axios";
export async function checkUniqueProfile(field, value) {
  try {
    const response = await axios.get(
      "https://neatly-hotel.vercel.app/api/check-unique-id-user-profile",
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
