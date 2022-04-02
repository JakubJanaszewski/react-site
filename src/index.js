import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import MainPage from './pages/MainPage';
import SingUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import FavoritesPage from './pages/Favorites';
import OfferPage from './pages/Offer';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path='/'       element = {<MainPage/>}/>
            <Route path='/sing-up'      element = {<SingUpPage/>}/>
            <Route path='/log-in'       element = {<LogInPage/>}/>
            <Route path='/favorites'    element = {<FavoritesPage/>}/>
            <Route path='/offer'        element = {<OfferPage/>}/>
        </Routes>
    </BrowserRouter>
);
