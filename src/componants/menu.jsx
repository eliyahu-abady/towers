function Menu({setScreen}) {
    return(
        <>
            <h1 className="title">towers of hanoi</h1>
            <ul className="menu">
                <li><button onClick={() => setScreen("game")}>game</button></li>
                <li><button onClick={() => setScreen("about")}>about</button></li>
                <li><button onClick={() => setScreen("records")}>records</button></li>
                <li><button onClick={() => setScreen("auth")}>sign</button></li>
            </ul>
        </>
    )
}

export default Menu