import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import classes from './Offer.module.css';
import ShadowElement from '../ui/ShadowElement'
import FavoritesContext from '../../context/favorites-context';
import AccountContext from '../../context/account-context';
import UserOffersContext from '../../context/offers-context';
import ChooseMessage from '../ui/ChooseMessage';


function Offer(props) {

    const accContext = useContext(AccountContext);
    const favoritesCtx = useContext(FavoritesContext);
    const userOffersContext = useContext(UserOffersContext);

    const itemIsFavorite = favoritesCtx.itemIsFavorite(props.offerId);

    const [ isDeleteClicked, toggleDeleteState] = useState(false);

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

    return (<>
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
                            {props.delete === '1' &&
                            <li>
                                <div className={classes.actions}>
                                    <button onClick={() => {toggleDeleteState(true);}}>
                                        Delete
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
        {isDeleteClicked && 
        <ChooseMessage 
            onCancel = { () => {toggleDeleteState(false)}} 
            onConfirm = { () => {userOffersContext.deleteOffer(props.offerId); toggleDeleteState(false)} } 
            buttonCancel = 'Cancel' 
            buttonConfirm = 'Delete' 
            description = 'Are you sure you want to delete an offer?'>
        </ChooseMessage>}
    </>);
}


export default Offer;