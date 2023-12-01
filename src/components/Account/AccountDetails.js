import { signOut } from "firebase/auth";

const ViewAccount = () => {
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  
  const doSignOut = () => {
  
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You have successfully signed out!");
      }).catch((error) => {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }  
  
  return (
    <React.Fragment>
      <h1>Account for User.Name</h1>
     
      <h1>Sign Out</h1>
      {signOutSuccess}
      <button onClick={doSignOut}>Sign out</button>
      
      {/* <button onClick={}>Return Home</button>  */}
    </React.Fragment>
  );
}

export default SignIn;