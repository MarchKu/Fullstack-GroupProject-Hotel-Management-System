import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, firebaseDB } from "@/utils/firebase-config/firebase.js";
import { doc, getDoc } from "@firebase/firestore";

export default async function POST(req, res) {
  const admin = { ...req.body };

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      admin.username,
      admin.password
    );
    const user = auth.currentUser;
    const token = await userCredential.user.getIdToken();

    const docRef = doc(firebaseDB, "admins", user.uid);
    const docSnap = await getDoc(docRef);
    const username = docSnap.data();

    return res.json({
      message: "Login Successfully",
      token,
      username,
    });
  } catch (error) {
    return json.status(500).json({ message: error.message });
  }
}
