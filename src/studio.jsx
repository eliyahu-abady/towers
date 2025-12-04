import { useState } from "react";

// רכיבים נפרדים עבור כל מסך פנימי
const MainMenu = ({ onStartGame }) => (
    <div>
        <h1>🎮 מסך פתיחה</h1>
        <button onClick={() => onStartGame("records")}>צפה בשיאים</button>
        <button onClick={() => onStartGame("credits")}>קרדיטים</button>
    </div>
);
const RecordsScreen = ({ onBack }) => (
    <div>
        <h2>🏆 שיאים</h2>
        <p>מקום 1: 5000 נקודות</p>
        <button onClick={() => onBack("main")}>חזרה</button>
    </div>
);
const CreditsScreen = ({ onBack }) => (
    <div>
        <h3>⭐ קרדיטים</h3>
        <p>פיתוח: ג'יין דו</p>
        <button onClick={() => onBack("main")}>חזרה</button>
    </div>
);

function GameApp() {
    const [screen, setScreen] = useState("main");

    // פונקציה שמחליטה איזה רכיב להציג
    const renderScreen = () => {
        switch (screen) {
            case "main":
                return <MainMenu onStartGame={setScreen} />;
            case "records":
                return <RecordsScreen onBack={setScreen} />;
            case "credits":
                return <CreditsScreen onBack={setScreen} />;
            default:
                return <div>שגיאה: מסך לא נמצא</div>;
        }
    };

    return (
        <div className="game-container">
            {renderScreen()}
        </div>
    );
}