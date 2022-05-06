import { createContext, useState, useContext } from 'react';

import FavoritesContext from '../context/favorites-context';
import UserOffersContext from '../context/offers-context';

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

  const [isSigned, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [init, setInit] = useState(true);

  if(init && document.cookie){
    setInit(false);
    
    const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token: ')).split(':')[1]
    console.log("token form cookies: " + cookieToken);

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
      }
      else{
        console.log("Cookie token is out of date.")
        document.cookie = `token: 0; email: 0; SameSite=None; Secure`;
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

      document.cookie = `token: ${json["jwtToken"]}; email: ${signInData.email}; SameSite=None; Secure`;

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
    document.cookie = `token: 0; email: 0; SameSite=None; Secure`;
  }
  
  function setNameHandler(){
    fetch(
      `http://localhost:8000/users/info/${email}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
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