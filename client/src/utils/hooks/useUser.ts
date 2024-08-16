import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/AuthContext";

export const useUser = () => {
  const { token, setToken } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (token: string) => {
    setToken(token);
    setItem("token", token);
  };

  const removeUser = () => {
    setToken(null);
    setItem("token", "");
  };

  return { token, addUser, removeUser, setToken };
};
