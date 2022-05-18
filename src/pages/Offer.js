import { useState } from "react";
import { useParams } from "react-router-dom";
import OfferDetails from '../components/offers/OfferDetails';
import MapComponent from '../components/offers/MapComponent';
import ErrorMessage from '../components/ui/ErrorMessage';
import classes from "../components/offers/MapComponent.module.css"

function OfferPage() {

    const [ offerData, setOfferData ] = useState({});
    const [ accountData, setAccountData ] = useState({});

    const { offerId } = useParams();

    //TODO: REPLACE WHEN CONECTION WITH DATABASE WILL BE DONE
    //const [loading, setLoading] = useState(0);
    const [loading, setLoading] = useState(1);

    async function showOfferHandler() {  
        
        const responseOfferData = await fetch(
            `http://localhost:8000/offer/${offerId}`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }
        )

        if(responseOfferData.ok){
            const jsonOfferData = await responseOfferData.json();

            setOfferData(jsonOfferData);

            const responseUserData = await fetch(
                'http://localhost:8000/users/info/' + jsonOfferData["UserEmail"],
                {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                }
            )
            
            if(responseUserData.ok){
                const jsonUserData = await responseUserData.json();

                setAccountData(jsonUserData);

                setLoading(0);
            }
            else{
                console.log("Error while gettin user data")
                setLoading(-1);
            }
        }
        else{
            console.log("Error while gettin offer data")
            setLoading(-1);
        }

        return true;
    }

    return (<>
        {loading === 1 && showOfferHandler() === true}
        {loading === 0 &&  <> 
        <div>
            <OfferDetails key={offerData.offerId}
                id={offerData.offerId}
                image={offerData.image}
                price={offerData.price}
                title={offerData.title}
                year={offerData.modelYear}
                mileage={offerData.mileage}
                engineCapacity={offerData.engineCapacity}
                engineType={offerData.EngineTypeName}
                description={offerData.description}
                firstName = {accountData.firstName}
                lastName = {accountData.lastName}
                phone = {accountData.phoneNumber}/>
        </div>
        <div><MapComponent lat = {parseFloat(offerData.latiture)} lng = {parseFloat(offerData.longitude)}/></div>
        <div className={classes.map} id="map"></div> </>}
        {loading === -1 && <ErrorMessage description = "Error while getting offer details." button = "Confirm" onCancel = {() => {setLoading(1);}} />}
    </>);
  }
  
  export default OfferPage;
  