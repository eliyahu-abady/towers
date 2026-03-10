import { db, auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "./authcontext";

const Auth = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleAuth = async (event, type) => {
    event.preventDefault();
    setError("");

    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    try {
      if (type === "signup") {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await setDoc(doc(db, "users", cred.user.uid), {
          email: email,
          records: {},
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      event.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  const toSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  // מחלקות משותפות לשדות קלט וכפתורים
  const inputStyles =
    "w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#646cff] focus:ring-1 focus:ring-[#646cff] bg-white text-black";
  const btnStyles =
    "w-full px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-gray-800 transition-colors border border-transparent";

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-sm mx-auto">
      <h4 className="text-xl mb-6 font-medium">
        שלום {user ? user.email : "guest"}
      </h4>

      <div className="w-full bg-white/40 p-6 rounded-xl shadow-sm border border-black/10">
        {error && (
          <p className="text-red-500 mb-4 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={(e) => handleAuth(e, "signup")} className="mb-6">
          <h3 className="text-lg font-bold mb-4 border-b border-black/10 pb-2">
            הרשמה
          </h3>
          <input
            className={inputStyles}
            name="email"
            type="email"
            placeholder="אימייל"
            autoComplete="new-email"
            required
          />
          <input
            className={inputStyles}
            name="password"
            type="password"
            placeholder="סיסמה"
            autoComplete="new-password"
            required
          />
          <button type="submit" className={btnStyles}>
            הירשם
          </button>
        </form>

        <hr className="border-black/10 my-6" />

        <form onSubmit={(e) => handleAuth(e, "signin")}>
          <h3 className="text-lg font-bold mb-4 border-b border-black/10 pb-2">
            התחברות
          </h3>
          <input
            className={inputStyles}
            name="email"
            type="email"
            placeholder="אימייל"
            autoComplete="current-email"
            required
          />
          <input
            className={inputStyles}
            name="password"
            type="password"
            placeholder="סיסמה"
            autoComplete="current-password"
            required
          />
          <button type="submit" className={btnStyles}>
            התחבר
          </button>
        </form>
      </div>

      <div className="mt-8 w-full">
        <button
          onClick={toSignOut}
          className="w-full px-4 py-2 bg-transparent text-red-600 border border-red-200 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          התנתק
        </button>
      </div>
    </div>
  );
};

export default Auth;
