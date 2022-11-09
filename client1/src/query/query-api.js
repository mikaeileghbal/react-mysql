const BASE_URL = "http://localhost:3500/user";

export async function getAllUsers() {
  const response = await fetch(BASE_URL);
  return await response.json();
}
