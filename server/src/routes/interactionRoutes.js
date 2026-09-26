import express from "express";
import auth from "../middleware/auth.js";

import {
    getInteractions,
    getInteractionById,
    createInteraction,
    deleteInteraction
} from "../controllers/interactionController.js";

const router = express.Router();

router.get(
    "/interactions",
    auth,
    getInteractions
);

router.get(
    "/:id/interaction",
    auth,
    getInteractionById
);

router.post(
    "/",
    auth,
    createInteraction
);

router.delete(
    "/:id",
    auth,
    deleteInteraction
);