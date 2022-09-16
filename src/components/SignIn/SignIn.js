import React from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom';

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
      <h1>Sign in</h1>
      <button onClick={handleGoogleSignIn}>Sign With Google</button>
    </article>
  )
}

export default SignIn
