import { api } from "./factory.api";

export const getNotice = async (id: any) => await api.getOne("/notice", id);
