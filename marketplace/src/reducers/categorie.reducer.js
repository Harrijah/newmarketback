import { ADD_CATEGORIE, GET_CATEGORIE } from "../action/categorie.action"

const initialState = {
    categorie: JSON.parse(sessionStorage.getItem('categorie'))
}

export default function categorieReducer (state = initialState, action){
    switch (action.type) {
        case GET_CATEGORIE:
            sessionStorage.setItem('categorie', JSON.stringify(action.payload));
            return { categorie: JSON.parse(sessionStorage.getItem('categorie')) }
        
        case ADD_CATEGORIE:
            sessionStorage.setItem('categorie', JSON.stringify(action.payload));
            return { categorie: JSON.parse(sessionStorage.getItem('categorie')) }
        
        default:
            return state;
    }
}