import { Router } from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/authController";
import { checkAuthenticated } from "../middleware/authMiddleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.put("/update-profile", checkAuthenticated, updateProfile);

export default authRoutes;
