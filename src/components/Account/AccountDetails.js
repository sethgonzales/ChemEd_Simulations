import React, { useState, useEffect } from "react";
import { auth, db } from "./../../firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Account.css'
import withAuthorization from './withAuthorization';

const AccountDetails = ({ handleAuthChange }) => {
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedUserData = docSnap.data();
          setUserData(fetchedUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
    <div className='user-acc-container'>
      <div className='user-acc-info'>
        <h1>{userData?.userName}</h1>
        <div className='acc-details'>
          <p><b>Email: </b>{userData?.email}</p>
          <p><b>School: </b>{userData?.school}</p>
          <p><b>Grade Level: </b>{userData?.gradeLevel}</p>
        </div>
        <div className='btn-container'>
          <button onClick={handleEditClick} className='user-btn btn-1'>Edit Account</button>
          {signOutSuccess && <p>{signOutSuccess}</p>}
          <button onClick={doSignOut} className='user-btn'>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(AccountDetails); 
