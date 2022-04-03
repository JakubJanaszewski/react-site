import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import FavoritesPage from './pages/Favorites';
import OfferPage from './pages/Offer';
import Layout from './components/layout/Layout';
import { FavoritesContextProvider } from './context/favorites-context';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <FavoritesContextProvider>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path='/'       element = {<MainPage/>}/>
                    <Route path='/sign-up'      element = {<SignUpPage/>}/>
                    <Route path='/sign-in'      element = {<SignInPage/>}/>
                    <Route path='/favorites'    element = {<FavoritesPage/>}/>
                    <Route path='/offer'        element = {<OfferPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    </FavoritesContextProvider>
);
