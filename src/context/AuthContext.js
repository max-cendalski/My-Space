import { useContext, createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, unlink, linkWithPopup, browserLocalPersistence, GithubAuthProvider,fetchSignInMethodsForEmail, linkWithCredential } from 'firebase/auth';
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

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Assuming setUser updates the user state in your context
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Get the user's email from the error object
        const email = error.email;
  
        // Fetch the sign-in methods for the email
        const methods = await fetchSignInMethodsForEmail(auth, email);
  
        // This example assumes GitHub was the original method, adjust as necessary
        if (methods.includes('github.com')) {
          const githubProvider = new GithubAuthProvider();
          try {
            const result = await signInWithPopup(auth, githubProvider);
            
            // Get the credential from the Google auth attempt
            const googleCredential = GoogleAuthProvider.credentialFromError(error);
            
            // Link the Google credential to the existing account
            await linkWithCredential(result.user, googleCredential);
            setUser(result.user);
          } catch (innerError) {
            console.error("Error during account linking: ", innerError);
          }
        }
      } else {
        console.error("Error during Google sign-in: ", error);
      }
    }
  };


  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
  
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.email;
        const methods = await fetchSignInMethodsForEmail(auth, email);
  
        if (methods.includes('google.com')) {
          const originalProvider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, originalProvider);          
          const credential = GithubAuthProvider.credentialFromError(error);
        
          await linkWithCredential(result.user, credential);
        }
      } else {
        console.error(error);
      }
    }
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
        signInWithGitHub,
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
