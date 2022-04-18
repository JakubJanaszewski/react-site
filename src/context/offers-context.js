import { createContext, useState, useContext } from 'react';
import AccountContext from '../context/account-context';

const UserOffersContext = createContext({
    userOffers: [],
    getUserOfferFromDatabase: () => {},
});

export function UserOffersContextProvider(props) {
    const signedContext = useContext(AccountContext);
    const [userOffers, setUserOffers] = useState([]);

    function getFavoriteFromDatabaseHandler() {
        fetch(
            'http://localhost:8000/user/offers',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + signedContext.jwtToken,
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => {
            if(response["status"] === 200){
                setUserOffers(response["offers"])
            }
            else{
                console.log("ERROR WHILE GETTING USER OFFER LIST")
            }
        });
    }

    const context = {
        userOffers: userOffers,
        getUserOfferFromDatabase: getFavoriteFromDatabaseHandler,
    };

    return (
        <UserOffersContext.Provider value={context}>
            {props.children}
        </UserOffersContext.Provider>
    );
}

export default UserOffersContext;