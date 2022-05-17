import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { AccountContextProvider } from './context/account-context';
import { UserOffersContextProvider } from './context/offers-context';
import { FavoritesContextProvider } from './context/favorites-context';
import { UtilityContextProvider } from './context/utility-context';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
        <AccountContextProvider>
            <UserOffersContextProvider>
                <FavoritesContextProvider>
                    <UtilityContextProvider>
                        <Layout>
                            <App/>
                        </Layout>
                    </UtilityContextProvider>
                </FavoritesContextProvider>
            </UserOffersContextProvider>
        </AccountContextProvider>
    </BrowserRouter>
);
