import { combineReducers } from "redux";
import stateReducer from "./stateReducer";
import userReducer from "./userReducer";

export default function rootReducer() {
  return combineReducers({ users: userReducer, stateData: stateReducer });
}
