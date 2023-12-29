import { z } from "zod";

export const usuarioSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre del usuario es requerido" })
    .min(3, { message: "El nombre debe ser mínimo de tres caracteres" }),
  email: z
    .string({ required_error: "El email es requerido" })
    .min(6, { message: "El email debe ser mínimo de seis caracteres" }),
  password: z
    .string({ required_error: "El password es requerido" })
    .min(6, { message: "El password debe ser mínimo de seis caracteres" }),
  roll: z
    .string({ required_error: "El roll es requerido" })
    .refine((val) => val === "admin" || val === "user", {
      message: "El rol no es válido",
    }),
});

export const usuarioupdateSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe ser mínimo de tres caracteres" })
    .optional(),
  email: z
    .string()
    .min(6, { message: "El email debe ser mínimo de seis caracteres" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "El password debe ser mínimo de seis caracteres" })
    .optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string({ message: "Escribe el password anterior" })
    .min(6, { message: "El password debe ser mínimo de seis caracteres" }),
  newPassword: z
    .string({ message: "Escribe el password nuevo" })
    .min(6, { message: "El password debe ser mínimo de seis caracteres" }),
});

export const loginSchema = z.object({
  nombre: z.string().min(1, { message: "Escriba un nombre." }).optional(),
  email: z.string().min(1, { message: "Escriba un email." }).optional(),
  password: z
    .string({ required_error: "El password es requerido" })
    .min(6, { message: "El password debe ser mínimo de seis caracteres" }),
});
