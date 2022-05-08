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
    const [init, setInit] = useState(true);


    if(init){
        setInit(false);
        console.log("init offers context");
        
        if(signedContext.isSignedIn){
            console.log("fav is signed in");
            getUserOfferFromDatabaseHandler();
        }
    }

    function getUserOfferFromDatabaseHandler() {

        console.log("GETTING OFFERS FROM DATABES FUNCTION")

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
                return response.json();
            }
            else{
                console.log("ERROR WHILE GETTING USER OFFER LIST")
            }
        }).then((json) => {
            setUserOffers(json["list"])
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