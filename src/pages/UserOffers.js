import { useContext } from 'react';

import classes from '../components/layout/Layout.module.css';
import UserOffersContext from '../context/offers-context';
import OfferList from '../components/offers/OfferList';

function UserOffers() {
    const userOffersContext = useContext(UserOffersContext);
  
    if (userOffersContext.userOffers.length === 0) {
        return (
            <div className={classes.offers}>
                <h1>You didn't upload any offer yet.</h1>
            </div>
        );
    } 

    return (
        <div className={classes.offers}>
            <h1>My offers</h1>
            <OfferList offers={userOffersContext.userOffers} />
        </div>
    );
}
  
export default UserOffers;