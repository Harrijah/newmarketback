import { ADD_MARQUE, GET_MARQUE } from "../action/marque.action";

const initialState = { marque: null }

export default function marqueReducer(state = initialState, action){
    switch (action.type) {
        case GET_MARQUE:
            return { marque: action.payload }
        
        case ADD_MARQUE:
            return {marque: action.payload}
        
        default:
            return state;
    }
}