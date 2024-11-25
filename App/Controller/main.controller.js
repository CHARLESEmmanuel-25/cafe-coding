

import mainDatamapper from "../Model/DataMapper.js"
import { hashPassword } from "../utils/bcrypt.js";
import bcrypt from 'bcrypt';


let count = 0;
const tabCount = [];

const mainController = {

  
   All: async (req, res) => {
     try {
       // Effectuer toutes les requêtes en parallèle pour optimiser les performances
       const [utilisateur, projets,posts, Recentsposts, presentation] = await Promise.all([
         mainDatamapper.getUtilisateur(),
         mainDatamapper.getProjets(),
         mainDatamapper.getPost(),
         mainDatamapper.getRecentsposts(),
         mainDatamapper.getPresentation()
       ]);

        count++;

       
          tabCount.push(count)
          let vues = null;
          tabCount.forEach(nb =>{
            vues = nb++
            
          })

          console.log(`Le site a été visité ${vues} fois`);
       
 
       // Rendre les données dans la vue "index" avec toutes les données nécessaires
       res.render('index', { utilisateur, projets, posts, Recentsposts, presentation});
       
     } catch (error) {
       console.error("Erreur lors de la récupération des données :", error.message);
       // Envoyer une réponse d'erreur si nécessaire
       res.status(500).send("Erreur lors de la récupération des données.");
     }
   },

   onePresentation: async (req, res) => {
    try {
        const presentation = await mainDatamapper.onPresentation();
        if (!presentation) {
            return res.status(404).json({ error: "Aucune présentation trouvée." });
        }
        return res.status(200).json(presentation); // Code 200 pour une récupération réussie
    } catch (error) {
        console.error("Erreur lors de la récupération de la présentation :", error.message);
        return res.status(500).json({ error: "Erreur interne du serveur." });
    }
  },


   createPresentation: async (req, res) => {
    try {
        const idUser = req.session.userId;

        if (!idUser) {
            return res.status(401).json({ error: "Utilisateur non authentifié." });
        }

        const { short_presentation, description, formation, ecole, parcours, photo, ambitions } = req.body;

       const presentationCreated = {
            short_presentation, 
            description, 
            formation, 
            ecole, 
            parcours, 
            photo, 
            ambitions,
            idUser
       }

       await mainDatamapper.savePresentation(presentationCreated);

       res.status(201).json({ message: "Presentation créé avec succès"});
    } catch (error) {
        console.error("Erreur lors de la création de la présentation :", error);
        return res.status(500).json({ error: "Erreur interne du serveur." });
    }
  },


   register: async (req, res) => {
      try {
        const { nom, prenom, mail, pseudo, motDePasse, short_description, photo } = req.body;
    
        // Vérification des champs obligatoires
        if (!nom || !prenom || !mail || !pseudo || !motDePasse) {
          return res.status(400).json({ error: "Tous les champs obligatoires doivent être renseignés." });
        }
    
        // Vérifie si l'utilisateur existe déjà
        const ifUserExist = await mainDatamapper.userExist(mail);
    
        if (ifUserExist.length > 0) {
          console.log("L'utilisateur existe déjà");
          return res.status(409).json({ error: "Utilisateur existe déjà" });
        }
    
        console.log("Utilisateur non trouvé dans la base de données");
    
        // Hash du mot de passe
        const hash = await hashPassword(motDePasse);
    
        // Création de l'utilisateur
        await mainDatamapper.saveUser(nom, prenom, mail, pseudo, hash, short_description, photo);
    
        return res.status(201).json({ message: "Utilisateur créé avec succès" });
      } catch (error) {
        console.error("Erreur dans la fonction register :", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
      }
    },
    
    
    login: async (req, res) => {
      try {
        const { mail, motDePasse } = req.body;
    
        // Vérifie si l'utilisateur existe
        const user = await mainDatamapper.userExist(mail);
        if (!user || user.length === 0) {
          return res.status(400).json({ error: "Les informations fournies sont incorrectes." });
        }
    
        const passwordHashFromDB = user[0].mot_de_passe;
    
        // Vérifie si le mot de passe est correct
        const isGoodPassword = await bcrypt.compare(motDePasse, passwordHashFromDB);
        if (!isGoodPassword) {
          return res.status(400).json({ error: "Les informations fournies sont incorrectes." });
        }
    
        // Stocke l'ID de l'utilisateur dans la session et supprime le mot de passe avant de renvoyer la réponse
        req.session.userId = user[0].id;
        delete user[0].mot_de_passe;
    
        // Message de confirmation de connexion
        res.status(200).json({ message: "Utilisateur connecté avec succès", data: user[0] });
      } catch (error) {
        console.error("Erreur dans la fonction login :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
      }
    },

    creatProjet: async (req, res) => {
      try {
        const idUser = req.session.userId;
    
        if (!idUser) {
          return res.status(401).json({ error: "Utilisateur non authentifié." });
        }
    
        const { nom, description, techno, defis, duree, resultats, photo, lienDemo, lienGithub } = req.body;

          const projetCreateByUser = {
              nom,
              description,
              techno,
              defis,
              duree,
              resultats,
              photo,
              lienDemo,
              lienGithub,
              userid: idUser
          };
    
        await mainDatamapper.saveProjet(projetCreateByUser);
    
        console.log("Projet créé avec succès :", projetCreateByUser);
        res.status(201).json({ message: "Projet créé avec succès", data: projetCreateByUser });
      } catch (error) {
        console.error("Erreur lors de la création du projet :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
      }
    },

    createPost: async (req, res) => {
      try {
        const idUser = req.session.userId;
    
        if (!idUser) {
          return res.status(401).json({ error: "Utilisateur non authentifié." });
        }
    
        const { titre, description, tags, lien, image, descriptionImage } = req.body;
    
        const postCreateByUser = {
          titre,
          description,
          tags,
          image,
          lien,
          userid: idUser
        };

       
    
        await mainDatamapper.savePost(postCreateByUser);

        //chercher l'id du projet qui vient d'etre creer 

        const idPost = await mainDatamapper.getIdPostRecents();
        console.log(idPost);
    
       // console.log("Post créé avec succès :", postCreateByUser);
        res.status(201).json({ message: "Post créé avec succès", data: postCreateByUser });
      } catch (error) {
        console.error("Erreur lors de la création du post :", error);
        res.status(500).json({ error: "Erreur interne du serveur." });
      }
    },

    postByid: async (req, res) =>{

      const idPost = parseInt(req.params.id);
      
      const getPost = await mainDatamapper.getPostByid(idPost);

      res.status(200).json({getPost});

      
    },

   
  

    deletePost: async (req, res) => {
      try {
          const idUser = req.session.userId;
          const idPost = parseInt(req.params.idPost);
  
          if (!idUser) {
              console.log('Connectez-vous');
              return res.status(401).send(" Connectez-vous,vous n'etes pas autorisé a supprimer ce post"); // Retourne un statut 401 pour indiquer que l'utilisateur doit être connecté
          }
  
          const postSupprime = await mainDatamapper.destroyProjet(idPost);
  
          if (!postSupprime) {
              console.log('Post non trouvé');
              return res.status(404).send("Post non trouvé"); // Retourne un statut 404 si le post n'existe pas
          }
  
          res.status(200).send("Post supprimé avec succès"); // Retourne un statut 200 et un message de succès
      } catch (error) {
          console.error(error);
          res.status(500).send("Erreur interne du serveur"); // Retourne un statut 500 en cas d'erreur serveur
      }
   },

    projetByid: async(req,res)=>{
      const idProjet = parseInt(req.params.id);
      
      const getProjet = await mainDatamapper.getProjetById(idProjet);

      res.status(200).json({getProjet});

      
    },

    deleteProjet: async (req, res) => {
      try {
          const idUser = req.session.userId;
          const idProjet = parseInt(req.params.idProjet);
  
          if (!idUser) {
              console.log('Connectez-vous');
              return res.status(401).send("Non autorisé"); // Retourne un statut 401 pour indiquer que l'utilisateur doit être connecté
          }
  
          const projetSupprime = await mainDatamapper.destroyProjet(idProjet);
  
          if (!projetSupprime) {
              console.log('Projet non trouvé');
              return res.status(404).send("Projet non trouvé"); // Retourne un statut 404 si le projet n'existe pas
          }
  
          res.status(200).send("Projet supprimé avec succès"); // Retourne un statut 200 et un message de succès
      } catch (error) {
          console.error(error);
          res.status(500).send("Erreur interne du serveur"); // Retourne un statut 500 en cas d'erreur serveur
      }
    },
  
    dashbordLog: async (req, res) => {
        const idUser = req.session.userId;
    
        if (!idUser) {
            console.log('connectez vous');
            return res.status(404).send("Page non trouvée"); // retourne un statut 404
        }
        
        res.render('dashbord');
    }
  
    
    
    
    
  

 };
 

export default mainController;
