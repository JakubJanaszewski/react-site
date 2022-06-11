import OfferSearcher from '../components/offers/OfferSearcher';
import Chat from '../components/websocket/Chat';


function MainPage() {
  return (<>
    <div>
      <Chat></Chat>
      <OfferSearcher/>
    </div>
  </>);
}
  
export default MainPage;
  