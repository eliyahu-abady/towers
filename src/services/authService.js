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

export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "האימייל הזה כבר רשום במערכת. נסה להתחבר.";
    case "auth/invalid-email":
      return "כתובת האימייל אינה תקינה.";
    case "auth/operation-not-allowed":
      return "התחברות באמצעות אימייל וסיסמה אינה מאופשרת.";
    case "auth/weak-password":
      return "הסיסמה חלשה מדי. עליה להכיל לפחות 6 תווים.";
    case "auth/user-disabled":
      return "חשבון זה הושבת על ידי מנהל המערכת.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential": // בגרסאות חדשות Firebase מאחדת שגיאות אבטחה
      return "אימייל או סיסמה שגויים.";
    case "auth/too-many-requests":
      return "ניסיונות רבים מדי נכשלו. החשבון ננעל זמנית, נסה שוב מאוחר יותר.";
    case "auth/network-request-failed":
      return "בעיית תקשורת. בדוק את החיבור לאינטרנט.";
    default:
      return "אירעה שגיאה לא צפויה. נסה שוב מאוחר יותר.";
  }
};
