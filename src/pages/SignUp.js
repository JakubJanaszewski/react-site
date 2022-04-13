import { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import SignUpForm from '../components/account/SignUpForm';
import classes from '../components/layout/Layout.module.css';
import AccountContext from '../context/account-context';
import ErrorMessage from '../components/ui/ErrorMessage';

function SignUp() {

  const signedContext = useContext(AccountContext);
  const [dataMatch, changeDataMatch] = useState(true);
  let navigate = useNavigate();

  function cancelHandler() {
    changeDataMatch(true);
  }

  function signUpHandler(signUpData) {
    console.log('E-mail: ' + signUpData.email);
    console.log('Password: ' + signUpData.password);

    fetch(
      'https://reqbin.com/echo/post/json',
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      console.log(response);
      console.log(response["status"]);
      if(response["status"] === 200){
        console.log(response["status"]);
        signedContext.setSignState(true);
        signedContext.setToken(response["token"])
        navigate('/');
      }
      else{
        changeDataMatch(false);
      }
    });
  }

  return (<>
    <div className={classes.sign}>
      <h1>Sign Up</h1>  
      <SignUpForm onSignUp={signUpHandler} />
    </div>
    {!dataMatch && <ErrorMessage description = "Account with such e-mail already exist. Try with diffrent e-mail." button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default SignUp;