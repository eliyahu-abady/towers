import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const recordsRef = useRef(null)

    const change = (user) => {
        setUser(user)
    }

    const newRecord = async (level, record) => {
        const docRefId = doc(db, "records", user.uid)
        if(recordsRef.current[level] > record || !(level in recordsRef.current)) {
            try {
                await setDoc(docRefId, {[level]: record}, {merge: true})
            } catch (error) {
                console.log(error)
            }
        }  
    }

    useEffect (() => {
        if(!user) return
        const constRecords = async () => {
            const docRefId = doc(db, "records", user.uid)
            try {
                const records = (await getDoc(docRefId)).data() || {}
                recordsRef.current = records
            } catch (error) {
                console.log(error)
            }
        }
        constRecords()
    }, [user?.uid])

    return(
        <AuthContext.Provider value={{user, loading, recordsRef, change, newRecord}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const auth = useContext(AuthContext)
    if(!auth) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return auth
}