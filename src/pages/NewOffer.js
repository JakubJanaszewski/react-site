import { useState, useContext } from 'react';

import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';
import UserOffersContext from '../context/offers-context';


function NewOffer() {
  const userOffersContext = useContext(UserOffersContext);
  const [message, changeMessage] = useState(0);

  function cancelHandler() {
    changeMessage(0);
  }

  function newOfferHandler(newOfferData) {
    fetch(
      'https://localhost:8000/offers',
      {
        method: 'POST',
        body: JSON.stringify(newOfferData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if(response["status"] === 200){
        changeMessage(1);
        userOffersContext.getUserOfferFromDatabase();
      }
      else{
        changeMessage(-1);
      }
    });
  }

  return (<>
    <div className={classes.newOffer}>
      <h1>Add new offer</h1>
      <NewOfferForm onNewOffer={newOfferHandler} />
    </div>
    {message === -1 && <ErrorMessage description = "Wrong data, Try again" button = "Confirm" onCancel = {cancelHandler}/>}
    {message === 1 && <ErrorMessage description = "You added new offer" button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default NewOffer;