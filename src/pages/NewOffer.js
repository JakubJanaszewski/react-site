import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';

function NewOffer() {

  function newOfferHandler(newOfferData) {
    console.log('Title: ' + newOfferData.title);
    console.log('Price: ' + newOfferData.prcie);
  }

  return (
    <div className={classes.sign}>
      <h1>Add new offer</h1>
      <NewOfferForm onNewOffer={newOfferHandler} />
    </div>
  );
}

export default NewOffer;