import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
<BrowserRouter>
    <Routes>
        <Route exact path='/'       element = "mainPage"/>
        <Route path='/sing-up'      element = "singUpPage"/>
        <Route path='/log-in'       element = "logInPage"/>
        <Route path='/favorites'    element = "FavoritesPage"/>
        <Route path='/offer'        element = "OfferPage"/>
    </Routes>
</BrowserRouter>
);
