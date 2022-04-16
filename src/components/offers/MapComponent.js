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
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
  return null;
};

export default MapComponent;