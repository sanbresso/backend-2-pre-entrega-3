import jwt from "jsonwebtoken";

// Obtener la clave secreta desde las variables de entorno
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || !secret.trim()) {
    throw new Error("JWT_SECRET no está configurado");
  }

  return secret;
};

// Generar un token JWT
export const generateToken = ({ id, email, role }) => {
  const payload = {
    id,
    email,
    role
  };

  return jwt.sign(
    payload,
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      algorithm: "HS256"
    }
  );
};

// Verificar la validez de un token JWT
export const verifyToken = (token) => {
  return jwt.verify(
    token,
    getJwtSecret(),
    {
      algorithms: ["HS256"]
    }
  );
};