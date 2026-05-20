import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User, UserRole } from "@/lib/types";
import {
  mockRegister,
  mockLogin,
  mockLogout,
  mockGetCurrentUser,
} from "@/lib/mock-auth";

/** Detecta si Firebase está configurado con credenciales reales */
function isFirebaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return !!(key && key !== "demo-api-key" && key.length > 10);
}

/* ─────────────────────────────────────────────
   REGISTER
───────────────────────────────────────────── */
export async function registerUser(
  email: string,
  password: string,
  nombre: string,
  rol: UserRole,
  telefono?: string
): Promise<User> {
  // Sin Firebase real → usar mock
  if (!isFirebaseConfigured()) {
    return mockRegister(email, password, nombre, rol, telefono);
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: nombre });

    const userData: Omit<User, "id"> = {
      nombre,
      email,
      rol,
      telefono,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", credential.user.uid), {
      ...userData,
      createdAt: serverTimestamp(),
    });

    return { id: credential.user.uid, ...userData };
  } catch (err: unknown) {
    // Si Firebase falla por red/config, caer al mock
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("network") ||
      msg.includes("fetch") ||
      msg.includes("api-key") ||
      msg.includes("invalid-api-key") ||
      msg.includes("configuration")
    ) {
      return mockRegister(email, password, nombre, rol, telefono);
    }
    throw err;
  }
}

/* ─────────────────────────────────────────────
   LOGIN
───────────────────────────────────────────── */
export async function loginUser(email: string, password: string): Promise<User> {
  if (!isFirebaseConfigured()) {
    return mockLogin(email, password);
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", credential.user.uid));

    if (!userDoc.exists()) {
      throw new Error("Usuario no encontrado en la base de datos");
    }

    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("network") ||
      msg.includes("fetch") ||
      msg.includes("api-key") ||
      msg.includes("invalid-api-key")
    ) {
      return mockLogin(email, password);
    }
    throw err;
  }
}

/* ─────────────────────────────────────────────
   LOGOUT
───────────────────────────────────────────── */
export async function logoutUser(): Promise<void> {
  mockLogout(); // siempre limpiar mock session
  if (!isFirebaseConfigured()) return;
  try {
    await signOut(auth);
  } catch {
    // ignorar errores de Firebase en logout
  }
}

/* ─────────────────────────────────────────────
   GET USER DATA
───────────────────────────────────────────── */
export async function getUserData(uid: string): Promise<User | null> {
  if (!isFirebaseConfigured()) {
    return mockGetCurrentUser();
  }

  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      // Intentar desde mock como fallback
      return mockGetCurrentUser();
    }
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch {
    return mockGetCurrentUser();
  }
}

/* ─────────────────────────────────────────────
   AUTH STATE CHANGE
───────────────────────────────────────────── */
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  if (!isFirebaseConfigured()) {
    // Simular el listener con el mock
    const mockUser = mockGetCurrentUser();
    // Llamar callback de forma asíncrona para simular comportamiento de Firebase
    setTimeout(() => {
      if (mockUser) {
        // Crear un objeto FirebaseUser mínimo compatible
        callback({ uid: mockUser.id, email: mockUser.email } as FirebaseUser);
      } else {
        callback(null);
      }
    }, 0);
    // Retornar función de cleanup vacía
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}
