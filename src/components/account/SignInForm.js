import { useRef } from 'react';

import classes from './Sign.module.css'
import ShadowElement from '../ui/ShadowElement';

function SignInForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail      = emailInputRef.current.value;
    const enteredpassword   = passwordInputRef.current.value;

    const signInData = {
      email: enteredEmail,
      password: enteredpassword,
    };

    props.onSignIn(signInData);
    emailInputRef.current.value     = '';
    passwordInputRef.current.value  = '';
  }

  return (
    <ShadowElement>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>E-mail:</label>
          <input type='text' required id='email' ref={emailInputRef} />
          <label htmlFor='password'>Password:</label>
          <input type='password' required id='password' ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Sign In</button>
        </div>
      </form>
    </ShadowElement>
  );
}

export default SignInForm;