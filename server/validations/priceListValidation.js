import { body } from "express-validator";

export const priceListValidation = [
    body("counter", "Неверный формат номера прейскуранта").isNumeric(),
    body("price", "Неверный формат цены товара").isFloat(),
    body("dtBeginPrice", "Неверный формат даты").isDate(),
  ];