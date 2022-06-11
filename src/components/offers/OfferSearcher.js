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
        mileageMin: null,
        mileageMax: null,
      }
    }

    this.cityRef = React.createRef();
    this.kilometersRef = React.createRef();
    this.priceMinRef = React.createRef();
    this.priceMaxRef = React.createRef();
    this.yearMinRef = React.createRef();
    this.yearMaxRef = React.createRef();
    this.mileageMinRef = React.createRef();
    this.mileageMaxRef = React.createRef();

    this.submitHandler = this.submitHandler.bind(this);
    this.fetchOffers = this.fetchOffers.bind(this);
    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init();
  }

  init(){
    this.fetchOffers();
  }

  fetchOffers(){
    fetch(
      `http://localhost:8000/offer/list?city=${this.state.offersData.city}&kilometers=${this.state.offersData.kilometers}&priceMin=${this.state.offersData.priceMin}&priceMax=${this.state.offersData.priceMax}&yearMin=${this.state.offersData.yearMin}&yearMax=${this.state.offersData.yearMax}&mileageMin=${this.state.offersData.mileageMin}&mileageMax=${this.state.offersData.mileageMax}`,
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
        this.setState({offers: json["list"]});
    });
  }


  submitHandler(event) {
    event.preventDefault();
    let newCity = null;
    let newKilometers = null;
    let newPriceMin = null;
    let newPriceMax = null;
    let newYearMin = null;
    let newYearMax = null;
    let newMileageMin = null;
    let newMileageMax = null;

    if(this.cityRef.current.value !== ''){
      newCity = this.cityRef.current.value;
    }

    if(typeof this.kilometersRef.current.value == 'number'){
      newKilometers = this.kilometersRef.current.value;
    }

    if(typeof this.priceMinRef.current.value== 'number'){
      newPriceMin = this.priceMinRef.current.value;
    }

    if(typeof this.priceMaxRef.current.value == 'number'){
      newPriceMax = this.priceMaxRef.current.value;
    }

    if(typeof this.yearMinRef.current.value == 'number'){
      newYearMin = this.yearMinRef.current.value;
    }

    if(typeof this.yearMaxRef.current.value == 'number'){
      newYearMax = this.yearMaxRef.current.value;
    }

    if(typeof this.mileageMinRef.current.value == 'number'){
      newMileageMin = this.mileageMinRef.current.value;
    }

    if(typeof this.mileageMaxRef.current.value == 'number'){
      newMileageMax = this.mileageMaxRef.current.value;
    }

    this.setState({offersData: 
    {
      city: newCity,
      kilometers: newKilometers,
      priceMin: newPriceMin,
      priceMax: newPriceMax,
      yearMin: newYearMin,
      yearMax: newYearMax,
      mileageMin: newMileageMin,
      mileageMax: newMileageMax,
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
            <input type='text' id='city' ref={this.cityRef} placeholder="Worldwide"></input>
          </div>
          <div className={classes.control}>
            <label htmlFor='km'>Range:</label>
            <input type='text' id='km' ref={this.kilometersRef} placeholder="No limit"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='priceMin'>Min PLN:</label>
            <input type='text' id='priceMin' ref={this.priceMinRef} placeholder="Worldwide"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='priceMax'>Max PLN:</label>
            <input type='text' id='priceMax' ref={this.priceMaxRef} placeholder="Worldwide"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='yearMin'>Min year:</label>
            <input type='text' id='yearMin' ref={this.yearMinRef} placeholder="Worldwide"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='yearMax'>Max year:</label>
            <input type='text' id='yearMax' ref={this.yearMaxRef} placeholder="Worldwide"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='mileageMin'>Min KM:</label>
            <input type='text' id='mileageMin' ref={this.mileageMinRef} placeholder="Worldwide"/>
          </div>
          <div className={classes.control}>
            <label htmlFor='mileageMax'>Max KM:</label>
            <input type='text' id='mileageMax' ref={this.mileageMaxRef} placeholder="Worldwide"/>
         </div>
                  
          <div className={classes.actions}>
            <button>Search</button>
          </div>
        </form>
      </div>
      <div className={layout.offers}>
        <OfferList offers={this.state.offers} edit={false}/>
      </div>
    </>);
  }
}

export default OfferSearcher;