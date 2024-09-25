import { DISCONNECT_USER } from "../action/createaccount.action";
import { CREATE_STORE, GET_ALLSTORE, GET_STOREDATA, UPDATE_STORE } from "../action/store.action";

const initialState = {
    propriomagasin: sessionStorage.getItem('propriomagasin'),
    store: JSON.parse(sessionStorage.getItem('store')),
    allstore: JSON.parse(sessionStorage.getItem('allstore')),
}

export default function storeReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_STORE:
            sessionStorage.setItem('store', JSON.stringify(action.payload));
            sessionStorage.setItem('propriomagasin', true);
            return {
                propriomagasin: sessionStorage.getItem('propriomagasin'),
                store: JSON.parse(sessionStorage.getItem('store')),
            };
        
        case GET_STOREDATA:
            sessionStorage.setItem('store', JSON.stringify(action.payload));
            sessionStorage.setItem('propriomagasin', true);
            return {
                // propriomagasin: sessionStorage.getItem((propriomagasin)),
                store: JSON.parse(sessionStorage.getItem('store')),
                allstore: JSON.parse(sessionStorage.getItem('allstore')),
            }
        case GET_ALLSTORE:
            sessionStorage.setItem('allstore', JSON.stringify(action.payload));
            return ({
                store: JSON.parse(sessionStorage.getItem('store')),
                allstore: JSON.parse(sessionStorage.getItem('allstore')),
            })
            
        case UPDATE_STORE:
            const storetemp = JSON.parse(sessionStorage.getItem('store'));
            storetemp[action.payload.name] = action.payload.input;
            sessionStorage.setItem('store', JSON.stringify(storetemp));

            return ({
                store: JSON.parse(sessionStorage.getItem('store')),
            });
        
        case DISCONNECT_USER:
            sessionStorage.setItem('propriomagasin', false);
            sessionStorage.setItem('store', null);
            return {
                propriomagasin: sessionStorage.getItem('propriomagasin'),
                store: sessionStorage.getItem('store'),
                allstore: JSON.parse(sessionStorage.getItem('allstore')),
            }
        
        default:
            return state;
    }
}