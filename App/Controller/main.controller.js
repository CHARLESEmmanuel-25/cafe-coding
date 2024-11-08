

import mainDatamapper from "../Model/DataMapper.js"

const mainController = {
   All: async (req, res) => {
     try {
       // Effectuer toutes les requêtes en parallèle pour optimiser les performances
       const [utilisateur, projets, posts, Recentsposts, presentation] = await Promise.all([
         mainDatamapper.getUtilisateur(),
         mainDatamapper.getProjets(),
         mainDatamapper.getPost(),
         mainDatamapper.getRecentsposts(),
         mainDatamapper.getPresentation()
       ]);
 
       console.log(presentation);
       
 
       // Rendre les données dans la vue "index" avec toutes les données nécessaires
       res.render('index', { utilisateur, projets, posts, Recentsposts, presentation});
     } catch (error) {
       console.error("Erreur lors de la récupération des données :", error.message);
       // Envoyer une réponse d'erreur si nécessaire
       res.status(500).send("Erreur lors de la récupération des données.");
     }
   }
 };
 

export default mainController;