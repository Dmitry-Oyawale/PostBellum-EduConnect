import express from "express";
import auth from "../middleware/auth.js";

import {
    register,
    login
} from "../controllers/authController.js";

const router = express.Router();

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);