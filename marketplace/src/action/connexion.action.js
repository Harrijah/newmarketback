export const CONNEXION_STATUS = 'CONNEXION_STATUS';

export const connectUser = (data) => {
    return (dispatch) => {
        return dispatch({type : CONNEXION_STATUS, payload: data})
    }
}