import SignUpForm from '../components/account/SignUpForm';
import classes from '../components/layout/Layout.module.css';

function SignUp() {

  function signUpHandler(signUpData) {
    console.log('E-mail: ' + signUpData.email);
    console.log('Password: ' + signUpData.password);
    //TODO chceck if account with this e-mail is in database
    //and if isnt make new account
  }

  return (
    <div className={classes.sign}>
      <h1>Sign Up</h1>  
      <SignUpForm onSignUp={signUpHandler} />
    </div>
  );
}

export default SignUp;