import Offer from './Offer';
import classes from './OfferList.module.css';

function OfferList(props) {
   
    return (
        <ul className={classes.list}>
            {props.offers?.map((offer) => (
                <Offer
                key={offer.id}
                id={offer.offerId}
                image={offer.image}
                price={offer.price}
                title={offer.title}
                year={offer.modelYear}
                mileage={offer.mileage}
                engineCapacity={offer.engineCapacity}
                engineType={offer.EngineTypeName}
                description={offer.description}

                delete = {props.delete}
                />
            ))}
        </ul>
    );
}

export default OfferList;