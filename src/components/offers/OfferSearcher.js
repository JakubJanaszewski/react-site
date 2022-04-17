import {useEffect, useRef, useState} from 'react';
import classes from './OfferSearcher.module.css'

function OfferSearcher(){
    const cityInputRef = useRef();
    const kilometersInputRef = useRef();
    const priceMinInputRef = useRef();
    const priceMaxInputRef = useRef();
    const yearMinInputRef = useRef();
    const yearMaxInputRef = useRef();
    const milageMinInputRef = useRef();
    const milageMaxInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredCity = cityInputRef.current.value;
        const enteredKilometers = kilometersInputRef.current.value;
        const enteredPriceMin = priceMinInputRef.current.value;
        const enteredPriceMax = priceMaxInputRef.current.value;
        const enteredYearMin = yearMinInputRef.current.value;
        const enteredYearMax = yearMaxInputRef.current.value;
        const enteredMilageMin = milageMinInputRef.current.value;
        const enteredMilageMax = milageMaxInputRef.current.value;
    
        const offersData = {
          city: enteredCity,
          kilometers: enteredKilometers,
          priceMin: enteredPriceMin,
          priceMax: enteredPriceMax,
          yearMin: enteredYearMin,
          yearMax: enteredYearMax,
          milageMin: enteredMilageMin,
          milageMax: enteredMilageMax,
        };
      }

    return (
        <div>
            <form className={classes.container} onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor='city'>City:</label>
                  <input type='text' id='city' ref={cityInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='km'>Range:</label>
                  <input type='text' id='km' ref={kilometersInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='priceMin'>Min km:</label>
                  <input type='text' id='priceMin' ref={priceMinInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='priceMax'>Max km:</label>
                  <input type='text' id='priceMax' ref={priceMaxInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='yearMin'>Min year:</label>
                  <input type='text' id='yearMin' ref={yearMinInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='yearMax'>Max year:</label>
                  <input type='text' id='yearMax' ref={yearMaxInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='milageMin'>Min milage:</label>
                  <input type='text' id='milageMin' ref={milageMinInputRef} />
                </div>
                <div className={classes.control}>
                  <label htmlFor='milageMax'>Max milage</label>
                  <input type='text' id='milageMax' ref={milageMaxInputRef} />
                </div>
                
                <div className={classes.actions}>
                  <button>Search</button>
                </div>
            </form>
        </div>
    );
}

export default OfferSearcher;