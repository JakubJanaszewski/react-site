import classes from './Offer.module.css';
import ShadowElement from '../ui/ShadowElement'

function Offer(props) {
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
                                    <button>
                                        {props.price} PLN
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className={classes.actions}>
                                    <button>
                                        Observe
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