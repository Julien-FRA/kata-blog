import { ArticleDto } from "../types/article.type";
import { api } from "./factory.api";

export const getAllArticle = async () => await api.getAll("/article");
