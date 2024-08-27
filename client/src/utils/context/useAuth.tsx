import { createContext, useEffect, useState } from "react";
import { IsUserLoggedIn, UpdateUserDto, UserDto } from "../types/user.type";
import axios from "axios";
import React from "react";

type UserContextType = {
  user: UserDto | null;
  token: string | null;
  loginUser: (data: IsUserLoggedIn) => void;
  isLoggedIn: () => boolean;
  updateUser: (data: UserDto) => void;
  logout: () => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("user");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      console.log("test header");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, []);

  const loginUser = async (data: IsUserLoggedIn) => {
    if (data.token) {
      localStorage.setItem("token", data.token);

      const userObj = {
        id: data.userInformation.id,
        email: data.userInformation.email,
        name: data.userInformation.name,
        role: data.userInformation.role,
      };

      console.log(userObj);

      localStorage.setItem("user", JSON.stringify(userObj));
      setToken(data.token!);
      setUser(userObj!);
    }
  };

  const updateUser = async (data: UserDto) => {
    if (data) {
      const newUserObj = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
      };

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newUserObj));
      setUser(newUserObj!);
    }
  };

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");

    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{ user, token, loginUser, isLoggedIn, updateUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
