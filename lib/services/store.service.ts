import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Store } from "@/lib/types";
import { mockSaveStore, mockGetStoreByOwner, mockGetStores } from "@/lib/mock-auth";

function isFirebaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return !!(key && key !== "demo-api-key" && key.length > 10);
}

/* ─────────────────────────────────────────────
   CREATE STORE
───────────────────────────────────────────── */
export async function createStore(
  data: Omit<Store, "id" | "createdAt" | "calificacion" | "totalReviews">
): Promise<string> {
  const storeId = `store_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const storeData = {
    ...data,
    id: storeId,
    calificacion: 0,
    totalReviews: 0,
    activo: true,
    createdAt: new Date().toISOString(),
  };

  // Siempre guardar en mock (funciona offline)
  mockSaveStore(storeId, storeData);

  // Si Firebase está configurado, también guardar allí
  if (isFirebaseConfigured()) {
    try {
      const ref = await addDoc(collection(db, "stores"), {
        ...data,
        calificacion: 0,
        totalReviews: 0,
        activo: true,
        createdAt: serverTimestamp(),
      });
      return ref.id;
    } catch {
      // Firebase falló, pero ya guardamos en mock
    }
  }

  return storeId;
}

/* ─────────────────────────────────────────────
   UPDATE STORE
───────────────────────────────────────────── */
export async function updateStore(id: string, data: Partial<Store>): Promise<void> {
  // Actualizar en mock
  const stores = mockGetStores() as Record<string, any>;
  if (stores[id]) {
    stores[id] = { ...stores[id], ...data };
    mockSaveStore(id, stores[id]);
  }

  if (!isFirebaseConfigured()) return;
  try {
    await updateDoc(doc(db, "stores", id), { ...data, updatedAt: serverTimestamp() });
  } catch {
    // ignorar
  }
}

/* ─────────────────────────────────────────────
   GET STORE BY ID
───────────────────────────────────────────── */
export async function getStore(id: string): Promise<Store | null> {
  // Buscar en mock primero
  const stores = mockGetStores() as Record<string, any>;
  if (stores[id]) return stores[id] as Store;

  if (!isFirebaseConfigured()) return null;
  try {
    const snap = await getDoc(doc(db, "stores", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Store;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────
   GET STORE BY OWNER
───────────────────────────────────────────── */
export async function getStoreByOwner(ownerId: string): Promise<Store | null> {
  // Buscar en mock primero
  const mockStore = mockGetStoreByOwner(ownerId);
  if (mockStore) return mockStore as Store;

  if (!isFirebaseConfigured()) return null;
  try {
    const q = query(collection(db, "stores"), where("ownerId", "==", ownerId));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as Store;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────
   GET ALL STORES
───────────────────────────────────────────── */
export async function getAllStores(): Promise<Store[]> {
  const mockStores = Object.values(mockGetStores()) as Store[];

  if (!isFirebaseConfigured()) return mockStores;
  try {
    const q = query(
      collection(db, "stores"),
      where("activo", "==", true),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    const firebaseStores = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Store));
    // Combinar: Firebase + mock (sin duplicados por ownerId)
    const ownerIds = new Set(firebaseStores.map((s) => s.ownerId));
    const uniqueMock = mockStores.filter((s) => !ownerIds.has(s.ownerId));
    return [...firebaseStores, ...uniqueMock];
  } catch {
    return mockStores;
  }
}

export async function getStoresByCategory(categoria: string): Promise<Store[]> {
  const all = await getAllStores();
  return all.filter((s) => s.categoria === categoria && s.activo);
}
