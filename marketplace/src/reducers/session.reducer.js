import { ADDTO_MYCART } from "../action/session.action";


const initialState = { panier:  sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : '' };

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case ADDTO_MYCART:
            if (sessionStorage.getItem('panier')) {
                const tempcart = JSON.parse(sessionStorage.getItem('panier'));
                tempcart.push(action.payload);
                sessionStorage.setItem('panier', JSON.stringify(tempcart));
            } else {
                sessionStorage.setItem('panier', JSON.stringify([action.payload]));
            }
            return {
                panier: JSON.parse(sessionStorage.getItem('panier'))
            };
        
        default:
            return state;
    }
}