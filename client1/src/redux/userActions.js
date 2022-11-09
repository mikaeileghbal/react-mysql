import {
  ADD_USER,
  API,
  FETCH_SUCCESS,
  LOAD_DATA,
  REMOVE_USER,
  UPDATE_USER,
} from "./actionType";

export function loadData(data) {
  return {
    type: LOAD_DATA,
    payload: {
      users: data,
    },
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: {
      user: user,
    },
  };
}

export function updateUser(id, user) {
  return {
    type: UPDATE_USER,
    payload: {
      id: id,
      user: user,
    },
  };
}

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    payload: {
      id: id,
    },
  };
}

// api actions
export function fetchAll() {
  return {
    type: API,
    payload: {
      method: "GET",
      url: "/user",
      success: LOAD_DATA,
    },
  };
}

export function fetchAdd(user) {
  return {
    type: API,
    payload: {
      method: "POST",
      url: "/user",
      success: FETCH_SUCCESS,
      body: user,
    },
  };
}

export function fetchUpdate(id, user) {
  return {
    type: API,
    payload: {
      method: "PUT",
      url: `/user/${id}`,
      success: FETCH_SUCCESS,
      body: user,
    },
  };
}

export function fetchRemove(id) {
  return {
    type: API,
    payload: {
      method: "DELETE",
      url: `/user/${id}`,
      success: FETCH_SUCCESS,
    },
  };
}
