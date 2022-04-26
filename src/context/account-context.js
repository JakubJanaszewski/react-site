import { createContext, useState, useContext } from 'react';

import FavoritesContext from '../context/favorites-context';
import UserOffersContext from '../context/offers-context';

const AccountContext = createContext({
  isSignedIn: false,
  jwtToken: 0,
  name: "",
  signIn:() => {},
  setName:() => {},
});

export function AccountContextProvider(props) {
  const favoritesContext = useContext(FavoritesContext);
  const userOffersContext = useContext(UserOffersContext);

  const [isSigned, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [name, setName] = useState("");
  const [init, setInit] = useState(true);

  if(init){
    console.log(document.cookie);
    setInit(false);
  }
  
  function signInHandler(signInData) {
    fetch(
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
      document.cookie = "token: " + token;

      favoritesContext.getFavoriteFromDatabase();
      userOffersContext.getUserOfferFromDatabase();
    })
    .catch((error) => {
      console.log(error);
    });

    return isSigned;
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
    setName: setNameHandler,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;