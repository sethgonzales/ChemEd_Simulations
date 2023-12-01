import { db, auth } from './../firebase.js';

function ChemControl() {

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the simulations.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    return (console.log('success'));
  }
}
export default ChemControl;