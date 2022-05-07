import { createContext, useState, useContext } from 'react';
import AccountContext from '../context/account-context';

const UserOffersContext = createContext({
    userOffers: [],
    getUserOfferFromDatabase: () => {},
    deleteOffer: () => {},
});

export function UserOffersContextProvider(props) {
    const signedContext = useContext(AccountContext);
    const [userOffers, setUserOffers] = useState([]);

    function getUserOfferFromDatabaseHandler() {
        fetch(
            `http://localhost:8000/offer/list?user=${signedContext.email}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + signedContext.jwtToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        ).then((response) => {
            if(response.ok){
                setUserOffers(response["offers"])
            }
            else{
                console.log("ERROR WHILE GETTING USER OFFER LIST")
            }
        });
    }

    function deleteOfferHandler(offerID) {
        fetch(
            `http://localhost:8000/offer/${offerID}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + signedContext.jwtToken,
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => {
            if(response.ok){
                getUserOfferFromDatabaseHandler();
            }
            else{
                console.log("ERROR DURING DELETING OFFER");
            }
        });
    }

    const context = {
        userOffers: userOffers,
        getUserOfferFromDatabase: getUserOfferFromDatabaseHandler,
        deleteOffer: deleteOfferHandler,
    };

    return (
        <UserOffersContext.Provider value={context}>
            {props.children}
        </UserOffersContext.Provider>
    );
}

export default UserOffersContext;