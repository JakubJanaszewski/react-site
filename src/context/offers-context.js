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

    function deleteOfferHandler(offerID) {
        fetch(
            'http://localhost:8000/offer',
            {
                method: 'DELETE',
                body: JSON.stringify(offerID),
                headers: {
                    'Authorization': 'Bearer ' + signedContext.jwtToken,
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => {
            if(response["status"] === 200){
                getFavoriteFromDatabaseHandler();
            }
            else{
                console.log("ERROR DURING DELETING OFFER");
            }
        });
    }

    const context = {
        userOffers: userOffers,
        getUserOfferFromDatabase: getFavoriteFromDatabaseHandler,
        deleteOffer: deleteOfferHandler,
    };

    return (
        <UserOffersContext.Provider value={context}>
            {props.children}
        </UserOffersContext.Provider>
    );
}

export default UserOffersContext;