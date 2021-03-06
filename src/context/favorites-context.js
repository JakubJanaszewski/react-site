import { createContext, useState, useContext, useEffect  } from 'react';
import AccountContext from '../context/account-context';

const FavoritesContext = createContext({
  favorites: [],
  getFavoriteFromDatabase: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  itemIsFavorite: () => {}
});

export function FavoritesContextProvider(props) {
  const signedContext = useContext(AccountContext);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => { 
    if(signedContext.isSignedIn){
      getFavoriteFromDatabaseHandler();
    }
    else{
      setUserFavorites([]);
    }
}, [signedContext.isSignedIn])


  function getFavoriteFromDatabaseHandler() {
    fetch(
      `http://localhost:8000/offer/fav`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
        else{
          console.log("ERROR WHILE GETTING FAVORITES LIST")
        }
      }).then((json) => {
        console.log("FAVS:")
        console.log(json)
        setUserFavorites(json)
    });
  }

  function addFavoriteHandler(favoriteOffer) {
    fetch(
      'http://localhost:8000/offer/fav/' + favoriteOffer.offerId,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response.ok){
        setUserFavorites((prevUserOffers) => {
          return prevUserOffers.concat(favoriteOffer);
        });
      }
      else{
        console.log("ERROR WHILE ADDING FAVORITE")
      }
    });
  }

  function removeFavoriteHandler(offerId) {
    fetch(
      'http://localhost:8000/offer/fav/' + offerId,
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + signedContext.jwtToken,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response.ok){
        setUserFavorites(prevUserFavorites => {
          return prevUserFavorites.filter(offer => offer.offerId !== offerId);
        });
      }
      else{
        console.log("ERROR WHILE REMOVING FAVORITE")
      }
    });
  }

  function itemIsFavoriteHandler(offerId) {
    return userFavorites.some(offer => offer.offerId === offerId);
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