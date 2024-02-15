import { useContext, createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, unlink, linkWithPopup, browserLocalPersistence } from 'firebase/auth';
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

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const facebookReauthenticate = () => {
    const provider = new FacebookAuthProvider();
    if (user) {
      unlink(user, provider.providerId)
        .then(() => {
          linkWithPopup(user, provider)
            .then((result) => {
              // The user is re-authenticated with Facebook and linked.
              var user = result.user;
              setUser(user);
            })
            .catch((error) => {
              // Handle Errors here.
              console.log(error);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
        });
    }
  };
  

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
    if (user) { 
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
