import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged} from 'firebase/auth';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  };

  const logOut = ()=> {
    signOut(auth)
  }
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
}

export default AuthContext
