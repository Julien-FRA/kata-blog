import { CreateUserDto, LoginUserDto } from "../types/user.type";
import { api } from "./factory.api";

export const userRegister = async (data: CreateUserDto) =>
  await api.post("/auth/register", data);

export const userLogin = async (data: LoginUserDto) =>
  await api.post("/auth/login", data);
