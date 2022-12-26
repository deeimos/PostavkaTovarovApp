import express from "express";
import mongoose from "mongoose";

import { loginValidation, registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";

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

app.post("/register", registerValidation, UserController.register);

app.post("/auth", loginValidation, UserController.login);

app.get("/auth/me", checkAuth, UserController.getMe);
