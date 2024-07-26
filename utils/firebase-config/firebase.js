import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvddOyt83Ox-AHUZ3IZ3Hq7ojxel6HJaw",
  authDomain: "hotel-admin-management-s-fb94b.firebaseapp.com",
  projectId: "hotel-admin-management-s-fb94b",
  storageBucket: "hotel-admin-management-s-fb94b.appspot.com",
  messagingSenderId: "97969916817",
  appId: "1:97969916817:web:94ea9495c40aca5184e830",
};

export const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);

export const auth = getAuth();
