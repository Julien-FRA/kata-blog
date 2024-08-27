import { CreateArticleDto } from "../types/article.type";
import { api } from "./factory.api";

export const getAllArticle = async () => await api.getAll("/article");

export const getArticle = async (id: any) => await api.getOne("/article", id);

export const createArticle = async (data: CreateArticleDto) =>
  await api.post("/article", data);

export const getUserArticle = async () =>
  await api.getAllWithSession("/article/all/user");

export const deleteArticle = async (id: string) =>
  await api.delete("/article", id);
