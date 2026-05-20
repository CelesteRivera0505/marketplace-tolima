/**
 * Sistema de autenticación mock para cuando Firebase no está configurado.
 * Persiste en localStorage. Completamente funcional sin backend.
 */

import { User, UserRole } from "@/lib/types";

const USERS_KEY = "mt_users";
const SESSION_KEY = "mt_session";

function getUsers(): Record<string, User & { password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function saveSession(uid: string) {
  localStorage.setItem(SESSION_KEY, uid);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function mockRegister(
  email: string,
  password: string,
  nombre: string,
  rol: UserRole,
  telefono?: string
): User {
  const users = getUsers();

  // Verificar si ya existe
  const existing = Object.values(users).find((u) => u.email === email);
  if (existing) {
    throw new Error("auth/email-already-in-use");
  }

  const uid = `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const user: User & { password: string } = {
    id: uid,
    nombre,
    email,
    rol,
    telefono,
    createdAt: new Date(),
    password,
  };

  users[uid] = user;
  saveUsers(users);
  saveSession(uid);

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPass } = user;
  return userWithoutPass;
}

export function mockLogin(email: string, password: string): User {
  const users = getUsers();
  const user = Object.values(users).find((u) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error("auth/invalid-credential");
  }

  saveSession(user.id);
  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPass } = user;
  return userWithoutPass;
}

export function mockLogout() {
  clearSession();
}

export function mockGetCurrentUser(): User | null {
  const uid = getSession();
  if (!uid) return null;
  const users = getUsers();
  const user = users[uid];
  if (!user) return null;
  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPass } = user;
  return userWithoutPass;
}

export function mockUpdateUser(uid: string, data: Partial<User>) {
  const users = getUsers();
  if (users[uid]) {
    users[uid] = { ...users[uid], ...data };
    saveUsers(users);
  }
}

// Stores mock
const STORES_KEY = "mt_stores";

export function mockGetStores(): Record<string, object> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORES_KEY) || "{}");
  } catch {
    return {};
  }
}

export function mockSaveStore(storeId: string, data: object) {
  const stores = mockGetStores();
  stores[storeId] = data;
  localStorage.setItem(STORES_KEY, JSON.stringify(stores));
}

export function mockGetStoreByOwner(ownerId: string): object | null {
  const stores = mockGetStores();
  return Object.values(stores).find((s: any) => s.ownerId === ownerId) || null;
}
