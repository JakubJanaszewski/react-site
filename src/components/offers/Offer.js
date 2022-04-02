import classes from './Offer.module.css';
import ShadowElement from '../ui/ShadowElement'

function Offer(props) {
    return (
        <ShadowElement>
            <li className={classes.item}>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                    <p>{props.description}</p>
                </div>
                <div className={classes.actions}>
                    <button>
                        Add to favorites
                    </button>
                </div>
            </li>
        </ShadowElement>
    );
}

export default Offer;