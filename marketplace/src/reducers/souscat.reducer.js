import { ADD_SOUSCAT, GET_SOUSCAT } from "../action/souscat.action"

const initialState = { souscat: null }


export default function souscatReducer(state = initialState, action){
    switch (action.type) {
        case ADD_SOUSCAT:
            return { souscat: action.payload }
        
        case GET_SOUSCAT:
            return { souscat: action.payload }
        
        default:
            return state;
    }
}