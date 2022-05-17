import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import classes from './Offer.module.css';
import ShadowElement from '../ui/ShadowElement'
import FavoritesContext from '../../context/favorites-context';
import AccountContext from '../../context/account-context';

function Offer(props) {
    const accContext = useContext(AccountContext);
    const favoritesCtx = useContext(FavoritesContext);

    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.offerId);

    let navigate = useNavigate(); 
    function toggleFavoriteStatusHandler() {
        if(!accContext.isSignedIn){
            navigate('/sign-in');
        }
        else{
            if (itemIsFavorite) {
                favoritesCtx.removeFavorite(props.offerId);
            } 
            else
            {
                favoritesCtx.addFavorite({
                    offerId: props.offerId,
                    image: props.image,
                    price: props.price,
                    title: props.title,
                    modelYear: props.modelYear,
                    mileage: props.mileage,
                    engineCapacity: props.engineCapacity,
                    EngineTypeName: props.EngineTypeName,
                    description: props.description,
                });
            }
        }
    }

    function onViewDetails() {
        navigate('/offer/' + props.offerId);
    }

    function onEdit() {
        navigate('/edit/' + props.offerId);
    }

    return (
        <ShadowElement>
            <li className={classes.item}>
                <div className={classes.conteiner}>
                    <div className={classes.image}>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className={classes.description}>
                        <h3>
                            {props.title}
                        </h3>
                        <ul>
                            <li>{props.modelYear}</li>
                            <li>·</li>
                            <li>{props.mileage} km</li>
                            <li>·</li>
                            <li>{props.engineCapacity} cm3</li>
                            <li>·</li>
                            <li>{props.EngineTypeName}</li>
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
                            {props.edit === '1' &&
                            <li>
                                <div className={classes.actions}>
                                    <button onClick={onEdit}>
                                        Edit
                                    </button>
                                </div>
                            </li>}
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
            </li>
        </ShadowElement>
    );
}


export default Offer;