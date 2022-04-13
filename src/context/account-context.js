import { createContext, useState } from 'react';

const AccountContext = createContext({
  isSignedIn: true,
  setSignState: () => {},
  jwtToken: 0,
  setToken: () => {},
});

export function AccountContextProvider(props) {
  const [isSignedIn, setSign] = useState(true);
  const [token, setToken] = useState(0);

  const context = {
    isSignedIn: isSignedIn,
    setSignState: setSign,
    jwtToken: token,
    setToken: setToken,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;