import axios from "axios";

export const ADD_SOUSCAT = 'ADD_SOUSCAT';
export const GET_SOUSCAT = 'GET_SOUSCAT';


export const addsouscat = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8080/addsouscat', data).then((res) => {
            dispatch({ type: ADD_SOUSCAT, payload: res.data });
        });
    }
}

export const getsouscat = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8080/getsouscat').then((res) => {
            dispatch({ type: GET_SOUSCAT, payload: res.data });
        });
    }
}