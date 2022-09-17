import React from 'react';
import { UserAuth } from '../../context/AuthContext'


const SignIn = () => {
  const {googleSignIn} = UserAuth()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch(error) {
      console.log('ERROR:',error)
    }
  };

  return (
    <article id="signin-page-container">
      <button onClick={handleGoogleSignIn}>Sign With Google</button>
    </article>
  )
}

export default SignIn
