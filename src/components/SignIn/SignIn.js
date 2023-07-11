
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../icons/google-icon.png'


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
        <section className="signing-section">
          <img className="login-icon" src={GoogleIcon}></img>
          <button onClick={handleGoogleSignIn}>Google</button>
        </section>

      </article>
    </article>
  )
}

export default SignIn
