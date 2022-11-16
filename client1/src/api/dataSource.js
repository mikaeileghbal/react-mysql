const BASE_URL = "http://localhost:3500/user";

async function getAllUsers({ pageParam = 1 }) {
  console.log("page in fetch:", pageParam);
  const response = await fetch(BASE_URL + `/?page=${pageParam}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

async function createUser(user) {
  console.log(user);
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

async function updateUser(id, user) {
  console.log("called", user);
  const response = await fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

async function removeUser(id) {
  const response = await fetch(BASE_URL + `/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}

export { getAllUsers, createUser, updateUser, removeUser };
