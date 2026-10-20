import { registerUser as registerUserService, loginUser as loginUserService } from "../services/sessions.service.js";

export function getSessionsInfo(req, res) {
  return res.status(200).json({
    status: "success",
    message: "Módulo de sesiones preparado"
  });
}

export const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService(req.body);

    return res.status(201).json({
      status: "success",
      payload: newUser
    });

  } catch (error) {
    const statusCode = error.code === 11000
      ? 409
      : error.statusCode || 500;

    const message = error.code === 11000
      ? "El email ya está registrado"
      : statusCode === 500
        ? "Error interno del servidor"
        : error.message;

    if (statusCode === 500) {
      console.error("Error al registrar usuario:", error);
    }

    return res.status(statusCode).json({
      status: "error",
      message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await loginUserService(req.body);

    res.cookie("currentUser", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({
      status: "success",
      message: "Login correcto"
    });

  } catch (error) {
    const statusCode = error.statusCode || 500;

    if (statusCode === 500) {
      console.error("Error al iniciar sesión:", error);
    }

    return res.status(statusCode).json({
      status: "error",
      message: statusCode === 500
        ? "Error interno del servidor"
        : error.message
    });
  }
};

export const getCurrentUser = (req, res) => {
  return res.status(200).json({
    status: "success",
    payload: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("currentUser", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return res.status(200).json({
    status: "success",
    message: "Sesión cerrada"
  });
};