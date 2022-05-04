import { createContext, useState, useContext } from 'react';
import AccountContext from '../context/account-context';

const FavoritesContext = createContext({
  favorites: [],
  getFavoriteFromDatabase: () => {},
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const signedContext = useContext(AccountContext);
  const [userFavorites, setUserFavorites] = useState([]);

  function getFavoriteFromDatabaseHandler() {
    fetch(
      'http://localhost:8000/favorites',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response["status"] === 200){
        console.log(response["favorites"]);
        setUserFavorites(response["favorites"])
      }
      else{
        console.log("ERROR WHILE GETTING FAVORITES LIST")
      }
    });
  }

  function addFavoriteHandler(favoriteOffer) {
    fetch(
      'http://localhost:8000/offer/fav/' + favoriteOffer.offerId,
      {
        method: 'GET', //CHECK IF GET METHOD IS CORRECT (POST IN DOCUMENTATION)
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response["status"] === 200){
        setUserFavorites((prevUserOffers) => {
          return prevUserOffers.concat(favoriteOffer);
        });
      }
      else{
        console.log("ERROR WHILE ADDING FAVORITE")
      }
    });

    // \/ TODO DELETE THIS TEMPORARY CODE \/
    /*setUserFavorites((prevUserOffers) => {
      return prevUserOffers.concat(favoriteOffer);
    });*/
  }

  function removeFavoriteHandler(offerId) {
    fetch(
      'http://localhost:8000/offer/fav/' + offerId,
      {
        method: 'DELETE',
        //body: JSON.stringify({id: offerId}), PROBABLY MUST BE DELETED
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response["status"] === 200){
        setUserFavorites(prevUserFavorites => {
          return prevUserFavorites.filter(offer => offer.id !== offerId);
        });
      }
      else{
        console.log("ERROR WHILE ADDING FAVORITE")
      }
    });

    // \/ TODO DELETE THIS TEMPORARY CODE \/
    /*setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(offer => offer.id !== offerId);
    });*/
  }

  function itemIsFavoriteHandler(offerId) {
    return userFavorites.some(offer => offer.id === offerId);
  }

  const context = {
    favorites: userFavorites,
    getFavoriteFromDatabase: getFavoriteFromDatabaseHandler,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;