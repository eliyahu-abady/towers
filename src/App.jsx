import Menu from "./components/menu";
import Game from "./components/game";
import About from "./components/about";
import Records from "./components/records";
import Auth from "./components/auth";
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
      case "about":
        return <About />;
      case "records":
        return <Records />;
      case "auth":
        return <Auth />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#faebd7] text-[#242424] flex flex-col items-center justify-center w-full p-4 md:p-8 font-sans transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          {renderPage()}
        </div>
        {screen !== "menu" ? (
          <button
            className="mt-24 px-6 py-2 bg-[#1a1a1a] text-white rounded-lg border border-transparent hover:border-indigo-500 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
            onClick={() => setScreen("menu")}
          >
            menu
          </button>
        ) : null}
      </div>
    </AuthProvider>
  );
}

export default App;
