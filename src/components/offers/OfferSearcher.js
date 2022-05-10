import React from 'react';
import classes from './OfferSearcher.module.css'
import layout from '../layout/Layout.module.css';
import OfferList from './OfferList';

class OfferSearcher extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      offersData: {
        city: null,
        kilometers: null,
        priceMin: null,
        priceMax: null,
        yearMin: null,
        yearMax: null,
        milageMin: null,
        milageMax: null,
      }
    }

    this.cityRef = React.createRef();
    this.kilometersRef = React.createRef();
    this.priceMinRef = React.createRef();
    this.priceMaxRef = React.createRef();
    this.yearMinRef = React.createRef();
    this.yearMaxRef = React.createRef();
    this.milageMinRef = React.createRef();
    this.milageMaxRef = React.createRef();

    this.submitHandler = this.submitHandler.bind(this);
    this.fetchOffers = this.fetchOffers.bind(this);
    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init();
  }

  init(){
    this.cityRef.current.value = "Worldwide";
    this.kilometersRef.current.value = "No limit";
    this.priceMinRef.current.value = "No limit";
    this.priceMaxRef.current.value = "No limit";
    this.yearMinRef.current.value = "No limit";
    this.yearMaxRef.current.value = "No limit";
    this.milageMinRef.current.value = "No limit";
    this.milageMaxRef.current.value = "No limit";
    this.fetchOffers();
  }

  fetchOffers(){
    console.log("Stany wyszukiwarki");
    console.log(this.state.offersData);

    fetch(
      `http://localhost:8000/offer/list?city=${this.state.offersData.city}&kilometers=${this.state.offersData.kilometers}&priceMin=${this.state.offersData.priceMin}&priceMax=${this.state.offersData.priceMax}&yearMin=${this.state.offersData.yearMin}&yearMax=${this.state.offersData.yearMax}&milageMin=${this.state.offersData.milageMin}&milageMax=${this.state.offersData.milageMax}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then((response) => {
        if(response.ok){
          return response.json();
        }
      }).then((json) => {
        console.log("lista:")
        console.log(json["list"])
        this.setState({offers: json["list"]});
    });
  }


  submitHandler(event) {
    event.preventDefault();
    let newCity = this.cityRef.current.value;
    let newKilometers = this.kilometersRef.current.value;
    let newPriceMin = this.priceMinRef.current.value;
    let newPriceMax = this.priceMaxRef.current.value;
    let newYearMin = this.yearMinRef.current.value;
    let newYearMax = this.yearMaxRef.current.value;
    let newMilageMin = this.milageMinRef.current.value;
    let newMilageMax = this.milageMaxRef.current.value;

    if(this.cityRef.current.value === 'Worldwide'){
      newCity = null;
    }

    if(isNaN(this.kilometersRef.current.value)){
      this.kilometersRef.current.value = "No limit";
      newKilometers = null;
    }

    if(isNaN(this.priceMinRef.current.value)){
      this.priceMinRef.current.value = "No limit";
      newPriceMin = null;
    }

    if(isNaN(this.priceMaxRef.current.value)){
      this.priceMaxRef.current.value = "No limit";
      newPriceMax = null;
    }

    if(isNaN(this.yearMinRef.current.value)){
      this.yearMinRef.current.value = "No limit";
      newYearMin = null;
    }

    if(isNaN(this.yearMaxRef.current.value)){
      this.yearMaxRef.current.value = "No limit";
      newYearMax = null;
    }

    if(isNaN(this.milageMinRef.current.value)){
      this.milageMinRef.current.value = "No limit";
      newMilageMin = null;
    }

    if(isNaN(this.milageMaxRef.current.value)){
      this.milageMaxRef.current.value = "No limit";
      newMilageMax = null;
    }

    this.setState({offersData: 
    {
      city: newCity,
      kilometers: newKilometers,
      priceMin: newPriceMin,
      priceMax: newPriceMax,
      yearMin: newYearMin,
      yearMax: newYearMax,
      milageMin: newMilageMin,
      milageMax: newMilageMax,
    }},
    this.fetchOffers
    );
  }

  render() {
    return (<>
      <div className={layout.searcher}>
        <form className={classes.container} onSubmit={this.submitHandler}>
          <div className={classes.control}>
            <label htmlFor='city'>City:</label>
            <input type='text' id='city' ref={this.cityRef}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor='km'>Range:</label>
            <input type='text' id='km' ref={this.kilometersRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='priceMin'>Min km:</label>
            <input type='text' id='priceMin' ref={this.priceMinRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='priceMax'>Max km:</label>
            <input type='text' id='priceMax' ref={this.priceMaxRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='yearMin'>Min year:</label>
            <input type='text' id='yearMin' ref={this.yearMinRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='yearMax'>Max year:</label>
            <input type='text' id='yearMax' ref={this.yearMaxRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='milageMin'>Min milage:</label>
            <input type='text' id='milageMin' ref={this.milageMinRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='milageMax'>Max milage:</label>
            <input type='text' id='milageMax' ref={this.milageMaxRef} />
         </div>
                  
          <div className={classes.actions}>
            <button>Search</button>
          </div>
        </form>
      </div>
      <div className={layout.offers}>
        <OfferList offers={this.state.offers} delete = '0'/>
      </div>
    </>);
  }
}

export default OfferSearcher;