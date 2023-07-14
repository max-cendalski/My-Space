import { useContext, createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,unlink, linkWithPopup} from 'firebase/auth';
import {auth} from '../firebase/Firebase';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})
 

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const googleReauthenticate = () => {
    const provider = new GoogleAuthProvider();
    // Prompt the user to re-provide their sign-in credentials
    if (user) { // check if user is not null
        unlink(user, provider.providerId)
        .then(() => {
            linkWithPopup(user, provider)
            .then((result) => {
                // The firebase.User instance:
                var user = result.user;
                // Update user in your context state
                setUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
};

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
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
            user,
            logOut,
            googleReauthenticate
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
