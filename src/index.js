import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { FavoritesContextProvider } from './context/favorites-context';
import { AccountContextProvider } from './context/account-context';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <AccountContextProvider>
        <FavoritesContextProvider>
            <BrowserRouter>
                <Layout>
                    <App/>
                </Layout>
            </BrowserRouter>
        </FavoritesContextProvider>
    </AccountContextProvider>
);
