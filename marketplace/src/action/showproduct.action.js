export const SHOW_PRODUCTMODAL = 'SHOW_PRODUCTMODAL';

export const showMyproduct = (id) => {
    return (dispatch) => {
        return dispatch({ type: SHOW_PRODUCTMODAL, payload: id });
    }
}