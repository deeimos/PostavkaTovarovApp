import { body } from "express-validator";

export const compositionOrderValidation = [
    body("count", "Неверный формат количества").isNumeric(),
  ];