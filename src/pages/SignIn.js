import SignInForm from '../components/account/SignInForm';
import classes from '../components/layout/Layout.module.css';

function SignIn() {

  function signInHandler(signInData) {
    console.log('E-mail: ' + signInData.email);
    console.log('Password: ' + signInData.password);
    //TODO chceck if login and password match in database
  }

  return (
    <div className={classes.sign}>
      <h1>Sign In</h1>
      <SignInForm onSignIn={signInHandler} />
    </div>
  );
}

export default SignIn;