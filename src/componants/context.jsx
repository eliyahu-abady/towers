import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const change = (user) => {
        setUser(user)
    }

    return(
        <AuthContext.Provider value={{user, change}}>
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