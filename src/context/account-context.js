import { createContext, useState, useContext } from 'react';

import FavoritesContext from '../context/favorites-context';
import UserOffersContext from '../context/offers-context';
import Cookies from 'universal-cookie';


const AccountContext = createContext({
  isSignedIn: false,
  jwtToken: 0,
  email: "",
  name: "",
  signIn:() => {},
  signOut:() => {},
  setName:() => {},
});

export function AccountContextProvider(props) {
  const favoritesContext = useContext(FavoritesContext);
  const userOffersContext = useContext(UserOffersContext);
  const cookies = new Cookies();

  const [isSigned, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [init, setInit] = useState(true);

  if(init && cookies.get('token') !== undefined){
    setInit(false);

    const cookieToken = cookies.get('token')
    console.log("token form cookies: " + cookieToken);
    const cookieEmail = cookies.get('email')
    console.log("email form cookies: " + cookieEmail);


    fetch(
      'http://localhost:8000/users/validate',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookieToken,
        },
      }
    ).then((response) => {
      console.log(response)
      if(response.ok){
        setSign(true);
        setToken(cookieToken);
        setEmail(cookieEmail);
      }
      else{
        signOutHandler();
      }
    });    
  }
  
  async function signInHandler(signInData) {
    let ans = false;
    await fetch(
      'http://localhost:8000/users/login',
      {
        method: 'POST',
        body: JSON.stringify(signInData),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Response not ok.');
    })
    .then((json) => {
      setSign(true);
      setToken(json["jwtToken"]);
      setEmail(signInData.email)

      cookies.set('token', json["jwtToken"]);
      cookies.set('email', signInData.email);

      favoritesContext.getFavoriteFromDatabase();
      userOffersContext.getUserOfferFromDatabase();

      ans = true;
    })
    .catch((error) => {
      console.log(error);
    });

    return ans;
  }

  function signOutHandler(){
    setSign(false);
    setToken(0);
    setEmail("");

    cookies.set('token', 0);
    cookies.set('email', "");
  }
  
  function setNameHandler(){
    fetch(
      `http://localhost:8000/users/info?email=${email}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    ).then((response) => {
      if(response.ok){
        setName(response["firstName"]);
      }
    });
  }

  const context = {
    isSignedIn: isSigned,
    jwtToken: token,
    email: email,
    name: name,
    signIn: signInHandler,
    signOut: signOutHandler,
    setName: setNameHandler,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;