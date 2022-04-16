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
      'http://localhost:8000/favorites/get',
      {
        method: 'POST',
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
    setUserFavorites((prevUserOffers) => {
      return prevUserOffers.concat(favoriteOffer);
    });
  }

  function removeFavoriteHandler(offerId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(offer => offer.id !== offerId);
    });
  }

  function itemIsFavoriteHandler(offerId) {
    return userFavorites.some(offer => offer.id === offerId);
  }

  const context = {
    favorites: userFavorites,
    getFavoriteFromDatabase:   getFavoriteFromDatabaseHandler,
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