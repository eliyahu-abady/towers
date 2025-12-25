function Menu({setScreen}) {
    return(
        <>
            <h1 className="title">towers of hanoi</h1>
            <div className="menu">
                <button onClick={() => setScreen("game")}>game</button>
                <button onClick={() => setScreen("about")}>about</button>
                <button onClick={() => setScreen("records")}>records</button>
                <button onClick={() => setScreen("auth")}>sign</button>
            </div>
        </>
    )
}

export default Menu