import { useState } from "react";
import { useParams } from "react-router-dom";
import OfferDetails from '../components/offers/OfferDetails';
import MapComponent from '../components/offers/MapComponent';
import ErrorMessage from '../components/ui/ErrorMessage';
import classes from "../components/offers/MapComponent.module.css"

function OfferPage() {
    let offerData = {
        id: 'id1',
        title: 'BMW Seria 3 320i',
        image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Imt3MXc3djNhMHR6dTEtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.lydQA9BQN99fSinaqrnflwV3mAGJEXkUhT9IDWpkp8Q/image;s=1080x720',
        price: 20900,
        year: 2005,
        mileage: 168154,
        engineCapacity: 1995,
        engineType: 'Benzyna',
        description: 'Description of this car.',
        lat: 52.237049,
        lng: 21.017532,
    };

    let accountData = {
        firstName: 'name',
        lastName: 'last name',
        phone: '123 456 789',
    };

    const { offerId } = useParams();
    console.log(offerId);

    //TODO: REPLACE WHEN CONECTION WITH DATABASE WILL BE DONE
    const [loading, setLoading] = useState(1);
    //const [loading, setLoading] = useState(1);

    function showOfferHandler() {    
        fetch(
            'https://localhost:8000/offer/?id=2',
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }
        ).then((response) => {
            if(response["status"] === 200){
                offerData = response["offer"];
                fetch(
                    'https://localhost:8000/users/?id=' + response["offer"]["email"],
                    {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                    }
                ).then((responseAcc) => {
                    if(responseAcc["status"] === 200){
                        accountData = responseAcc["account"]; 
                        setLoading(0);
                    }
                    else{
                        setLoading(-1);
                    }
                });
            }
            else{
                setLoading(-1);
            }
        });       
    }

    return (<>
        {loading === 1 && showOfferHandler()}
        {loading === 0 &&  <> 
        <div>
            <OfferDetails key={offerData.id}
                id={offerData.id}
                image={offerData.image}
                price={offerData.price}
                title={offerData.title}
                year={offerData.year}
                mileage={offerData.mileage}
                engineCapacity={offerData.engineCapacity}
                engineType={offerData.engineType}
                description={offerData.description}
                firstName = {accountData.firstName}
                lastName = {accountData.lastName}
                phone = {accountData.phone}/>
        </div>
        <div><MapComponent lat = {offerData.lat} lng = {offerData.lng}/></div>
        <div className={classes.map} id="map"></div> </>}
        {loading === -1 && <ErrorMessage description = "Error while getting offer details." button = "Confirm" onCancel = {() => {setLoading(1);}} />}
    </>);
  }
  
  export default OfferPage;
  