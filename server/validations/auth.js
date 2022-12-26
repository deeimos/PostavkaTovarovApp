import { body } from "express-validator";

export const loginValidation = [
  body("login", "Логин должен быть минимум 3 символа").isLength({ min: 3 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("login").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
];
