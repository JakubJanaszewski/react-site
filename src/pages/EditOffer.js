import { useState, useContext} from 'react';
import { useParams } from "react-router-dom";

import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';
import ChooseMessage from '../components/ui/ChooseMessage';
import UserOffersContext from '../context/offers-context';

function EditOffer() {
  const userOffersContext = useContext(UserOffersContext);
  const [isDeleteClicked, toggleDeleteState] = useState(false);
  const [message, changeMessage] = useState(0);

  const { offerId } = useParams();

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
      <NewOfferForm onSumbit={updateOfferHandler} edit={1}/>
    </div>
    <div className={classes.actions}>
      <button onClick={() => {toggleDeleteState(true);}}>
        Delete
      </button>
    </div>
    {isDeleteClicked && 
      <ChooseMessage 
          onCancel = { () => {toggleDeleteState(false)}} 
          onConfirm = { () => {userOffersContext.deleteOffer(offerId); toggleDeleteState(false)} } 
          buttonCancel = 'Cancel' 
          buttonConfirm = 'Delete' 
          description = 'Are you sure you want to delete an offer?'>
      </ChooseMessage>
    }   
    {message === -1 && <ErrorMessage description = "Wrong data, Try again." button = "Confirm" onCancel = {cancelHandler}/>}
    {message === 1 && <ErrorMessage description = "Updated an offer." button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default EditOffer;