import express from "express";
import mongoose from "mongoose";

import {
  loginValidation,
  registerValidation,
  clientValidation,
} from "./validations.js";
import { UserController, ClientController } from "./controllers.js";
import { checkAuth, handleValidationErrors } from "./utils.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 7000;
app.listen(port, (err) => {
  if (err) return console.log(err);
  else console.log(`Server started http://localhost:${port}`);
});

const mongoDB =
  "mongodb+srv://admin:postavkaTovarov9@postavkatovarov.lst39ea.mongodb.net/Application?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error, ", err));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/clients",
  checkAuth,
  clientValidation,
  handleValidationErrors,
  ClientController.addClient
);
app.get("/clients", checkAuth, ClientController.getAllClients);
app.get("/clients/:name", checkAuth, ClientController.getOneClient);
app.delete("/clients/:id", checkAuth, ClientController.removeClient);
app.patch(
  "/clients/:id",
  checkAuth,
  handleValidationErrors,
  ClientController.updateClient
);
// app.patch(
//   '/posts/:id',
//   checkAuth,
//   postCreateValidation,
//   handleValidationErrors,
//   PostController.update,
// );

// Для всех моделей сделать CRUD
// app.get('/posts', PostController.getAll);
// app.get('/posts/tags', PostController.getLastTags);
// app.get('/posts/:id', PostController.getOne);
// app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// app.delete('/posts/:id', checkAuth, PostController.remove);
// app.patch(
//   '/posts/:id',
//   checkAuth,
//   postCreateValidation,
//   handleValidationErrors,
//   PostController.update,
// );
