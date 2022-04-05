import NewOfferForm from '../components/offers/NewOfferForm';
import classes from '../components/layout/Layout.module.css';

function NewOffer() {

  function newOfferHandler(newOfferData) {
    console.log('Title: ' + newOfferData.title);
    console.log('Price: ' + newOfferData.price);
  }

  return (
    <div className={classes.newOffer}>
      <h1>Add new offer</h1>
      <NewOfferForm onNewOffer={newOfferHandler} />
    </div>
  );
}

export default NewOffer;