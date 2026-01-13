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

{/* <Link to={"/Game"}><li><button>game</button></li></Link>
<Link to={"/About"}><li><button>about</button></li></Link>
<Link to={"/Records"}><li><button>records</button></li></Link>
<Link to={"/Auth"}><li><button>sing</button></li></Link> */}

export default Menu