import { ADD_COMMAND, ADD_NUMB, ADDTO_MYCART, DELETE_NUMB, GET_COMMAND, GET_STATUS, ITEM_QUANT } from "../action/session.action";


const initialState = {
    panier: sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : [],
    commandes: sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [],
    status: sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : []
    
 };

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
            const tempcart05 = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcart05));
            const tempstatus = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus));
            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')), 
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus'))
            };
        
        case ADD_NUMB:
            const tempcart = JSON.parse(sessionStorage.getItem('panier'));
            const producttochange = tempcart && tempcart.find((product) => product.productid == action.payload.id);
            const prodind = tempcart && tempcart.indexOf(producttochange);
            const updatedproduct = { productid: action.payload.id, number: action.payload.number };
            tempcart.splice(prodind, 1, updatedproduct);
            sessionStorage.setItem('panier', JSON.stringify(tempcart));
            const tempstatus02 = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus02));
            
            const tempcart06 = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcart06));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus')),
            }
        
        case ITEM_QUANT:
            const tempcart03 = JSON.parse(sessionStorage.getItem('panier'));
            tempcart03[action.payload.index]['number'] = action.payload.quantity;
            sessionStorage.setItem('panier', JSON.stringify(tempcart03));
            const tempcart07 = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcart07));
            const tempstatus03 = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus03));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus')),
            }
        
        case DELETE_NUMB: 
            const tempcart02 = JSON.parse(sessionStorage.getItem('panier'));
            const producttoremove = tempcart02 && tempcart02.find((product) => product.productid == action.payload);
            const prodind02 = tempcart02 && tempcart02.indexOf(producttoremove);
            tempcart02.splice(prodind02, 1);
            sessionStorage.setItem('panier', JSON.stringify(tempcart02));
            const tempcart08 = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcart08));
            const tempstatus04 = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus04));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus')),
            }
        
        case ADD_COMMAND:
            sessionStorage.setItem('panier', []);
            const tempcart09 = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcart09));
            const tempstatus05 = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus05));
            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandesstatus: JSON.parse(sessionStorage.getItem('commandesstatus')),
            }
        
        
        case GET_COMMAND:
            const tempcart04 = sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : [];
            sessionStorage.setItem('panier', JSON.stringify(tempcart04));
            sessionStorage.setItem('commandes', JSON.stringify(action.payload));
            const tempstatus06 = sessionStorage.getItem('commandstatus') ? JSON.parse(sessionStorage.getItem('commandstatus')) : [];
            sessionStorage.setItem('commandstatus', JSON.stringify(tempstatus06));
            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus')),
            }
        case GET_STATUS:
            const tempcart10 = sessionStorage.getItem('panier') ? JSON.parse(sessionStorage.getItem('panier')) : [];
            sessionStorage.setItem('panier', JSON.stringify(tempcart10));
            const tempcommand = sessionStorage.getItem('commandes') ? JSON.parse(sessionStorage.getItem('commandes')) : [];
            sessionStorage.setItem('commandes', JSON.stringify(tempcommand));

            sessionStorage.setItem('commandstatus', JSON.stringify(action.payload));

            return {
                panier: JSON.parse(sessionStorage.getItem('panier')),
                commandes: JSON.parse(sessionStorage.getItem('commandes')),
                commandstatus: JSON.parse(sessionStorage.getItem('commandstatus')),
            }
        
        default:
            return state;
    }
}

