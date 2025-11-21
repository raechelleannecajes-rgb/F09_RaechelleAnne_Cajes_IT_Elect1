import React, { createContext, useEffect, useState } from "react";
import { initDb, findUserByEmail, createUser } from "../db/db";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDb().then(() => setReady(true)).catch(console.warn);
  }, []);

  const signUp = async ({ email, name, password }) => {
    const id = await createUser({ email, name, password });
    const newUser = { id, email, name, password };
    setUser(newUser);
    return newUser;
  };

  const signIn = async ({ email, password }) => {
    const found = await findUserByEmail(email);
    if (!found) throw new Error("No account found.");
    if (found.password !== password) throw new Error("Wrong password.");
    setUser(found);
    return found;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, ready, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}