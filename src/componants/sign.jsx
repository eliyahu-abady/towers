import { db, auth } from "../config/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react';
import { useAuth } from "./context";

const Sign = () => {
    const [error, setError] = useState("");
    const {user} = useAuth()
    
    const handleAuth = async (event, type) => {
        event.preventDefault();
        setError("");
        
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');

        try {
            if (type === 'signup') {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                
                await setDoc(doc(db, "users", cred.user.uid), {
                    email: email,
                    records: {}
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            event.target.reset(); 
        } catch (err) {
            setError(err.message); 
        }
    };

    const toSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h4>hello {user ? user.email : ""} </h4>
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
            <br />
            <br />
            <div>
                <button onClick={toSignOut}>signout</button>
            </div>
        </div>
    );
};

export default Sign;
