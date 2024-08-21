import { api } from "./factory.api";

export const getAllArticle = async () => await api.getAll("/article");

export const getArticle = async (id: any) => await api.getOne("/article", id);
