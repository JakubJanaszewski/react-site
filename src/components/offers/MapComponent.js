import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  console.log(status)
  if (status === Status.FAILURE) return "FAILURE";
  return status;
};

function MapComponent(props){
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
      <MyMapComponent lat = {props.lat} lng = {props.lng}/>
    </Wrapper>
  );
};

const MyMapComponent = (props) => {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: {lat: props.lat, lng: props.lng},
    zoom: 12,
  });

  new window.google.maps.Marker({
    position: {lat: props.lat, lng: props.lng},
    map: map,
  });
};

export default MapComponent;