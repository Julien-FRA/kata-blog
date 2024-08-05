import { CreateUserDto } from "../types/user.type";
import { api } from "./factory.api";

export const userRegister = async (data: CreateUserDto) =>
  await api.post("/auth/register", data);
