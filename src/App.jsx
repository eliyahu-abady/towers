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
      <div className="container">{renderPage()}</div>
      {screen !== "menu" ? (
        <button className="forMenu" onClick={() => setScreen("menu")}>
          menu
        </button>
      ) : null}
    </AuthProvider>
  );
}

export default App;
