
export const ADDTO_MYCART = 'ADDTO_MYCART';


export const addtocart = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADDTO_MYCART, payload: data });
    }
}