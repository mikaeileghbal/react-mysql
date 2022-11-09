import React, { useEffect } from "react";

import useInput from "../../hooks/useInput";
import "./styles.scss";
import { EDIT_MODES } from "../../utils";

export default function Editor({
  mode,
  onEndEditing,
  onUpdateUser,
  onCreateUser,
  user,
}) {
  const [fields, handleInputChange, setFields] = useInput({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { id, firstName, lastName, email, phone } = fields;

  const handleSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();
    if (mode === EDIT_MODES.UPDATE) return onUpdateUser(fields.id, fields);
    onCreateUser(fields);
  };

  const handleCancel = () => {
    onEndEditing();
  };

  useEffect(() => {
    if (user?.id) setFields(user);
  }, [user, setFields]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="id">
          ID
        </label>
        <input
          className="form-control"
          type="text"
          name="id"
          id="id"
          value={id}
          onChange={handleInputChange}
          disabled={true}
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="firstname">
          First name
        </label>
        <input
          className="form-control"
          type="text"
          name="firstName"
          id="firstname"
          value={firstName}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="lastname">
          Last name
        </label>
        <input
          className="form-control"
          type="text"
          name="lastName"
          id="lastname"
          value={lastName}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3 col-md-6">
        <label className="form-label" htmlFor="email">
          E-mail
        </label>
        <input
          className="form-control"
          type="mail"
          name="email"
          id="email"
          value={email}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3 col-md-6">
        <label className="form-label" htmlFor="phone">
          Mobile
        </label>
        <input
          className="form-control"
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button
          type="button"
          className="btn btn-warning mx-1"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
