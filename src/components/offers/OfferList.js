import Offer from './Offer';
import classes from './OfferList.module.css';

function OfferList(props) {
   
    return (
        <ul className={classes.list}>
            {props.offers?.map((offer) => (
                <Offer
                key={offer.offerId.toString()}
                offerId={offer.offerId}
                image={offer.image}
                price={offer.price}
                title={offer.title}
                modelYear={offer.modelYear}
                mileage={offer.mileage}
                engineCapacity={offer.engineCapacity}
                EngineTypeName={offer.EngineTypeName}
                description={offer.description}

                edit = {props.edit}
                />
            ))}
        </ul>
    );
}

export default OfferList;