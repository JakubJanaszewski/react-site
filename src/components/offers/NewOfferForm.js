import { useRef } from 'react';

import classes from './NewOfferForm.module.css'
import ShadowElement from '../ui/ShadowElement';

function NewOfferForm(props) {
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const imageInputRef = useRef();
  const yearInputRef = useRef();
  const mileageInputRef = useRef();
  const engineCapacityInputRef = useRef();
  const engineTypeInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredMileage = mileageInputRef.current.value;
    const enteredEngineCapacity = engineCapacityInputRef.current.value;
    const enteredEngineType = engineTypeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const newOfferData = {
      title: enteredTitle,
      price: enteredPrice,
      image: enteredImage,
      year: enteredYear,
      mileage: enteredMileage,
      engineCapacity: enteredEngineCapacity,
      engineType: enteredEngineType,
      description: enteredDescription,
    };

    props.onNewOffer(newOfferData);
    titleInputRef.current.value = '';
    priceInputRef.current.value = '';
    imageInputRef.current.value = '';
    yearInputRef.current.value = '';
    mileageInputRef.current.value = '';
    engineCapacityInputRef.current.value = '';
    engineTypeInputRef.current.value = '';
    descriptionInputRef.current.value = '';
  }

  return (
    <ShadowElement>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title:</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Price [PLN]:</label>
          <input type='text' required id='price' ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Image (URL):</label>
          <input type='text' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='year'>Year:</label>
          <input type='text' required id='year' ref={yearInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='mileage'>Mileage [km]:</label>
          <input type='text' required id='mileage' ref={mileageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='engineCapacity'>Engine capacity [cm3]:</label>
          <input type='text' required id='engineCapacity' ref={engineCapacityInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='engineType'>Engine type:</label>
          <input type='text' required id='engineType' ref={engineTypeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add new offer</button>
        </div>
      </form>
    </ShadowElement>
  );
}

export default NewOfferForm;