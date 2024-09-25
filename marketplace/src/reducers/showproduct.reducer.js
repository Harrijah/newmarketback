import { SHOW_PRODUCTMODAL } from "../action/showproduct.action";

const initialState = {
    producttoshow: null
 }

export default function showproductmodalReducer(state = initialState, action){
    switch (action.type) {
        case SHOW_PRODUCTMODAL:
            return {
                producttoshow: action.payload
             }
        default:
            return state;
    }
}