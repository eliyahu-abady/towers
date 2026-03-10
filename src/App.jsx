import Menu from "./components/pages/menu";
import Game from "./components/pages/game";
import Instructions from "./components/pages/Instructions";
import Records from "./components/pages/records";
import Auth from "./components/pages/auth";
import { AuthProvider } from "./components/authcontext";
import { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("menu");

  const renderPage = () => {
    switch (screen) {
      case "menu":
        return <Menu setScreen={(page) => setScreen(page)} />;
      case "game":
        return <Game />;
      case "Instructions":
        return <Instructions />;
      case "records":
        return <Records />;
      case "auth":
        return <Auth />;
      default:
        return <div>הדף לא נמצא</div>;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#faebd7] text-[#242424] flex flex-col items-center w-full p-4 md:p-8 font-sans transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          {renderPage()}
        </div>
        {screen !== "menu" ? (
          <button
            className="mt-24 px-6 py-2 bg-[#1a1a1a] text-white rounded-lg border-3 border-transparent hover:border-indigo-500 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500/50 cursor-pointer"
            onClick={() => setScreen("menu")}
          >
            ראשי
          </button>
        ) : null}
      </div>
    </AuthProvider>
  );
}

export default App;
