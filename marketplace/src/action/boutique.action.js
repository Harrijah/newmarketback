export const GET_BOUTIQUE = 'GET_BOUTIQUE';






export const getboutique = (id) => {
    return (dispatch) => {
        return dispatch({ type: GET_BOUTIQUE, payload: id });
    }
}