import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { signUpUser, signInUser, logOutUser } from "../services/authService.js";
import { getAuthErrorMessage } from "../services/authService.js";
import ValidEmail from "../components/ValidEmail.jsx";
import AuthForm from "../components/AuthForm.jsx";

// קומפוננטת הטופס עם Inputs נשלטים

const Auth = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();

  // הפונקציות מקבלות כעת את הערכים ישירות מהטופס
  const handleSignUp = async (email, password, nickName) => {
    setError("");
    try {
      await signUpUser(email, password, nickName);
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    }
  };

  const handleSignIn = async (email, password) => {
    setError("");
    try {
      await signInUser(email, password);
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
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
