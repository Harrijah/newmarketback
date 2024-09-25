import { ADD_RAYON, GET_RAYON } from "../action/rayon.action";


const initialState = {rayon: null};

export default function rayonReducer(state = initialState, action) {
    const temprayon = action.payload;
    switch (action.type) {
        case GET_RAYON:
                    
            sessionStorage.setItem('rayon', JSON.stringify(temprayon));
            return {
                rayon: JSON.parse(sessionStorage.getItem('rayon')),
            }
        
        case ADD_RAYON:
            sessionStorage.setItem('rayon', JSON.stringify(temprayon));
            return { rayon: JSON.parse(sessionStorage.getItem('rayon')) }
        
        default:
            return state;
    }
}