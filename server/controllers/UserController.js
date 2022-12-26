import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserSchema from "../models/UserSchema.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserSchema({
      login: req.body.login,
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "postavkaTovarov",
      {
        expiresIn: "1h",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось зарегестрировать пользователя",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ login: req.body.login });

    if (!user)
      return res.status(400).json({ message: "Неверный логин или пароль" });

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass)
      return res.status(400).json({ message: "Неверный логин или пароль" });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "postavkaTovarov",
      {
        expiresIn: "1h",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось авторизироваться",
    });
  }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({
            message: 'Пользователь не найден',
          });
        }
    
        const { passwordHash, ...userData } = user._doc;
    
        res.json(userData);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Нет доступа',
        });
      }
}