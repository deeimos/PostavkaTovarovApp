import { body } from "express-validator";

export const loginValidation = [
  body("login", "Логин должен быть минимум 3 символа").isLength({ min: 3 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("login", "Логин должен быть минимум 3 символа").isLength({ min: 3 }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 3 символа").isLength({ min: 5 }),
  body("fullName", "Имя должно быть минимум 3 символа").isLength({ min: 3 }),
];
