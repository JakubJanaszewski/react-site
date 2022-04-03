import { useContext } from 'react';

import FavoritesContext from '../context/favorites-context';
import OfferList from '../components/offers/OfferList';

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You don't have favorites yet.</p>;
  } else {
    content = <OfferList offers={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>Your favorite offers</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;