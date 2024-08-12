import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, firebaseDB } from "@/utils/firebase-config/firebase.js";
import { doc, getDoc } from "@firebase/firestore";

export default async function POST(req, res) {
  const admin = { ...req.body };

  try {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        admin.email,
        admin.password
      );
      const user = auth.currentUser;
      const token = await userCredential.user.getIdToken();

      const docRef = doc(firebaseDB, "admins", user.uid);
      const docSnap = await getDoc(docRef);
      const username = docSnap.data();

      return res.status(200).json({
        message: "Login Successfully",
        token,
        username,
      });
    } catch {
      return json.status(400).json({ message: "User not found" });
    }
  } catch {
    return json
      .status(500)
      .json({ message: "Bad connection: Bad sever connection." });
  }
}
