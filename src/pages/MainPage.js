import OfferSearcher from '../components/offers/OfferSearcher';
import ChooseMessage from '../components/ui/ChooseMessage';

function MainPage() {
  return (<>
    <div>
      <OfferSearcher/>
      <ChooseMessage onCancel = { () => {}} onConfirm = { () => {} } buttonCancel = 'cancel' buttonConfirm ='delete' description ='description'/>
    </div>
  </>);
}
  
export default MainPage;
  