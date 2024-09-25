import { ADD_PRODUCT, DEL_PRODUCT, GET_ONEPRODUCT, GET_PRODUCT, MOD_PRODUCT } from "../action/produit.action";


const initialState = {
    products: sessionStorage.getItem('products'),
    myproduct: sessionStorage.getItem('myproduct'),
    // products: null,
    // myproduct: null
}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case ADD_PRODUCT:
            sessionStorage.setItem('products', JSON.stringify(action.payload));
            return {
                products: JSON.parse(sessionStorage.getItem('products'))
            };
        case MOD_PRODUCT:
            sessionStorage.setItem('products', JSON.stringify(action.payload));
            return {
                products: JSON.parse(sessionStorage.getItem('products'))
            };
        
        case GET_PRODUCT:           
            sessionStorage.setItem('products', JSON.stringify(action.payload));
            return {
                products: JSON.parse(sessionStorage.getItem('products')),
                myproduct: JSON.parse(sessionStorage.getItem('myproduct'))
            }
        case GET_ONEPRODUCT:
            sessionStorage.setItem('myproduct', JSON.stringify(action.payload));
            
            return {
                products: JSON.parse(sessionStorage.getItem('products')),
                myproduct: JSON.parse(sessionStorage.getItem('myproduct'))
            }
        case DEL_PRODUCT:
            const tempproducts02 = JSON.stringify(action.payload);
            sessionStorage.setItem('products', tempproducts02);
            return {
                products: JSON.parse(sessionStorage.getItem('products'))
            }
        default:
            return state;
    }
}
