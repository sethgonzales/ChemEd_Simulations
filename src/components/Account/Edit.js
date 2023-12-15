import React, { useState, useEffect } from "react";
import { auth, db } from "./../../firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './Account.css'

const Edit = ({ userAuth }) => {
  const [userData, setUserData] = useState(null);
  const [newUserData, setNewUserData] = useState({
    userName: "",
    email: "",
    school: "",
    gradeLevel: "",
  });

  const navigate = useNavigate();

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
            setNewUserData({ ...fetchedUserData });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, newUserData);
      navigate('/account ');
    } catch (error) {
      console.error("Error updating user data:", error.message);
      // Display an error message to the user
    }
  };

  return (
    <div className='user-acc-container'>
      <div className='user-acc-info'>

        {userAuth && userData ? (
          <form onSubmit={handleSubmit}>
            <h1>Edits Account</h1>
            <label>
              Grade:
              <input
                type="text"
                name="userName"
                value={newUserData.userName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              School:
              <input
                type="text"
                name="school"
                value={newUserData.school}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Grade:
              <input
                type="number"
                name="gradeLevel"
                min={1}
                max={12}
                value={newUserData.gradeLevel}
                onChange={handleInputChange}
              />
            </label>
            <div className='btn-container'>
              <button type='submit' className='user-btn'>Update Profile</button>
            </div>
          </form>
        ) : (
          <h2>Please sign in to edit your profile.</h2>
        )}
      </div>
    </div>
  );
};

export default Edit;
