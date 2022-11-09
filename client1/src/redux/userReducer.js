import {
  ADD_USER,
  FETCH_SUCCESS,
  LOAD_DATA,
  REMOVE_USER,
  UPDATE_USER,
} from "./actionType";
import getInitialData from "./initialData";

export default function userReducer(state, action) {
  switch (action.type) {
    case LOAD_DATA:
      return action.payload.users || state;

    case ADD_USER:
      return state.concat(action.payload.user);

    case UPDATE_USER:
      return state.filter((user) =>
        user.id === action.payload.id ? action.payload.user : user
      );

    case REMOVE_USER:
      return state.filter((user) => user.id !== action.payload.id);

    case FETCH_SUCCESS:
      console.log("Fetch succeded");
      return state;

    default:
      return state || getInitialData().modelData.users;
  }
}
