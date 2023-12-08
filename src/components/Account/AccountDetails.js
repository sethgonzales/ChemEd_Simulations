import React, { useState, useEffect } from "react";
import { auth, db } from "./../../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AccountDetails = ({ userAuth, handleAuthChange }) => {
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedUserData = docSnap.data();
            setUserData(fetchedUserData);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleEditClick = () => {
    navigate('/edit');
  };

  const doSignOut = () => {
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You have successfully signed out!");
        handleAuthChange(false);
        navigate('/');
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  };

  return (
    <React.Fragment>
      {!loading && (userAuth && userData ? (
        <React.Fragment>
          <h1>Account for {userData.userName}</h1>
          <p>Email: {userData.email}</p>
          <p>School: {userData.school}</p>
          <p>Grade Level: {userData.gradeLevel}</p>

          <button onClick={handleEditClick}>Edit Account</button>
          {signOutSuccess && <p>{signOutSuccess}</p>}
          <button onClick={doSignOut}>Sign out</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>Oops, looks like you are not signed in!</h1>
          <button className="user-btn" onClick={handleLogInClick}>Sign In</button>
          <button className="user-btn" onClick={handleRegisterClick}>Register</button>
        </React.Fragment>
      ))}
      {loading && <p>Loading...</p>}
    </React.Fragment>
  );
};



export default AccountDetails;
