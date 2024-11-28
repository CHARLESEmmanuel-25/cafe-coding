import { Router } from "express";
import mainController from "../Controller/main.controller.js";

const router = Router();

// Exemple de route GET



router.get('/', mainController.All);
router.get('/posts/all', mainController.postsAll);
router.get('/post/:id', mainController.postByid);
router.get('/projet/:id', mainController.projetByid);

router.get('/dashbord', mainController.dashbordLog);

router.post('/login', mainController.login);
router.post('/signing', mainController.register);



router.post('/presentation/create', mainController.createPresentation);
router.get('/presentation', mainController.onePresentation);


// profile
router.post('/projet/create', mainController.creatProjet);
router.delete('/projet/:idProjet', mainController.deleteProjet);

// route post
router.post('/post/create', mainController.createPost);
router.delete('/post/:idPost', mainController.deletePost);










export default router;