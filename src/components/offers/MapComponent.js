import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  console.log(status)
  if (status === Status.FAILURE) return "FAILURE";
  return "LOADING";
};

const MapComponent = () => (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
    <MyMapComponent />
  </Wrapper>
);


const MyMapComponent = () => {
  new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.237049, lng: 21.017532 },
    zoom: 12
  });
};

export default MapComponent;