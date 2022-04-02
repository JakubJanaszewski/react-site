import OfferList from '../components/offers/OfferList';

const OFFER_LIST= [
  {
    id: 'id1',
    title: 'BMW Seria 3 320i',
    image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Imt3MXc3djNhMHR6dTEtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.lydQA9BQN99fSinaqrnflwV3mAGJEXkUhT9IDWpkp8Q/image;s=1080x720',
    price: 20900,
    year: 2005,
    mileage: 168154,
    engineCapacity: 1995,
    engineType: 'Benzyna',
    description: 'Description of this car',
  },
  {
    id: 'id2',
    title: 'MERCEDES-BENZ A Klasa',
    image: 'https://cdn.otomotoklik.pl/static/img/vc/462dcb3b72b9c9083f01432fb1372f1f/exterior-closed_nr_001_original.jpg',
    price: 74999,
    year: 2017,
    mileage: 29100,
    engineCapacity: 2143,
    engineType: 'Diesel',
    description: 'Description of this car',
  },
];

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <OfferList offers={OFFER_LIST} />
    </div>
  );
}
  
export default MainPage;
  