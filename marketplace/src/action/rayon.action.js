import axios from 'axios';

export const ADD_RAYON = 'ADD_RAYON';
export const GET_RAYON = 'GET_RAYON';

export const addRayon = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8080/addrayon', data).then((res) => {
            dispatch({ type: ADD_RAYON, payload: res.data });
        })
    }
}

export const getRayon = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8080/getrayon').then((res) => {
            dispatch({ type: GET_RAYON, payload: res.data });
        });
    }
}