function Menu({screen}) {
    return(
        <>
            <h1 className="title">towers of hanoi</h1>
            <div className="menu">
                <button onClick={() => screen("game")}>game</button>
                <button onClick={() => screen("about")}>about</button>
                <button onClick={() => screen("records")}>records</button>
            </div>
        </>
    )
}

export default Menu