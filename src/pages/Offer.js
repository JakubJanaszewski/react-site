import { useParams } from "react-router-dom";
import OfferDetails from '../components/offers/OfferDetails';
import MapComponent from '../components/offers/MapComponent';

function OfferPage() {
    const OFFER= 
    {
        id: 'id1',
        title: 'BMW Seria 3 320i',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Imt3MXc3djNhMHR6dTEtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.lydQA9BQN99fSinaqrnflwV3mAGJEXkUhT9IDWpkp8Q/image;s=1080x720',
        price: 20900,
        year: 2005,
        mileage: 168154,
        engineCapacity: 1995,
        engineType: 'Benzyna',
        description: 'Description of this car asdgifghsdfhgsdfghksdf sdfsdjkhlfsd jksdfsdjkgsdjlg jksd sdfgjsdgjsddfnmasd qw3fws sfddgqwweg sdfsadfghjagj sdsdg',
    };

    let { id } = useParams();
    return (<>
        <div>
            <h1>Offer of id: {id}</h1>
            <OfferDetails key={OFFER.id}
                id={OFFER.id}
                image={OFFER.image}
                price={OFFER.price}
                title={OFFER.title}
                year={OFFER.year}
                mileage={OFFER.mileage}
                engineCapacity={OFFER.engineCapacity}
                engineType={OFFER.engineType}
                description={OFFER.description}/>
        </div>
        <div><MapComponent/></div>
        <div style={{ height: "200px" }} id="map"></div>
    </>);
  }
  
  export default OfferPage;

  
  