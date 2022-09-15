import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged} from 'firebase/auth';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

}

export default AuthContext
