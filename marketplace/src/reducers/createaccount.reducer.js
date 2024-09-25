import {
  CREATE_USER, CONNEXION_STATUS, DISCONNECT_USER, UPDATE_USER
} from "../action/createaccount.action";

const initialState = {
  isConnected: sessionStorage.getItem("isConnected"),
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : "",
};

export default function createaccountReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;

    case CONNEXION_STATUS:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      sessionStorage.setItem("isConnected", true);
      return {
        isConnected: sessionStorage.getItem("isConnected"),
        user: JSON.parse(sessionStorage.getItem("user")),
      };

    case DISCONNECT_USER:
      // sessionStorage.clear();
      sessionStorage.setItem('user', '');
      sessionStorage.setItem('propriomagasin', null);
      sessionStorage.setItem('isConnected', '');
      return {
        user: "",
        isConnected: '',

      };

    case UPDATE_USER:
      const usertemp = JSON.parse(sessionStorage.getItem("user"));
      usertemp[action.payload.name] = action.payload.input;
      sessionStorage.setItem("user", JSON.stringify(usertemp));
      return { 
          isConnected: sessionStorage.getItem("isConnected"),
          user: JSON.parse(sessionStorage.getItem("user"))
      };

    default:
      return state;
  }
}
