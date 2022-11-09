import {
  END_EDITIN,
  SET_LOADING,
  START_CREATING,
  START_EDITING,
} from "./actionType";

export function startEditing(id, user) {
  return {
    type: START_EDITING,
    payload: {
      id,
      user,
    },
  };
}

export function startCreating() {
  return {
    type: START_CREATING,
  };
}

export function endEditing() {
  return {
    type: END_EDITIN,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    action: {
      payload: loading,
    },
  };
}
