import React, { useState } from 'react';
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Account.css'

const LogIn = ({ handleAuthChange }) => {
  const [signInSuccess, setSignInSuccess] = useState(null);
  const navigate = useNavigate();


  const doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`);
        handleAuthChange(true);
        navigate('/');
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in. ${error.message}!`);
      });
  };

  return (
    <React.Fragment>
      <div className='user-acc-container'>
        <div className='user-acc-info'>
          <h1>Sign In</h1>
          {signInSuccess && <p>{signInSuccess}</p>}
          <form onSubmit={doSignIn}>
            <input type="text" name="signinEmail" placeholder="Email" />
            <input type="password" name="signinPassword" placeholder="Password" />
            <div className='btn-container'>
              <button type="submit" className='user-btn'>Sign in</button>
            </div>
          </form>

          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>

    </React.Fragment>
  );
};

export default LogIn;
