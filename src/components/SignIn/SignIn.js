
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../icons/google-icon.png'
import FacebookIcon from '../../icons/facebook.png'


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

  const handleFBSign = () => {
    alert("Doesn't work")
  }

  useEffect(() => {
    if (user != null) {
      navigate('/')
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
          <button onClick={handleFBSign}>Facebook</button>
        </section>

      </article>
    </article>
  )
}

export default SignIn
