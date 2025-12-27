import { useEffect, useState } from "react"
import { useAuth } from "./authcontext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import {fetchrecords} from "../firestoremanager"


function Records() {
    const [records, setRecords] = useState()
    const {user} = useAuth()

    useEffect(() => {
        if(!user) {
            setRecords({})
            return
        }

        const fetch = async () => {
            const data = await fetchrecords(user.uid)
            setRecords(data)
        }
        fetch()
    }, [user])

    if(!user)
        return(<p style={{fontSize: 40}}>signin to save records</p>)
        if(!records)
            return(<p className="loading">loading...</p>)
    return(
        <>
            <h1>hello {user ? user.email : ""}</h1>
            <h2>records</h2>

            <table id="tableRecords">
                <tbody>
                    {
                        Object.entries(records).map(([key, value]) => (
                            <tr key={key}>
                                <th>level {key}:</th>
                                <td>{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
    
}

export default Records