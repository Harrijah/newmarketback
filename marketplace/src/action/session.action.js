import axios from "axios";

export const ADDTO_MYCART = 'ADDTO_MYCART';
export const ADD_NUMB = 'ADD_NUMB';
export const DELETE_NUMB = 'DELETE_NUMB';
export const ITEM_QUANT = 'ITEM_QUANT';
export const ADD_COMMAND = 'ADD_COMMAND';
export const GET_COMMAND = 'GET_COMMAND';

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

export const addCommand = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8080/addcommand', data).then((res) => (
            dispatch({ type: ADD_COMMAND, payload: res.data })
        ));
    }
}

export const getCommand = (id) => {
    return (dispatch) => {
        return axios.get('http://localhost:8080/getcommand/' + id).then((res) => (
            dispatch({ type: GET_COMMAND, payload: res.data })
        ));
    }
}


