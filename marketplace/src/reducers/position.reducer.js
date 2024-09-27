import { GET_POSITION } from "../action/position.action";

const initialState = { position: '' }


export const positionReducer = (state= initialState, action ) => {
    switch (action.type) {
        case GET_POSITION:
            return {position: String(action.payload)};
        default:
            return state;
    }
}