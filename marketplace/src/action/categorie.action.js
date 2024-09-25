import axios from "axios";
export const GET_CATEGORIE = 'GET_CATEGORIE';
export const ADD_CATEGORIE = 'ADD_CATEGORIE';


export const getCategorie = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8080/getcategorie').then((res) => {
            dispatch({ type: GET_CATEGORIE, payload: res.data });
        });
    }
}
 
export const addCategorie = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:8080/addcategorie', data).then((res) => {
            dispatch({ type: ADD_CATEGORIE, payload: res.data });
         });
    }
}

