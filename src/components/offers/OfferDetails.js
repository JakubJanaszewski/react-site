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

    function onViewLocalization() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    return (<>
        <div className={classes.conteiner}>
            <ShadowElement>
                <img className={classes.image} src={props.image} alt={props.title} />
            </ShadowElement>
            <ShadowElement>
                <h3 className={classes.title}>{props.title}</h3>
                <div className={classes.attributes}>
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
                    <button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? 'Stop observing' : 'Observe'}</button>
                    <button onClick={onViewLocalization}>View localization</button>
                </div>
                <div className={classes.account}>
                    <ul>
                        <li>{props.firstName}</li>
                        <li>{props.lastName}</li>
                        <li>{props.phone}</li>
                    </ul>
                </div>
                <div className={classes.description}>
                    {props.description}
                </div>
            </ShadowElement>
        </div>
    </>);
}

export default OfferDetails;