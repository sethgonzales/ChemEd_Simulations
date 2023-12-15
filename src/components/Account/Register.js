import React, { useState } from "react";
import { auth, db } from "./../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Account.css'

const Register = () => {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const doSignUp = async (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const school = event.target.school.value;
    const gradeLevel = event.target.gradeLevel.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        userName,
        school,
        gradeLevel,
        email: user.email,
      });

      setSignUpSuccess(`Success! Redirecting you to Sign In`);
      setTimeout(() => {
        navigate('/login'); // Navigate to the login page after a delay
      }, 1500);

    } catch (error) {
      setSignUpSuccess(`There was an error signing up. ${error.message}!`);
    }
  };

  return (
    <React.Fragment>
      <div className='user-acc-container'>
        <div className='user-acc-info'>
          <h1>Register Account</h1>
          {signUpSuccess && <p>{signUpSuccess}</p>}
          <form onSubmit={doSignUp}>
            <input type="text" name="userName" placeholder="User Name" />
            <input type="text" name="school" placeholder="School" />
            <label> Grade Level:
              <input
                type="number"
                name="gradeLevel"
                defaultValue="9"
                min="1"
                max="12"
              />
            </label>
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>}

            <button type="submit" className="user-btn">Sign up</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
