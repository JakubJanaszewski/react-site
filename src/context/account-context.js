import { createContext, useState, useContext } from 'react';

import FavoritesContext from '../context/favorites-context';
import UserOffersContext from '../context/offers-context';

const AccountContext = createContext({
  isSignedIn: false,
  jwtToken: 0,
  name: "",
  signIn:() => {},
  signOut:() => {},
  setName:() => {},
});

export function AccountContextProvider(props) {
  const favoritesContext = useContext(FavoritesContext);
  const userOffersContext = useContext(UserOffersContext);

  const [isSigned, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [name, setName] = useState("");
  const [init, setInit] = useState(true);

  if(init && document.cookie){
    setInit(false);
    
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token: ')).split(':')[1]
    console.log("token form cookies: " + cookieToken);

    fetch(
      '',
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
      }
      else{
        console.log("Cookie token is out of date.")
        document.cookie = "token: 0; SameSite=None; Secure";
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
      document.cookie = "token: " + json["jwtToken"] + "; SameSite=None; Secure";

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
    document.cookie = "token: 0; SameSite=None; Secure";
  }
  
  function setNameHandler(){
    fetch(
      'http://localhost:8000/users/info',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => {
      if(response["status"] === 200){
        setName(response["name"]);
      }
    });
  }

  const context = {
    isSignedIn: isSigned,
    jwtToken: token,
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