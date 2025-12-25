import { useAuth } from "./context"

function Records() {
    const {records, user} = useAuth()

    if(!user)
        return(<p style={{fontSize: 40}}>signin to save records</p>)

    return(
        <>
            <h1>hello {user ? user.email : ""}</h1>
            <h2>records</h2>

            <table id="tableRecords">
                {
                    Object.entries(records).map(([key, value]) => (
                        <tr key={key}>
                            <th>level {key}:</th>
                            <td>{value}</td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
    
}

export default Records