import {useRef} from 'react';
import classes from './OfferSearcher.module.css'
import ShadowElement from '../ui/ShadowElement';

function OfferSearcher(){
    const cityInputRef = useRef();
    const yearInputRef = useRef();
    const milageInputRef = useRef();
    const priceInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredCity = cityInputRef.current.value;
        const enteredYear = yearInputRef.current.value;
        const enteredMilage = milageInputRef.current.value;
        const enteredPrice = priceInputRef.current.value;
    
        const offersData = {
          city: enteredCity,
          year: enteredYear,
          milage: enteredMilage,
          price: enteredPrice
        };
      }

    return (
        <div>
            <form className={classes.container} onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor='city'></label>
                  <input type='text' id='city' ref={cityInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'></label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                
                <div className={classes.actions}>
                  <button>Search</button>
                </div>
            </form>
        </div>
    );
}

export default OfferSearcher;