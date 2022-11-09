import React, { useEffect } from "react";
import "./styles.scss";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, {
  fetchAdd,
  fetchAll,
  fetchRemove,
  fetchUpdate,
  loadData,
} from "../../redux";
import { CustomTable, Editor, Load } from "../../components";
import {
  endEditing,
  startCreating,
  startEditing,
} from "../../redux/stateActions";
import { EDIT_MODES } from "../../utils";

export default function Redux() {
  return (
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  );
}

function ReduxApp() {
  const { editing, loading, selectedId, selectedUser } = useSelector(
    (state) => state.stateData
  );
  const state = useSelector((state) => state.stateData);

  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onGetAllUsers = async () => {
    dispatch(loadData());
    onEndEditing();
  };

  const onCreateUser = async (user) => {
    dispatch(fetchAdd(user));
    onGetAllUsers();
  };

  const onUpdateUser = async (id, user) => {
    dispatch(fetchUpdate(id, user));
    onGetAllUsers();
  };

  const onRemoveUser = async (id) => {
    dispatch(fetchRemove(id));
    onGetAllUsers();
  };

  const onStartCreating = () => {
    dispatch(startCreating());
  };

  const onStartEditing = (id, user) => {
    dispatch(startEditing(id, user));
  };

  const onEndEditing = () => {
    dispatch(endEditing());
  };

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  return (
    <div>
      <h1>Redux</h1>
      {loading ? (
        <Load />
      ) : (
        <>
          <button
            className="btn btn-success my-2"
            type="button"
            disabled={editing}
            onClick={onStartCreating}
          >
            Add new user
          </button>
          <CustomTable
            list={users}
            onEdit={onStartEditing}
            onRemove={onRemoveUser}
            editing={editing}
          />
        </>
      )}
      {editing && (
        <Editor
          mode={selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onEndEditing={onEndEditing}
          onUpdateUser={onUpdateUser}
          onCreateUser={onCreateUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}
