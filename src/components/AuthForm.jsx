import { useState } from "react";

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

export default AuthForm;
