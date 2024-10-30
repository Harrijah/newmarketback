export const ADDTO_MYWHISH = 'ADDTO_MYWHISH';
export const DEL_MYWHISH = 'DEL_MYWHISH';

export const addittowish = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADDTO_MYWHISH, payload: data });
    }
}

export const deletemywish = (data) => {
    return (dispatch) => {
        return dispatch({ type: DEL_MYWHISH, payload: data });
    }
}