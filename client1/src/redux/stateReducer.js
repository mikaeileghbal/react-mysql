import {
  END_EDITIN,
  SET_LOADING,
  START_CREATING,
  START_EDITING,
} from "./actionType";
import getInitialData from "./initialData";

export default function stateReducer(state, action) {
  switch (action.type) {
    case START_CREATING:
    case START_EDITING:
      console.log("action in reducer: ", action);
      return {
        ...state,
        editing: true,
        selectedId: action.type === START_EDITING ? action.payload.id : -1,
        selectedUser: action.type === START_EDITING ? action.payload.user : {},
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case END_EDITIN:
      return {
        ...state,
        editing: false,
        selecteId: -1,
        selectedUser: {},
      };

    default:
      return state || getInitialData().stateData;
  }
}
