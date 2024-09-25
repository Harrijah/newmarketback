import { combineReducers } from "redux";
import createaccountReducer from "./createaccount.reducer";
import storeReducer from "./store.reducer";
import rayonReducer from "./rayon.reducer";
import categorieReducer from "./categorie.reducer";
import souscatReducer from "./souscat.reducer";
import marqueReducer from "./marque.reducer";
import productReducer from "./produit.reducer";
import showproductReducer from "./showproduct.reducer";


export default combineReducers({
    createaccountReducer,
    storeReducer,
    rayonReducer,
    categorieReducer,
    souscatReducer,
    marqueReducer,
    productReducer,
    showproductReducer,
});