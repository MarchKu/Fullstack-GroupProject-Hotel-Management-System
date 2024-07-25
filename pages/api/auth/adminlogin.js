import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/utils/firebase-config/firebase.js";

export default async function POST(req, res) {
  const admin = { ...req.body };

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      admin.username,
      admin.password
    );
    const token = await userCredential.user.getIdToken();
    return res.json({ message: "Login Successfully", token });
  } catch (error) {
    return json.status(500).json({ message: error.message });
  }
}
