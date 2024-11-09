import { Router } from "express";
import mainController from "../Controller/main.controller.js";

const router = Router();

// Exemple de route GET


router.get('/', mainController.All);
router.post('/login', mainController.login);
router.post('/signing', mainController.register);
router.post('/projet/create', mainController.creatProjet);
router.post('/post/create', mainController.createPost);







export default router;