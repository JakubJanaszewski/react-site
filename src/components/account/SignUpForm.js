import { useRef, useState } from 'react';

import classes from './Sign.module.css'
import ShadowElement from '../ui/ShadowElement';
import ErrorMessage from '../ui/ErrorMessage';

function SignUpForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordInput2Ref = useRef();
  const [passwordsMatch, changePasswordsMatch] = useState(true);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const dateOfBirthInputRef = useRef();
  const streetInputRef = useRef();
  const zipCodeInputRef = useRef();
  const cityInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail      = emailInputRef.current.value;
    const enteredpassword   = passwordInputRef.current.value;
    const enteredpassword2   = passwordInput2Ref.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredDateOfBirth = dateOfBirthInputRef.current.value;
    const enteredStreetInput = streetInputRef.current.value;
    const enteredZipCode = zipCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    emailInputRef.current.value     = '';
    passwordInputRef.current.value  = '';
    passwordInput2Ref.current.value  = '';
    firstNameInputRef.current.value = '';
    lastNameInputRef.current.value = '';
    dateOfBirthInputRef.current.value = '';
    streetInputRef.current.value = '';
    zipCodeInputRef.current.value = '';
    cityInputRef.current.value = '';
    descriptionInputRef.current.value = '';

    const signUpData = {
      email: enteredEmail,
      password: enteredpassword,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      dateOfBirth: enteredDateOfBirth,
      adressString: enteredStreetInput,
      zipCode: enteredZipCode,
      location: enteredCity,
      description: enteredDescription
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
            <div className={classes.control}>
              <label htmlFor='firstName'>First name:</label>
              <input type='text' required id='firstName' ref={firstNameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='lastName'>Last name:</label>
              <input type='text' required id='lastName' ref={lastNameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='dateOfBirth'>Date of birth:</label>
              <input type='text' required id='dateOfBirth' ref={dateOfBirthInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='city'>City:</label>
              <input type='text' required id='city' ref={cityInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='street'>Street:</label>
              <input type='text' required id='street' ref={streetInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='zipCode'>Zip code:</label>
              <input type='text' required id='zipCode' ref={zipCodeInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                rows='5'
                ref={descriptionInputRef}
              ></textarea>
            </div>
            <div className={classes.actions}>
              <button>Sign Up</button>
            </div>
        </form>
        </ShadowElement>
        {!passwordsMatch && <ErrorMessage description = "Passwords doesn't match" button = "Confirm" onCancel = {cancelHandler}/>}
    </div>
  );
}

export default SignUpForm;