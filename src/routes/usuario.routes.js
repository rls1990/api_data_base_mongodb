import { Router } from "express";
import {
  changePassword,
  createUser,
  deleteUser,
  getAll,
  getUserById,
  login,
  refresh,
  register,
  updateUser,
  verify,
} from "../controllers/usuario.controller.js";
import { uploadMemo } from "../utils/upload.js"; //uploadMemo.single("file"),
import { validateSchema } from "../middleware/validator.js";
import {
  changePasswordSchema,
  loginSchema,
  usuarioSchema,
  usuarioupdateSchema,
} from "../validators/usuario.shema.js";
import {
  authRequired,
  isAdmin,
  isUserAuthOrAdmin,
  refreshAccessToken,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(usuarioSchema), register);

router.get("/usuarios", authRequired, isAdmin, getAll);
router.get("/usuarios/:id", authRequired, isAdmin, getUserById);
router.post(
  "/usuarios/create",
  authRequired,
  isAdmin,
  validateSchema(usuarioSchema),
  createUser
);
router.put(
  "/usuarios/update/:id",
  authRequired,
  isUserAuthOrAdmin,
  validateSchema(usuarioupdateSchema),
  updateUser
);
router.put(
  "/usuarios/changepassword/:id",
  authRequired,
  isUserAuthOrAdmin,
  validateSchema(changePasswordSchema),
  changePassword
);
router.delete("/usuarios/delete/:id", authRequired, isAdmin, deleteUser);

router.get("/verify", authRequired, verify);
router.get("/refresh", refreshAccessToken, refresh);

export default router;
