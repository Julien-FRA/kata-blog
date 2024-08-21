import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDto } from "../../../utils/types/article.type";
import { getArticle } from "../../../utils/api/article.api";
import { Button } from "react-bootstrap";
import { getNotice } from "../../../utils/api/notice.api";
import { NoticeDto } from "../../../utils/types/notice.type";
import { ContentNotice } from "../Notice";

export const ContentArticle = () => {
  const [article, setArticle] = useState<ArticleDto>();
  const [notices, setNotices] = useState<NoticeDto[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { articleId } = useParams<string>();
  const goBack = () => navigate(-1);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const responseArticle = await getArticle(articleId);
      const responseNotice = await getNotice(articleId);

      if (responseArticle) {
        setArticle(responseArticle);
        setLoading(false);
      }

      if (responseNotice) {
        setNotices(responseNotice);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Erreur du chargement de l'articles...</p>
      ) : article ? (
        <>
          <p className="h1">{article.topic}</p>
          <p className="h5">Auteur: {article.author}</p>
          <p>{article.content}</p>
          <p>Mis en ligne: {article.date}</p>
          <p className="h4">Commentaires:</p>
          {notices?.map((notice, key) => (
            <ContentNotice
              key={key}
              _id={notice._id}
              userId={notice.userId}
              userName={notice.userName}
              date={notice.date}
              description={notice.description}
            />
          ))}
          <Button onClick={goBack}>Retour</Button>
        </>
      ) : (
        <p>Aucun article</p>
      )}
    </>
  );
};
