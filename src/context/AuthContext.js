import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase/Firebase';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  };

  const logOut = ()=> {
    signOut(auth)
  };

   useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
    return () => {
      unsubscribe()
    }
   },[])

   return (
     <AuthContext.Provider value={
          {
            googleSignIn,
            signOut,
            credentials,
            user,
            logOut
          }
        }>
        {children}
      </AuthContext.Provider>
   )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
