import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import axios from "axios";



export const AuthContext= createContext(null)
const auth= getAuth(app)
const AuthProvider = ({children}) => {

    const [user,setUser]= useState(null)
    const [loading, setLoading]= useState(true)

    const createUser= (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login= (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut= ()=>{
        return signOut(auth)
        
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            // if user exists then issue a token
            if (currentUser) {
                axios.post('https://group-study-server-rho.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data);
                    })
            }
            else {
                axios.post('https://group-study-server-rho.vercel.app/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [user?.email])
    const AuthInfo= {
        user,
        loading,
        createUser,
        login,
        logOut
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;