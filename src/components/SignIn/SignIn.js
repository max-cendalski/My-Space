
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../icons/google-icon.png'


const SignIn = () => {
  const { googleSignIn, user,} = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.error('ERROR:', error)
    }
  };


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
        <p className='privacy-policy-link'>For information on how we handle your data, please read our <a href='/privacy-policy'>Privacy Policy</a>.</p>
      </article>
    </article>
  )
}

export default SignIn
