import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [records, setRecords] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user)
          setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    useEffect (() => {
        if(!user) {
            setRecords({})
            return
        }

        const docRef = doc(db, "users", user.uid)

        const unsubscribe = onSnapshot( docRef, (docSnap) => {
            if(docSnap.exists) {
                setRecords(docSnap.data().records || {})
            }
        })
        return () => unsubscribe()
    }, [user?.uid])

    const newRecord = async (level, newRecord) => {
        if(!user) return
        const docRef = doc(db, "users", user.uid)
        const currentRecord = records?.[level]
        if(currentRecord > newRecord || currentRecord === undefined) {
            try {
                await setDoc(docRef, {records: {[level]: newRecord}}, {merge: true})
            } catch (error) {
                console.log(error)
            }
        }  
    }

    return(
        <AuthContext.Provider value={{user, loading, records, newRecord}}>
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