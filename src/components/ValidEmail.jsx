import { resendVerificationEmail, logOutUser } from "../services/authService";
import { useState } from "react";

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

export default ValidEmail;
