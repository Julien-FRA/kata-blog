import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { token, addUser, removeUser, setToken } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      addUser(token);
    }
  }, [addUser, getItem, token]);

  const login = (token: string) => {
    addUser(token);
  };

  const logout = () => {
    removeUser();
  };

  return { token, login, logout, setToken };
};
