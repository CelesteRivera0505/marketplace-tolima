"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { onAuthChange, getUserData, logoutUser } from "@/lib/services/auth.service";
import { mockGetCurrentUser } from "@/lib/mock-auth";
import { User } from "@/lib/types";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUserDirectly: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  loading: true,
  logout: async () => {},
  refreshUser: async () => {},
  setUserDirectly: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentar cargar sesión mock inmediatamente (sin esperar Firebase)
    const mockUser = mockGetCurrentUser();
    if (mockUser) {
      setUser(mockUser);
      setFirebaseUser({ uid: mockUser.id, email: mockUser.email } as FirebaseUser);
      setLoading(false);
      return;
    }

    // Si no hay sesión mock, escuchar Firebase
    const unsubscribe = onAuthChange(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userData = await getUserData(fbUser.uid);
          setUser(userData);
        } catch {
          // Si Firebase falla, intentar mock
          const fallback = mockGetCurrentUser();
          setUser(fallback);
        }
      } else {
        // Verificar mock una vez más antes de declarar sin sesión
        const fallback = mockGetCurrentUser();
        setUser(fallback);
        if (fallback) {
          setFirebaseUser({ uid: fallback.id, email: fallback.email } as FirebaseUser);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setFirebaseUser(null);
  };

  const refreshUser = useCallback(async () => {
    const mockUser = mockGetCurrentUser();
    if (mockUser) {
      setUser(mockUser);
      return;
    }
    if (firebaseUser) {
      const userData = await getUserData(firebaseUser.uid);
      setUser(userData);
    }
  }, [firebaseUser]);

  /** Permite setear el usuario directamente después del registro sin esperar el listener */
  const setUserDirectly = useCallback((u: User) => {
    setUser(u);
    setFirebaseUser({ uid: u.id, email: u.email } as FirebaseUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading, logout, refreshUser, setUserDirectly }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
