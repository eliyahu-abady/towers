import { useState } from "react";
import { useAuth } from "../authcontext";
import {
  signUpUser,
  signInUser,
  logOutUser,
  resendVerificationEmail,
} from "../../services/authService.js";

const ValidEmail = () => {
  const [error, setError] = useState("");

  const handleSendEmail = async () => {
    try {
      await resendVerificationEmail();
      setError("");
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setError("נשלחו יותר מדי בקשות. אנא המתן לפני שליחת בקשות נוספות.");
      } else {
        setError("אירעה שגיאה בשליחת המייל. נסה שוב מאוחר יותר.");
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
      {/* Header עם צבע עדין */}
      <div className="bg-blue-50 p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">אימות כתובת המייל</h3>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-r-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="space-y-3 text-center text-slate-600">
          <p className="leading-relaxed">
            יש לאמת את חשבון המייל שלך כדי להיכנס לחשבון. <br />
            <strong>שים לב:</strong> המיילים עשויים להגיע לספאם או לתיקיית
            "קידומי מכירות".
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleSendEmail}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-100 transition-all active:scale-95 cursor-pointer"
          >
            שלח מייל אימות שוב
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
          >
            אימתתי, תן לי להיכנס
          </button>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full mt-6 text-sm font-medium text-slate-400 hover:text-red-500 transition-colors underline underline-offset-4 cursor-pointer"
        >
          התנתקות מהחשבון
        </button>
      </div>
    </div>
  );
};

// קומפוננטת הטופס עם Inputs נשלטים
const AuthForm = ({ title, buttonText, onSubmit, isRegister = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const inputStyles =
    "w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#646cff] focus:ring-1 focus:ring-[#646cff] bg-white text-black";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit(email, password, nickName);
    } else {
      onSubmit(email, password);
    }
    // איפוס השדות לאחר שליחה מוצלחת
    setEmail("");
    setPassword("");
    setNickName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-lg font-bold mb-4 border-b border-black/10 pb-2">
        {title}
      </h3>
      {isRegister && (
        <input
          className={inputStyles}
          name="nickName"
          type="text"
          placeholder="שם משתמש"
          autoComplete="nickName"
          required
          value={nickName} // ערך נשלט
          onChange={(e) => setNickName(e.target.value)} // עדכון הסטייט
        />
      )}
      <input
        className={inputStyles}
        name="email"
        type="email"
        placeholder="אימייל"
        autoComplete="username"
        required
        value={email} // ערך נשלט
        onChange={(e) => setEmail(e.target.value)} // עדכון הסטייט
      />
      <input
        className={inputStyles}
        name="password"
        type="password"
        placeholder="סיסמה"
        autoComplete="current-password"
        required
        value={password} // ערך נשלט
        onChange={(e) => setPassword(e.target.value)} // עדכון הסטייט
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#1a1a1a] text-white rounded hover:bg-gray-800 transition-colors border border-transparent cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
};

const Auth = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();

  // הפונקציות מקבלות כעת את הערכים ישירות מהטופס
  const handleSignUp = async (email, password, nickName) => {
    setError("");
    try {
      await signUpUser(email, password, nickName);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignIn = async (email, password) => {
    setError("");
    try {
      await signInUser(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (user && !user.emailVerified) {
    return <ValidEmail />;
  }

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-sm mx-auto">
      <h4 className="text-xl mb-6 font-medium">
        שלום {user ? user.displayName : "אורח"}
      </h4>

      <div className="w-full bg-white/40 p-6 rounded-xl shadow-sm border border-black/10">
        {error && (
          <p className="text-red-500 mb-4 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        <AuthForm
          title="הרשמה"
          buttonText="הירשם"
          onSubmit={handleSignUp}
          isRegister={true}
        />
        <hr className="border-black/10 my-6" />
        <AuthForm
          title="התחברות"
          buttonText="התחבר"
          onSubmit={handleSignIn}
          isRegister={false}
        />
      </div>

      {user && (
        <div className="mt-8 w-full">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-black border bg-red-200 border-red-200 rounded hover:bg-red-400 hover:border-red-300 transition-colors cursor-pointer"
          >
            התנתק
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
