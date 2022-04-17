import {useRef, useState} from 'react';
import classes from './OfferSearcher.module.css'
import layout from '../layout/Layout.module.css';
import OfferList from './OfferList';

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

function OfferSearcher(){
  const [offers, setOffers] = useState([]);
  const [init, changeInit] = useState(true);

  const cityInputRef = useRef();
  const kilometersInputRef = useRef();
  const priceMinInputRef = useRef();
  const priceMaxInputRef = useRef();
  const yearMinInputRef = useRef();
  const yearMaxInputRef = useRef();
  const milageMinInputRef = useRef();
  const milageMaxInputRef = useRef();

  function initSetup(){
    changeInit(false);
    setOffers(OFFER_LIST);

    /*
    const offersData = {
      city: null,
      kilometers: null,
      priceMin: null,
      priceMax: null,
      yearMin: null,
      yearMax: null,
      milageMin: null,
      milageMax: null,
    };

    fetch(
      'https://localhost:8000/offers/get',
      {
        method: 'POST',
        body: JSON.stringify(offersData),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        if(response["status"] === 200){
          setOffers(response["offers"]);
        }
    });*/
  }

  function submitHandler(event) {
    event.preventDefault();
      /*
    const offersData = {
      city: cityInputRef.current.value,
      kilometers: kilometersInputRef.current.value,
      priceMin: priceMinInputRef.current.value,
      priceMax: priceMaxInputRef.current.value,
      yearMin: yearMinInputRef.current.value,
      yearMax: yearMaxInputRef.current.value,
      milageMin: milageMinInputRef.current.value,
      milageMax: milageMaxInputRef.current.value,
    };

    fetch(
      'https://localhost:8000/offers/get',
      {
        method: 'POST',
        body: JSON.stringify(offersData),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        if(response["status"] === 200){
          setOffers(response["offers"]);
        }
    });*/
  }

  return (<>
    <div className={layout.searcher}>
      <form className={classes.container} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='city'>City:</label>
          <input type='text' id='city' ref={cityInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='km'>Range:</label>
          <input type='text' id='km' ref={kilometersInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='priceMin'>Min km:</label>
          <input type='text' id='priceMin' ref={priceMinInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='priceMax'>Max km:</label>
          <input type='text' id='priceMax' ref={priceMaxInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='yearMin'>Min year:</label>
          <input type='text' id='yearMin' ref={yearMinInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='yearMax'>Max year:</label>
          <input type='text' id='yearMax' ref={yearMaxInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='milageMin'>Min milage:</label>
          <input type='text' id='milageMin' ref={milageMinInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='milageMax'>Max milage:</label>
          <input type='text' id='milageMax' ref={milageMaxInputRef} />
       </div>
                
        <div className={classes.actions}>
          <button>Search</button>
        </div>
      </form>
    </div>
    {(init) ? initSetup() : <></>}
    <div className={layout.offers}>
      <OfferList offers={offers} />
    </div>
  </>);
}

export default OfferSearcher;