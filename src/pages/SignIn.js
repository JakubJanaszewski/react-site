import { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import SignInForm from '../components/account/SignInForm';
import classes from '../components/layout/Layout.module.css';
import AccountContext from '../context/account-context';
import FavoritesContext from '../context/favorites-context';
import ErrorMessage from '../components/ui/ErrorMessage';
import UserOffersContext from '../context/offers-context';

function SignIn() {

  const signedContext = useContext(AccountContext);
  const favoritesContext = useContext(FavoritesContext);
  const [dataMatch, changeDataMatch] = useState(true);
  let navigate = useNavigate();

  function cancelHandler() {
    changeDataMatch(true);
  }

  function signInHandler(signInData) {
    console.log('E-mail: ' + signInData.email);
    console.log('Password: ' + signInData.password);

    fetch(
      'https://localhost:8000/users/login',
      {
        method: 'POST',
        body: JSON.stringify(signInData),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => {
      console.log(response);
      console.log(response["status"]);
      if(response["status"] === 200){
        console.log(response["status"]);
        signedContext.setSignState(true);
        signedContext.setToken(response["jwtToken"])

        favoritesContext.getFavoriteFromDatabase();
        UserOffersContext.getUserOfferFromDatabase();
        navigate('/');
      }
      else{
        changeDataMatch(false);
      }
    });
  }

  return (<>
    <div className={classes.sign}>
      <h1>Sign In</h1>
      <SignInForm onSignIn={signInHandler} />
    </div>
    {!dataMatch && <ErrorMessage description = "Wrong data, Try again" button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default SignIn;