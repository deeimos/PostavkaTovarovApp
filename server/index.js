import express from "express";
import mongoose from "mongoose";

import {
  loginValidation,
  registerValidation,
  clientValidation,
  providerValidation,
  productValidation,
  priceListValidation,
} from "./validations.js";
import {
  UserController,
  ClientController,
  ProviderController,
  ProductController,
  PriceListController,
} from "./controllers.js";
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
  clientValidation,
  handleValidationErrors,
  ClientController.updateClient
);


app.post(
  "/providers",
  checkAuth,
  providerValidation,
  handleValidationErrors,
  ProviderController.addProvider
);
app.get("/providers", checkAuth, ProviderController.getAllProviders);
app.get("/providers/:name", checkAuth, ProviderController.getOneProvider);
app.delete("/providers/:id", checkAuth, ProviderController.removeProvider);
app.patch(
  "/providers/:id",
  checkAuth,
  providerValidation,
  handleValidationErrors,
  ProviderController.updateProvider
);


app.post(
  "/products",
  checkAuth,
  productValidation,
  handleValidationErrors,
  ProductController.addProduct
);
app.get("/products", checkAuth, ProductController.getAllProducts);
app.get("/products/:name", checkAuth, ProductController.getOneProduct);
app.delete("/products/:id", checkAuth, ProductController.removeProduct);
app.patch(
  "/products/:id",
  checkAuth,
  productValidation,
  handleValidationErrors,
  ProductController.updateProduct
);


app.post(
    "/pricelists",
    checkAuth,
    priceListValidation,
    handleValidationErrors,
    PriceListController.addPriceList
  );
app.get("/pricelists", checkAuth, PriceListController.getAllPriceLists);
app.get("/pricelists/:counter", checkAuth, PriceListController.getOnePriceList);
app.delete("/pricelists/:id", checkAuth, PriceListController.removePriceList);
app.patch(
  "/pricelists/:id",
  checkAuth,
  priceListValidation,
  handleValidationErrors,
  PriceListController.updatePriceList
);
