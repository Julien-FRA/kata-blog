export type ArticleDto = {
  _id: string;
  userId: string;
  author: string;
  date: string;
  topic: string;
  content: string;
};

export type CreateArticleDto = {
  topic: string;
  content: string;
};
