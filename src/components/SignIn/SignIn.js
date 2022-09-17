
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const {googleSignIn, user} = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch(error) {
      console.log('ERROR:',error)
    }
  };

  useEffect(()=> {
    if (user !=null) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return (
    <article id="signin-page-container">
      <button onClick={handleGoogleSignIn}>Sign With Google</button>
    </article>
  )
}

export default SignIn
