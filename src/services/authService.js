import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUpUser = async (email, password, nickName) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;

  await updateProfile(user, { displayName: nickName });
  // שליחת מייל אימות
  await sendEmailVerification(user);

  // יצירת רשומה ראשונית ב-Firestore
  await setDoc(doc(db, "users", cred.user.uid), {
    email: email,
    nickName: nickName,
    records: {},
  });

  return cred.user;
};

export const signInUser = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const logOutUser = async () => {
  await signOut(auth);
};

export const resendVerificationEmail = async () => {
  if (!auth.currentUser) throw new Error("אין משתמש מחובר");
  await sendEmailVerification(auth.currentUser);
};
