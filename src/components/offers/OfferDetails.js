import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';

import classes from './OfferDetails.module.css';
import ShadowElement from '../ui/ShadowElement'
import FavoritesContext from '../../context/favorites-context';
import AccountContext from '../../context/account-context';

function OfferDetails(props) {
    const accContext = useContext(AccountContext);
    const favoritesCtx = useContext(FavoritesContext);

    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

    let navigate = useNavigate(); 
    function toggleFavoriteStatusHandler() {
        if(!accContext.isSignedIn){
            navigate('/sign-in');
        }
        else{
            if (itemIsFavorite) {
                favoritesCtx.removeFavorite(props.id);
            } 
            else
            {
                favoritesCtx.addFavorite({
                    id: props.id,
                    image: props.image,
                    price: props.price,
                    title: props.title,
                    year: props.year,
                    mileage: props.mileage,
                    engineCapacity: props.engineCapacity,
                    engineType: props.engineType,
                    description: props.description,
                });
            }
        }
    }

    function onViewDetails() {
        navigate('/offer/' + props.id);
    }

    return (
        <ShadowElement>
            <img className={classes.image} src={props.image} alt={props.title} />
        </ShadowElement>
        /*
        <ShadowElement>
                <div className={classes.conteiner}>
                    <div className={classes.image}>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className={classes.description}>
                        <h3>
                            {props.title}
                        </h3>
                        <ul>
                            <li>{props.year}</li>
                            <li>·</li>
                            <li>{props.mileage} km</li>
                            <li>·</li>
                            <li>{props.engineCapacity} cm3</li>
                            <li>·</li>
                            <li>{props.engineType}</li>
                        </ul>
                    </div>
                    <div className={classes.buttons}>
                        <ul>
                            <li>
                                <div className={classes.actions}>
                                    <button onClick={onViewDetails}>
                                        {props.price} PLN
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className={classes.actions}>
                                    <button onClick={toggleFavoriteStatusHandler}>
                                        {itemIsFavorite ? 'Stop observing' : 'Observe'}
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        </ShadowElement>*/
    );
}

export default OfferDetails;