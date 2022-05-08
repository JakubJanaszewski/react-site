import { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';

import SignInForm from '../components/account/SignInForm';
import classes from '../components/layout/Layout.module.css';
import AccountContext from '../context/account-context';
import FavoritesContext from '../context/favorites-context';
import UserOffersContext from '../context/offers-context';
import ErrorMessage from '../components/ui/ErrorMessage';


function SignIn() {
  const accountContext = useContext(AccountContext);
  const favoritesContext = useContext(FavoritesContext);
  const offerContexts = useContext(UserOffersContext);
  const [dataMatch, changeDataMatch] = useState(true);

  let navigate = useNavigate();

  function cancelHandler() {
    changeDataMatch(true);
  }

  async function signInHandler(signInData) {
    const isSigned = await accountContext.signIn(signInData)
    if(isSigned){
      favoritesContext.getFavoriteFromDatabase();
      offerContexts.getFavoriteFromDatabase();
      navigate('/');
    }
    else{
      changeDataMatch(false);
    }
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