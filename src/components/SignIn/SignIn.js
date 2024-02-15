
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../icons/google-icon.png'
import FacebookIcon from '../../icons/facebook.png'


const SignIn = () => {
  const { googleSignIn, user, facebookSignIn } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.error('ERROR:', error)
    }
  };

  const handleFBSignIn = async () => {
    try {
      await facebookSignIn()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <article id="signing-page-wrapper">
      <article id="signing-page-container">
        <h1>Sign In With </h1>
        <section className="signing-section">
          <img className="login-icon" src={GoogleIcon} alt="google"></img>
          <button onClick={handleGoogleSignIn}>Google</button>
        </section>
        <section className="signing-section">
          <img className="login-icon" src={FacebookIcon} alt="facebook"></img>
          <button onClick={handleFBSignIn}>Facebook</button>
        </section>

      </article>
    </article>
  )
}

export default SignIn
