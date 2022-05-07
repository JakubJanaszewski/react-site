import { useState } from "react";
import { useParams } from "react-router-dom";
import OfferDetails from '../components/offers/OfferDetails';
import MapComponent from '../components/offers/MapComponent';
import ErrorMessage from '../components/ui/ErrorMessage';
import classes from "../components/offers/MapComponent.module.css"

function OfferPage() {
    let offerData = {
        pfferId: 'id1',
        title: 'BMW Seria 3 320i',
        image: 'https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?s=612x612',
        price: 20900,
        modelYear: 2005,
        mileage: 168154,
        engineCapacity: 1995,
        EngineTypeName: 'Benzyna',
        description: 'Description of this car.',
        lat: 52.237049,
        lng: 21.017532,
    };

    let accountData = {
        firstName: 'name',
        lastName: 'last name',
        phoneNumber: '123 456 789',
    };

    const { offerId } = useParams();

    //TODO: REPLACE WHEN CONECTION WITH DATABASE WILL BE DONE
    //const [loading, setLoading] = useState(0);
    const [loading, setLoading] = useState(1);

    function showOfferHandler() {    
        fetch(
            `http://localhost:8000/offer/${offerId}`,
            //'http://localhost:8000/offer/2',
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }
        ).then((response) => {
            if(!response.ok){
                setLoading(-1);
            }
            return response.json()
        })
        .then(json =>  {
            for(var key in json) {
                offerData[key] = json[key];
            }

            fetch(
                'http://localhost:8000/users/info/' + offerData["userEmail"],
                {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                }.then((response) => {
                    if(!response.ok){
                        setLoading(-1);
                    }
                    return response.json()
                }).then(json =>  {
                    for(var key in json) {
                        accountData[key] = json[key];
                    }
                    setLoading(0);
                })
            )
        });
    }

    return (<>
        {loading === 1 && showOfferHandler()}
        {loading === 0 &&  <> 
        <div>
            <OfferDetails key={offerData.offerId}
                offerId={offerData.offerId}
                image={offerData.image}
                price={offerData.price}
                title={offerData.title}
                modelYear={offerData.modelYear}
                mileage={offerData.mileage}
                engineCapacity={offerData.engineCapacity}
                EngineTypeName={offerData.EngineTypeName}
                description={offerData.description}
                firstName = {accountData.firstName}
                lastName = {accountData.lastName}
                phone = {accountData.phoneNumber}/>
        </div>
        <div><MapComponent lat = {offerData.lat} lng = {offerData.lng}/></div>
        <div className={classes.map} id="map"></div> </>}
        {loading === -1 && <ErrorMessage description = "Error while getting offer details." button = "Confirm" onCancel = {() => {setLoading(1);}} />}
    </>);
  }
  
  export default OfferPage;
  