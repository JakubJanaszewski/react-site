import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { AccountContextProvider } from './context/account-context';
import { UserOffersContextProvider } from './context/offers-context';
import { FavoritesContextProvider } from './context/favorites-context';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
        <AccountContextProvider>
            <UserOffersContextProvider>
                <FavoritesContextProvider>
                    <Layout>
                        <App/>
                    </Layout>
                </FavoritesContextProvider>
            </UserOffersContextProvider>
        </AccountContextProvider>
    </BrowserRouter>
);
