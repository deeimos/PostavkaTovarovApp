import { body } from "express-validator";

export const providerValidation = [
    body("name", "Название должно быть минимум 3 символа").isLength({ min: 3 }).isString(),
    body("address", "Адресс должен быть минимум 3 символа").isLength({ min: 3 }).isString(),
    body("email", "Неверный формат почты").isEmail().isString(),
    body("phone", "Номер телефона должен быть минимум 12 символа").isLength({ min: 12 }).isString(),
  ];