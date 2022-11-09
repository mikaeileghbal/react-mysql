import { applyMiddleware, createStore } from "redux";
import { apiMiddleware, logMiddleware } from "./middlewares";
import rootReducer from "./rootReducer";

export default createStore(
  rootReducer(),
  applyMiddleware(logMiddleware, apiMiddleware)
);

export {
  loadData,
  addUser,
  updateUser,
  removeUser,
  fetchAll,
  fetchAdd,
  fetchUpdate,
  fetchRemove,
} from "./userActions";
