import { createContext, useState} from 'react';
import Cookies from 'universal-cookie';


const AccountContext = createContext({
  isSignedIn: false,
  jwtToken: 0,
  email: "",
  name: "",
  signIn:() => {},
  signOut:() => {},
});

export function AccountContextProvider(props) {
  const cookies = new Cookies();

  const [isSigned, setSign] = useState(false);
  const [token, setToken] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [init, setInit] = useState(true);

  if(init){
    setInit(false);
    validate();
  }

  async function validate(){
    const cookieToken = cookies.get('token')
    console.log("token form cookies: " + cookieToken);
    const cookieEmail = cookies.get('email')
    console.log("email form cookies: " + cookieEmail);

    if(cookieToken !== undefined && cookieEmail !== undefined){
      const response = await fetch(
        'http://localhost:8000/users/validate',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookieToken,
          },
        }
      )
      if (response.ok){
        setEmail(cookieEmail);
        setSign(true);
        setToken(cookieToken);
        setNameHandler(cookieEmail);
      }
      else{
        console.log("not valid - log out");
        signOutHandler();
      }
    }   
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
      setEmail(signInData.email)
      setSign(true);
      setToken(json["jwtToken"]);

      cookies.set('token', json["jwtToken"]);
      cookies.set('email', signInData.email);

      setNameHandler(signInData.email);

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
  
  function setNameHandler(givenEmail){
    fetch(
      `http://localhost:8000/users/info/${givenEmail}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => {
      if(response.ok){
        return response.json();
      }
    }).then((json) => {
      setName(json["firstName"]);
    });
  }

  const context = {
    isSignedIn: isSigned,
    jwtToken: token,
    email: email,
    name: name,
    signIn: signInHandler,
    signOut: signOutHandler,
  };

  return (
    <AccountContext.Provider value={context}>
      {props.children}
    </AccountContext.Provider>
  );
}

export default AccountContext;