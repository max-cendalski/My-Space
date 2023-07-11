
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log('ERROR:', error)
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <article id="signing-page-wrapper">
      <article id="signing-page-container">
        <h1>Sign In With </h1>
        <button onClick={handleGoogleSignIn}>Sign With Google</button>
      </article>
    </article>
  )
}

export default SignIn
