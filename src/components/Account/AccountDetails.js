import React, { useState, useEffect } from "react";
import { auth, db } from "./../../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Account.css'

const AccountDetails = ({ userAuth, handleAuthChange }) => {
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log('Is authenticated:', userAuth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedUserData = docSnap.data();
            console.log("Fetched User Data:", fetchedUserData); // Log fetched user data
            setUserData(fetchedUserData);
          } else {
            console.log("User data does not exist"); // Log if user data doesn't exist
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error); // Log any errors
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
      {loading && <p>Loading...</p>}
      {!loading && !userAuth && (
        <React.Fragment>
          <h1>Oops, looks like you are not signed in!</h1>
          <button className="user-btn btn-1" onClick={handleLogInClick}>Sign In</button>
          <button className="user-btn" onClick={handleRegisterClick}>Register</button>
        </React.Fragment>
      )}
      {!loading && userAuth && userData && (
        <div className='user-acc-container'>
          <div className='user-acc-info'>
            <h1>{userData.userName}</h1>
            <div className='acc-details'>
              <p><b>Email: </b>{userData.email}</p>
              <p><b>School: </b>{userData.school}</p>
              <p><b>Grade Level: </b>{userData.gradeLevel}</p>
            </div>
            <div className='btn-container'>
              <button onClick={handleEditClick} className='user-btn btn-1'>Edit Account</button>
              {signOutSuccess && <p>{signOutSuccess}</p>}
              <button onClick={doSignOut} className='user-btn'>Sign out</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AccountDetails;
