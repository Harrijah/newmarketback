
export const ADDTO_MYCART = 'ADDTO_MYCART';
export const ADD_NUMB = 'ADD_NUMB';
export const DELETE_NUMB = 'DELETE_NUMB';
export const ITEM_QUANT = 'ITEM_QUANT';

export const addtocart = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADDTO_MYCART, payload: data });
    }
}

export const addnumbtoprod = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADD_NUMB, payload: data });
    }
}

export const setitemquantity = (data) => {
    return (dispatch) => {
        dispatch({ type: ITEM_QUANT, payload: data });
    }
}

export const removeformcart = (id) => {
    return (dispatch) => {
        return dispatch({ type: DELETE_NUMB, payload: id });
    }
}


