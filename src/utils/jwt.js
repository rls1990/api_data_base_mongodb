import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../config/config.js";

export const generateAccessToken = (user) => {
  const accessToken = jwt.sign(user, ACCESS_TOKEN_KEY, {
    expiresIn: "5m",
  });
  return accessToken;
};

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_KEY, {
    expiresIn: "1d",
  });
  return refreshToken;
};
