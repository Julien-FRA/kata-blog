import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CreateUserDto } from "../../../utils/types/user.type";
import { userRegister } from "../../../utils/api/user.api";

export const FormRegister = () => {
  const { register, setValue, handleSubmit } = useForm<CreateUserDto>();

  const onSubmit = handleSubmit(async (data: CreateUserDto) => {
    const res = await userRegister({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    console.log(res);
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Adresse mail</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Votre adresse mail"
          {...register("email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          required
          type="name"
          placeholder="Votre nom"
          {...register("name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Votre mot de passe"
          {...register("password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Envoyer
      </Button>
    </Form>
  );
};
