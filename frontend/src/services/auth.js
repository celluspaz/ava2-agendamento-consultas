import api from "./api";

export async function login(email, password) {
  const resp = await api.post("/auth/login", { email, password });
  localStorage.setItem("ava2_token", resp.data.token);
  localStorage.setItem("ava2_user", JSON.stringify(resp.data.user));
  return resp.data;
}

export async function register(name, email, password, role) {
  const resp = await api.post("/auth/register", { name, email, password, role });
  localStorage.setItem("ava2_token", resp.data.token);
  localStorage.setItem("ava2_user", JSON.stringify(resp.data.user));
  return resp.data;
}

export function logout() {
  localStorage.removeItem("ava2_token");
  localStorage.removeItem("ava2_user");
}

export function getUser() {
  const raw = localStorage.getItem("ava2_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
