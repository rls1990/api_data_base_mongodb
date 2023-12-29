import mongoose from "mongoose";
import { encrypt } from "../utils/bcrypt.js";
import Usuario from "../models/user.model.js";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/dbname")
    .then(() => console.log(">>> Conected mongodb"))
    .catch((err) => console.log(err));
};

export const defaultUser = async () => {
  try {
    const userFind = await Usuario.findOne({ nombre: "admin" });
    if (userFind) {
      console.log("El usuario por defecto ya existe");
      return;
    }

    const passEncrypt = await encrypt("admin123");

    const newUser = new Usuario({
      nombre: "admin",
      password: passEncrypt,
      roll: "admin",
    });

    const saveddu = await newUser.save();

    if (saveddu) console.log("El usuario por defecto ha sido ceado");
  } catch (error) {
    console.log(error);
  }
};
