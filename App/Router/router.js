import { Router } from "express";
import mainController from "../Controller/main.controller.js";

const router = Router();

// Exemple de route GET


router.get('/', mainController.All);







export default router;