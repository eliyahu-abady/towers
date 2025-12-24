import { useAuth } from "./context"

function Records() {
    const {records, user} = useAuth()

    return(
        <>
            <h1>hello {user ? user.email : ""}</h1>
            <h2>records</h2>
            <ul>
                <li>first</li>
                <li>second</li>
            </ul>
        </>
    )
    
}

export default Records