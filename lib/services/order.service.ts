import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order, OrderStatus } from "@/lib/types";

export async function createOrder(data: Omit<Order, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "orders"), {
    ...data,
    status: "pendiente",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, "orders", id), { status, updatedAt: serverTimestamp() });
}

export async function getOrdersByBuyer(buyerId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("buyerId", "==", buyerId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersBySeller(sellerId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("sellerId", "==", sellerId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersByStore(storeId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("storeId", "==", storeId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}
