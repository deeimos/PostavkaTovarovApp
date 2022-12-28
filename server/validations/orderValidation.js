import { body } from "express-validator";

export const orderValidation = [
    body("counter", "Неверный формат номера договора").isNumeric(),
    body("dtContract", "Неверный формат даты").isDate(),
    body("dtSending", "Неверный формат даты").isDate(),
    // body("sum", "Неверная итоговая стоимость").isFloat(),
  ];