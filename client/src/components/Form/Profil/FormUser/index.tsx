import React, { useState } from "react";
import { useAuth } from "../../../../utils/context/useAuth";
import { Alert, Button, Form } from "react-bootstrap";
import { UpdateUserDto } from "../../../../utils/types/user.type";
import { useForm } from "react-hook-form";
import { userUpdate } from "../../../../utils/api/user.api";

export const FormUser = () => {
  const { register, handleSubmit } = useForm<UpdateUserDto>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { user, updateUser } = useAuth();

  const onSubmit = handleSubmit(async (data: UpdateUserDto) => {
    const res: any = await userUpdate(data);
    updateUser(res.data);

    if (res.message) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  });

  console.log(user);

  return (
    <div>
      <p className="h4">Information liés au compte :</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder={user?.email}
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder={user?.name}
            {...register("name")}
          />
        </Form.Group>
        {success && (
          <Alert variant="success">Modification enregistré avec succès !</Alert>
        )}
        {error && (
          <Alert variant="danger">Erreur lors de la modification...</Alert>
        )}
        <Button variant="primary" type="submit">
          Modifier
        </Button>
      </Form>
    </div>
  );
};
