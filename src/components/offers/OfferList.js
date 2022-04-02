import Offer from './Offer';
import classes from './OfferList.module.css';

function OfferList(props) {
    return (
        <ul className={classes.list}>
            {props.offers.map((offer) => (
                <Offer
                key={offer.id}
                id={offer.id}
                image={offer.image}
                price={offer.price}
                title={offer.title}
                year={offer.year}
                mileage={offer.mileage}
                engineCapacity={offer.engineCapacity}
                engineType={offer.engineType}
                description={offer.description}
                />
            ))}
        </ul>
    );
}

export default OfferList;