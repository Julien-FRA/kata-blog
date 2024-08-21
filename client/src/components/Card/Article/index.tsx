import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getAllArticle } from "../../../utils/api/article.api";
import { ArticleDto } from "../../../utils/types/article.type";

export const CardArticle = () => {
  const [data, setData] = useState<ArticleDto[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await getAllArticle();

      if (response) {
        setData(response);
        setLoading(false);
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
    <div className="d-flex flex-wrap">
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Erreur du chargement des articles...</p>
      ) : data ? (
        data.map((article, key) => (
          <Card key={key} style={{ width: "18rem" }} className="mt-3 me-2">
            <Card.Body>
              <Card.Title>{article.topic}</Card.Title>
              <Card.Subtitle>{article.author}</Card.Subtitle>
              <Card.Text>{article.content}</Card.Text>
              <Button
                variant="primary"
                className="mb-3"
                href={`/article/${article._id}`}
              >
                Lire l'article
              </Button>
              <Card.Footer>{article.date}</Card.Footer>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Aucun article</p>
      )}
    </div>
  );
};
