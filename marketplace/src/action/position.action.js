export const GET_POSITION = 'GET_POSITION';


export const modalposition = (pos) => {
    return (dispatch) => {
        return dispatch({ type: GET_POSITION, payload: pos });
    }
}