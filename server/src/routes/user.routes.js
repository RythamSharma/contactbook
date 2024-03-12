import { Router } from "express";
import {
  loginUser,
  registerUser
} from "../controllers/user.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
export default router;
