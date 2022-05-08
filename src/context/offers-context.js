import { createContext, useState, useContext} from 'react';
import AccountContext from '../context/account-context';

const UserOffersContext = createContext({
    userOffers: [],
    getUserOfferFromDatabase: () => {},
    addOffer: () => {},
    deleteOffer: () => {},
});

export function UserOffersContextProvider(props) {
    const signedContext = useContext(AccountContext);
    const [userOffers, setUserOffers] = useState([]);

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

    async function addOfferHandler(newOfferData) {

        let result = -1;

        await fetch(
            'http://localhost:8000/offer',
            {
              method: 'POST',
              body: JSON.stringify(newOfferData),
              headers: {
                'Authorization': 'Bearer ' + signedContext.jwtToken,
                'Content-Type': 'application/json',
              },
            }
          ).then((response) => {
            if(response.ok){
                result = 1;
                setUserOffers((prevUserOffers) => {
                    return prevUserOffers.concat(newOfferData);
                });
            }
            else{
                console.log("ERROR DURING ADDING OFFER");
            }
        });

        return result;
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
                setUserOffers(prevUserOffers => {
                    return prevUserOffers.filter(offer => offer.offerId !== offerID);
                });
            }
            else{
                console.log("ERROR DURING DELETING OFFER");
            }
        });
    }

    const context = {
        userOffers: userOffers,
        getUserOfferFromDatabase: getUserOfferFromDatabaseHandler,
        addOffer: addOfferHandler,
        deleteOffer: deleteOfferHandler,
    };

    return (
        <UserOffersContext.Provider value={context}>
            {props.children}
        </UserOffersContext.Provider>
    );
}

export default UserOffersContext;