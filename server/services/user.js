const db = require("./db");
const config = require("../config");
const helper = require("../helper");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * from users LIMIT ${offset},${config.listPerPage}`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page, nextPage: Number(page) + 1 };

  return {
    data,
    meta,
  };
}

async function create(user) {
  const result = await db.query(
    `INSERT INTO users
    (firstName, lastName, email, phone)
    VALUES ("${user.firstName}","${user.lastName}","${user.email}","${user.phone}")`
  );

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return message;
}

async function update(id, user) {
  const result = await db.query(
    `UPDATE users 
    set firstName="${user.firstName}", lastName="${user.lastName}", email="${user.email}", phone="${user.phone}" WHERE id=${id}`
  );

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return message;
}

async function remove(id) {
  const result = await db.query(`DELETE FROM users WHERE id=${id}`);

  let message = "Error in deleting user";

  if (result.affectedRows) {
    message = "User deleted successfully";
  }

  return message;
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
