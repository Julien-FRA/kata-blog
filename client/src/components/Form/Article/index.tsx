import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CreateArticleDto } from "../../../utils/types/article.type";
import { createArticle } from "../../../utils/api/article.api";
import { useNavigate } from "react-router-dom";

export const AddArticle = () => {
  const { register, handleSubmit } = useForm<CreateArticleDto>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: CreateArticleDto) => {
    const res: any = await createArticle({
      topic: data.topic,
      content: data.content,
    });

    if (res.article) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setSuccess(false);
      setError(true);
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formTopic">
        <Form.Label>Sujet</Form.Label>
        <Form.Control
          required
          type="topic"
          placeholder="Votre sujet"
          {...register("topic")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Texte</Form.Label>
        <Form.Control
          required
          type="content"
          placeholder="Votre contenu"
          {...register("content")}
        />
      </Form.Group>
      {success && (
        <Alert variant="success">Votre article a été créée avec succès !</Alert>
      )}
      {error && (
        <Alert variant="danger">
          Erreur lors de la création de votre article...
        </Alert>
      )}
      <Button variant="primary" type="submit">
        Créer
      </Button>
    </Form>
  );
};
