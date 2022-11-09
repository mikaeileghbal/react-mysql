import React from "react";

export default function CustomTable({ list, onEdit, onRemove, editing }) {
  return (
    <table className="table table-responsive-sm align-middle">
      <TableHead list={list} />
      <TableBody
        list={list}
        onEdit={onEdit}
        onRemove={onRemove}
        editing={editing}
      />
    </table>
  );
}

function TableHead({ list }) {
  const item = list[0];
  const headers = Object.keys(item);

  return (
    <thead>
      <tr>
        {headers.map((item) => (
          <th className="table-light align-bottom" scope="col" key={item}>
            {item}
          </th>
        ))}
        <th className="table-light align-bottom">Actions</th>
      </tr>
    </thead>
  );
}

function TableBody({ list, onEdit, onRemove, editing }) {
  return (
    <tbody className="text-light">
      {list.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>
            <button
              className="btn btn-sm btn-success"
              onClick={() => onEdit(item.id, item)}
              disabled={editing}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger mx-1"
              onClick={() => onRemove(item.id)}
              disabled={editing}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
