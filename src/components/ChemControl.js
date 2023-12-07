// import React, { useState } from "react";
// import { auth } from './../firebase.js';
// import Home from './Home';
// import LogIn from './Account/LogIn';
// import Register from './Account/Register';
// import AccountDetails from './Account/AccountDetails';

// function ChemControl() {
//   const [userAuth, setUserAuth] = useState(false);
//   const [selectedSimulation, setSelectedSimulation] = useState(null);
//   const [logIn, setLogIn] = useState(false);
//   const [registerAccount, setRegisterAccount] = useState(false);
//   const [accountDetails, setAccountDetails] = useState(false);

//   const handleLogIn = () => {
//     setLogIn(true);
//     setRegisterAccount(false);
//     setAccountDetails(false);
//   };

//   const handleRegister = () => {
//     setLogIn(false);
//     setRegisterAccount(true);
//     setAccountDetails(false);
//   };

//   const handleLogOut = () => {
//     setUserAuth(false);
//     setLogIn(false);
//     setRegisterAccount(false);
//     setAccountDetails(false);
//   };

//   const handleShowAccountDetails = () => {
//     setLogIn(false);
//     setRegisterAccount(false);
//     setAccountDetails(true);
//   };

//   const handleReturnHome = () => {
//     setUserAuth(false);
//     setSelectedSimulation(null);
//     setLogIn(false);
//     setRegisterAccount(false);
//     setAccountDetails(false);
//   };

//   let currentVisibleState = null;
//   let homeButtons = null;

//   if (selectedSimulation !== null) {
//     // Logic to render selected simulation
//   } else if (logIn) {
//     currentVisibleState = <LogIn />;
//   } else if (registerAccount) {
//     currentVisibleState = <Register />;
//   } else if (accountDetails) {
//     currentVisibleState = <AccountDetails />;
//   } else {
//     currentVisibleState = <Home />;

//     homeButtons = (
//       <div>
//         <button onClick={userAuth ? handleShowAccountDetails : handleRegister}>
//           {userAuth ? "View Account" : "Register"}
//         </button>
//         <button onClick={handleReturnHome}>Return Home</button>
//       </div>
//     );
//   }

//   return (
//     <React.Fragment>
//       {currentVisibleState}
//       {homeButtons}
//       <div>
//         {userAuth ? (

//           // For authenticated users
//           <React.Fragment>
//             <button onClick={handleShowAccountDetails}>View Account</button>
//             <button onClick={handleLogOut}>Sign Out</button>
//           </React.Fragment>
//         ) : (

//           // For non-authenticated users
//           <React.Fragment>
//             {(logIn || registerAccount) && (
//               <React.Fragment>
//                 <button onClick={handleLogIn}>Sign In</button>
//                 <button onClick={handleRegister}>Register</button>
//               </React.Fragment>
//             )}
//             <button onClick={handleReturnHome}>Return Home</button>
//           </React.Fragment>
//         )}
//       </div>
//     </React.Fragment>
//   );
// }

// export default ChemControl;
