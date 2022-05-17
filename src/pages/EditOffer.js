import { useState, useContext} from 'react';

import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';
import UserOffersContext from '../context/offers-context';

function EditOffer() {
  const userOffersContext = useContext(UserOffersContext);
  const [message, changeMessage] = useState(0);

  function cancelHandler() {
    changeMessage(0);
  }

  function updateOfferHandler(newOfferData) {  
    //TODO IMPLEMENT THIS FUNCTION VVVVV
    userOffersContext.updateOffer(newOfferData)
    .then((data) => {
      changeMessage(data);
    });
  }

  return (<>
    <div className={classes.newOffer}>
      <h1>Update an offer</h1>
      <NewOfferForm onSumbit={updateOfferHandler}/>
    </div>
    {message === -1 && <ErrorMessage description = "Wrong data, Try again." button = "Confirm" onCancel = {cancelHandler}/>}
    {message === 1 && <ErrorMessage description = "Updated an offer." button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default EditOffer;