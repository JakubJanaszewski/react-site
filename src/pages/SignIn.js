import SignInForm from '../components/account/SignInForm';
import classes from './SignIn.module.css';

function SignIn() {

  function signInHandler(signInData) {
    console.log('E-mail: ' + signInData.email);
    console.log('Password: ' + signInData.password);
    //TODO chceck if login and password match in database
    signInData.email = '';
  }

  return (
    <section className={classes.layout}>
      <h1>Sign In</h1>
      <SignInForm onSignIn={signInHandler} />
    </section>
  );
}

export default SignIn;