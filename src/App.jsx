import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Instructions from "./pages/Instructions";
import Records from "./pages/Records";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import "./index.css";

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
        {screen !== "menu" && (
          <button
            className="fixed bottom-6 right-6 md:bottom-20 md:right-20 z-50 flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 cursor-pointer"
            onClick={() => setScreen("menu")}
          >
            <span className="text-xl leading-none">&rarr;</span>
            ראשי
          </button>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
