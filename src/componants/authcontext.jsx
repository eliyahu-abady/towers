import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user)
        })
        return () => unsubscribe()
    }, [])

    return(
        <AuthContext.Provider value={{user}}>
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