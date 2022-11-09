import React from "react";
import useUserStore, { useStateStore } from "../../zustand";

import "./styles.scss";

export default function Zustand() {
  const userId = useUserStore((state) => state.userId);
  const increaseId = useUserStore((state) => state.increaseId);
  const increaseBy = useUserStore((state) => state.increaseBy);

  const categories = useStateStore((state) => state.categories);
  const setCategories = useStateStore((state) => state.setCategories);

  return (
    <div>
      <h1>React-Query</h1>
      <p>{userId}</p>
      <button onClick={increaseId}>Increment</button>
      <button onClick={() => increaseBy(3)}>Increase By 3</button>
      <button onClick={setCategories}>Load categories</button>
      
      {categories.map((cat) => (
        <p key={cat.id}>{cat.name}</p>
      ))}
      <>
        <button
          className="btn btn-success my-2"
          type="button"
          //disabled={editing}
          //onClick={onStartCreating}
        >
          Add new user
        </button>
        {/* <CustomTable
          list={data.data}
          //onEdit={onStartEditing}
          //onRemove={onRemoveUser}
          //editing={editing}
        /> */}
      </>

      {/* {editing && (
        <Editor
          mode={selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onEndEditing={onEndEditing}
          onUpdateUser={onUpdateUser}
          onCreateUser={onCreateUser}
          user={selectedUser}
        />
      )} */}
    </div>
  );
}
