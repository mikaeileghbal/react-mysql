const BASE_URL = "http://localhost:3500/user";

async function getAllUsers() {
  const response = await fetch(BASE_URL);
  const result = await response.json();
  return result.data;
}

async function createUser(user) {
  console.log(user);
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.text();
}

async function updateUser(id, user) {
  const response = await fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.text();
}

async function removeUser(id) {
  const response = await fetch(BASE_URL + `/${id}`, { method: "DELETE" });
  return response.text();
}

export { getAllUsers, createUser, updateUser, removeUser };
