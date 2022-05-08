import { useState, useContext } from 'react';

import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';
import UserOffersContext from '../context/offers-context';

function NewOffer() {
  const userOffersContext = useContext(UserOffersContext);
  const [message, changeMessage] = useState(0);
  const [init, setInit] = useState(true);

  if(init){
    setInit(false);
    userOffersContext.getUserOfferFromDatabase();
  }

  function cancelHandler() {
    changeMessage(0);
  }

  function newOfferHandler(newOfferData) {  
    const response = userOffersContext.addOffer(newOfferData);
    changeMessage(response);
  }

  return (<>
    <div className={classes.newOffer}>
      <h1>Add new offer</h1>
      <NewOfferForm onNewOffer={newOfferHandler} />
    </div>
    {message === -1 && <ErrorMessage description = "Wrong data, Try again." button = "Confirm" onCancel = {cancelHandler}/>}
    {message === 1 && <ErrorMessage description = "You added new offer." button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default NewOffer;