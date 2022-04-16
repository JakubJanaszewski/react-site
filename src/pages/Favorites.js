import { useContext } from 'react';

import classes from '../components/layout/Layout.module.css';
import FavoritesContext from '../context/favorites-context';
import OfferList from '../components/offers/OfferList';

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.favorites.length === 0) {
    content = <p>You don't have favorites yet.</p>;
  } else {
    content = <OfferList offers={favoritesCtx.favorites} />;
  }

  return (
    <div className={classes.offers}>
      <h1>Your favorite offers</h1>
      {content}
    </div>
  );
}

export default FavoritesPage;