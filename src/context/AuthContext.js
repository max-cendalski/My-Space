import { useContext, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, unlink, linkWithPopup, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebase/Firebase';


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleReauthenticate = () => {
    const provider = new GoogleAuthProvider();
    if (user) { // check if user is not null
      unlink(user, provider.providerId)
        .then(() => {
          linkWithPopup(user, provider)
            .then((result) => {
              var user = result.user;
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

  const clearSession = async () => {
    await auth.setPersistence(browserLocalPersistence);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={
      {
        googleSignIn,
        user,
        logOut,
        googleReauthenticate,
        clearSession
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
