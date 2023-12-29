import User from "../models/user.model.js";
import { compare, encrypt } from "../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const newUser = new User(req.body);
    newUser.password = await encrypt(password);
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (user) {
      const isMatch = await compare(oldPassword, user.password);
      if (isMatch) {
        user.password = await encrypt(newPassword, 10);
        await user.save();
        res.sendStatus(200);
      } else return res.status(401).json({ message: "Contraseña incorrecta" });
    } else return res.status(401).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

//Auth
export const login = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    let user;

    if (nombre) user = await User.findOne({ nombre });
    else if (email) user = await User.findOne({ email });
    else return res.status(401).json({ message: "Credenciales inválidas" });

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Las credenciales son correctas, se puede generar el token de acceso y el token de actualización
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({ accessToken, refreshToken, user: { id: user.id } });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas b" });
  }
};

export const register = async (req, res) => {
  try {
    const { password } = req.body;
    const newUser = new User(req.body);
    newUser.password = await encrypt(password);
    newUser.roll = "user";
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "DB Error" });
  }
};

export const verify = (req, res) => {
  try {
    res.json({
      message: "Token de acceso verificado",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};

export const refresh = (req, res) => {
  try {
    res.json({
      message: "Token de acceso generado",
      user: req.user,
      accessToken: req.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Credenciales inválidas" });
  }
};
