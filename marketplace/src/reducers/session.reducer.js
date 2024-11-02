import { ADD_NUMB, ADDTO_MYCART, DELETE_NUMB, ITEM_QUANT } from "../action/session.action";


const initialState = { panier:  sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : [] };

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
        
        case ADD_NUMB:
            const tempcart = JSON.parse(sessionStorage.getItem('panier'));
            const producttochange = tempcart && tempcart.find((product) => product.productid == action.payload.id);
            const prodind = tempcart && tempcart.indexOf(producttochange);
            const updatedproduct = { productid: action.payload.id, number: action.payload.number };
            tempcart.splice(prodind, 1, updatedproduct);
            sessionStorage.setItem('panier', JSON.stringify(tempcart));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier'))
            }
        
        case ITEM_QUANT:
            const tempcart03 = JSON.parse(sessionStorage.getItem('panier'));
            tempcart03[action.payload.index]['number'] = action.payload.quantity;
            sessionStorage.setItem('panier', JSON.stringify(tempcart03));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier'))
            }
        
        case DELETE_NUMB: 
            const tempcart02 = JSON.parse(sessionStorage.getItem('panier'));
            const producttoremove = tempcart02 && tempcart02.find((product) => product.productid == action.payload);
            const prodind02 = tempcart02 && tempcart02.indexOf(producttoremove);
            tempcart02.splice(prodind02, 1);
            sessionStorage.setItem('panier', JSON.stringify(tempcart02));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier'))
            }
        
        default:
            return state;
    }
}

