import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { useContext } from 'react';

import './index.css';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import FavoritesPage from './pages/Favorites';
import OfferPage from './pages/Offer';
import UserOffers from './pages/UserOffers';
import NewOfferPage from './pages/NewOffer';
import AccountContext from './context/account-context';
import EditOffer from './pages/EditOffer';
import HelpPage from './pages/Help';

function App() {
    const accContext = useContext(AccountContext);

    return (
        <Routes>
            <Route exact path='/' element = {<MainPage/>}/>
            <Route path='/sign-up' element = {<SignUpPage/>}/>
            <Route path='/sign-in' element = {<SignInPage/>}/>
            <Route path='/help' element = {<HelpPage/>}/>
            <Route path='/offer/:offerId' element = {<OfferPage/>}/>
            <Route path='/favorites' element = {(accContext.isSignedIn) ? <FavoritesPage/> : <Navigate to='/'/>}/>
            <Route path='/new-offer' element = {(accContext.isSignedIn) ? <NewOfferPage/> : <Navigate to='/'/>}/>
            <Route path='/my-offers' element = {(accContext.isSignedIn) ? <UserOffers/> : <Navigate to='/'/>}/>
            <Route path='/edit/:offerId' element = {(accContext.isSignedIn) ? <EditOffer/> : <Navigate to='/'/>}/>
        </Routes>
    );
  }
  
  export default App;