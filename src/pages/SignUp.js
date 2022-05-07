import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import SignUpForm from '../components/account/SignUpForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';

function SignUp() {
  const [registrationStaus, setRegistrationStatus] = useState(0);
  let navigate = useNavigate();

  function signUpHandler(signUpData) {

    fetch(
      'http://localhost:8000/users/register',
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response.ok){
        setRegistrationStatus(1);
      }
      else{
        setRegistrationStatus(-1);
      }
    });
  }

  return (<>
    <div className={classes.sign}>
      <h1>Sign Up</h1>  
      <SignUpForm onSignUp={signUpHandler} />
    </div>
    {registrationStaus === 1 && <ErrorMessage description = "You just registered, congratulations!" button = "Confirm" onCancel = {() => {setRegistrationStatus(0); navigate('/sign-in');}}/>}
    {registrationStaus === -1 && <ErrorMessage description = "Error ocurred during registration. Try again." button = "Confirm" onCancel = {() => {setRegistrationStatus(0);}}/>}
  </>);
}

export default SignUp;