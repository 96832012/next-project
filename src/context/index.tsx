"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: number;
  posts: { id: number; content: string }[];
}

interface AppContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      const storedAuth = localStorage.getItem("isAuthenticated");
      const storedUser = localStorage.getItem("currentUser");

      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedAuth) setIsAuthenticated(JSON.parse(storedAuth));
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
