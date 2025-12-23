import { db, auth } from "../config/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react';
import { useAuth } from "./context";

const Sign = () => {
    const [error, setError] = useState("");
    const [user, setUser] = useState(null)
    const {change} = useAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user)
          change(user)
        })
    }, [])
    
    const handleAuth = async (event, type) => {
        event.preventDefault();
        setError("");
        
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');

        try {
            if (type === 'signup') {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                
                await setDoc(doc(db, "records", cred.user.uid), {
                    email: email,
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            event.target.reset(); 
        } catch (err) {
            setError(err.message); 
        }
    };

    return (
        <div id='sign'>
            {error && <p style={{color: 'red'}}>{error}</p>}
            
            <form onSubmit={(e) => handleAuth(e, 'signup')}>
                <h3>Signup</h3>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type='submit'>Signup</button>
            </form>

            <hr />

            <form onSubmit={(e) => handleAuth(e, 'signin')}>
                <h3>Signin</h3>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type='submit'>Signin</button>
            </form>
        </div>
    );
};

export default Sign;
