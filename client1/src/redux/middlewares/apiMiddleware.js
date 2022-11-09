import { API } from "../actionType";
import { setLoading } from "../stateActions";

const BASE_URL = "http://localhost:3500";

const apiMiddleware =
  ({ state, dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== API) return next(action);

    const { payload } = action;

    const config = {
      method: payload.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (payload.method === "POST" || payload.method === "PUT") {
      config.body = JSON.stringify(payload.body);
    }

    dispatch(setLoading(true));

    fetch(BASE_URL + payload.url, config)
      .then((response) => {
        dispatch(setLoading(false));
        return response.json();
      })
      .then((result) => {
        return dispatch({
          type: payload.success,
          payload: { users: result.data },
        });
      });
  };

export default apiMiddleware;
