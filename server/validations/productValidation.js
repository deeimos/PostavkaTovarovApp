import { body } from "express-validator";

export const productValidation = [
    body("name", "Название должно быть минимум 3 символа").isLength({ min: 3 }).isString(),
    body("description", "Описание должно быть минимум 5 символа").isLength({ min: 5 }).isString(),
  ];