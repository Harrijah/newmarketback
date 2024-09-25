import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';

// -------------- Redux ------------------
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { getRayon } from './action/rayon.action';
import { getCategorie } from './action/categorie.action';
import { getsouscat } from './action/souscat.action';
import { getMarque } from './action/marque.action';
import { getallstore, getstoredata } from './action/store.action';
import { getProduct } from './action/produit.action';

// ------------- Session Storage ------------
// sessionStorage.setItem('user', '');
// sessionStorage.setItem('isConnected', false);

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});
store.dispatch(getRayon());
store.dispatch(getCategorie());
store.dispatch(getsouscat());
store.dispatch(getMarque());
store.dispatch(getProduct());
store.dispatch(getallstore());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <App />
    </Provider>
);

