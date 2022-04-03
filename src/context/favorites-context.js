import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  //TODO add favorites from database after user login

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
    totalFavorites: userFavorites.length,
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