import { CONNEXION_STATUS } from "../action/connexion.action";

const initialState = {isConnected : false}

export default function connexionReducer(state = initialState, action){
    switch (action.type) {
        case CONNEXION_STATUS:
            return { isConnected: action.payload }
        default:
            return state;
    }
}