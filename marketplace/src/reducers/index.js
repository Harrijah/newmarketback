import { combineReducers } from "redux";
import createaccountReducer from "./createaccount.reducer";
import storeReducer from "./store.reducer";
import rayonReducer from "./rayon.reducer";
import categorieReducer from "./categorie.reducer";
import souscatReducer from "./souscat.reducer";
import marqueReducer from "./marque.reducer";
import productReducer from "./produit.reducer";
import showproductReducer from "./showproduct.reducer";
import { positionReducer } from "./position.reducer";
import boutiqueReducer from "./boutique.reducer";
import sessionReducer from "./session.reducer";
import mywishlist from "./wishlist.reducer";


export default combineReducers({
    createaccountReducer,
    storeReducer,
    rayonReducer,
    categorieReducer,
    souscatReducer,
    marqueReducer,
    productReducer,
    showproductReducer,
    positionReducer,
    boutiqueReducer,
    sessionReducer,
    mywishlist,
});