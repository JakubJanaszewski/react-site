import {useRef} from 'react';
import classes from '../account/Sign.module.css'
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
            <ShadowElement>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor='city'>City:</label>
                  <input type='text' id='city' ref={cityInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='year'>Year:</label>
                  <input type='text' id='year' ref={yearInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='milage'>Milage:</label>
                  <input type='text' id='milage' ref={milageInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='price'>Price:</label>
                  <input type='text' id='price' ref={priceInputRef} />
                </div>
                <div className={classes.actions}>
                  <button>Search</button>
                </div>
            </form>
            </ShadowElement>
        </div>
    );
}

export default OfferSearcher;