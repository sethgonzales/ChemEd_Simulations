import React, { useState } from "react";
import { auth, db } from "./../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

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

      setSignUpSuccess(`You've successfully signed up, ${user.email}!`);
    } catch (error) {
      setSignUpSuccess(`There was an error signing up. ${error.message}!`);
    }
  };



  return (
    <React.Fragment>
      <h1>Register for an Account</h1>
      {signUpSuccess && <p>{signUpSuccess}</p>}
      <form onSubmit={doSignUp}>
        <label>
          User Name:
          <input type="text" name="userName" placeholder="User Name" />
        </label>
        <label> Name of your School
          <input type="text" name="school" placeholder="School" />
        </label>
        <label>
          Your Grade Level:
          <input
            type="number"
            name="gradeLevel"
            defaultValue="9"
            min="0"
            max="12"
          />
        </label>
        <label>Email Address:
          <input type="text" name="email" placeholder="Email" />
        </label>
        <label>Password:
          <input type="password" name="password" placeholder="Password" />
        </label>
        <label>Confirm Password:
          <input type="password" name="confirmPassword" placeholder="Confirm Password" />
        </label>
        {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>}

        <button type="submit">Sign up</button>
      </form>

    </React.Fragment>
  );
};

export default Register;
