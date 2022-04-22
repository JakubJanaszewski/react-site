import { createContext, useState } from 'react';

const AccountContext = createContext({
  isSignedIn: false,
  setSignState: () => {},
  jwtToken: 0,
  setToken: () => {},
  name: "",
  setName: () => {},
});

export function AccountContextProvider(props) {
  const [isSignedIn, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [name, setName] = useState("");

  function setNameHandler(){
    fetch(
      'https://localhost:8000/users/info',
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
    isSignedIn: isSignedIn,
    setSignState: setSign,
    jwtToken: token,
    setToken: setToken,
    name: name,
    setName: setNameHandler,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;