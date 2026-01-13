import { useEffect, useState } from "react"
import { useAuth } from "./authcontext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import {fetchrecords} from "../firestoremanager"


function Records() {
    const [records, setRecords] = useState()
    const {user} = useAuth()

    const resetRecords = async () => {
        try {
            setRecords({})
            await setDoc((doc(db, "users", user.uid)), {records: {}}, {merge: true})   
        } catch (error) {
            console.log(error)
        }
    }

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
    if(Object.keys(records).length === 0)
        return(<p>play to create records</p>)

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
            <button onClick={() => resetRecords()}>reset records</button>
        </>
    )
    
}

export default Records