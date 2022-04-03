import { useRef, useState } from 'react';

import classes from './Sign.module.css'
import ShadowElement from '../ui/ShadowElement';
import ErrorMessage from '../ui/ErrorMessage';

function SignUpForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordInput2Ref = useRef();
  const [passwordsMatch, changePasswordsMatch] = useState(true);

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail      = emailInputRef.current.value;
    const enteredpassword   = passwordInputRef.current.value;
    const enteredpassword2   = passwordInput2Ref.current.value;

    emailInputRef.current.value     = '';
    passwordInputRef.current.value  = '';
    passwordInput2Ref.current.value  = '';

    const signUpData = {
      email: enteredEmail,
      password: enteredpassword,
    };

    if(enteredpassword === enteredpassword2){
        props.onSignUp(signUpData);
    }
    else{
        changePasswordsMatch(false);
    }
  }

  function cancelHandler() {
    changePasswordsMatch(true);
  }

  return (
    <div>
        <ShadowElement>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
            <label htmlFor='email'>E-mail:</label>
            <input type='text' required id='email' ref={emailInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='password'>Password:</label>
            <input type='password' required id='password' ref={passwordInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='password2'>Comfirm password:</label>
            <input type='password' required id='password2' ref={passwordInput2Ref} />
            </div>
            <div className={classes.actions}>
            <button>Sign In</button>
            </div>
        </form>
        </ShadowElement>
        {!passwordsMatch && <ErrorMessage description = "Passwords doesn't match" button = "Confirm" onCancel = {cancelHandler}/>}
    </div>
  );
}

export default SignUpForm;