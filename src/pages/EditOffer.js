import { useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";

import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';
import ErrorMessage from '../components/ui/ErrorMessage';
import UserOffersContext from '../context/offers-context';

function EditOffer() {
  const userOffersContext = useContext(UserOffersContext);
  const [message, changeMessage] = useState(0);
  const [defaultValues, changeDefaultValues] = useState({});
  const { offerId } = useParams();

  useEffect(() => { 
    fetch(
      `http://localhost:8000/offer/${offerId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
        else{
          console.log("ERROR WHILE GETTING FAVORITES LIST")
        }
      }).then((json) => {
        console.log("Dane ofery w celu aktualizacji:")
        console.log(json)
        changeDefaultValues(json)
    });
  }, [offerId])

  function cancelHandler() {
    changeMessage(0);
  }

  function updateOfferHandler(newOfferData) {  
    userOffersContext.updateOffer(offerId, newOfferData)
    .then((data) => {
      changeMessage(data);
    });
  }

  return (<>
    <div className={classes.newOffer}>
      <h1>Update an offer</h1>
      <NewOfferForm onSumbit={updateOfferHandler} defaultValues={true}
      title={defaultValues.title} price={defaultValues.price} image={defaultValues.image} 
      year={defaultValues.modelYear} mileage={defaultValues.mileage}
      engineCapacity={defaultValues.engineCapacity} engineType={defaultValues.EngineTypeName}
      description={defaultValues.description} country={defaultValues.CountryName}
      city={defaultValues.city} street={defaultValues.street}/>
    </div>
    {message === -1 && <ErrorMessage description = "Wrong data, Try again." button = "Confirm" onCancel = {cancelHandler}/>}
    {message === 1 && <ErrorMessage description = "Updated an offer." button = "Confirm" onCancel = {cancelHandler}/>}
  </>);
}

export default EditOffer;