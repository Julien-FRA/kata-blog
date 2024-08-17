import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserModel = require("../models/user");

// Enregistrer un nouvelle utilisateur
exports.register = async (req, res) => {
  if (!req.body.email && !req.body.name && !req.body.password) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new UserModel({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

// Connecter un utilisateur
exports.login = async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });

    const userInformation = { id: user._id, name: user.name, role: user.role };

    res.json({ token, userInformation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs de la database
exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Récupérer un utilisateur avec son id
exports.findOne = async (req, res) => {
  const id = req.user.userId;

  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Mise à jour d'un utilisateur avec son id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.user.userId;

  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Supprimer un utilisateur avec un id
exports.destroy = async (req, res) => {
  const id = req.user.userId;

  await UserModel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
