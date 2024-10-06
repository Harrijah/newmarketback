import { GET_BOUTIQUE } from "../action/boutique.action";

const initialState = {produitsboutique: null}


export default function boutiqueReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BOUTIQUE:
            return { produitsboutique: action.payload }
        default:
            return state;
    }
}