import { useContext } from 'react';

import classes from '../components/layout/Layout.module.css';
import FavoritesContext from '../context/favorites-context';
import OfferList from '../components/offers/OfferList';

function MyOffers() {
    const favoritesCtx = useContext(FavoritesContext);
  
    if (favoritesCtx.favorites.length === 0) {
        return (
            <div className={classes.offers}>
              <h1>You didn't upload any offer yet.</h1>
            </div>
        );
    } 
    
    return (
      <div className={classes.offers}>
        <h1>My offers</h1>
        <OfferList offers={favoritesCtx.favorites} />
      </div>
    );
  }
  
export default MyOffers;