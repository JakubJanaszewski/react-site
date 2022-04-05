import { createContext, useState } from 'react';

const AccountContext = createContext({
  isSignedIn: true,
  setSignState: () => {},
});

export function AccountContextProvider(props) {
  const [isSignedIn, setSign] = useState(true);

  const context = {
    isSignedIn: isSignedIn,
    setSignState: setSign,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;